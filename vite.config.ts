import { readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Product/post detail pages are only linked from page 1 of the (client-side)
// paginated shop/blog lists, so link-crawling alone would miss most of them.
// List every slug explicitly so every product/post gets its own static page
// in both locales, regardless of which pagination page it lives on.
function slugsFrom(dir: string) {
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''))
}

const productSlugs = slugsFrom('content/vi/products')
const postSlugs = slugsFrom('content/vi/posts')

const detailPaths = [
  ...productSlugs.flatMap((slug) => [
    `/san-pham/${slug}`,
    `/en/san-pham/${slug}`,
  ]),
  ...postSlugs.flatMap((slug) => [`/tin-tuc/${slug}`, `/en/tin-tuc/${slug}`]),
]

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoStaticPathsDiscovery: true,
      },
      pages: detailPaths.map((path) => ({ path })),
    }),
    viteReact(),
  ],
  server: { allowedHosts: true },
})

export default config
