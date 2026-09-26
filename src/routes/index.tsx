import { createFileRoute } from '@tanstack/react-router'
import ProductCard from '#/components/ProductCard'
import PostCard from '#/components/PostCard'
import {
  HoneyJarIcon,
  ShippingIcon,
  SupportIcon,
} from '#/components/FeatureIcons'
import { getPosts, getProducts } from '#/lib/content'

export const Route = createFileRoute('/')({ component: Home })

const NEWEST_PRODUCT_SLUGS = [
  'mat-ong-tac-bac-ha-hu-180ml',
  'mat-ong-tac-bac-ha-hu-280ml',
  'mat-ong-tac-bac-ha-hu-500ml',
  'mat-ong-nguyen-chat-hu-750ml',
]

const GIFT_BOX_PRODUCT_SLUGS = [
  'combo-hop-qua-tam-sang-trong-y-nghia-mat-ong',
  'hop-go-gom-2-chai-thuy-tinh-cao-cap-750ml',
  'hop-qua-cao-cap-mat-ong-nhan-sam-tinh-bot',
  'hop-go-gom-3-hu-500ml-mat-ong-nhan-sam-tinh',
]

const LATEST_POST_SLUGS = [
  'monabee-tai-vietnam-ocopex-2025-ket-noi-giao',
  'cung-monabee-va-le-duong-bao-lam-mang-tet-am-ap',
  'monabee-va-mega-live-am-sac-nong-san',
  'cau-chuyen-san-pham-monabee',
]

const FEATURES = [
  {
    icon: ShippingIcon,
    title: 'Vận chuyển toàn quốc',
    desc: 'Giao hàng nhanh chóng tới mọi tỉnh thành.',
  },
  {
    icon: HoneyJarIcon,
    title: '100% Mật ong nguyên chất',
    desc: 'Không pha trộn, không chất bảo quản.',
  },
  {
    icon: SupportIcon,
    title: 'Hỗ trợ 24/7',
    desc: 'Đội ngũ tư vấn luôn sẵn sàng đồng hành cùng bạn.',
  },
]

function Home() {
  const newestProducts = getProducts('vi', NEWEST_PRODUCT_SLUGS)
  const giftBoxProducts = getProducts('vi', GIFT_BOX_PRODUCT_SLUGS)
  const latestPosts = getPosts('vi', LATEST_POST_SLUGS)

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <section className="island-shell rise-in relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 sm:py-14">
        <div className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(240,169,58,0.32),transparent_66%)]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(107,143,71,0.18),transparent_66%)]" />
        <p className="island-kicker mb-3">Monabee</p>
        <h1 className="display-title mb-5 max-w-3xl text-4xl leading-[1.02] font-bold tracking-tight text-[var(--ink)] sm:text-6xl">
          Món quà từ mẹ thiên nhiên
        </h1>
        <p className="mb-8 max-w-2xl text-base text-[var(--ink-soft)] sm:text-lg">
          Mật ong nguyên chất Monabee — 100% tự nhiên, vận chuyển toàn quốc,
          hỗ trợ tư vấn khách hàng 24/7.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/san-pham"
            className="rounded-full border border-[rgba(201,130,28,0.3)] bg-[rgba(240,169,58,0.16)] px-5 py-2.5 text-sm font-semibold text-[var(--honey-deep)] no-underline transition hover:-translate-y-0.5 hover:bg-[rgba(240,169,58,0.26)]"
          >
            Khám phá sản phẩm
          </a>
          <a
            href="/lien-he"
            className="rounded-full border border-[rgba(43,26,14,0.2)] bg-white/50 px-5 py-2.5 text-sm font-semibold text-[var(--ink)] no-underline transition hover:-translate-y-0.5 hover:border-[rgba(43,26,14,0.35)]"
          >
            Liên hệ
          </a>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }, index) => (
          <article
            key={title}
            className="island-shell feature-card rise-in flex items-start gap-3 rounded-2xl p-5"
            style={{ animationDelay: `${index * 90 + 80}ms` }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--honey)_18%,var(--surface))] text-[var(--honey-deep)] [&_svg]:h-5 [&_svg]:w-5">
              <Icon />
            </div>
            <div>
              <h2 className="mb-1 text-base font-semibold text-[var(--ink)]">
                {title}
              </h2>
              <p className="m-0 text-sm text-[var(--ink-soft)]">{desc}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-baseline justify-between gap-3">
          <h2 className="display-title m-0 text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            Sản phẩm mới nhất
          </h2>
          <a href="/san-pham" className="nav-link text-sm">
            Xem tất cả
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {newestProducts.map((product) => (
            <ProductCard key={product.data.slug} product={product} locale="vi" />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-5 flex items-baseline justify-between gap-3">
          <h2 className="display-title m-0 text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            Hộp quà tặng sức khỏe
          </h2>
          <a href="/san-pham" className="nav-link text-sm">
            Xem tất cả
          </a>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {giftBoxProducts.map((product) => (
            <ProductCard key={product.data.slug} product={product} locale="vi" />
          ))}
        </div>
      </section>

      <section className="mt-12 mb-8">
        <div className="mb-5 flex items-baseline justify-between gap-3">
          <h2 className="display-title m-0 text-2xl font-bold text-[var(--ink)] sm:text-3xl">
            Tin tức
          </h2>
          <a href="/tin-tuc" className="nav-link text-sm">
            Xem tất cả
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          {latestPosts.map((post) => (
            <PostCard key={post.data.slug} post={post} locale="vi" />
          ))}
        </div>
      </section>
    </main>
  )
}
