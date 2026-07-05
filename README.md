# 世界マーケットボード

TradingViewウィジェットを使い、株価指数、為替、商品、暗号資産を一覧表示する静的Webサイトです。

## プロジェクト構成

このプロジェクトはReact、Vite、Next.jsなどのフレームワークを使用していません。`index.html`からCSSとJavaScriptを直接読み込む、静的HTML/CSS/JavaScriptサイトです。

- `index.html`: 画面のHTML
- `styles.css`: レイアウトと配色
- `app.js`: 銘柄設定、画面操作、TradingViewウィジェット生成
- `sw.js`: Service Workerと静的ファイルのキャッシュ
- `manifest.webmanifest`: PWA設定
- `app-icon.svg`: サイトアイコン
- `scripts/update-nikkei-contribution.py`: 日経平均寄与度JSONの試験生成
- `data/nikkei-contribution-*.sample.csv`: 架空値を使った試験入力
- `data/nikkei-contribution.json`: 試験スクリプトの生成結果

`package.json`、依存パッケージ、コンパイル処理はありません。

## 本番公開設定

| 項目 | 設定値 |
| --- | --- |
| 公開先 | Vercel |
| 本番URL | `https://global-market-board.vercel.app/` |
| Framework Preset | `Other` |
| Root Directory | リポジトリ直下 |
| Build Command | なし（空欄） |
| Install Command | なし（空欄） |
| Output Directory | `.`（リポジトリ直下） |
| 環境変数 | なし |

TradingViewとLucideはブラウザから外部CDNへ直接接続します。APIキーや`.env`ファイルは使用していません。

## GitHubとVercelの運用方針

- GitHubリポジトリ名は`global-market-board`です。
- GitHubはコードの保管、変更履歴、Vercelへのデプロイ元として使用します。
- GitHubリポジトリはPrivateで運用します。
- VercelのGit連携がPrivateリポジトリへアクセスできる状態を維持します。
- VercelはGitHubの本番ブランチへのpushを検知して自動デプロイします。
- 公開先はVercelに一本化し、GitHub PagesとNetlifyは使用しません。
- 通常運用ではVercel CLIから直接デプロイせず、GitHub経由の自動デプロイを使用します。

## 今後の更新手順

### 1. 修正

ローカルのプロジェクトフォルダでHTML、CSS、JavaScript、画像などを修正します。

次の情報をコードへ直接書かないでください。

- APIキー、アクセストークン、パスワード、個人情報
- `C:\Users\...`などのローカル絶対パス
- `file://`で始まるローカルURL

CSS、JavaScript、画像などのサイト内ファイルは、引き続き相対パスで参照します。

### 2. ローカル確認

ビルドは不要です。Service Workerと外部ウィジェットを正しく確認するため、ファイルを直接開かずHTTPサーバーを使用します。

```powershell
python -m http.server 5175 --bind 127.0.0.1
```

ブラウザで`http://127.0.0.1:5175/`を開き、次を確認します。

- 32枚のマーケットカードが表示される
- TradingViewの価格、騰落率、チャートが表示される
- ダーク／ライトテーマの文字が読める
- PCとスマートフォンのレイアウトが崩れていない
- ブラウザのコンソールにJavaScriptエラーがない

### 3. GitHubへcommit／push

変更内容を確認してから、変更したファイルだけをcommitします。

```powershell
git status
git diff
git add <変更したファイル>
git commit -m "<変更内容を表すメッセージ>"
git push origin main
```

本番ブランチ名が`main`以外の場合は、実際のブランチ名へ置き換えます。APIキーやローカル設定ファイルがステージされていないことを、commit前に必ず確認します。

### 4. Vercel自動デプロイ

GitHubへのpush後、Vercel Dashboardで対象Deploymentが`Ready`になるまで待ちます。失敗した場合はVercelのBuild Logsを確認し、成功するまで本番確認へ進みません。

### 5. 本番確認

`https://global-market-board.vercel.app/`を開き、次を確認します。

- HTTPSでページが表示されること
- 32枚のマーケットカードが表示されること
- TradingViewの価格と騰落率が表示されること
- ダーク／ライトテーマの文字が読めること
- ブラウザのコンソールにJavaScriptエラーがないこと
- 強制再読み込み後も最新のCSSとJavaScriptが反映されること

相場データはTradingViewウィジェット側から配信されます。銘柄や地域により遅延、取引時間外表示、提供制限が発生する場合があります。

更新作業の完了報告には、変更内容の要約、ローカル確認結果、本番確認結果、推奨commit messageを含めます。

## 日経平均寄与度 自動更新案

### 算式と基礎データ

