
import React, { useMemo, useState } from "react";
import { useGetAllProductsQuery } from "../../services/productsApi";
import ProductCard from "./ProductCard";
import FilterSidebar from "../filter/FilterSidebar";

function Products() {
  const { isLoading, data } = useGetAllProductsQuery();
//filter logic 
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    price: null,
  });

  const filteredProducts = useMemo(() => {
    if (!data) return [];

    return data.filter((p) => {
      const brandMatch =
        filters.brands.length === 0 ||
        filters.brands.includes(p.BrandName);

      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(p.Individual_category);

      const priceMatch =
        !filters.price ||
        Number(p["DiscountPrice (in Rs)"]) <= filters.price;

      return brandMatch && categoryMatch && priceMatch;
    });
  }, [data, filters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h2 className="text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-8 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Products</h2>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT FILTER */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <FilterSidebar products={data} filters={filters} setFilters={setFilters} />
        </div>

        {/* RIGHT PRODUCTS */}
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.Product_id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;



//-----------main code 
// import React from "react";
// import { useGetAllProductsQuery } from "../../services/productsApi";
// import ProductCard from "./ProductCard";

// function Products() {
//   const { isLoading, data } = useGetAllProductsQuery();

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <h2 className="text-lg font-semibold">Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="px-6 md:px-12 py-8 bg-gray-50">
//       <h2 className="text-xl font-semibold mb-6">Products</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {data?.map((product) => (

//           //refactoring
          
//           <ProductCard key={product.Product_id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;
// ------------main code 

// import React from "react";
// import { useGetAllProductsQuery } from "../../services/productsApi";

// function Products() {
//   const { isLoading, data } = useGetAllProductsQuery();

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <h2 className="text-lg font-semibold">Loading...</h2>
//       </div>
//     );
//   }

//   return (
//     <div className="px-6 md:px-12 py-8 bg-gray-50">
//       <h2 className="text-xl font-semibold mb-6">Products</h2>

//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
//         {data?.map((product, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-sm shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
//           >
//             {/* Image */}
//             <div className="w-full h-[260px] overflow-hidden">
//               <img
//                 src={product.images.at(-1)}
//                 alt={product.Description}
//                 className="w-full h-64 object-contain rounded-lg"
//               />
//             </div>

//             {/* Text */}
//             <div className="p-3">
//               <p className="text-sm font-medium text-gray-800 truncate">
//                 {product.BrandName || "Brand"}
//               </p>

//               <p className="text-xs text-gray-500 mt-1 line-clamp-2">
//                 {product.Description}
//               </p>

//               <div className="flex items-center gap-2 mt-2">
//                 <span className="text-sm font-semibold text-gray-900">
//                   ₹{product["DiscountPrice (in Rs)"]}
//                 </span>

//                 <span className="text-xs text-gray-400 line-through">
//                   ₹{product["OriginalPrice (in Rs)"]}
//                 </span>

//                 <span className="text-xs font-semibold text-pink-600">
//                   {product.DiscountOffer}
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Products;

// // import React from "react";
// // import { useGetAllProductsQuery } from "../../services/productsApi";

// // function Products() {
// //   let { isLoading, data } = useGetAllProductsQuery();
// //   return (
// //     <div>
// //       <h2>Products</h2>
// //       {isLoading && <h2>Loading...</h2>}
// //       {!isLoading && (
// //         <ul>
// //           {data.map((product, index) => (
// //             <div>
// //               <li key={index}>
// //                 <img
// //                   src={product.images[product.images.length - 1]}
// //                   alt="product"
// //                 />
// //               </li>
// //               <li key={index}>{product.Description}</li>
// //               {/* // <li key={index}>{product.Description}</li>
// //             // <li key={index}>{product.Description}</li> */}
// //             </div>
// //           ))}
// //         </ul>
// //       )}
// //     </div>
// //   );
// // }

// // export default Products;
