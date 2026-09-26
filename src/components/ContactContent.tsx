import Markdown from 'markdown-to-jsx'
import type { Locale } from '#/lib/i18n'
import { getPage } from '#/lib/content'

const TITLE: Record<Locale, string> = { vi: 'Liên hệ', en: 'Contact' }

const CALL_LABEL: Record<Locale, string> = {
  vi: 'Gọi ngay: 0937 105 292',
  en: 'Call now: 0937 105 292',
}

const NOT_FOUND: Record<Locale, string> = {
  vi: 'Nội dung đang được cập nhật.',
  en: 'Content is being updated.',
}

export default function ContactContent({ locale }: { locale: Locale }) {
  const page = getPage(locale, 'lien-he')

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Monabee</p>
        <h1 className="display-title mb-6 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
          {TITLE[locale]}
        </h1>

        {page ? (
          <div className="prose prose-headings:font-[Fraunces] prose-headings:text-[var(--ink)] prose-p:text-[var(--ink-soft)] prose-strong:text-[var(--ink)] max-w-none">
            <Markdown>{page.content}</Markdown>
          </div>
        ) : (
          <p className="m-0 max-w-3xl text-base leading-8 text-[var(--ink-soft)]">
            {NOT_FOUND[locale]}
          </p>
        )}

        <a
          href="tel:+84937105292"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-[rgba(201,130,28,0.4)] bg-[rgba(240,169,58,0.16)] px-5 py-2.5 text-sm font-semibold text-[var(--honey-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(240,169,58,0.26)]"
        >
          {CALL_LABEL[locale]}
        </a>
      </section>
    </main>
  )
}
