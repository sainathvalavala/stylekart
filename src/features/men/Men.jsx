import React, { useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../../services/productsApi";
import { Loader2 } from "lucide-react";
import ProductCard from "../products/ProductCard";
import FilterSidebar from "../filter/FilterSidebar";

function Men() {
  const { isLoading, data } = useGetAllProductsQuery();

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    price: null,
  });

  //  Only MEN products
  const menProducts = data?.filter(
    (product) => product.category_by_Gender === "Men"
  );

  //  Apply filters on MEN products
  const filteredMenProducts = useMemo(() => {
    if (!menProducts) return [];

    return menProducts.filter((p) => {
      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(p.BrandName);

      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(p.Individual_category);

      const priceMatch =
        !filters.price || Number(p["DiscountPrice (in Rs)"]) <= filters.price;

      return brandMatch && categoryMatch && priceMatch;
    });
  }, [menProducts, filters]);

  //  Conditional return comes AFTER hooks
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-8 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Men</h2>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT FILTER */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <FilterSidebar
            products={menProducts}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* RIGHT PRODUCTS */}
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredMenProducts.map((item) => (
              <ProductCard key={item.Product_id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Men;

// import React from "react";
// import { useGetAllProductsQuery } from "../../services/productsApi";
// import ProductCard from "../products/ProductCard";
// function Men() {
//   const { isLoading, data } = useGetAllProductsQuery();

//   if (isLoading) {
//     return <h2>Loading...</h2>;
//   }

//   const menProducts = data?.filter(
//     (product) => product.category_by_Gender === "Men"
//   );

//   return (
//     <div className="px-6 md:px-12 py-8 bg-gray-50">
//       <h2 className="text-xl font-semibold mb-6">Men</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {menProducts.map((item) => (
//           <ProductCard key={item.Product_id} product={item} />
//         ))}
//       </div>
//     </div>

// <div>
//   <ul>
//     {menProducts?.map((menProduct) => (

//       <MenCard key={menProduct.Product_id} menProduct={menProduct}/>
//     ))}
//   </ul>
// </div>
//   );
// }

// export default Men;
