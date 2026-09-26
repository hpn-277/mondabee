import { parseFrontmatter } from '#/lib/frontmatter'
import type { Locale } from '#/lib/i18n'

export type ProductFrontmatter = {
  title: string
  slug: string
  description: string
  original_url: string
  category: Array<string>
  price: string
  sale_price: string
  images: Array<string>
}

export type PostFrontmatter = {
  title: string
  slug: string
  description: string
  original_url: string
  date: string
  category: Array<string>
  images: Array<string>
}

export type PageFrontmatter = {
  title: string
  slug: string
  description: string
  original_url: string
  images: Array<string>
}

export type ContentItem<Frontmatter> = {
  data: Frontmatter
  content: string
}

const viProductFiles = import.meta.glob<string>('../../content/vi/products/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const enProductFiles = import.meta.glob<string>('../../content/en/products/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const viPostFiles = import.meta.glob<string>('../../content/vi/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const enPostFiles = import.meta.glob<string>('../../content/en/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const viPageFiles = import.meta.glob<string>('../../content/vi/pages/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const enPageFiles = import.meta.glob<string>('../../content/en/pages/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function bySlug<Frontmatter>(files: Record<string, string>) {
  const map = new Map<string, ContentItem<Frontmatter>>()
  for (const raw of Object.values(files)) {
    const { data, content } = parseFrontmatter(raw)
    map.set(data.slug as string, { data: data as Frontmatter, content })
  }
  return map
}

const productsByLocale: Record<Locale, Map<string, ContentItem<ProductFrontmatter>>> = {
  vi: bySlug<ProductFrontmatter>(viProductFiles),
  en: bySlug<ProductFrontmatter>(enProductFiles),
}

const postsByLocale: Record<Locale, Map<string, ContentItem<PostFrontmatter>>> = {
  vi: bySlug<PostFrontmatter>(viPostFiles),
  en: bySlug<PostFrontmatter>(enPostFiles),
}

const pagesByLocale: Record<Locale, Map<string, ContentItem<PageFrontmatter>>> = {
  vi: bySlug<PageFrontmatter>(viPageFiles),
  en: bySlug<PageFrontmatter>(enPageFiles),
}

// EN content falls back to the VI source whenever a translation hasn't been
// added yet, so a missing file never breaks a page — it's just untranslated.
export function getProduct(locale: Locale, slug: string) {
  return productsByLocale[locale].get(slug) ?? productsByLocale.vi.get(slug)
}

export function getProducts(locale: Locale, slugs: Array<string>) {
  return slugs
    .map((slug) => getProduct(locale, slug))
    .filter((p): p is ContentItem<ProductFrontmatter> => p !== undefined)
}

export function getAllProducts(locale: Locale) {
  return [...productsByLocale.vi.keys()].map(
    (slug) => getProduct(locale, slug)!,
  )
}

export function getPost(locale: Locale, slug: string) {
  return postsByLocale[locale].get(slug) ?? postsByLocale.vi.get(slug)
}

export function getPosts(locale: Locale, slugs: Array<string>) {
  return slugs
    .map((slug) => getPost(locale, slug))
    .filter((p): p is ContentItem<PostFrontmatter> => p !== undefined)
}

export function getAllPosts(locale: Locale) {
  return [...postsByLocale.vi.keys()]
    .map((slug) => getPost(locale, slug)!)
    .sort((a, b) => b.data.date.localeCompare(a.data.date))
}

export function getPage(locale: Locale, slug: string) {
  return pagesByLocale[locale].get(slug) ?? pagesByLocale.vi.get(slug)
}
