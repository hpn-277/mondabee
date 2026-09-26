import { useState } from 'react'
import type { Locale } from '#/lib/i18n'
import { getAllProducts } from '#/lib/content'
import ProductCard from './ProductCard'
import Pagination from './Pagination'

const PAGE_SIZE = 12

const CATEGORIES = [
  {
    slug: 'mat-ong-nguyen-chat',
    vi: 'Mật ong nguyên chất',
    en: 'Pure Honey',
  },
  { slug: 'mat-ong-ngam', vi: 'Mật ong ngâm', en: 'Infused Honey' },
  {
    slug: 'mat-ong-nhan-sam-tinh-bot-nghe',
    vi: 'Mật ong nhân sâm tinh bột nghệ',
    en: 'Ginseng & Turmeric Honey',
  },
  { slug: 'hop-qua', vi: 'Hộp quà', en: 'Gift Boxes' },
] as const

const PRICE_RANGES = [
  { id: 'under-200k', max: 200_000, vi: 'Dưới 200.000₫', en: 'Under 200,000₫' },
  {
    id: '200k-500k',
    min: 200_000,
    max: 500_000,
    vi: '200.000₫ - 500.000₫',
    en: '200,000₫ - 500,000₫',
  },
  {
    id: '500k-1m',
    min: 500_000,
    max: 1_000_000,
    vi: '500.000₫ - 1.000.000₫',
    en: '500,000₫ - 1,000,000₫',
  },
  { id: 'over-1m', min: 1_000_000, vi: 'Trên 1.000.000₫', en: 'Over 1,000,000₫' },
] as const

const TITLE: Record<Locale, string> = { vi: 'Sản phẩm', en: 'Products' }
const ALL_LABEL: Record<Locale, string> = { vi: 'Tất cả', en: 'All' }
const PRICE_LABEL: Record<Locale, string> = { vi: 'Giá', en: 'Price' }

export default function ShopContent({ locale }: { locale: Locale }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [activePriceRange, setActivePriceRange] = useState<string | null>(
    null,
  )
  const [page, setPage] = useState(1)
  const products = getAllProducts(locale)

  const priceRange = PRICE_RANGES.find((r) => r.id === activePriceRange)
  const filtered = products.filter((p) => {
    if (activeCategory && !p.data.category.includes(activeCategory)) {
      return false
    }
    if (priceRange) {
      const price = Number(p.data.price)
      if (!price) return false
      if ('min' in priceRange && price < priceRange.min) return false
      if ('max' in priceRange && price >= priceRange.max) return false
    }
    return true
  })

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  function selectCategory(category: string | null) {
    setActiveCategory(category)
    setPage(1)
  }

  function selectPriceRange(rangeId: string | null) {
    setActivePriceRange(rangeId)
    setPage(1)
  }

  return (
    <main className="page-wrap px-4 py-12">
      <p className="island-kicker mb-2">Monabee</p>
      <h1 className="display-title mb-6 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
        {TITLE[locale]}
      </h1>

      <div className="mb-3 flex flex-wrap gap-2">
        <FilterPill
          active={activeCategory === null}
          onClick={() => selectCategory(null)}
        >
          {ALL_LABEL[locale]}
        </FilterPill>
        {CATEGORIES.map((category) => (
          <FilterPill
            key={category.slug}
            active={activeCategory === category.slug}
            onClick={() => selectCategory(category.slug)}
          >
            {category[locale]}
          </FilterPill>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-2">
        <label htmlFor="price-filter" className="text-sm font-semibold text-[var(--ink-soft)]">
          {PRICE_LABEL[locale]}:
        </label>
        <div className="relative">
          <select
            id="price-filter"
            value={activePriceRange ?? ''}
            onChange={(e) => selectPriceRange(e.target.value || null)}
            className="appearance-none rounded-full border border-[var(--line)] bg-[var(--surface-strong)] py-1.5 pl-4 pr-9 text-sm font-semibold text-[var(--ink-soft)] outline-none transition hover:text-[var(--ink)]"
          >
            <option value="">{ALL_LABEL[locale]}</option>
            {PRICE_RANGES.map((range) => (
              <option key={range.id} value={range.id}>
                {range[locale]}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            width="14"
            height="14"
            fill="none"
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--ink-soft)]"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {paginated.map((product) => (
          <ProductCard
            key={product.data.slug}
            product={product}
            locale={locale}
          />
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

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
        active
          ? 'border-[rgba(201,130,28,0.4)] bg-[rgba(240,169,58,0.16)] text-[var(--honey-deep)]'
          : 'border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]'
      }`}
    >
      {children}
    </button>
  )
}
