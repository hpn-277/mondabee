import Markdown from 'markdown-to-jsx'
import type { Locale } from '#/lib/i18n'
import { getProduct } from '#/lib/content'
import { formatPrice } from '#/lib/format'
import ExpandableSection from './ExpandableSection'
import ImageCarousel from './ImageCarousel'

const BACK_LABEL: Record<Locale, string> = {
  vi: '← Tất cả sản phẩm',
  en: '← All products',
}

const MORE_LABEL: Record<Locale, string> = { vi: 'Xem thêm', en: 'Show more' }
const LESS_LABEL: Record<Locale, string> = { vi: 'Thu gọn', en: 'Show less' }

const NOT_FOUND: Record<Locale, string> = {
  vi: 'Không tìm thấy sản phẩm.',
  en: 'Product not found.',
}

const PROSE_CLASSES =
  'prose prose-p:my-2 prose-p:text-[var(--ink-soft)] prose-strong:text-[var(--ink)] prose-headings:text-[var(--ink)] prose-li:text-[var(--ink-soft)] max-w-none'

// Every product has exactly two "## " sections: a short summary, then the
// long detailed description. Splitting them lets the summary sit beside the
// image while the (often much longer) details get full page width below,
// instead of squeezing a huge block of text into a half-width column next
// to a short square image.
function splitDescription(content: string) {
  const firstHeading = content.indexOf('## ')
  if (firstHeading === -1) {
    return { summary: content, details: '' }
  }
  const secondHeading = content.indexOf('\n## ', firstHeading + 3)
  if (secondHeading === -1) {
    return { summary: content, details: '' }
  }
  return {
    summary: content.slice(0, secondHeading).trim(),
    details: content.slice(secondHeading + 1).trim(),
  }
}

export default function ProductDetail({
  locale,
  slug,
}: {
  locale: Locale
  slug: string
}) {
  const product = getProduct(locale, slug)
  const backHref = locale === 'en' ? '/en/san-pham' : '/san-pham'

  if (!product) {
    return (
      <main className="page-wrap px-4 py-12">
        <a href={backHref} className="nav-link text-sm">
          {BACK_LABEL[locale]}
        </a>
        <p className="mt-4 text-[var(--ink-soft)]">{NOT_FOUND[locale]}</p>
      </main>
    )
  }

  const { title, images, price, sale_price } = product.data
  const formattedPrice = formatPrice(price)
  const formattedSale = sale_price ? formatPrice(sale_price) : null
  const { summary, details } = splitDescription(product.content)

  return (
    <main className="page-wrap px-4 py-12">
      <a href={backHref} className="nav-link text-sm">
        {BACK_LABEL[locale]}
      </a>

      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div className="sm:sticky sm:top-24 sm:self-start">
          <ImageCarousel images={images} alt={title} />
        </div>

        <div>
          <h1 className="display-title mb-3 text-3xl font-bold text-[var(--ink)] sm:text-4xl">
            {title}
          </h1>
          {formattedSale ? (
            <p className="mb-4 text-2xl font-bold text-[var(--honey-deep)]">
              {formattedSale}{' '}
              <span className="text-base font-normal text-[var(--ink-soft)] line-through">
                {formattedPrice}
              </span>
            </p>
          ) : (
            formattedPrice && (
              <p className="mb-4 text-2xl font-bold text-[var(--honey-deep)]">
                {formattedPrice}
              </p>
            )
          )}
          <div className={PROSE_CLASSES}>
            <Markdown>{summary}</Markdown>
          </div>
        </div>
      </div>

      {details && (
        <div className="mx-auto mt-10 max-w-3xl border-t border-[var(--line)] pt-8">
          <ExpandableSection
            moreLabel={MORE_LABEL[locale]}
            lessLabel={LESS_LABEL[locale]}
          >
            <div className={PROSE_CLASSES}>
              <Markdown>{details}</Markdown>
            </div>
          </ExpandableSection>
        </div>
      )}
    </main>
  )
}
