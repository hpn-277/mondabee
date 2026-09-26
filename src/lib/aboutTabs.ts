export type AboutTab = {
  label: string
  icon: string
  body: string
}

const START = '<!-- tabs:start -->'
const END = '<!-- tabs:end -->'

export function extractTabs(content: string): {
  before: string
  tabs: Array<AboutTab>
  after: string
} {
  const start = content.indexOf(START)
  const end = content.indexOf(END)
  if (start === -1 || end === -1) {
    return { before: content, tabs: [], after: '' }
  }

  const before = content.slice(0, start).trim()
  const after = content.slice(end + END.length).trim()
  const tabsRaw = content.slice(start + START.length, end)

  const tabs = tabsRaw
    .split(/\n#### /)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const [labelLine, ...rest] = chunk.split('\n')
      const body = rest.join('\n').trim()
      const imageMatch = body.match(/^!\[\]\(([^)]+)\)/)
      return {
        label: labelLine.trim(),
        icon: imageMatch ? imageMatch[1] : '',
        body: imageMatch ? body.slice(imageMatch[0].length).trim() : body,
      }
    })

  return { before, tabs, after }
}
