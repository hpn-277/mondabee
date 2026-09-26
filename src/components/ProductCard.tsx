import type { ContentItem, ProductFrontmatter } from '#/lib/content'
import { formatPrice } from '#/lib/format'
import type { Locale } from '#/lib/i18n'

export default function ProductCard({
  product,
  locale,
}: {
  product: ContentItem<ProductFrontmatter>
  locale: Locale
}) {
  const { title, slug, images, price } = product.data
  const formattedPrice = formatPrice(price)
  const href = locale === 'en' ? `/en/san-pham/${slug}` : `/san-pham/${slug}`

  return (
    <a
      href={href}
      className="island-shell feature-card rise-in flex flex-col overflow-hidden rounded-2xl no-underline"
    >
      <div className="aspect-square w-full overflow-hidden bg-[color-mix(in_oklab,var(--honey)_14%,var(--surface))]">
        {images[0] ? (
          <img
            src={images[0]}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-4xl">
            🍯
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="m-0 line-clamp-2 text-sm font-semibold leading-snug text-[var(--ink)]">
          {title}
        </h3>
        {formattedPrice && (
          <p className="m-0 mt-auto text-sm font-bold text-[var(--honey-deep)]">
            {formattedPrice}
          </p>
        )}
      </div>
    </a>
  )
}
