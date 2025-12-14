import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const timerRef = useRef(null);

  const startHover = () => {
    if (timerRef.current) return;
    if (!product.images || product.images.length <= 1) return;

    // Initial 1s wait
    timerRef.current = setTimeout(() => {
      setImgIndex((prev) =>
        prev < product.images.length - 1 ? prev + 1 : prev
      );

      // Then slide every (pause + animation)
      timerRef.current = setInterval(() => {
        setImgIndex((prev) => {
          if (prev === product.images.length - 1) {
            clearInterval(timerRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 2200); // 1.4s pause + 0.8s animation
    }, 500);
  };

  const stopHover = () => {
    clearTimeout(timerRef.current);
    clearInterval(timerRef.current);
    timerRef.current = null;
    setImgIndex(0);
  };

  return (
    <div
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      className="bg-white rounded-sm shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
    >
      {/* Image */}
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
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
          />
        </AnimatePresence>
      </div>

      {/* Text */}
      <div className="p-3">
        <p className="text-sm font-medium text-gray-800 truncate">
          {product.BrandName || "Brand"}
        </p>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
          {product.Description}
        </p>

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
      </div>
    </div>
  );
}

export default ProductCard;
