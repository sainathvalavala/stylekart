
import { createSlice } from "@reduxjs/toolkit";

/* =====================================================
   Cart Slice
   -----------------------------------------------------
   Supports:
   - Clothes (Product_id)
   - Kids (id)
   - Beauty (id)

   Core Rule:
   👉 Every cart item MUST have a unified `id`
===================================================== */

const cartSlice = createSlice({
  name: "cart",

  /* =======================
     Initial State
  ======================= */
  initialState: {
    items: [],
  },

  reducers: {
    /* =====================================================
       ADD TO CART
       -----------------------------------------------------
       - Normalizes product ID
       - Merges quantity if item already exists
    ===================================================== */
    addToCart: (state, action) => {
      //payload = incoming product after clicking add to cart
      const product = action.payload;

      // 🔑 Unified ID for all product types
      const productId =
        product.Product_id || product.id;

      // Find existing cart item using unified ID
      const existingItem = state.items.find(
        (item) => item.id === productId
      );

      if (existingItem) {
        // If already in cart → increase quantity
        existingItem.quantity += 1;
      } else {
        // Add new item with enforced `id`
        state.items.push({
          ...product,
          id: productId, // 👈 critical normalization
          quantity: 1,
        });
      }
    },

    /* =====================================================
       REMOVE FROM CART
       -----------------------------------------------------
       - Always remove using unified `id`
    ===================================================== */
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;

      state.items = state.items.filter(
        (item) => item.id !== idToRemove
      );
    },

    /* =====================================================
       UPDATE QUANTITY
       -----------------------------------------------------
       - Works for Clothes / Kids / Beauty
    ===================================================== */
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.id === id
      );

      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

/* =======================
   Export Actions
======================= */
export const {
  addToCart,
  removeFromCart,
  updateQuantity,
} = cartSlice.actions;

/* =======================
   Export Reducer
======================= */
export default cartSlice.reducer;
