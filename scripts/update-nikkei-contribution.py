#!/usr/bin/env python3
"""Generate a trial Nikkei contribution JSON from licensed or local CSV inputs."""

from __future__ import annotations

import argparse
import csv
import json
import math
import os
import tempfile
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_CONSTITUENTS = ROOT / "data" / "nikkei-contribution-constituents.sample.csv"
DEFAULT_PRICES = ROOT / "data" / "nikkei-contribution-prices.sample.csv"
DEFAULT_OUTPUT = ROOT / "data" / "nikkei-contribution.json"
SAMPLE_DIVISOR = 30.0


@dataclass(frozen=True)
class Constituent:
    code: str
    name: str
    paf: float


def positive_number(value: str, field: str, row_label: str) -> float:
    try:
        number = float(value)
    except (TypeError, ValueError) as exc:
        raise ValueError(f"{row_label}: {field} must be numeric") from exc
    if not math.isfinite(number) or number <= 0:
        raise ValueError(f"{row_label}: {field} must be greater than zero")
    return number


def load_constituents(path: Path) -> list[Constituent]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        required = {"code", "name", "paf"}
        if not reader.fieldnames or not required.issubset(reader.fieldnames):
            raise ValueError(f"{path}: required columns are code,name,paf")

        constituents: list[Constituent] = []
        seen: set[str] = set()
        for line_number, row in enumerate(reader, start=2):
            code = (row.get("code") or "").strip()
            name = (row.get("name") or "").strip()
            label = f"{path}:{line_number}"
            if not code or not name:
                raise ValueError(f"{label}: code and name are required")
            if code in seen:
                raise ValueError(f"{label}: duplicate code {code}")
            seen.add(code)
            constituents.append(
                Constituent(
                    code=code,
                    name=name,
                    paf=positive_number(row.get("paf") or "", "paf", label),
                )
            )

    if not constituents:
        raise ValueError(f"{path}: no constituents found")
    return constituents


