import { createFileRoute } from '@tanstack/react-router'
import AboutContent from '#/components/AboutContent'

export const Route = createFileRoute('/en/about')({
  component: () => <AboutContent locale="en" />,
})
