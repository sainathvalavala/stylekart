import React, { useMemo, useState, useEffect } from "react";
import { Loader2, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import KidsFilterSidebar from "../components/filters/KidsFilterSidebar";
import MobileFilterDrawer from "../components/filters/MobileFilterDrawer";
import { useGetAllClothesQuery } from "../services/kidsApi/kidsApi";

function Kids() {
  const { isLoading, data } = useGetAllClothesQuery();

  /* =======================
     FILTER STATE
  ======================= */
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    price: null,
  });

  /* =======================
     MOBILE FILTER DRAWER
  ======================= */
  const [openFilter, setOpenFilter] = useState(false);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = openFilter ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [openFilter]);

  /* =======================
     FLATTEN BOYS + GIRLS
  ======================= */
  const kidsProducts = useMemo(() => {
    if (!data?.kidsClothes) return [];
    const boys = data.kidsClothes.boys || [];
    const girls = data.kidsClothes.girls || [];
    return [...boys, ...girls];
  }, [data]);

  /* =======================
     APPLY FILTERS
  ======================= */
  const filteredKidsProducts = useMemo(() => {
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

  /* =======================
     LOADING
  ======================= */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
      </div>
    );
  }

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="px-4 md:px-12 bg-gray-50">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-3">Kids</h2>

      {/* MOBILE FILTER BUTTON */}
      <div className="flex justify-end mb-4 md:hidden">
        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-2 px-4 py-2
                     bg-white border rounded-full
                     text-sm font-medium"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* DESKTOP FILTER */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <KidsFilterSidebar
            products={kidsProducts}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* PRODUCTS GRID */}
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

      {/* MOBILE FILTER DRAWER */}
      <MobileFilterDrawer
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <KidsFilterSidebar
          products={kidsProducts}
          filters={filters}
          setFilters={setFilters}
        />
      </MobileFilterDrawer>
    </div>
  );
}

export default Kids;
