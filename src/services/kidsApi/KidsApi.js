// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const kidsApi = createApi({
  reducerPath: "kidsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sainathvalavala.github.io/myntraApi/",
  }),
  endpoints: (builder) => ({
    getAllClothes: builder.query({
      query: () => `kidsClothesApi.json`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllClothesQuery } = kidsApi;
