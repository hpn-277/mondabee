import { useState } from 'react'
import Markdown from 'markdown-to-jsx'
import type { AboutTab } from '#/lib/aboutTabs'

export default function AboutTabs({ tabs }: { tabs: Array<AboutTab> }) {
  const [active, setActive] = useState(0)

  if (tabs.length === 0) {
    return null
  }

  const current = tabs[active]

  return (
    <div className="my-8">
      <div className="flex flex-wrap gap-2 border-b border-[var(--line)] pb-4">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={index === active}
            className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
              index === active
                ? 'border-[rgba(201,130,28,0.4)] bg-[rgba(240,169,58,0.16)] text-[var(--honey-deep)]'
                : 'border-[var(--line)] text-[var(--ink-soft)] hover:text-[var(--ink)]'
            }`}
          >
            {tab.icon && (
              <img src={tab.icon} alt="" className="h-5 w-5 shrink-0" />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="prose prose-p:text-[var(--ink-soft)] prose-strong:text-[var(--ink)] max-w-none pt-5">
        <Markdown>{current.body}</Markdown>
      </div>
    </div>
  )
}
