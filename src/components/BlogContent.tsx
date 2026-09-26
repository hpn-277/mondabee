import { useState } from 'react'
import type { Locale } from '#/lib/i18n'
import { getAllPosts } from '#/lib/content'
import PostCard from './PostCard'
import Pagination from './Pagination'

const TITLE: Record<Locale, string> = { vi: 'Tin tức', en: 'News' }
const PAGE_SIZE = 12

export default function BlogContent({ locale }: { locale: Locale }) {
  const [page, setPage] = useState(1)
  const posts = getAllPosts(locale)
  const totalPages = Math.ceil(posts.length / PAGE_SIZE)
  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <main className="page-wrap px-4 py-12">
      <p className="island-kicker mb-2">Monabee</p>
      <h1 className="display-title mb-8 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
        {TITLE[locale]}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((post) => (
          <PostCard key={post.data.slug} post={post} locale={locale} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        locale={locale}
      />
    </main>
  )
}
