import { useSelector } from "react-redux";
import ProductCard from "../components/products/ProductCard";

function Wishlist() {
  const items = useSelector((state) => state.wishlist.items);

  // console.log("Wishlist page items:", items);

  if (!items || items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">
          Your wishlist is empty ❤️
        </h2>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">My Wishlist</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((product) => (
          <ProductCard
            key={product.Product_id || product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
