# CLAUDE.md

個人のポートフォリオサイト（Astro / GitHub Pages）。
開発ルールはチーム開発のルール（team-production の `docs/`）をもとに、1 人開発向けに調整したもの。

## 開発フロー

1. Issue を立てる（`feat` / `fix` / `change` は必須。テンプレートを使い、タイトルに `[feat]` などの接頭辞は付けない）
2. 最新の `develop` から作業ブランチを切る
3. 作業ブランチでコミットを積む
4. `develop` 向けに PR を作る（本文に `Closes #<Issue番号>`）
5. 自分で確認してマージする（承認は不要）
6. 公開するときは `develop` → `main` のリリース PR を作る。`main` へのマージで GitHub Pages にデプロイされる

- `main` / `develop` に直接 push しない
- `develop` の取り込みは `merge` で行う（`rebase` や force push はしない）
- マージ方法は Merge commit のみ

## ブランチ

```
<type>/<Issue番号>-<説明>
```

- 例: `feat/5-top-page`、`chore/7-github-pages-deploy`、`docs/update-readme`（Issue なし）
- 英小文字・数字・ハイフンのみ。`<説明>` は英語 2〜4 単語
- 1 ブランチ = 1 目的。1 Issue = 1 PR、変更は 300 行程度までを目安にする

## コミット

```
<type>[(scope)]: <説明> [#Issue番号]

[本文（任意）]
```

| type | 用途 |
|---|---|
| `feat` | 新機能の追加 |
| `fix` | バグ修正 |
| `change` | 既存機能の仕様・見た目・動きの変更 |
| `refactor` | 動作を変えないコード整理（フォーマット修正を含む） |
| `docs` | ドキュメントのみの変更 |
| `test` | テストの追加・修正 |
| `chore` | 設定・ツール・依存関係・CI などの雑務 |

- `type` と `scope` は英語、`説明` と `本文` は日本語。説明は「〜を追加」のような体言止めで、1 行目は 50 文字程度まで
- Issue がある場合は 1 行目の末尾に `#Issue番号` を付ける
- 本文には「何を」ではなく「なぜ」を書く（コードを見ただけでは理由がわからないときだけ）
- 粒度は「そのコミットだけ取り消したら何が戻るか」を一言で言える単位。type が違う変更は別のコミットにする
- `.env`・API キーなどの秘密情報、個人情報、`node_modules` などの生成物はコミットしない（Public リポジトリ）

## PR

- タイトルはコミットメッセージと同じ形式（例: `feat: 日英のトップページを追加 #5`）
- 本文は [PR テンプレート](.github/pull_request_template.md) の見出しに沿って日本語で書く
- 画面の変更がある場合はスクリーンショットを貼る

## AI（Claude Code）を使うとき

- AI に `main` / `develop` で直接作業させない
- Issue の作成、PR の作成、マージは、人間が内容を確認してから実行する
- AI が関わったコミットには `Co-Authored-By:` 行を付けたままにする
