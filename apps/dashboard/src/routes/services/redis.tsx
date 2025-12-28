import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/redis')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/redis"!</div>
}
