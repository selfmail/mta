import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Sidebar } from "../components/sidebar";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import StoreDevtools from "../lib/demo-store-devtools";

interface MyRouterContext {
	queryClient: QueryClient;
}

const pagesWithoutSidebar = ["/auth/login", "/auth/register"];

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => {
		const router = useRouterState();
		const currentPath = router.location.pathname;

		const showSidebar = !pagesWithoutSidebar.includes(currentPath);

		return (
			<>
				<div
					className={`flex flex-col min-h-screen items-center justify-center ${showSidebar ? "pt-32" : ""}`}
				>
					<div
						className={`flex flex-1 flex-row w-full h-full ${showSidebar ? "px-72" : "justify-center"}`}
					>
						{showSidebar && <Sidebar />}
						<div className="flex flex-col space-y-16 w-full max-w-4xl">
							<Outlet />
						</div>
					</div>
				</div>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
						StoreDevtools,
					]}
				/>
			</>
		);
	},
});
