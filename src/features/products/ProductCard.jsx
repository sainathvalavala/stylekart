import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import { toast } from "react-toastify";

function ProductCard({ product }) {
  /* =======================
     Redux Dispatch
  ======================= */
  const dispatch = useDispatch();

  /* =======================
     Image Hover State
  ======================= */
  const [imgIndex, setImgIndex] = useState(0);
  const timerRef = useRef(null);

  /* =======================
     Start Image Auto-Slide on Hover
  ======================= */
  const startHover = () => {
    if (timerRef.current) return; // prevent multiple timers
    if (!product.images || product.images.length <= 1) return;

    // Initial delay before first slide
    timerRef.current = setTimeout(() => {
      setImgIndex((prev) =>
        prev < product.images.length - 1 ? prev + 1 : prev
      );

      // Continue sliding images at interval
      timerRef.current = setInterval(() => {
        setImgIndex((prev) => {
          if (prev === product.images.length - 1) {
            clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 2200);//1.4 sec pause + 0.8 sec animation
    }, 500);
  };

  /* =======================
     Stop Image Slide on Mouse Leave
  ======================= */
  const stopHover = () => {
    clearTimeout(timerRef.current);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setImgIndex(0); // reset to first image
  };

  /* =======================
     Add Product to Cart + Show Toast
  ======================= */
  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent parent click/hover issues

    dispatch(addToCart(product)); // add/update product in Redux cart

    toast.success(`${product.BrandName} ${product.Individual_category} added to bag`, {
      icon: "🛍️",
    });
  };

  return (
    <div
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      className="group bg-white rounded-sm shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
    >
      {/* =======================
          Product Image Section
      ======================= */}
      <div className="relative w-full mt-2 h-[260px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={product.images[imgIndex]}
            alt={product.Description}
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </AnimatePresence>
      </div>

      {/* =======================
          Product Details Section
      ======================= */}
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 truncate">
          {product.BrandName || "Brand"}
        </p>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {product.Description}
        </p>

        {/* =======================
            Price Details
        ======================= */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm font-semibold text-gray-900">
            ₹{product["DiscountPrice (in Rs)"]}
          </span>

          <span className="text-xs text-gray-400 line-through">
            ₹{product["OriginalPrice (in Rs)"]}
          </span>

          <span className="text-xs font-semibold text-pink-600">
            {product.DiscountOffer}
          </span>
        </div>

        {/* =======================
            Add To Cart Button
        ======================= */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 border border-pink-600 text-pink-600 
                     text-sm font-semibold py-2 rounded
                     hover:bg-pink-600 hover:text-white
                     transition duration-300"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
