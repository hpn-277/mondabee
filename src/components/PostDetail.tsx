import Markdown from 'markdown-to-jsx'
import type { Locale } from '#/lib/i18n'
import { getPost } from '#/lib/content'
import { formatDate } from '#/lib/format'

const BACK_LABEL: Record<Locale, string> = {
  vi: '← Tất cả tin tức',
  en: '← All news',
}

const NOT_FOUND: Record<Locale, string> = {
  vi: 'Không tìm thấy bài viết.',
  en: 'Post not found.',
}

export default function PostDetail({
  locale,
  slug,
}: {
  locale: Locale
  slug: string
}) {
  const post = getPost(locale, slug)
  const backHref = locale === 'en' ? '/en/tin-tuc' : '/tin-tuc'

  if (!post) {
    return (
      <main className="page-wrap px-4 py-12">
        <a href={backHref} className="nav-link text-sm">
          {BACK_LABEL[locale]}
        </a>
        <p className="mt-4 text-[var(--ink-soft)]">{NOT_FOUND[locale]}</p>
      </main>
    )
  }

  const { title, images, date } = post.data
  const formattedDate = formatDate(date, locale)

  return (
    <main className="page-wrap px-4 py-12">
      <a href={backHref} className="nav-link text-sm">
        {BACK_LABEL[locale]}
      </a>

      <article className="mx-auto mt-6 max-w-3xl">
        {formattedDate && (
          <p className="island-kicker mb-2">{formattedDate}</p>
        )}
        <h1 className="display-title mb-6 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
          {title}
        </h1>

        {images[0] && (
          <img
            src={images[0]}
            alt={title}
            className="mb-6 aspect-video w-full rounded-2xl object-cover"
          />
        )}

        <div className="prose prose-p:text-[var(--ink-soft)] prose-strong:text-[var(--ink)] prose-headings:text-[var(--ink)] prose-li:text-[var(--ink-soft)] prose-img:rounded-xl prose-a:text-[var(--honey-deep)] max-w-none">
          <Markdown>{post.content}</Markdown>
        </div>
      </article>
    </main>
  )
}