def load_prices(path: Path) -> dict[str, dict[str, float]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        reader = csv.DictReader(handle)
        required = {"date", "code", "close"}
        if not reader.fieldnames or not required.issubset(reader.fieldnames):
            raise ValueError(f"{path}: required columns are date,code,close")

        prices: dict[str, dict[str, float]] = {}
        for line_number, row in enumerate(reader, start=2):
            date = (row.get("date") or "").strip()
            code = (row.get("code") or "").strip()
            label = f"{path}:{line_number}"
            try:
                datetime.strptime(date, "%Y-%m-%d")
            except ValueError as exc:
                raise ValueError(f"{label}: date must be YYYY-MM-DD") from exc
            if not code:
                raise ValueError(f"{label}: code is required")
            code_prices = prices.setdefault(code, {})
            if date in code_prices:
                raise ValueError(f"{label}: duplicate price for {code} on {date}")
            code_prices[date] = positive_number(row.get("close") or "", "close", label)

    if not prices:
        raise ValueError(f"{path}: no prices found")
    return prices


def resolve_dates(
    prices: dict[str, dict[str, float]],
    as_of: str | None,
    previous_date: str | None,
) -> tuple[str, str]:
    all_dates = sorted({date for code_prices in prices.values() for date in code_prices})
    if len(all_dates) < 2:
        raise ValueError("prices must contain at least two trading dates")

    resolved_as_of = as_of or all_dates[-1]
    if resolved_as_of not in all_dates:
        raise ValueError(f"as-of date {resolved_as_of} is not present in prices")

    earlier_dates = [date for date in all_dates if date < resolved_as_of]
    if not earlier_dates:
        raise ValueError(f"no previous trading date exists before {resolved_as_of}")
    resolved_previous = previous_date or earlier_dates[-1]
    if resolved_previous not in earlier_dates:
        raise ValueError(
            f"previous date {resolved_previous} must exist before {resolved_as_of}"
        )
    return resolved_as_of, resolved_previous


def build_payload(
    constituents: list[Constituent],
    prices: dict[str, dict[str, float]],
    divisor: float,
    as_of: str,
    previous_date: str,
    source_label: str,
    data_status: str,
) -> dict[str, object]:
    items: list[dict[str, object]] = []
    for constituent in constituents:
        code_prices = prices.get(constituent.code)
        if not code_prices:
            raise ValueError(f"missing all prices for {constituent.code}")
        if as_of not in code_prices or previous_date not in code_prices:
            raise ValueError(
                f"missing {previous_date} or {as_of} close for {constituent.code}"
            )

        previous_close = code_prices[previous_date]
        close = code_prices[as_of]
        price_change = close - previous_close
        adjusted_price_change = price_change * constituent.paf
        contribution_points = adjusted_price_change / divisor
        change_percent = price_change / previous_close * 100
        items.append(
            {
                "code": constituent.code,
                "name": constituent.name,
                "paf": constituent.paf,
                "previous_close": previous_close,
                "close": close,
                "price_change": round(price_change, 4),
                "change_percent": round(change_percent, 4),
                "contribution_points": round(contribution_points, 4),
            }
        )

    items.sort(key=lambda item: float(item["contribution_points"]), reverse=True)
    total = round(sum(float(item["contribution_points"]) for item in items), 4)
    return {
        "schema_version": 1,
        "data_status": data_status,
        "is_trial": data_status != "licensed",
        "as_of": as_of,
        "previous_date": previous_date,
        "generated_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "source": source_label,
        "methodology": {
            "formula": "(close - previous_close) * paf / divisor",
            "divisor": divisor,
            "coverage": "partial",
            "coverage_count": len(items),
        },
        "total_contribution_points": total,
        "leaders": items[:5],
        "laggards": list(reversed(items[-5:])),
        "items": items,
        "notice": (
            "Trial output for pipeline verification. It is not an official Nikkei 225 "
            "contribution calculation and must not be used for investment decisions."
        ),
    }


def atomic_write_json(path: Path, payload: dict[str, object]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temp_path: Path | None = None
    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            newline="\n",
            prefix=f".{path.name}.",
            suffix=".tmp",
            dir=path.parent,
            delete=False,
        ) as handle:
            temp_path = Path(handle.name)
            json.dump(payload, handle, ensure_ascii=False, indent=2)
            handle.write("\n")
            handle.flush()
            os.fsync(handle.fileno())
        os.replace(temp_path, path)
    finally:
        if temp_path and temp_path.exists():
            temp_path.unlink()


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Generate a trial Nikkei contribution JSON from CSV files."
    )
    parser.add_argument("--constituents", type=Path, default=DEFAULT_CONSTITUENTS)
    parser.add_argument("--prices", type=Path, default=DEFAULT_PRICES)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument(
        "--divisor",
        type=float,
        help=f"Required for licensed data; sample default is {SAMPLE_DIVISOR}.",
    )
    parser.add_argument("--as-of")
    parser.add_argument("--previous-date")
    parser.add_argument("--source-label", default="illustrative_test_fixture")
    parser.add_argument(
        "--data-status",
        choices=("sample", "licensed"),
        default="sample",
        help="Use licensed only after confirming every input data license.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    divisor = args.divisor if args.divisor is not None else SAMPLE_DIVISOR
    if not math.isfinite(divisor) or divisor <= 0:
        raise ValueError("divisor must be greater than zero")
    if args.data_status == "licensed":
        uses_sample_input = (
            args.constituents.resolve() == DEFAULT_CONSTITUENTS.resolve()
            or args.prices.resolve() == DEFAULT_PRICES.resolve()
            or args.source_label == "illustrative_test_fixture"
            or args.divisor is None
        )
        if uses_sample_input:
            raise ValueError(
                "licensed status requires non-sample inputs, an explicit divisor, "
                "and a provider source label"
            )

    constituents = load_constituents(args.constituents)
    prices = load_prices(args.prices)
    as_of, previous_date = resolve_dates(prices, args.as_of, args.previous_date)
    payload = build_payload(
        constituents=constituents,
        prices=prices,
        divisor=divisor,
        as_of=as_of,
        previous_date=previous_date,
        source_label=args.source_label,
        data_status=args.data_status,
    )
    atomic_write_json(args.output, payload)
    print(
        f"wrote {args.output} ({len(constituents)} constituents, "
        f"{previous_date} -> {as_of})"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
