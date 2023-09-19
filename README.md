# ryosuke-horie Notion Tech Blog
TechBlog by ryosuke-horie

## 概要
このTechBlogは、日々の学習の振り返りや受賞内容、QiitaやZennに投稿した記事などを共有するための場所です。
私のソフトウェアエンジニアとしてのポートフォリオの一部として機能し、技術コミュニティと共有することで、成長と情報の共有を促進します。

## 特徴とハイライト
- *Markdownファイルの利用:* このTechBlogは、Markdownファイルを活用してコンテンツを管理し、編集します。これにより、シンプルで柔軟なコンテンツ管理が実現されます。
- *Notion APIの活用:* 以前のTechBlog（microCMS）からの変更点として、Notion APIを利用した形式にアップグレードしました。これにより、記事の管理がより効率的に行えるようになりました。

## インストールと使用方法
1. リポジトリをクローンします。

    ```bash
    Copy code
    git clone https://github.com/ryosuke-horie/tech-blog-notion-cms.git
    ```

2. 依存関係をインストールします。
    ```bash
    Copy code
    npm install
    ```

3. 環境変数を設定します。
    ```
    NOTION_TOKEN: Notionのアクセストークンを設定します。
    NOTION_DATABASE_ID: NotionのデータベースIDを設定します。
    ```

4. アプリケーションを実行します。

## デプロイ
このTechBlogはVercelのホビープランを使用してデプロイされており、以下のURLでアクセスできます：https://ryo-tech-blog.vercel.app

## 今後の計画
今後の計画としては、Notion記事以外にも、ZennやQiitaに投稿した記事など、さまざまなコンテンツをこのTechBlogに掲載する予定です。お楽しみに！