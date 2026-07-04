const marketGroups = [
  {
    id: "japan",
    title: "日本",
    region: "日本",
    items: [
      // TVC:NI225 is the official-index candidate, but OANDA:JP225USD is kept for more stable widget display.
      { name: "日経225 CFD", subname: "OANDA参考値・公式指数とは異なります", symbol: "OANDA:JP225USD", type: "CFD", typeLabel: "CFD", source: "TradingView / OANDA", delay: "リアルタイムCFD参考値" },
      { name: "TOPIX CFD", subname: "Tokyo Stock Price Index", symbol: "IG:TOPIX", type: "CFD", typeLabel: "CFD", source: "TradingView / IG", delay: "参考CFD" },
      { name: "日本10年国債", subname: "Japan 10Y JGB Futures", symbol: "OSE:JBL1!", type: "FUTURES", typeLabel: "先物", source: "TradingView / OSE", delay: "取引所データ" }
    ]
  },
  {
    id: "us",
    title: "米国",
    region: "米国",
    items: [
      { name: "S&P500", symbol: "CAPITALCOM:US500", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "NASDAQ100", symbol: "CAPITALCOM:US100", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "SOXX 半導体ETF", subname: "iShares Semiconductor ETF", symbol: "NASDAQ:SOXX", type: "ETF", typeLabel: "ETF", source: "TradingView / Nasdaq", delay: "SOX連動参考値" },
      { name: "VIX", subname: "恐怖指数 CFD", symbol: "CAPITALCOM:VIX", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "米国10年債", subname: "US 10Y T-Note CFD", symbol: "OANDA:USB10YUSD", type: "CFD", typeLabel: "債券", source: "TradingView / OANDA", delay: "債券価格・利回りと逆方向" },
      { name: "NYダウ", symbol: "CAPITALCOM:US30", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "Russell 2000", subname: "米国小型株 CFD", symbol: "IG:RUSSELL", type: "CFD", typeLabel: "CFD", source: "TradingView / IG", delay: "参考CFD" },
      { name: "米国2年債", subname: "US 2Y T-Note CFD", symbol: "OANDA:USB02YUSD", type: "CFD", typeLabel: "債券", source: "TradingView / OANDA", delay: "債券価格・利回りと逆方向" }
    ]
  },
  {
    id: "europe",
    title: "欧州",
    region: "欧州",
    items: [
      { name: "DAX", subname: "ドイツ40 CFD", symbol: "CAPITALCOM:DE40", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "FTSE100", subname: "英国100 CFD", symbol: "CAPITALCOM:UK100", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "CAC40", subname: "フランス40 CFD", symbol: "CAPITALCOM:FR40", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" }
    ]
  },
  {
    id: "asia",
    title: "アジア",
    region: "アジア",
    items: [
      { name: "上海A株ETF", subname: "CSI 300 / ASHR", symbol: "AMEX:ASHR", type: "ETF", typeLabel: "ETF", source: "TradingView / NYSE American", delay: "上海・深圳A株参考値" },
      { name: "香港HSI", subname: "Hang Seng 50 CFD", symbol: "CAPITALCOM:HK50", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "韓国ETF", subname: "KOSPI参考 / EWY", symbol: "AMEX:EWY", type: "ETF", typeLabel: "ETF", source: "TradingView / NYSE Arca", delay: "韓国市場連動参考値" }
    ]
  },
  {
    id: "fx",
    title: "為替",
    region: "外国為替",
    items: [
      { name: "ドル円", subname: "USD / JPY", symbol: "FX_IDC:USDJPY", type: "FX", typeLabel: "為替", source: "TradingView / FX IDC", delay: "参考値" },
      { name: "ユーロ円", subname: "EUR / JPY", symbol: "FX_IDC:EURJPY", type: "FX", typeLabel: "為替", source: "TradingView / FX IDC", delay: "参考値" },
      { name: "ユーロドル", subname: "EUR / USD", symbol: "FX_IDC:EURUSD", type: "FX", typeLabel: "為替", source: "TradingView / FX IDC", delay: "参考値" },
      { name: "ポンド円", subname: "GBP / JPY", symbol: "FX_IDC:GBPJPY", type: "FX", typeLabel: "為替", source: "TradingView / FX IDC", delay: "参考値" },
      { name: "豪ドル円", subname: "AUD / JPY", symbol: "FX_IDC:AUDJPY", type: "FX", typeLabel: "為替", source: "TradingView / FX IDC", delay: "参考値" },
      { name: "米ドル指数 CFD", subname: "DXY / US Dollar Index", symbol: "CAPITALCOM:DXY", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" }
    ]
  },
  {
    id: "commodities",
    title: "商品",
    region: "商品",
    items: [
      { name: "金", subname: "Gold / USD", symbol: "OANDA:XAUUSD", type: "SPOT", typeLabel: "現物", source: "TradingView / OANDA", delay: "参考値" },
      { name: "銀", subname: "Silver / USD", symbol: "OANDA:XAGUSD", type: "SPOT", typeLabel: "現物", source: "TradingView / OANDA", delay: "参考値" },
      { name: "銅", subname: "Copper CFD", symbol: "CAPITALCOM:COPPER", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "WTI原油", subname: "Crude Oil CFD", symbol: "CAPITALCOM:OIL_CRUDE", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "ブレント原油", subname: "Brent CFD", symbol: "CAPITALCOM:OIL_BRENT", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" },
      { name: "天然ガス", subname: "Natural Gas CFD", symbol: "CAPITALCOM:NATURALGAS", type: "CFD", typeLabel: "CFD", source: "TradingView / Capital.com", delay: "参考CFD" }
    ]
  },
  {
    id: "crypto",
    title: "暗号資産",
    region: "暗号資産",
    items: [
      { name: "BTC / USD", subname: "Bitcoin / US Dollar", symbol: "BITSTAMP:BTCUSD", type: "CRYPTO", typeLabel: "暗号資産", source: "TradingView / Bitstamp", delay: "取引所リアルタイム" },
      { name: "BTC / JPY", subname: "Bitcoin / Japanese Yen", symbol: "BITFLYER:BTCJPY", type: "CRYPTO", typeLabel: "暗号資産", source: "TradingView / bitFlyer", delay: "取引所リアルタイム" },
      { name: "ETH / USD", subname: "Ethereum / US Dollar", symbol: "BITSTAMP:ETHUSD", type: "CRYPTO", typeLabel: "暗号資産", source: "TradingView / Bitstamp", delay: "取引所リアルタイム" }
    ]
  }
];

const allMarkets = marketGroups.flatMap((group) =>
  group.items.map((item) => ({ ...item, groupId: group.id, groupTitle: group.title, region: group.region }))
);

const prioritySymbols = [
  "OANDA:JP225USD", "IG:TOPIX", "CAPITALCOM:US500", "CAPITALCOM:US100", "NASDAQ:SOXX", "CAPITALCOM:VIX", "FX_IDC:USDJPY", "OANDA:USB10YUSD",
  "CAPITALCOM:US30", "IG:RUSSELL", "CAPITALCOM:DE40", "CAPITALCOM:UK100", "CAPITALCOM:FR40", "CAPITALCOM:HK50", "AMEX:ASHR", "AMEX:EWY",
  "FX_IDC:EURJPY", "FX_IDC:EURUSD", "FX_IDC:GBPJPY", "FX_IDC:AUDJPY", "OANDA:XAUUSD", "OANDA:XAGUSD", "CAPITALCOM:COPPER", "CAPITALCOM:OIL_CRUDE",
  "BITSTAMP:BTCUSD", "BITFLYER:BTCJPY", "BITSTAMP:ETHUSD", "CAPITALCOM:DXY", "CAPITALCOM:OIL_BRENT", "CAPITALCOM:NATURALGAS", "OANDA:USB02YUSD", "OSE:JBL1!"
];
const priorityRank = new Map(prioritySymbols.map((symbol, index) => [symbol, index]));
const priorityLayout = new Map([
  ...prioritySymbols.map((symbol, index) => [symbol, [Math.floor(index / 8) + 1, (index % 8) + 1]])
]);

function storedArray(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

const state = {
  view: "overview",
  active: allMarkets[0],
  interval: "15",
  query: "",
  category: "all",
  favorites: new Set(storedArray("marketFavorites")),
  theme: localStorage.getItem("marketTheme") || "dark",
  chartGeneration: 0,
  miniObserver: null
};

const nodes = {
  overviewPage: document.querySelector("#overviewPage"),
  detailPage: document.querySelector("#detailPage"),
  viewSwitch: document.querySelector(".view-switch"),
  brandHome: document.querySelector("#brandHome"),
  back: document.querySelector("#backToOverview"),
  search: document.querySelector("#marketSearch"),
  tabs: document.querySelector("#categoryTabs"),
  overviewGroups: document.querySelector("#overviewGroups"),
  activeRegion: document.querySelector("#activeRegion"),
  activeType: document.querySelector("#activeType"),
  activeName: document.querySelector("#activeName"),
  activeSymbol: document.querySelector("#activeSymbol"),
  source: document.querySelector("#sourceText"),
  delay: document.querySelector("#delayText"),
  chart: document.querySelector("#chart"),
  intervals: document.querySelector("#intervalControl"),
  favorite: document.querySelector("#favoriteActive"),
  tradingView: document.querySelector("#openTradingView"),
  related: document.querySelector("#relatedMarkets"),
  relatedCount: document.querySelector("#relatedCount"),
  sessions: document.querySelector("#sessions"),
  networkStatus: document.querySelector("#networkStatus"),
  networkText: document.querySelector("#networkText"),
  clock: document.querySelector("#clock"),
  lastRefresh: document.querySelector("#lastRefresh"),
  themeToggle: document.querySelector("#themeToggle")
};

function widgetTheme() {
  return state.theme === "dark" ? "dark" : "light";
}

function tradingViewUrl(symbol) {
  return `https://www.tradingview.com/symbols/${symbol.replace(":", "-")}/`;
}

function mountWidget(target, src, config) {
  target.replaceChildren();
  const container = document.createElement("div");
  container.className = "tradingview-widget-container";
  container.style.height = "100%";
  container.style.width = "100%";

  const widget = document.createElement("div");
  widget.className = "tradingview-widget-container__widget";
  widget.style.height = "100%";
  widget.style.width = "100%";

  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = src;
  script.async = true;
  script.text = JSON.stringify(config);

  container.append(widget, script);
  target.appendChild(container);
}

function setView(view) {
  state.view = view;
  nodes.overviewPage.classList.toggle("is-active", view === "overview");
  nodes.detailPage.classList.toggle("is-active", view === "detail");
  nodes.viewSwitch.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === view);
  });
  if (view === "overview") {
    document.title = "世界マーケットボード";
    renderOverview();
  } else {
    document.title = `${state.active.name} | 世界マーケットボード`;
    renderDetail();
  }
  window.scrollTo({ top: 0, behavior: "auto" });
}

function renderCategoryTabs() {
  nodes.tabs.replaceChildren();
  const categories = [
    { id: "all", title: "すべて", count: allMarkets.length },
    ...marketGroups.map((group) => ({ id: group.id, title: group.title, count: group.items.length }))
  ];

  if (state.favorites.size) {
    categories.splice(1, 0, { id: "favorites", title: "お気に入り", count: state.favorites.size });
  }

  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "category-tab";
    button.classList.toggle("is-active", category.id === state.category);
    button.innerHTML = `<span>${category.title}</span><small>${category.count}</small>`;
    button.addEventListener("click", () => {
      state.category = category.id;
      renderOverview();
    });
    nodes.tabs.appendChild(button);
  });
}

