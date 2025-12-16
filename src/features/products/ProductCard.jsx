// import { useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../cart/cartSlice";
// import { toast } from "react-toastify";

// function ProductCard({ product }) {
//   /* =======================
//      Redux Dispatch
//   ======================= */
//   const dispatch = useDispatch();

//   /* =======================
//      Image Hover State
//   ======================= */
//   const [imgIndex, setImgIndex] = useState(0);
//   const timerRef = useRef(null);

//   /* =======================
//      Start Image Auto-Slide on Hover
//   ======================= */
//   const startHover = () => {
//     if (timerRef.current) return; // prevent multiple timers
//     if (!product.images || product.images.length <= 1) return;

//     // Initial delay before first slide
//     timerRef.current = setTimeout(() => {
//       setImgIndex((prev) =>
//         prev < product.images.length - 1 ? prev + 1 : prev
//       );

//       // Continue sliding images at interval
//       timerRef.current = setInterval(() => {
//         setImgIndex((prev) => {
//           if (prev === product.images.length - 1) {
//             clearInterval(timerRef.current);
//             return prev;
//           }
//           return prev + 1;
//         });
//       }, 2200); //1.4 sec pause + 0.8 sec animation
//     }, 500);
//   };

//   /* =======================
//      Stop Image Slide on Mouse Leave
//   ======================= */
//   const stopHover = () => {
//     clearTimeout(timerRef.current);
//     clearInterval(timerRef.current);
//     timerRef.current = null;
//     setImgIndex(0); // reset to first image
//   };

//   /* =======================
//      Add Product to Cart + Show Toast
//   ======================= */
//   const handleAddToCart = (e) => {
//     e.stopPropagation(); // prevent parent click/hover issues

//     dispatch(addToCart(product)); // add/update product in Redux cart

//     toast.success(`item added to bag`);
//   };

//   return (
//     <div
//       onMouseEnter={startHover}
//       onMouseLeave={stopHover}
//       className="group bg-white rounded-sm shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
//     >
//       {/* =======================
//           Product Image Section
//       ======================= */}
//       <div className="relative w-full mt-2 h-[260px] overflow-hidden">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={imgIndex}
//             src={product.images[imgIndex]}
//             alt={product.Description}
//             className="absolute inset-0 w-full h-full object-contain"
//             initial={{ x: 40, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -40, opacity: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           />
//         </AnimatePresence>
//       </div>

//       {/* =======================
//           Product Details Section
//       ======================= */}
//       <div className="p-3">
//         <p className="text-sm font-medium text-gray-800 truncate">
//           {product.BrandName || "Brand"}
//         </p>

//         <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//           {product.Description}
//         </p>

//         {/* =======================
//             Price Details
//         ======================= */}
//         <div className="flex items-center gap-2 mt-2">
//           <span className="text-sm font-semibold text-gray-900">
//             ₹{product["DiscountPrice (in Rs)"]}
//           </span>

//           <span className="text-xs text-gray-400 line-through">
//             ₹{product["OriginalPrice (in Rs)"]}
//           </span>

//           <span className="text-xs font-semibold text-pink-600">
//             {product.DiscountOffer}
//           </span>
//         </div>

//         {/* =======================
//             Add To Cart Button
//         ======================= */}
//         <button
//           onClick={handleAddToCart}
//           className="w-full mt-3 border border-pink-600 text-pink-600 
//                      text-sm font-semibold py-2 rounded
//                      hover:bg-pink-600 hover:text-white
//                      transition duration-300"
//         >
//           ADD TO CART
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;
/* =====================================================
   React hooks
   -----------------------------------------------------
   useState : to track which image is currently visible
   useRef   : to store timers without causing re-renders
===================================================== */
import { useRef, useState } from "react";

/* =====================================================
   Framer Motion
   -----------------------------------------------------
   motion.img       : animated image component
   AnimatePresence  : allows exit animations when image changes
===================================================== */
import { motion, AnimatePresence } from "framer-motion";

/* =====================================================
   Redux
   -----------------------------------------------------
   useDispatch : dispatch actions to Redux store
   addToCart   : cart reducer action
===================================================== */
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";

/* =====================================================
   Toast Notifications
===================================================== */
import { toast } from "react-toastify";

