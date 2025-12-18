import React, { useMemo, useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../../services/ProductsApi/productsApi";
import { Loader2, SlidersHorizontal } from "lucide-react";
import ProductCard from "./ProductCard";
import FilterSidebar from "../filter/FilterSidebar";
import MobileFilterDrawer from "../../components/MobileFilterDrawer";

function Products() {
  const { isLoading, data } = useGetAllProductsQuery();

  /* =======================
     FILTER STATE
  ======================= */
  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    price: null,
  });

  const [openFilter, setOpenFilter] = useState(false);

  /* =======================
     LOCK BODY SCROLL (MOBILE FILTER)
  ======================= */
  useEffect(() => {
    if (openFilter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openFilter]);

  /* =======================
     FILTER LOGIC
  ======================= */
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
     RENDER
  ======================= */
  return (
    <div className="px-4 md:px-12 py-6 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Products</h2>

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
        {/* DESKTOP FILTER SIDEBAR */}
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <FilterSidebar
            products={data}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* PRODUCTS GRID */}
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

      {/* MOBILE FILTER DRAWER */}
      <MobileFilterDrawer
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <FilterSidebar
          products={data}
          filters={filters}
          setFilters={setFilters}
        />
      </MobileFilterDrawer>
    </div>
  );
}

export default Products;
