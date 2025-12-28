import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/clamav')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/clamav"!</div>
}
