import { createFileRoute } from '@tanstack/react-router'
import BlogContent from '#/components/BlogContent'

export const Route = createFileRoute('/en/tin-tuc/')({
  component: () => <BlogContent locale="en" />,
})
