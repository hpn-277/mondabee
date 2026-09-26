export type Locale = 'vi' | 'en'

const VI_TO_EN: Record<string, string> = {
  '/': '/en',
  '/gioi-thieu': '/en/about',
  '/lien-he': '/en/contact',
}

const EN_TO_VI: Record<string, string> = {
  '/en': '/',
  '/en/about': '/gioi-thieu',
  '/en/contact': '/lien-he',
}

// Sections that live at the same slug in both locales, just under /en.
const SHARED_PREFIXES = ['/san-pham', '/tin-tuc']

export function getLocale(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'vi'
}

export function getCounterpartPath(pathname: string): string {
  if (getLocale(pathname) === 'en') {
    if (EN_TO_VI[pathname]) return EN_TO_VI[pathname]
    for (const prefix of SHARED_PREFIXES) {
      const enPrefix = `/en${prefix}`
      if (pathname === enPrefix || pathname.startsWith(`${enPrefix}/`)) {
        return pathname.replace(enPrefix, prefix)
      }
    }
    return '/'
  }

  if (VI_TO_EN[pathname]) return VI_TO_EN[pathname]
  for (const prefix of SHARED_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return `/en${pathname}`
    }
  }
  return '/en'
}
