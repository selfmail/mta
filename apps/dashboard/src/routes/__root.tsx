import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
	redirect,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import TopBar from "@/components/layout/bar";
import { getSession } from "@/lib/auth.functions";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import * as TanStackQueryProvider from "../integrations/tanstack-query/root-provider";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const pagesWithoutTopBar = ["/auth/login", "/auth/register"];
const pagesWithoutAuth = ["/auth/login", "/auth/register"];

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1.0",
			},
			{
				name: "theme-color",
				content: "#000000",
			},
			{
				name: "description",
				content: "Dashboard for the Selfmail MTA",
			},
			{
				title: "Dashboard - Selfmail MTA",
			},
		],
		links: [
			{
				rel: "icon",
				href: "/favicon.ico",
			},
			{
				rel: "apple-touch-icon",
				href: "/logo192.png",
			},
			{
				rel: "manifest",
				href: "/manifest.json",
			},
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	beforeLoad: async ({ location }) => {
		// Skip auth check for pages that don't require authentication
		if (pagesWithoutAuth.includes(location.pathname)) {
			return;
		}

		// Check authentication for protected routes
		try {
			const session = await getSession();

			if (!session) {
				throw redirect({
					to: "/auth/login",
				});
			}

			return { user: session.user };
		} catch (error) {
			if (error instanceof Response) {
				throw error;
			}
			throw redirect({
				to: "/auth/login",
			});
		}
	},
	component: RootComponent,
	shellComponent: RootDocument,
});

function RootComponent() {
	const { queryClient } = Route.useRouteContext();
	const router = useRouterState();
	const currentPath = router.location.pathname;

	const showTopBar = !pagesWithoutTopBar.includes(currentPath);
	const noPadding =
		currentPath.startsWith("/inbound-actions") ||
		currentPath.startsWith("/outbound-actions");

	return (
		<TanStackQueryProvider.Provider queryClient={queryClient}>
			{showTopBar ? (
				<TopBar noPadding={noPadding}>
					<Outlet />
				</TopBar>
			) : (
				<Outlet />
			)}
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
				]}
			/>
		</TanStackQueryProvider.Provider>
	);
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}
