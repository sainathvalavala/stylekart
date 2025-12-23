import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import WishlistButton from "../wishlist/WishlistButton";
import { useNavigate } from "react-router-dom";
import { getProductId } from "../../utils/getProductId";

function ProductCard({ product, type }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productId = getProductId(product);

  /* =======================
     DATA NORMALIZATION
  ======================= */
  const brand =
    product.BrandName ||
    product.brand ||
    "Brand";

  const description =
    product.Description ||
    product.description ||
    product.productName ||
    product.name ||
    "";

  const originalPrice =
    product["OriginalPrice (in Rs)"] ||
    product.originalPrice ||
    product.price ||
    "";

  const discountedPrice =
    product["DiscountPrice (in Rs)"] ||
    product.discountPrice ||
    "";

  const discountOffer =
    product.DiscountOffer ||
    product.discountOffer ||
    "";

  const images =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : ["https://via.placeholder.com/300x400?text=No+Image"];

  /* =======================
     IMAGE HOVER LOGIC
  ======================= */
  const [imgIndex, setImgIndex] = useState(0);
  const timerRef = useRef(null);

  const startHover = () => {
    if (timerRef.current || images.length <= 1) return;

    timerRef.current = setTimeout(() => {
      setImgIndex((prev) => Math.min(prev + 1, images.length - 1));

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

  const stopHover = () => {
    clearTimeout(timerRef.current);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setImgIndex(0);
  };

  /* =======================
     ADD TO CART
  ======================= */
  const handleAddToCart = (e) => {
    e.stopPropagation(); // 🔴 important
    dispatch(addToCart(product));
    toast.success("Item added to bag");
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <div
      onClick={() => navigate(`/product/${type}/${productId}`)} // ✅ NAVIGATION
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      className="bg-white rounded-sm shadow-sm 
                 hover:shadow-lg transition cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative w-full h-[260px] overflow-hidden">
        <div onClick={(e) => e.stopPropagation()}>
          <WishlistButton product={product} />
        </div>

        <AnimatePresence mode="wait">
          <motion.img
            key={imgIndex}
            src={images[imgIndex]}
            alt={description}
            className="absolute inset-0 w-full h-full object-contain"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
      </div>

      {/* DETAILS */}
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 truncate">
          {brand}
        </p>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2 mt-2">
          {discountedPrice ? (
            <>
              <span className="text-sm font-semibold text-gray-900">
                ₹{discountedPrice}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice}
              </span>
              {discountOffer && (
                <span className="text-xs font-semibold text-pink-600">
                  {discountOffer}
                </span>
              )}
            </>
          ) : (
            <span className="text-sm font-semibold text-gray-900">
              ₹{originalPrice}
            </span>
          )}
        </div>

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
