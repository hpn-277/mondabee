import { createFileRoute } from '@tanstack/react-router'
import BlogContent from '#/components/BlogContent'

export const Route = createFileRoute('/tin-tuc/')({
  component: () => <BlogContent locale="vi" />,
})
