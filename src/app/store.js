import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/ProductsApi/productsApi";
import { HomePageApi } from "../services/HomePageApi/HomePageApi";
import cartReducer from "../features/cart/cartSlice";
import { kidsApi } from "../services/kidsApi/KidsApi";
import { beautyApi } from "../services/BeautyApi/beautyApi";

import wishlistReducer from '../features/wishlist/wishlistSlice'
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist:wishlistReducer,
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
      beautyApi.middleware,
    ),
});
