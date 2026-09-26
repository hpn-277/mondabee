import { useState } from 'react'

const FADE = 'linear-gradient(to bottom, black calc(100% - 5rem), transparent 100%)'

export default function ExpandableSection({
  children,
  collapsedHeight = 320,
  moreLabel,
  lessLabel,
}: {
  children: React.ReactNode
  collapsedHeight?: number
  moreLabel: string
  lessLabel: string
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      <div
        className="overflow-hidden"
        style={{
          maxHeight: expanded ? undefined : collapsedHeight,
          maskImage: expanded ? undefined : FADE,
          WebkitMaskImage: expanded ? undefined : FADE,
        }}
      >
        {children}
      </div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="mt-4 rounded-full border border-[rgba(201,130,28,0.4)] bg-[rgba(240,169,58,0.16)] px-4 py-1.5 text-sm font-semibold text-[var(--honey-deep)] transition hover:-translate-y-0.5 hover:bg-[rgba(240,169,58,0.26)]"
      >
        {expanded ? lessLabel : moreLabel}
      </button>
    </div>
  )
}