function visibleGroups() {
  const query = state.query.trim().toLowerCase();
  return marketGroups
    .map((group) => {
      const items = group.items
        .map((item) => allMarkets.find((candidate) => candidate.symbol === item.symbol))
        .filter((item) => {
          if (state.category === "favorites" && !state.favorites.has(item.symbol)) return false;
          if (!["all", "favorites", group.id].includes(state.category)) return false;
          const haystack = `${item.name} ${item.subname || ""} ${item.symbol} ${item.typeLabel} ${group.title}`.toLowerCase();
          return !query || haystack.includes(query);
        });
      return { ...group, items };
    })
    .filter((group) => group.items.length);
}

function renderOverview() {
  if (state.miniObserver) state.miniObserver.disconnect();
  renderCategoryTabs();
  nodes.overviewGroups.replaceChildren();

  const groups = visibleGroups();
  if (!groups.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = '<i data-lucide="search-x"></i><strong>該当する市場がありません</strong>';
    nodes.overviewGroups.appendChild(empty);
    refreshIcons();
    return;
  }

  const items = groups.flatMap((group) => group.items).sort((a, b) => {
    const aRank = priorityRank.get(a.symbol) ?? Number.MAX_SAFE_INTEGER;
    const bRank = priorityRank.get(b.symbol) ?? Number.MAX_SAFE_INTEGER;
    return aRank - bRank;
  });
  const activeGroup = marketGroups.find((group) => group.id === state.category);
  const sectionTitle = state.query
    ? "検索結果"
    : state.category === "favorites"
      ? "お気に入り"
      : activeGroup?.title || "全市場";

  const section = document.createElement("section");
  section.className = "chart-group chart-group-flat";

  const header = document.createElement("div");
  header.className = "group-heading";
  header.innerHTML = `<div><span class="group-accent"></span><h2>${sectionTitle}</h2></div><span>${items.length} 指標</span>`;

  const grid = document.createElement("div");
  grid.className = "mini-chart-grid";
  items.forEach((item) => grid.appendChild(createMiniCard(item)));

  section.append(header, grid);
  nodes.overviewGroups.appendChild(section);

  setupMiniCharts();
  refreshIcons();
}

