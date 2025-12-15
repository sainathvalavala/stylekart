import React from "react";
import { useGetAllProductsQuery } from "../../services/productsApi";
import ProductCard from "../products/ProductCard";
function Women() {
  const { isLoading, data } = useGetAllProductsQuery();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  const womenProducts = data?.filter(
    (product) => product.category_by_Gender === "Women"
  );

  return (
    <div className="px-6 md:px-12 py-8 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Women</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {womenProducts.map((item) => (
          <ProductCard key={item.Product_id} product={item} />
        ))}
      </div>
    </div>

    // <div>
    //   <ul>
    //     {menProducts?.map((menProduct) => (

    //       <MenCard key={menProduct.Product_id} menProduct={menProduct}/>
    //     ))}
    //   </ul>
    // </div>
  );
}

export default Women;
