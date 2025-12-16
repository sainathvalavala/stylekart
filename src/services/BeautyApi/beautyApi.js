// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const beautyApi = createApi({
  reducerPath: "beautyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sainathvalavala.github.io/myntraApi/",
  }),
  endpoints: (builder) => ({
    getallBeautyProducts: builder.query({
      query: () => `beautyApi.json`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetallBeautyProductsQuery } = beautyApi;
