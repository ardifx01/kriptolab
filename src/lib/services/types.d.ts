import { AxiosError, AxiosResponse } from "axios";
import { SWRResponse } from "swr";

import { AuthenticatedAPI, UnauthenticatedAPI } from "./config";

export type APIResponse<Data> = {
  data: Data;
  error: AxiosError | null;
  isLoading: boolean;
  isValidating: boolean;
  mutate: SWRResponse<AxiosResponse<Data>, AxiosError>["mutate"];
};

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export type APITypes = typeof UnauthenticatedAPI | typeof AuthenticatedAPI;
