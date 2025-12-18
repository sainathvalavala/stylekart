// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, updateQuantity } from "./cartSlice";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// function Cart() {
//   /* =======================
//      Redux Hooks
//   ======================= */
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const navigate = useNavigate();

//   /* =======================
//      Calculate Total Cart Amount
//   ======================= */
//   const totalAmount = cartItems.reduce(
//     (sum, item) => sum + Number(item["DiscountPrice (in Rs)"]) * item.quantity,
//     0
//   );

//   /* =======================
//      Empty Cart State
//   ======================= */
//   if (cartItems.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center h-[60vh]">
//         <h2 className="text-xl font-semibold mb-2">Your bag is empty</h2>
//         <p className="text-gray-500">Add items to see them here.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-10">
//       {/* =======================
//           Page Title
//       ======================= */}
//       <h2 className="text-2xl font-semibold mb-8">My Bag</h2>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* =======================
//             LEFT: Cart Items List
//         ======================= */}
//         <div className="md:col-span-2 space-y-6">
//           {cartItems.map((item) => (
//             <div
//               key={item.Product_id}
//               className="flex gap-4 border p-4 rounded-sm"
//             >
//               {/* =======================
//                   Product Image
//               ======================= */}
//               <img
//                 src={item.images?.[0]}
//                 alt={item.Description}
//                 className="w-28 h-36 object-contain"
//               />

//               {/* =======================
//                   Product Details
//               ======================= */}
//               <div className="flex-1">
//                 <h3 className="font-medium text-sm">{item.BrandName}</h3>

//                 <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                   {item.Description}
//                 </p>

//                 {/* =======================
//                     Price Information
//                 ======================= */}
//                 <div className="flex items-center gap-2 mt-3">
//                   <span className="font-semibold text-sm">
//                     ₹{item["DiscountPrice (in Rs)"]}
//                   </span>

//                   <span className="text-xs text-gray-400 line-through">
//                     ₹{item["OriginalPrice (in Rs)"]}
//                   </span>
//                 </div>

//                 {/* =======================
//                     Quantity Selector
//                 ======================= */}
//                 <div className="flex items-center gap-2 mt-3 text-xs">
//                   <span>Qty:</span>
//                   <select
//                     value={item.quantity}
//                     onChange={(e) =>
//                       dispatch(
//                         updateQuantity({
//                           id: item.Product_id,
//                           quantity: Number(e.target.value),
//                         })
//                       )
//                     }
//                     className="border px-2 py-1 rounded text-sm cursor-pointer"
//                   >
//                     {[1, 2, 3, 4, 5].map((qty) => (
//                       <option key={qty} value={qty}>
//                         {qty}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               {/* =======================
//                   Remove Item Button
//               ======================= */}
//               <button
//                 onClick={() => {
//                   dispatch(removeFromCart(item.Product_id));

//                   toast.warn(`item removed from bag`, {
//                     icon: "🗑️",
//                   });
//                 }}
//                 className="text-xs text-pink-600 font-semibold"
//               >
//                 REMOVE
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* =======================
//             RIGHT: Price Summary
//         ======================= */}
//         <div className="border p-6 rounded-sm h-fit">
//           <h3 className="font-semibold mb-4">PRICE DETAILS</h3>

//           <div className="flex justify-between text-sm mb-2">
//             <span>Total Items</span>
//             <span>
//               {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
//             </span>
//           </div>

//           <div className="flex justify-between text-sm mb-4">
//             <span>Total Amount</span>
//             <span className="font-semibold">₹{totalAmount}</span>
//           </div>

