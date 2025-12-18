import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { getProductId } from "../../utils/getProductId";

function WishlistButton({ product }) {
  const dispatch = useDispatch();
  const productId = getProductId(product);
  // const wishlist = useSelector((state) => state.wishlist.items);
  // console.log("Wishlist:", wishlist);

  const isWishlisted = useSelector((state) => {
    if (!productId) return false;

    return state.wishlist.items.some(
      (item) => getProductId(item) === productId
    );
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (!productId) return;

    dispatch(toggleWishlist(product));
  };

  return (
    <button
      onClick={handleClick}
      className="absolute top-3 right-3 z-10
                 bg-white p-2 rounded-full shadow
                 hover:scale-110 transition"
    >
      <Heart
        size={18}
        className={
          isWishlisted ? "fill-pink-600 text-pink-600" : "text-gray-400"
        }
      />
    </button>
  );
}

export default WishlistButton;
