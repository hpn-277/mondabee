import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'
import { getCounterpartPath, getLocale } from '#/lib/i18n'

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const locale = getLocale(pathname)
  const counterpart = getCounterpartPath(pathname)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-tight">
          <Link
            to={locale === 'en' ? '/en' : '/'}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-2.5 py-1 text-sm text-[var(--ink)] no-underline shadow-[0_8px_24px_rgba(120,72,20,0.1)] sm:px-3 sm:py-1.5"
          >
            <img
              src="/images/brand/monabee-logo.png"
              alt="Monabee"
              className="h-6 w-6 rounded-full sm:h-7 sm:w-7"
            />
            Monabee
          </Link>
        </h2>

        <div
          className={`${open ? 'flex' : 'hidden'} w-full flex-col gap-3 text-sm font-semibold sm:flex sm:w-auto sm:flex-row sm:items-center sm:gap-4`}
        >
          {locale === 'vi' ? (
            <>
              <Link
                to="/"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                Trang chủ
              </Link>
              <Link
                to="/gioi-thieu"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                Giới thiệu
              </Link>
              <Link
                to="/san-pham"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                Sản phẩm
              </Link>
              <Link
                to="/tin-tuc"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                Tin tức
              </Link>
              <Link
                to="/lien-he"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                Liên hệ
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/en"
                activeOptions={{ exact: true }}
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/en/about"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                About
              </Link>
              <Link
                to="/en/san-pham"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/en/tin-tuc"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                News
              </Link>
              <Link
                to="/en/contact"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </>
          )}
          <a href={counterpart} className="nav-link sm:ml-1">
            {locale === 'vi' ? 'EN' : 'VI'}
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? (locale === 'vi' ? 'Đóng menu' : 'Close menu') : (locale === 'vi' ? 'Mở menu' : 'Open menu')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--ink)] sm:hidden"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
