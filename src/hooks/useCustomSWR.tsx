import { AxiosInstance } from "axios";
import useSWR, { SWRConfiguration } from "swr";

import { AuthenticatedAPI, UnauthenticatedAPI } from "@/lib/services/config";

export function createFetcher(api: AxiosInstance) {
  return async function fetcher<Data>(url: string): Promise<Data> {
    const response = await api.get<Data>(url);
    return response.data;
  };
}

export const unauthenticatedFetcher = createFetcher(UnauthenticatedAPI);
export const authenticatedFetcher = createFetcher(AuthenticatedAPI);

export function useCustomSWR<T>(
  url: string | null,
  type: "unauthenticated" | "authenticated",
  options?: SWRConfiguration,
) {
  const fetcher =
    type === "unauthenticated" ? unauthenticatedFetcher : authenticatedFetcher;
  return useSWR<T>(url, fetcher, options);
}
