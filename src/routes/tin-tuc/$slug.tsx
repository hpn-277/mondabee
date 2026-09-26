import { createFileRoute } from '@tanstack/react-router'
import PostDetail from '#/components/PostDetail'

export const Route = createFileRoute('/tin-tuc/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  return <PostDetail locale="vi" slug={slug} />
}
