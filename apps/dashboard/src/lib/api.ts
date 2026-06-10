const DEFAULT_API_URL = "http://localhost:8080";

function getDefaultApiUrl() {
	if (typeof window === "undefined") {
		return DEFAULT_API_URL;
	}

	return `${window.location.protocol}//${window.location.hostname}:8080`;
}

const apiBaseUrl = (import.meta.env.VITE_API_URL || getDefaultApiUrl()).replace(
	/\/+$/,
	"",
);

export function apiUrl(path: string) {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${apiBaseUrl}${normalizedPath}`;
}
