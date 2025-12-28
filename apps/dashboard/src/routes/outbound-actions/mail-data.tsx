import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/outbound-actions/mail-data')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/inbound-actions/mail-data"!</div>
}
