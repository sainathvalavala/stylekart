import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/productsApi";
import { HomePageApi } from "../services/HomePageApi/HomePageApi";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [HomePageApi.reducerPath]: HomePageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      HomePageApi.middleware
    ),
});
