import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const useAuth = () =>
	useQuery({
		queryKey: ["auth"],
		queryFn: async () => {
			const { data, error } = await authClient.getSession();

			if (error || !data) {
				throw new Error(error?.message ?? "Not authenticated");
			}

			return data;
		},
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
