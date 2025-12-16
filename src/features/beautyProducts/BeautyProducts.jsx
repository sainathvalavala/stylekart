import React, { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "../products/ProductCard";
import BeautyFilterSidebar from "./BeautyFilterSidebar";
import { useGetallBeautyProductsQuery } from "../../services/BeautyApi/beautyApi";

function BeautyProducts() {
  const { isLoading, data } = useGetallBeautyProductsQuery();

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    price: null,
  });

  // ✅ FLATTEN BEAUTY DATA
  const beautyProducts = useMemo(() => {
    if (!data?.categories) return [];

    const result = [];

    Object.entries(data.categories).forEach(
      ([categoryName, brandGroups]) => {
        brandGroups.forEach((group) => {
          group.products.forEach((product) => {
            result.push({
              ...product,
              brand: group.brand,
              category: categoryName,
            });
          });
        });
      }
    );

    return result;
  }, [data]);

  // ✅ APPLY FILTERS
  const filteredBeautyProducts = useMemo(() => {
    return beautyProducts.filter((p) => {
      const brandMatch =
        filters.brands.length === 0 ||
        filters.brands.includes(p.brand);

      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(p.category);

      const priceMatch =
        !filters.price || p.discountPrice <= filters.price;

      return brandMatch && categoryMatch && priceMatch;
    });
  }, [beautyProducts, filters]);

  // loader
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-8 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Beauty</h2>

      <div className="grid grid-cols-12 gap-6">
        {/* Filters */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <BeautyFilterSidebar
            products={beautyProducts}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Products */}
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          {filteredBeautyProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredBeautyProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BeautyProducts;
