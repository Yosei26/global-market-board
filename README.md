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
| Framework Preset | `Other`または未指定 |
| Root / Base Directory | リポジトリ直下 |
| Build Command | なし（空欄） |
| Install Command | なし（空欄） |
| Output / Publish Directory | `.`（リポジトリ直下） |
| 環境変数 | なし |

TradingViewとLucideはブラウザから外部CDNへ直接接続します。APIキーや`.env`ファイルは使用していません。

## Vercelへのデプロイ

1. このフォルダをGitHub、GitLab、またはBitbucketのリポジトリへ登録します。
2. Vercelで`Add New Project`を選び、リポジトリをImportします。
3. `Framework Preset`を`Other`にします。
4. `Build Command`と`Install Command`は空欄にします。
5. `Output Directory`は`.`のままにします。
6. 環境変数は登録せず、`Deploy`を実行します。

Vercel CLIを使用する場合は、プロジェクト直下で次を実行します。

```powershell
vercel --prod
```

`vercel.json`は不要です。

## Netlifyへのデプロイ

1. このフォルダをGitHub、GitLab、Bitbucket、またはAzure DevOpsのリポジトリへ登録します。
2. Netlifyで`Add new project`からリポジトリを選択します。
3. `Base directory`は空欄（リポジトリ直下）にします。
4. `Build command`は空欄にします。
5. `Publish directory`に`.`を指定します。
6. 環境変数は登録せず、デプロイを実行します。

Netlify CLIを使用する場合は、プロジェクト直下で次を実行します。

```powershell
netlify deploy --prod --dir .
```

`netlify.toml`は不要です。

## ローカル確認

ビルドは不要です。Service Workerと外部ウィジェットを正しく確認するため、ファイルを直接開かずHTTPサーバーを使用します。

```powershell
python -m http.server 5175 --bind 127.0.0.1
```

ブラウザで`http://127.0.0.1:5175/`を開きます。

## 公開後の確認

- HTTPSでページが表示されること
- 32枚のマーケットカードが表示されること
- TradingViewの価格と騰落率が表示されること
- ダーク／ライトテーマの文字が読めること
- ブラウザのコンソールにJavaScriptエラーがないこと

相場データはTradingViewウィジェット側から配信されます。銘柄や地域により遅延、取引時間外表示、提供制限が発生する場合があります。
