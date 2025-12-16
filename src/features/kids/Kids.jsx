import React, { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "../products/ProductCard";
import KidsFilterSidebar from "../filter/KidsFilterSidebar";
import { useGetAllClothesQuery } from "../../services/kidsApi/KidsApi";

function Kids() {
  const { isLoading, data } = useGetAllClothesQuery();

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    price: null,
  });

  // ✅ STEP 1: FLATTEN BOYS + GIRLS
  const kidsProducts = useMemo(() => {
    if (!data?.kidsClothes) return [];

    const boys = data.kidsClothes.boys || [];
    const girls = data.kidsClothes.girls || [];

    return [...boys, ...girls];
  }, [data]);

  // ✅ STEP 2: APPLY FILTERS
  const filteredKidsProducts = useMemo(() => {
    if (!kidsProducts.length) return [];

    return kidsProducts.filter((p) => {
      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(p.brand);

      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(p.category);

      const priceMatch = !filters.price || p.price <= filters.price;

      return brandMatch && categoryMatch && priceMatch;
    });
  }, [kidsProducts, filters]);

  // ✅ LOADER
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 py-8 bg-gray-50">
      <h2 className="text-xl font-semibold mb-6">Kids</h2>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT FILTER */}
        <div className="col-span-12 md:col-span-3 lg:col-span-2">
          <KidsFilterSidebar
            products={kidsProducts}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* RIGHT PRODUCTS */}
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          {filteredKidsProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {filteredKidsProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Kids;
