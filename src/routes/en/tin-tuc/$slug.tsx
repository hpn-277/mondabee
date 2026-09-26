import { createFileRoute } from '@tanstack/react-router'
import PostDetail from '#/components/PostDetail'

export const Route = createFileRoute('/en/tin-tuc/$slug')({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  return <PostDetail locale="en" slug={slug} />
}
