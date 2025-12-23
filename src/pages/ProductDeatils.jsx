import { useParams, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { addToCart } from "../features/cart/cartSlice";
import { useGetAllProductsQuery } from "../services/productsApi/productsApi";
import { useGetAllClothesQuery } from "../services/kidsApi/kidsApi";
import { useGetallBeautyProductsQuery } from "../services/beautyApi/beautyApi";
import { getProductId } from "../utils/getProductId";

function ProductDetails() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useGetAllProductsQuery();
  const kids = useGetAllClothesQuery();
  const beauty = useGetallBeautyProductsQuery();

  if (products.isLoading || kids.isLoading || beauty.isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  let data = [];

  if (type === "kids") {
    data = [
      ...(kids.data?.kidsClothes?.boys || []),
      ...(kids.data?.kidsClothes?.girls || []),
    ];
  } else if (type === "beauty") {
    const categories = beauty.data?.categories || {};

    data = Object.values(categories)
      .flat()
      .flatMap((group) =>
        group.products.map((product) => ({
          ...product,
          brand: group.brand,
        }))
      );
  } else {
    data = products.data || [];
  }

  const product = data.find((item) => String(getProductId(item)) === id);

  if (!product) return <p className="text-center">Product not found</p>;

  const images =
    product.images?.length > 0
      ? product.images
      : ["https://via.placeholder.com/400x500"];


  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Item added to bag");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm">
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT: Images */}
        <div className="grid grid-cols-2 gap-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="product"
              className="w-full rounded-md border"
            />
          ))}
        </div>

        {/* RIGHT: Details */}
        <div className="mt-24">
          {/* BRAND */}
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.brand || product.BrandName}
          </h1>

          {/* PRODUCT NAME */}
          <p className="text-lg text-gray-700 mt-1">
            {product.name || product.productName}
          </p>

          {/* DESCRIPTION */}
          <p className="text-gray-600 my-4">
            {product.description || product.Description}
          </p>

          {/* PRICE */}
          <p className="text-2xl font-bold mb-6">
            ₹
            {product.discountPrice ||
              product["DiscountPrice (in Rs)"] ||
              product.price}
          </p>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="bg-pink-600 text-white px-6 py-3 rounded"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
