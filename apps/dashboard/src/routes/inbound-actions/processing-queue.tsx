import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/inbound-actions/processing-queue')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/inbound-actions/processing-queue"!</div>
}
