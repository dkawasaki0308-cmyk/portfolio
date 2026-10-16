/** base（/portfolio）を付けたサイト内 URL を返す */
export const url = (path = '/'): string => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
};

/** 外部リンクかどうか */
export const isExternal = (href: string): boolean => /^https?:\/\//.test(href);
