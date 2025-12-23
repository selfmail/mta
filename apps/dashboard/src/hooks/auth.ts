import { useQuery } from "@tanstack/react-query";

export const useAuth = () =>
	useQuery({
		queryKey: ["auth"],
		queryFn: async () => {
			const response = await fetch("http://localhost:8080/users/me", {
				credentials: "include",
			});

			if (!response.ok) {
				throw new Error("Not authenticated");
			}

			const data = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			return data;
		},
		retry: false,
		retryOnMount: false,
		refetchOnWindowFocus: false,
	});
