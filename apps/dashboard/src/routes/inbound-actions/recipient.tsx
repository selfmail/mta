import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inbound-actions/recipient')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/inbound-actions/recipient"!</div>
}