日経平均株価の公式算式は、各構成銘柄の株価に株価換算係数（PAF）を掛け、その合計を除数で割る方式です。終値ベースの1日寄与度は、PAFと除数が2営業日の間で変わらない場合、概ね次の式で試算できます。

```text
寄与度（円） = (当日終値 - 前日終値) × 株価換算係数 ÷ 除数
```

基礎データの確認先は、日本経済新聞社の「日経平均プロフィル」です。

- 構成銘柄: 日経平均プロフィルの「銘柄一覧」
- 株価換算係数: 同ページの「株価換算係数一覧（CSV）」
- 除数: 日経平均プロフィルの指数概要に掲載される当日値
- 算式: 「日経平均株価 算出要領」およびFAQ

公式ページ: <https://indexes.nikkei.co.jp/nkave/index/profile?idx=nk225>

日経平均、構成銘柄、株価換算係数、除数などの継続的な業務利用・第三者提供には、日本経済新聞社とのライセンス確認が必要です。そのため、このリポジトリには公式CSVの複製を保存していません。

### 終値データ候補の調査結果

| 候補 | 終値取得 | 公開サイトでの利用判断 |
| --- | --- | --- |
| J-Quants API | 日次四本値を取得可能 | 個人の私的利用向けで、第三者配信やデータ利用アプリの提供は禁止。公開サイトには別途問い合わせが必要 |
| JPX 15分遅延株価情報API | 東証銘柄を広く取得可能 | 有料契約と外部配信に関する許諾が必要。確実だが個人サイト向けの低コストAPIではない |
| marketstack | 無料枠にEOD、低価格プランにCommercial Use表記あり | 東証データの外部表示・派生値公開まで許可されるか、契約前に書面確認が必要 |
| Twelve Data | EOD APIあり | 個人プランは非商用・内部利用のみ。東証データや外部配信には事業者プランと追加承認が必要 |
| 証券会社画面、Yahoo Finance等のスクレイピング | 技術的には取得可能な場合がある | 利用規約、安定性、再配信権の問題があるため採用しない |

現時点では、無料データを無断取得して公開する構成は採用しません。本番化する場合は、株価の外部表示または不可逆な派生データの公開を明示的に許可するデータ契約を先に確定します。

### 試験スクリプト

`scripts/update-nikkei-contribution.py`は、次のCSVを入力として寄与度JSONを生成します。Python標準ライブラリのみを使用し、APIキーは必要ありません。

```text
構成銘柄CSV: code,name,paf
終値CSV: date,code,close
```

付属CSVは主要25銘柄を想定した処理確認用です。終値、PAF、除数はすべて架空・仮設定であり、実際の相場や公式データではありません。

```powershell
python scripts/update-nikkei-contribution.py
```

実行すると`data/nikkei-contribution.json`を生成します。入力検証と計算がすべて成功した後、一時ファイルを同じディレクトリ内で置換するため、取得失敗や不正データで既存JSONを途中状態に書き換えません。

許諾済みデータを使用する場合の入力例:

```powershell
python scripts/update-nikkei-contribution.py `
  --constituents path/to/licensed-constituents.csv `
  --prices path/to/licensed-closes.csv `
  --divisor <許諾済みの当日除数> `
  --source-label <データ提供元> `
  --data-status licensed
```

本番の自動更新は、データ契約確定後に次の流れを想定しています。

1. GitHub Actionsを平日引け後に起動する
2. APIキーはGitHub Actions Secretsから読み込む
3. 許諾済みAPIから当日・前営業日の終値を取得する
4. 最新の構成銘柄、PAF、除数と日付整合性を検証する
5. 225銘柄がそろった場合だけJSONを原子的に更新する
6. JSON変更をcommitし、Vercelへ自動デプロイする

許諾済みの入力CSVはリポジトリ外で管理するか、`*.licensed.csv`という名前にしてGitの追跡対象から除外してください。

## 注意点

- 現在のJSONは試験データであり、フロントエンドには接続していません。
- 主要25銘柄だけの合計は、日経平均全体の前日比と一致しません。
- PAFや除数が銘柄入れ替え、株式分割・併合などで変わる日は、単純な終値差の式だけでは正しく計算できません。
- 指数算出では終値ではなく特別気配、連続約定気配、臨時気配、基準価格などが採用される場合があります。
- 株価の調整済み・非調整の区別を混在させないでください。PAFを使う試算では、原則として非調整の取引所終値を用います。
- データ提供元の障害、休場、欠損、銘柄コード変更を検知した場合は更新を中止し、既存JSONを維持します。
- 公開前に、日本経済新聞社の指数ライセンスと株価提供元の外部表示・派生データ利用条件を確認してください。
