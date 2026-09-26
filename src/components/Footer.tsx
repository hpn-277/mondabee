import { useRouterState } from '@tanstack/react-router'
import { getLocale } from '#/lib/i18n'

export default function Footer() {
  const year = new Date().getFullYear()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const locale = getLocale(pathname)

  return (
    <footer className="site-footer mt-20 px-4 pb-14 pt-10 text-[var(--ink-soft)]">
      <div className="page-wrap flex flex-col items-center gap-2 text-center text-sm">
        <p className="m-0">
          Tổ 12, thôn Đông Hải, xã Tân Hải, thị xã Phú Mỹ, tỉnh Bà Rịa - Vũng
          Tàu
        </p>
        <p className="m-0">
          Hotline: 0937 105 292 - 0937 864 426 &middot;{' '}
          {locale === 'vi'
            ? 'Thứ 2 - Chủ Nhật 7:00AM-6:00PM'
            : 'Mon - Sun 7:00AM-6:00PM'}
        </p>
        <p className="m-0 text-xs">
          &copy; {year} Monabee (Mother Nature). All rights reserved.
        </p>
      </div>
    </footer>
  )
}
