import { createFileRoute } from '@tanstack/react-router'
import ContactContent from '#/components/ContactContent'

export const Route = createFileRoute('/lien-he')({
  component: () => <ContactContent locale="vi" />,
})
