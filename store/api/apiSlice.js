import envConfig from "@/config/envConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.apiBaseUrl,
    credentials: "include",
  }),
  tagTypes: ["Products", "Categories"],
  endpoints: () => ({}),
});
