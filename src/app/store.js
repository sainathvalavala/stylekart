import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/productsApi";
import { HomePageApi } from "../services/HomePageApi/HomePageApi";
import cartReducer from "../features/cart/cartSlice";
export const store = configureStore({
  reducer: {
    cart:cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [HomePageApi.reducerPath]: HomePageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      HomePageApi.middleware
    ),
});
