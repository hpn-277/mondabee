import { createFileRoute } from '@tanstack/react-router'
import ProductDetail from '#/components/ProductDetail'

export const Route = createFileRoute('/en/san-pham/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  return <ProductDetail locale="en" slug={slug} />
}
