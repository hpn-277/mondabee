import { createFileRoute } from '@tanstack/react-router'
import ShopContent from '#/components/ShopContent'

export const Route = createFileRoute('/en/san-pham/')({
  component: () => <ShopContent locale="en" />,
})