function createMiniCard(item) {
  const article = document.createElement("article");
  article.className = "market-chart-card";
  article.dataset.symbol = item.symbol;
  const layout = priorityLayout.get(item.symbol);
  if (layout) {
    article.classList.add("is-priority");
    if (layout[0] === 1) article.classList.add("is-primary-row");
    article.style.setProperty("--priority-row", layout[0]);
    article.style.setProperty("--priority-column", layout[1]);
  }

  const header = document.createElement("header");
  const heading = document.createElement("div");
  heading.className = "card-heading";
  heading.innerHTML = `
    <span class="card-type">${item.typeLabel}</span>
    <h3>${item.name}</h3>
    ${item.subname ? `<p>${item.subname}</p>` : `<p>${item.symbol}</p>`}
  `;

  const favorite = document.createElement("button");
  favorite.type = "button";
  favorite.className = "card-favorite";
  favorite.classList.toggle("is-favorite", state.favorites.has(item.symbol));
  favorite.title = "お気に入り";
  favorite.setAttribute("aria-label", `${item.name}をお気に入りに登録`);
  favorite.innerHTML = '<i data-lucide="star"></i>';
  favorite.addEventListener("click", () => toggleFavorite(item.symbol));
  header.append(heading, favorite);

  const chart = document.createElement("div");
  chart.className = "mini-chart-host";
  chart.dataset.symbol = item.symbol;
  chart.tabIndex = 0;
  chart.setAttribute("role", "button");
  chart.setAttribute("aria-label", `${item.name}の詳細チャートを表示`);
  chart.addEventListener("click", () => selectMarket(item.symbol));
  chart.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    selectMarket(item.symbol);
  });
  if (item.externalOnly) {
    chart.classList.add("is-restricted");
    chart.innerHTML = '<i data-lucide="chart-no-axes-combined"></i><span>外部チャート表示制限</span>';
  } else {
    chart.innerHTML = '<span class="mini-loader"></span>';
  }

  article.append(header, chart);
  return article;
}

