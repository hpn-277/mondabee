// Minimal frontmatter parser for our scraped content: quoted-string scalars
// and quoted-string lists only (no nested maps, no unquoted/multiline values).
// Avoids gray-matter, which pulls in Node's Buffer and breaks in the browser.
export function parseFrontmatter(raw: string): {
  data: Record<string, string | Array<string>>
  content: string
} {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: raw }
  }

  const [, frontmatter, content] = match
  const lines = frontmatter.split('\n')
  const data: Record<string, string | Array<string>> = {}

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    const scalar = line.match(/^(\w+):\s*"(.*)"\s*$/)
    if (scalar) {
      data[scalar[1]] = scalar[2]
      continue
    }

    const emptyList = line.match(/^(\w+):\s*\[\]\s*$/)
    if (emptyList) {
      data[emptyList[1]] = []
      continue
    }

    const listKey = line.match(/^(\w+):\s*$/)
    if (listKey) {
      const items: Array<string> = []
      while (i + 1 < lines.length) {
        const item = lines[i + 1].match(/^\s*-\s*"(.*)"\s*$/)
        if (!item) break
        items.push(item[1])
        i++
      }
      data[listKey[1]] = items
    }
  }

  return { data, content: content.replace(/^\n/, '') }
}
