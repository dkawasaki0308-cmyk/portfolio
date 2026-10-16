// サイトに表示する内容はすべてこのファイルで管理します。
// 文字列は `{ ja, en }` で日英を書き分けるか、共通なら普通の文字列で書けます。

export type Lang = 'ja' | 'en';
export type Text = string | { ja: string; en: string };

export const t = (text: Text | undefined, lang: Lang): string =>
  text === undefined ? '' : typeof text === 'string' ? text : text[lang];

export const profile = {
  name: { ja: '川崎 太郎', en: 'Taro Kawasaki' } as Text,
  handle: 'Kawasaki',
  tagline: 'Flowers, birds & little thoughts.',
  bio: {
    ja: 'ここに自己紹介文が入ります。興味のある分野や、最近取り組んでいることを 2〜3 文で書いてください。',
    en: 'A short self-introduction goes here. Write two or three sentences about your interests and what you are working on.',
  } as Text,
};

export const ui = {
  skip: { ja: '本文へ', en: 'Skip to content' },
  top: { ja: '↑ トップへ', en: '↑ Top' },
} satisfies Record<string, Text>;
