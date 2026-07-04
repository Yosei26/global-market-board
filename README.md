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
