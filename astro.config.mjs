// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import decap from 'astro-decap';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://lehongphat.com', // Đã cập nhật tên miền của bạn
  integrations: [
    mdx(), 
    sitemap(), 
    decap({
      cmsConfig: {
        backend: {
          name: 'github',
          repo: 'LeHongPhat/lehongphat.com',
          branch: 'main',
          base_url: 'https://decap-proxy-lehongphat.lehongphat2009.workers.dev', // Đã sửa thành URL Worker
          auth_endpoint: '/auth', // Đã sửa thành endpoint của proxy
        },
        media_folder: 'public/images',
        public_folder: '/images',
        collections: [
          {
            label: 'Bài viết Blog',
            name: 'blog',
            folder: 'src/content/blog',
            create: true,
            slug: '{{year}}-{{month}}-{{day}}-{{slug}}',
            fields: [
              { label: 'Tiêu đề', name: 'title', widget: 'string' },
              { label: 'Mô tả', name: 'description', widget: 'text' },
              { label: 'Ngày đăng', name: 'pubDate', widget: 'datetime' },
              { label: 'Ngày cập nhật', name: 'updatedDate', widget: 'datetime', required: false },
              { label: 'Ảnh đại diện', name: 'heroImage', widget: 'image', required: false },
              { label: 'Nội dung', name: 'body', widget: 'markdown' },
            ],
          },
        ],
      },
      // Đã xóa 2 dòng injectOAuthRoute và getEnvObjectFromRequestContext
    }),
  ],
  adapter: cloudflare(),
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Atkinson',
      cssVariable: '--font-atkinson',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/assets/fonts/atkinson-regular.woff'],
            weight: 400,
            style: 'normal',
            display: 'swap',
          },
          {
            src: ['./src/assets/fonts/atkinson-bold.woff'],
            weight: 700,
            style: 'normal',
            display: 'swap',
          },
        ],
      },
    },
  ],
});