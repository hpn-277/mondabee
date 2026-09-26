import type { ContentItem, PostFrontmatter } from '#/lib/content'
import { formatDate } from '#/lib/format'
import type { Locale } from '#/lib/i18n'

export default function PostCard({
  post,
  locale,
}: {
  post: ContentItem<PostFrontmatter>
  locale: Locale
}) {
  const { title, slug, images, date } = post.data
  const formattedDate = formatDate(date, locale)
  const href = locale === 'en' ? `/en/tin-tuc/${slug}` : `/tin-tuc/${slug}`

  return (
    <a
      href={href}
      className="island-shell feature-card rise-in flex flex-col overflow-hidden rounded-2xl no-underline"
    >
      <div className="aspect-video w-full overflow-hidden bg-[color-mix(in_oklab,var(--leaf)_14%,var(--surface))]">
        {images[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            📰
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        {formattedDate && (
          <p className="island-kicker m-0">{formattedDate}</p>
        )}
        <h3 className="m-0 line-clamp-2 text-sm font-semibold leading-snug text-[var(--ink)]">
          {title}
        </h3>
      </div>
    </a>
  )
}
