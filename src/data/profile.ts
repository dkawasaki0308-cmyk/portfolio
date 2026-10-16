// サイトに表示する内容はすべてこのファイルで管理します。
// 文字列は `{ ja, en }` で日英を書き分けるか、共通なら普通の文字列で書けます。

export type Lang = 'ja' | 'en';
export type Text = string | { ja: string; en: string };

export const t = (text: Text | undefined, lang: Lang): string =>
  text === undefined ? '' : typeof text === 'string' ? text : text[lang];

export interface Entry {
  date?: string;
  title: Text;
  href?: string;
  note?: Text;
  /** 右端に小さく表示する補足（例: ★1.2k） */
  meta?: string;
  /** タイトルのリンクとは別に、右端に出すリポジトリの URL */
  repo?: string;
}

export interface Group {
  heading?: Text;
  entries: Entry[];
  /** 折りたたみの中に入れる古い項目 */
  archive?: Entry[];
}

export interface SectionData {
  id: string;
  title: Text;
  groups: Group[];
}

export const profile = {
  name: { ja: '川﨑 大輝', en: 'Daiki Kawasaki' } as Text,
  nameAlt: { ja: 'Daiki Kawasaki', en: '川﨑 大輝' } as Text,
  handle: 'monokanke',
  tagline: 'Building the ground beneath the experience.',
  affiliation: {
    ja: '神戸電子専門学校 ITエキスパート学科（4年制）3年',
    en: '3rd year, IT Expert Course (4-year program), Kobe Institute of Computing - College of Computing',
  } as Text,
  bio: {
    ja: '業務やドメインを整理し、体験の土台となる仕組みを設計するのが好きです。バックエンドと DB 設計を軸に、画面まで作れるフルスタックエンジニアを目指しています。',
    en: "I love organizing complex domains and designing the systems that underpin great experiences. With backend and database design at my core, I'm working toward becoming a full-stack engineer who can build all the way to the UI.",
  } as Text,
  links: [
    { label: 'blog', href: '/blog/', internal: true },
    { label: 'github', href: 'https://github.com/dkawasaki0308-cmyk' },
    { label: 'x', href: 'https://x.com/kanke943736' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/%E5%A4%A7%E8%BC%9D-%E5%B7%9D%EF%A8%91-79871938b/' },
    { label: 'qiita', href: 'https://qiita.com/monokanke' },
    { label: 'zenn', href: 'https://zenn.dev/monokanke' },
  ],
  now: {
    ja: 'Web 系の技術を学びながら、バックエンド寄りのフルスタックエンジニアを目指しています',
    en: 'Studying web technologies on my way to becoming a backend-leaning full-stack engineer',
  } as Text,
  interests: {
    ja: 'バックエンド、DB 設計、API 設計、ドメインの整理',
    en: 'Backend, database design, API design, domain modeling',
  } as Text,
};

export const sections: SectionData[] = [
  {
    id: 'projects',
    title: { ja: 'プロジェクト', en: 'Projects' },
    groups: [
      {
        entries: [
          {
            date: '2026.08',
            title: 'Project A',
            href: 'https://github.com/',
            note: { ja: '○○ を△△するための Web アプリ。Astro / TypeScript', en: 'A web app for doing △△ with ○○. Astro / TypeScript' },
          },
          {
            date: '2026.03',
            title: 'Project B',
            href: 'https://github.com/',
            note: { ja: 'ハッカソンで作った ○○ ツール', en: 'A ○○ tool built at a hackathon' },
          },
        ],
        archive: [
          { date: '2025.09', title: 'Project C', note: { ja: '初めて作ったアプリ', en: 'My first app' } },
          { date: '2025.04', title: 'Project D' },
        ],
      },
    ],
  },
  {
    id: 'activities',
    title: { ja: '研究・活動', en: 'Research & Activities' },
    groups: [
      {
        heading: { ja: '発表', en: 'Presentations' },
        entries: [
          {
            date: '2026.09',
            title: { ja: '○○ を用いた △△ の検討', en: 'A study on △△ using ○○' },
            note: { ja: '○○学会 全国大会（ポスター）', en: '○○ Society Annual Conference (Poster)' },
          },
        ],
      },
      {
        heading: { ja: 'プログラム', en: 'Programs' },
        entries: [
          { date: '2026', title: { ja: '○○ 人材育成プログラム 採択', en: 'Selected for the ○○ Talent Program' } },
        ],
      },
    ],
  },
  {
    id: 'awards',
    title: { ja: '受賞', en: 'Awards' },
    groups: [
      {
        entries: [
          {
            date: '2026.07',
            title: { ja: '○○ ハッカソン 最優秀賞', en: 'Grand Prize, ○○ Hackathon' },
            note: { ja: '30 チーム中 1 位', en: '1st of 30 teams' },
          },
          { date: '2026.02', title: { ja: '○○ アイデアソン 企業賞', en: 'Sponsor Award, ○○ Ideathon' } },
        ],
        archive: [
          { date: '2025.11', title: { ja: '○○ コンテスト 入賞', en: 'Finalist, ○○ Contest' } },
        ],
      },
    ],
  },
  {
    id: 'oss',
    title: { ja: 'オープンソース', en: 'Open Source' },
    groups: [
      {
        entries: [
          { title: 'owner/repo #123 — Fix typo in docs', href: 'https://github.com/', meta: '★1.2k' },
          { title: 'owner/another #45 — Add option for ○○', href: 'https://github.com/', meta: '★320' },
        ],
      },
    ],
  },
  {
    id: 'community',
    title: { ja: 'コミュニティ', en: 'Community' },
    groups: [
      {
        entries: [
          { date: '2026–', title: { ja: '○○ 勉強会 運営', en: 'Organizer, ○○ Study Group' } },
          { date: '2025–', title: { ja: '○○ サークル 所属', en: 'Member, ○○ Club' } },
        ],
      },
    ],
  },
];

export const ui = {
  skip: { ja: '本文へ', en: 'Skip to content' },
  now: { ja: 'いま', en: 'Now' },
  interests: { ja: '興味', en: 'Interests' },
  blog: { ja: 'ブログ', en: 'Blog' },
  allPosts: { ja: 'すべての記事 →', en: 'All posts →' },
  noPosts: { ja: 'まだ記事はありません。', en: 'No posts yet.' },
  earlier: { ja: 'それ以前', en: 'Earlier' },
  top: { ja: '↑ トップへ', en: '↑ Top' },
  back: { ja: '← 記事一覧', en: '← All posts' },
} satisfies Record<string, Text>;
