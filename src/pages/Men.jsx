import React, { useMemo, useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../services/productsApi/productsApi";
import { Loader2, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import FilterSidebar from "../components/filters/FilterSidebar";
import MobileFilterDrawer from "../components/filters/MobileFilterDrawer";

function Men() {
  /* =======================
     FETCH ALL PRODUCTS
  ======================= */
  const { isLoading, data } = useGetAllProductsQuery();

  /* =======================
     FILTER STATE
     (shared by desktop + mobile)
  ======================= */
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    price: null,
  });

  /* =======================
     MOBILE FILTER DRAWER STATE
  ======================= */
  const [openFilter, setOpenFilter] = useState(false);

  /* =======================
     LOCK BODY SCROLL
     When mobile filter is open
  ======================= */
  useEffect(() => {
    document.body.style.overflow = openFilter ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openFilter]);

  /* =======================
     ONLY MEN PRODUCTS
  ======================= */
  const menProducts = useMemo(() => {
    return (
      data?.filter((product) => product.category_by_Gender === "Men") || []
    );
  }, [data]);

  /* =======================
     APPLY FILTERS ON MEN PRODUCTS
  ======================= */
  const filteredMenProducts = useMemo(() => {
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

  /* =======================
     LOADING STATE
  ======================= */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
      </div>
    );
  }

  /* =======================
     RENDER UI
  ======================= */
  return (
    <div className="px-4 md:px-12 bg-gray-50">
      <h2 className="text-xl font-semibold mb-1">Men</h2>

      {/* =======================
          MOBILE FILTER BUTTON
          (VISIBLE ONLY ON MOBILE)
      ======================= */}
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
        {/* =======================
            DESKTOP FILTER SIDEBAR
            - hidden on mobile
            - visible from md+
        ======================= */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <FilterSidebar
            products={menProducts}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* =======================
            PRODUCTS GRID
        ======================= */}
        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredMenProducts.map((item) => (
              <ProductCard key={item.Product_id} product={item} />
            ))}
          </div>
        </div>
      </div>

      {/* =======================
          MOBILE FILTER DRAWER
          (REUSES SAME FILTERSIDEBAR)
      ======================= */}
      <MobileFilterDrawer
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <FilterSidebar
          products={menProducts}
          filters={filters}
          setFilters={setFilters}
        />
      </MobileFilterDrawer>
    </div>
  );
}

export default Men;