function setupMiniCharts() {
  const targets = [...nodes.overviewGroups.querySelectorAll(".mini-chart-host:not(.is-restricted)")];
  if (!("IntersectionObserver" in window)) {
    targets.forEach(mountMiniChart);
    return;
  }

  state.miniObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        mountMiniChart(entry.target);
        state.miniObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "80px 0px" }
  );
  targets.forEach((target) => state.miniObserver.observe(target));
}

function mountMiniChart(target) {
  if (target.classList.contains("is-mounted")) return;
  target.classList.add("is-mounted");
  const widget = document.createElement("tv-mini-chart");
  widget.setAttribute("symbol", target.dataset.symbol);
  widget.setAttribute("theme", widgetTheme());
  widget.setAttribute("locale", "ja");
  widget.setAttribute("date-range", "5D");
  widget.setAttribute("hide-market-status", "");
  widget.innerHTML = '<span class="mini-loader"></span>';
  target.replaceChildren(widget);
}

function selectMarket(symbol) {
  const next = allMarkets.find((item) => item.symbol === symbol);
  if (!next) return;
  state.active = next;
  setView("detail");
}

function renderDetail() {
  const item = state.active;
  nodes.activeRegion.textContent = item.region;
  nodes.activeType.textContent = item.typeLabel;
  nodes.activeName.textContent = item.name;
  nodes.activeSymbol.textContent = item.symbol;
  nodes.source.textContent = item.source;
  nodes.delay.textContent = item.delay;
  nodes.tradingView.href = tradingViewUrl(item.symbol);
  updateFavoriteButton();
  renderRelated();
  renderChart();
}

