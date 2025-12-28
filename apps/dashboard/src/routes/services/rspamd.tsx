import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/services/rspamd')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/services/rspamd"!</div>
}
