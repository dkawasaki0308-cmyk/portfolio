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
            title: { ja: 'KnowShare（個人開発）', en: 'KnowShare (personal project)' },
            href: 'https://knowshare-ten.vercel.app/',
            repo: 'https://github.com/dkawasaki0308-cmyk/knowshare',
            note: {
              ja: 'チーム内の知見共有サービス。Next.js / TypeScript / Prisma / PostgreSQL、Vercel で公開中',
              en: 'A knowledge-sharing service for teams. Next.js / TypeScript / Prisma / PostgreSQL, live on Vercel',
            },
          },
          {
            title: { ja: 'Odoriba（Alpha+ 採択・開発中）', en: 'Odoriba (Alpha+, in development)' },
            href: 'https://github.com/Greek-Academy/Odoriba',
            note: {
              ja: 'LiDAR で搬入経路を判定する引越し支援アプリ',
              en: 'A moving-support app that checks furniture delivery routes with LiDAR',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'awards',
    title: { ja: '受賞・選出', en: 'Awards' },
    groups: [
      {
        entries: [
          {
            date: '2026.09',
            title: { ja: 'NTT ドコモ 5 日間ハッカソン 優勝', en: '1st place, NTT DOCOMO 5-day Hackathon' },
            note: {
              ja: '参加 36 人、テーマ「多くの人に届くサービス」',
              en: '36 participants; theme: "A service that reaches many people"',
            },
          },
          {
            date: '2026.08',
            title: { ja: 'ニフティ ハッカソン型インターン 優勝', en: '1st place, NIFTY Hackathon Internship' },
            note: { ja: '参加 42 人', en: '42 participants' },
          },
          {
            title: {
              ja: '学内チーム制作大会「デジタルワークス」上位 16 チームに選出',
              en: 'Top 16 teams, "Digital Works" campus team production contest',
            },
            note: {
              ja: '作品「Knightry」。約 100 チーム・約 700 人が参加',
              en: 'Project "Knightry"; about 100 teams and 700 participants',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'activities',
    title: { ja: '活動', en: 'Activities' },
    groups: [
      {
        heading: { ja: 'プログラム', en: 'Programs' },
        entries: [
          {
            title: { ja: 'Alpha+ にクリエータとして採択', en: 'Selected as a creator for Alpha+' },
            note: {
              ja: '経済産業省 AKATSUKI プロジェクトの枠組みのプログラム',
              en: "A program under METI's AKATSUKI Project",
            },
          },
        ],
      },
      {
        heading: { ja: 'インターン', en: 'Internships' },
        entries: [
          { title: { ja: 'ニフティ', en: 'NIFTY' } },
          {
            title: { ja: 'アスクル', en: 'ASKUL' },
            note: { ja: 'DB 設計・API 設計を担当', en: 'Database and API design' },
          },
          { title: { ja: 'NTT ドコモ', en: 'NTT DOCOMO' } },
          { title: { ja: 'NEC ネッツエスアイ', en: 'NEC Networks & System Integration' } },
        ],
      },
      {
        heading: { ja: 'コミュニティ', en: 'Community' },
        entries: [
          {
            title: { ja: 'GDG Kwansai 運営スタッフ', en: 'Organizing staff, GDG Kwansai' },
            note: { ja: '約 200〜260 人規模のイベントを担当', en: 'Ran events with about 200–260 attendees' },
          },
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
