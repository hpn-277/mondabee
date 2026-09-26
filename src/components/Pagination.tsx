import type { Locale } from '#/lib/i18n'

const PREV_LABEL: Record<Locale, string> = { vi: 'Trước', en: 'Previous' }
const NEXT_LABEL: Record<Locale, string> = { vi: 'Sau', en: 'Next' }

export default function Pagination({
  page,
  totalPages,
  onChange,
  locale,
}: {
  page: number
  totalPages: number
  onChange: (page: number) => void
  locale: Locale
}) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm font-semibold text-[var(--ink-soft)] transition hover:text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {PREV_LABEL[locale]}
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? 'page' : undefined}
          className={`h-9 w-9 rounded-full border text-sm font-semibold transition ${
            n === page
              ? 'border-[rgba(201,130,28,0.4)] bg-[rgba(240,169,58,0.16)] text-[var(--honey-deep)]'
              : 'border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]'
          }`}
        >
          {n}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className="rounded-full border border-[var(--line)] px-3 py-1.5 text-sm font-semibold text-[var(--ink-soft)] transition hover:text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {NEXT_LABEL[locale]}
      </button>
    </nav>
  )
}