//           {/* =======================
//               Checkout Button
//           ======================= */}
//           <button
//             className="w-full mt-3 border border-pink-600 text-pink-600 
//                      text-sm font-semibold py-2 rounded
//                      hover:bg-pink-600 hover:text-white
//                      transition duration-300"
//             onClick={() => navigate("/order")}
//           >
//             PLACE ORDER
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Cart;
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  /* =======================
     Redux Hooks
     - dispatch : send actions
     - cartItems : items added to cart
  ======================= */
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  /* =====================================================
     🔁 NORMALIZE CART ITEMS
     -----------------------------------------------------
     Cart can contain:
     - Clothes
     - Kids
     - Beauty

     We normalize fields so UI does NOT depend on API shape
  ===================================================== */
  const normalizedCartItems = cartItems.map((item) => {
    return {
      // Unique ID (important for update/remove)
      id:
        item.Product_id ||
        item.id,

      // Brand name
      brand:
        item.BrandName ||
        item.brand ||
        "Brand",

      // Description / title
      description:
        item.Description ||
        item.description ||
        item.productName ||
        item.name ||
        "",

      // Images
      image:
        item.images?.[0] ||
        "https://via.placeholder.com/150x200?text=No+Image",

      // Pricing
      originalPrice:
        item["OriginalPrice (in Rs)"] ||
        item.originalPrice ||
        item.price ||
        0,

      discountedPrice:
        item["DiscountPrice (in Rs)"] ||
        item.discountPrice ||
        null,

      // Quantity
      quantity: item.quantity,
    };
  });

  /* =====================================================
     Calculate Total Amount
     -----------------------------------------------------
     - If discounted price exists → use it
     - Else → use original price
  ===================================================== */
  const totalAmount = normalizedCartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.discountedPrice ?? item.originalPrice) *
        item.quantity,
    0
  );

  /* =======================
     Empty Cart State
  ======================= */
  if (normalizedCartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-xl font-semibold mb-2">
          Your bag is empty
        </h2>
        <p className="text-gray-500">
          Add items to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* =======================
          Page Title
      ======================= */}
      <h2 className="text-2xl font-semibold mb-8">
        My Bag
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* =======================
            LEFT: Cart Items
        ======================= */}
        <div className="md:col-span-2 space-y-6">
          {normalizedCartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 border p-4 rounded-sm"
            >
              {/* =======================
                  Product Image
              ======================= */}
              <img
                src={item.image}
                alt={item.description}
                className="w-28 h-36 object-contain"
              />

              {/* =======================
                  Product Info
              ======================= */}
              <div className="flex-1">
                <h3 className="font-medium text-sm">
                  {item.brand}
                </h3>

                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {item.description}
                </p>

                {/* =======================
                    Price
                ======================= */}
                <div className="flex items-center gap-2 mt-3">
                  <span className="font-semibold text-sm">
                    ₹{item.discountedPrice ?? item.originalPrice}
                  </span>

                  {item.discountedPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>

                {/* =======================
                    Quantity Selector
                ======================= */}
                <div className="flex items-center gap-2 mt-3 text-xs">
                  <span>Qty:</span>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                    className="border px-2 py-1 rounded text-sm cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* =======================
                  Remove Button
              ======================= */}
              <button
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                  toast.warn("Item removed from bag");
                }}
                className="text-xs text-pink-600 font-semibold"
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>

        {/* =======================
            RIGHT: Price Summary
        ======================= */}
        <div className="border p-6 rounded-sm h-fit">
          <h3 className="font-semibold mb-4">
            PRICE DETAILS
          </h3>

          <div className="flex justify-between text-sm mb-2">
            <span>Total Items</span>
            <span>
              {normalizedCartItems.reduce(
                (sum, item) => sum + item.quantity,
                0
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span>Total Amount</span>
            <span className="font-semibold">
              ₹{totalAmount}
            </span>
          </div>

          {/* =======================
              Checkout Button
          ======================= */}
          <button
            className="w-full mt-3 border border-pink-600 
                       text-pink-600 text-sm font-semibold 
                       py-2 rounded hover:bg-pink-600 
                       hover:text-white transition duration-300"
            onClick={() => navigate("/order")}
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
