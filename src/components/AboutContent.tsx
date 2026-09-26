import Markdown from 'markdown-to-jsx'
import type { Locale } from '#/lib/i18n'
import { getPage } from '#/lib/content'
import { extractTabs } from '#/lib/aboutTabs'
import AboutTabs from './AboutTabs'

const FALLBACK_TITLE: Record<Locale, string> = {
  vi: 'Giới thiệu',
  en: 'About',
}

const NOT_FOUND: Record<Locale, string> = {
  vi: 'Nội dung đang được cập nhật.',
  en: 'Content is being updated.',
}

const PROSE_CLASSES =
  'prose prose-headings:font-[Fraunces] prose-headings:text-[var(--ink)] prose-p:text-[var(--ink-soft)] prose-li:text-[var(--ink-soft)] prose-strong:text-[var(--ink)] prose-a:text-[var(--honey-deep)] prose-img:rounded-xl max-w-none'

export default function AboutContent({ locale }: { locale: Locale }) {
  const page = getPage(locale, 'gioi-thieu')

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">Monabee</p>
        <h1 className="display-title mb-6 text-4xl font-bold text-[var(--ink)] sm:text-5xl">
          {page?.data.title ?? FALLBACK_TITLE[locale]}
        </h1>
        {page ? (
          <AboutBody content={page.content} />
        ) : (
          <p className="m-0 max-w-3xl text-base leading-8 text-[var(--ink-soft)]">
            {NOT_FOUND[locale]}
          </p>
        )}
      </section>
    </main>
  )
}

function AboutBody({ content }: { content: string }) {
  const { before, tabs, after } = extractTabs(content)

  return (
    <>
      <div className={PROSE_CLASSES}>
        <Markdown>{before}</Markdown>
      </div>
      <AboutTabs tabs={tabs} />
      <div className={`${PROSE_CLASSES} [&_img]:mx-auto [&_img]:block`}>
        <Markdown>{after}</Markdown>
      </div>
    </>
  )
}