function renderChart() {
  state.chartGeneration += 1;
  const generation = state.chartGeneration;
  const item = state.active;

  if (item.externalOnly) {
    renderChartNotice(
      `${item.name}は外部表示できません`,
      "この指標はTradingView公式サイト内でのみ利用できます。",
      tradingViewUrl(item.symbol)
    );
    return;
  }

  mountWidget(
    nodes.chart,
    "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
    {
      autosize: true,
      symbol: item.symbol,
      interval: state.interval,
      timezone: "Asia/Tokyo",
      theme: widgetTheme(),
      style: "1",
      locale: "ja",
      backgroundColor: state.theme === "dark" ? "#111820" : "#ffffff",
      gridColor: state.theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(17,24,32,0.08)",
      allow_symbol_change: false,
      hide_side_toolbar: false,
      withdateranges: true,
      details: false,
      calendar: false,
      save_image: true,
      support_host: "https://www.tradingview.com"
    }
  );

  window.setTimeout(() => {
    if (generation !== state.chartGeneration || nodes.chart.querySelector("iframe")) return;
    renderChartNotice(
      "チャートを読み込めません",
      "通信状態または外部表示制限を確認してください。",
      tradingViewUrl(item.symbol)
    );
  }, 12000);
}

function renderChartNotice(titleText, bodyText, href) {
  nodes.chart.replaceChildren();
  const notice = document.createElement("div");
  notice.className = "chart-notice";
  notice.innerHTML = `
    <span class="notice-icon"><i data-lucide="chart-no-axes-combined"></i></span>
    <h3>${titleText}</h3>
    <p>${bodyText}</p>
    <a href="${href}" target="_blank" rel="noopener noreferrer">
      <span>TradingViewで確認</span><i data-lucide="external-link"></i>
    </a>
  `;
  nodes.chart.appendChild(notice);
  refreshIcons();
}

function renderRelated() {
  const related = allMarkets.filter(
    (item) => item.groupId === state.active.groupId && item.symbol !== state.active.symbol
  );
  nodes.relatedCount.textContent = `${related.length} 指標`;
  nodes.related.replaceChildren();
  related.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "related-market";
    button.innerHTML = `
      <span><strong>${item.name}</strong><small>${item.symbol}</small></span>
      <i data-lucide="chevron-right"></i>
    `;
    button.addEventListener("click", () => selectMarket(item.symbol));
    nodes.related.appendChild(button);
  });
  refreshIcons();
}

