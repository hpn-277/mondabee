import { createFileRoute } from '@tanstack/react-router'
import AboutContent from '#/components/AboutContent'

export const Route = createFileRoute('/gioi-thieu')({
  component: () => <AboutContent locale="vi" />,
})
