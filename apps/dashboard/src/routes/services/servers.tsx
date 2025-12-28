import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/servers')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/servers"!</div>
}
