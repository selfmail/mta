import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/scripts/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/scripts/"!</div>
}
