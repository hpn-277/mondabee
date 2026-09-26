import { createFileRoute } from '@tanstack/react-router'
import ProductDetail from '#/components/ProductDetail'

export const Route = createFileRoute('/san-pham/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  return <ProductDetail locale="vi" slug={slug} />
}
