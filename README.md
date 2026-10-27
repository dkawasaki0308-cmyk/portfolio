# portfolio

個人のポートフォリオサイトです。[Astro](https://astro.build/) で作り、GitHub Pages で公開しています。

https://dkawasaki0308-cmyk.github.io/portfolio/

## ローカルで動かす

Node.js 22.22 以上が必要です。

```sh
npm install
npm run dev      # http://localhost:4321/portfolio/ で確認
npm run check    # 型チェック
npm run build    # dist/ に出力
npm run preview  # ビルド結果を確認
```

## 内容を書き換える

| 変えたいもの | ファイル |
|---|---|
| 名前・所属・自己紹介・リンク・各セクションの項目 | `src/data/profile.ts` |
| ブログ記事 | `src/content/posts/*.md` |
| 色・フォントなどの見た目 | `public/styles.css` |
| ヘッダー下のイラスト | `public/garden.js` |

### プロフィール・実績

`src/data/profile.ts` の文字列は、日英で書き分けるときは `{ ja: '…', en: '…' }`、共通なら `'…'` と書きます。
日本語ページ（`/`）と英語ページ（`/en/`）は、どちらもこのファイルから作られます。

セクションの項目は `entries` に、古くなって折りたたみたい項目は `archive` に入れます。

```ts
{
  date: '2026.08',
  title: { ja: '○○ ハッカソン 最優秀賞', en: 'Grand Prize, ○○ Hackathon' },
  href: 'https://example.com/',  // 任意
  note: { ja: '30 チーム中 1 位', en: '1st of 30 teams' },  // 任意
  meta: '★1.2k',  // 任意。右端に小さく出る
}
```

### ブログ記事

`src/content/posts/` に Markdown ファイルを置くと、`/blog/<ファイル名>/` で公開されます。

```md
---
title: 記事のタイトル
date: 2026-10-01
description: 一覧や SNS で表示される説明（任意）
lang: ja       # ja または en（省略時は ja）
draft: true    # 下書きのときだけ付ける
---

本文
```

## 公開の仕組み

- `main` に push されると、GitHub Actions（`.github/workflows/deploy.yml`）がビルドして GitHub Pages に公開します
- リポジトリの Settings → Pages → Source は「GitHub Actions」にしておきます
- 普段の作業は `develop` に PR でマージし、公開するときに `develop` → `main` のリリース PR を作ります（詳しくは [CLAUDE.md](CLAUDE.md)）


