export function apiUrl(path: string) {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const apiBaseUrl = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

	return `${apiBaseUrl}${normalizedPath}`;
}
