// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dkawasaki0308-cmyk.github.io',
  base: '/portfolio',
  trailingSlash: 'ignore',
  markdown: {
    shikiConfig: {
      // 生成り色の背景になじむ明るいテーマ
      theme: 'github-light',
    },
  },
});