function toggleFavorite(symbol) {
  if (state.favorites.has(symbol)) state.favorites.delete(symbol);
  else state.favorites.add(symbol);
  localStorage.setItem("marketFavorites", JSON.stringify([...state.favorites]));
  if (state.category === "favorites" && !state.favorites.size) state.category = "all";
  updateFavoriteButton();
  if (state.view === "overview") renderOverview();
}

function updateFavoriteButton() {
  const active = state.favorites.has(state.active.symbol);
  nodes.favorite.classList.toggle("is-favorite", active);
  nodes.favorite.setAttribute("aria-pressed", String(active));
}

function timeParts(timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(new Date());
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function isSessionOpen(session) {
  const parts = timeParts(session.timeZone);
  if (parts.weekday === "Sat" || parts.weekday === "Sun") return false;
  const minute = Number(parts.hour) * 60 + Number(parts.minute);
  return minute >= session.open && minute < session.close;
}

function renderSessions() {
  const sessions = [
    { name: "東京", timeZone: "Asia/Tokyo", open: 9 * 60, close: 15 * 60 + 30 },
    { name: "ロンドン", timeZone: "Europe/London", open: 8 * 60, close: 16 * 60 + 30 },
    { name: "ニューヨーク", timeZone: "America/New_York", open: 9 * 60 + 30, close: 16 * 60 }
  ];
  nodes.sessions.replaceChildren();
  sessions.forEach((session) => {
    const open = isSessionOpen(session);
    const parts = timeParts(session.timeZone);
    const item = document.createElement("span");
    item.className = "session-item";
    item.innerHTML = `
      <span class="session-indicator ${open ? "is-open" : ""}"></span>
      <strong>${session.name}</strong>
      <small>${open ? "取引中" : "終了"} ${parts.hour}:${parts.minute}</small>
    `;
    nodes.sessions.appendChild(item);
  });
}

function updateClock() {
  const now = new Date();
  const text = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(now);
  nodes.clock.textContent = `${text} JST`;
  nodes.clock.dateTime = now.toISOString();
  nodes.lastRefresh.textContent = `更新 ${text.slice(0, 5)}`;
}

function updateNetworkState() {
  const online = navigator.onLine;
  nodes.networkStatus.classList.toggle("is-offline", !online);
  nodes.networkText.textContent = online ? "接続中" : "オフライン";
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  nodes.themeToggle.innerHTML =
    state.theme === "dark" ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
  refreshIcons();
}

function toggleTheme() {
  state.theme = state.theme === "dark" ? "light" : "dark";
  localStorage.setItem("marketTheme", state.theme);
  applyTheme();
  if (state.view === "overview") renderOverview();
  else renderChart();
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

nodes.viewSwitch.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-view]");
  if (button) setView(button.dataset.view);
});
nodes.brandHome.addEventListener("click", () => setView("overview"));
nodes.back.addEventListener("click", () => setView("overview"));
nodes.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderOverview();
});
nodes.intervals.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-interval]");
  if (!button) return;
  state.interval = button.dataset.interval;
  nodes.intervals.querySelectorAll("button").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });
  renderChart();
});
nodes.favorite.addEventListener("click", () => toggleFavorite(state.active.symbol));
nodes.themeToggle.addEventListener("click", toggleTheme);
window.addEventListener("online", updateNetworkState);
window.addEventListener("offline", updateNetworkState);

window.addEventListener("load", () => {
  refreshIcons();
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js?v=51", { updateViaCache: "none" })
      .then((registration) => registration.update())
      .catch(() => {});
  }
});

applyTheme();
renderSessions();
renderOverview();
updateClock();
updateNetworkState();
window.setInterval(updateClock, 1000);
window.setInterval(renderSessions, 60000);
