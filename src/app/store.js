import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/productsApi/productsApi.js";
import { HomePageApi } from "../services/homePageApi/homePageApi.js";
import cartReducer from "../features/cart/cartSlice.js";
import { kidsApi } from "../services/kidsApi/kidsApi.js";
import { beautyApi } from "../services/beautyApi/beautyApi.js";

import wishlistReducer from "../features/wishlist/wishlistSlice.js";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [HomePageApi.reducerPath]: HomePageApi.reducer,
    [kidsApi.reducerPath]: kidsApi.reducer,
    [beautyApi.reducerPath]: beautyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      HomePageApi.middleware,
      kidsApi.middleware,
      beautyApi.middleware
    ),
});
