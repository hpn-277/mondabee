import { createFileRoute } from '@tanstack/react-router'
import ContactContent from '#/components/ContactContent'

export const Route = createFileRoute('/en/contact')({
  component: () => <ContactContent locale="en" />,
})