/* =====================================================
   ProductCard Component
   -----------------------------------------------------
   This card is SHARED across:
   - Clothes (Myntra API)
   - Kids
   - Beauty

   The main challenge:
   👉 Each API uses DIFFERENT field names

   Solution:
   👉 Normalize all possible fields FIRST
===================================================== */
function ProductCard({ product }) {
  /* =======================
     Redux dispatch instance
  ======================= */
  const dispatch = useDispatch();

  /* =====================================================
     🔁 DATA NORMALIZATION LAYER
     -----------------------------------------------------
     The UI below ONLY uses these normalized variables.
     It does NOT directly access `product.xxx`.

     This prevents:
     - "Brand" showing instead of actual brand
     - ₹ ₹ price bug
     - Breaking when APIs change
  ===================================================== */

  /* ---------- BRAND ----------
     Clothes : BrandName
     Kids    : brand
     Beauty  : brand
  */
  const brand =
    product.BrandName ||
    product.brand ||
    "Brand";

  /* ---------- DESCRIPTION / TITLE ----------
     Clothes : Description
     Kids    : description / productName
     Beauty  : name
  */
  const description =
    product.Description ||
    product.description ||
    product.productName ||
    product.name ||
    "";

  /* ---------- ORIGINAL PRICE ----------
     Clothes : "OriginalPrice (in Rs)"
     Kids    : price
     Beauty  : price / originalPrice
  */
  const originalPrice =
    product["OriginalPrice (in Rs)"] ||
    product.originalPrice ||
    product.price ||
    "";

  /* ---------- DISCOUNTED PRICE ----------
     Clothes : "DiscountPrice (in Rs)"
     Beauty  : discountPrice
     Kids    : ❌ (no discount)
  */
  const discountedPrice =
    product["DiscountPrice (in Rs)"] ||
    product.discountPrice ||
    "";

  /* ---------- DISCOUNT OFFER TEXT ----------
     Clothes : DiscountOffer
     Beauty  : discountOffer
     Kids    : ❌
  */
  const discountOffer =
    product.DiscountOffer ||
    product.discountOffer ||
    "";

  /* ---------- IMAGES ----------
     All APIs use `images[]`, but we still guard it
     to avoid runtime crashes.
  */
  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/300x400?text=No+Image"];

  /* =====================================================
     IMAGE HOVER STATE
  ===================================================== */

  // Current image index
  const [imgIndex, setImgIndex] = useState(0);

  // Stores timeout & interval references
  const timerRef = useRef(null);

  /* =====================================================
     Start image auto-slide on mouse hover
     -----------------------------------------------------
     - Delay first slide for UX
     - Slide only if multiple images exist
     - Prevent multiple timers
  ===================================================== */
  const startHover = () => {
    //prevent multiple timers
    if (timerRef.current) return;
    //np slide if only one image
    if (images.length <= 1) return;

    // Delay before first image change
    timerRef.current = setTimeout(() => {
      setImgIndex((prev) =>
        Math.min(prev + 1, images.length - 1)
      );

      // Continue sliding images
      timerRef.current = setInterval(() => {
        setImgIndex((prev) => {
          if (prev === images.length - 1) {
            clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 2200);
    }, 500);
  };

  /* =====================================================
     Stop image auto-slide on mouse leave
     -----------------------------------------------------
     - Clear timers
     - Reset to first image
  ===================================================== */
  const stopHover = () => {
    clearTimeout(timerRef.current);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setImgIndex(0);
  };

  /* =====================================================
     Add to Cart Handler
     -----------------------------------------------------
     - Stops event bubbling
     - Dispatches Redux action
     - Shows success toast
  ===================================================== */
  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    toast.success("Item added to bag");
  };

  /* =====================================================
     JSX RENDER
  ===================================================== */
  return (
    <div
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      className="bg-white rounded-sm shadow-sm 
                 hover:shadow-lg transition cursor-pointer"
    >
      {/* =======================
          PRODUCT IMAGE SECTION
      ======================= */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={images[imgIndex]}
            alt={description}
            className="absolute inset-0 w-full h-full object-contain"

            /* Slide animation */
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>

      {/* =======================
          PRODUCT DETAILS
      ======================= */}
      <div className="p-3">
        {/* Brand */}
        <p className="text-sm font-medium text-gray-800 truncate">
          {brand}
        </p>

        {/* Description */}
        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>

        {/* =======================
            PRICE SECTION
        ======================= */}
        <div className="flex items-center gap-2 mt-2">
          {discountedPrice ? (
            <>
              {/* Discounted price */}
              <span className="text-sm font-semibold text-gray-900">
                ₹{discountedPrice}
              </span>

              {/* Original price */}
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice}
              </span>

              {/* Discount offer */}
              {discountOffer && (
                <span className="text-xs font-semibold text-pink-600">
                  {discountOffer}
                </span>
              )}
            </>
          ) : (
            /* No discount (Kids products) */
            <span className="text-sm font-semibold text-gray-900">
              ₹{originalPrice}
            </span>
          )}
        </div>

        {/* =======================
            ADD TO CART BUTTON
        ======================= */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 border border-pink-600 
                     text-pink-600 text-sm font-semibold 
                     py-2 rounded hover:bg-pink-600 
                     hover:text-white transition"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
