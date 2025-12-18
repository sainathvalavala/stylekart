import { createSlice } from "@reduxjs/toolkit";
import { getProductId } from "../../utils/getProductId";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const productId = getProductId(product);

      if (!productId) return;

      const exists = state.items.find(
        (item) => getProductId(item) === productId
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => getProductId(item) !== productId
        );
      } else {
        state.items.push(product);
      }
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
