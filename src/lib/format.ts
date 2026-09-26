export function formatPrice(price: string) {
  const value = Number(price)
  if (!value) return null
  return `${value.toLocaleString('vi-VN')}₫`
}

export function formatDate(iso: string, locale: 'vi' | 'en' = 'vi') {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return null
  return date.toLocaleDateString(locale === 'en' ? 'en-US' : 'vi-VN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
