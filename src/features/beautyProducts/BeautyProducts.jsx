import React, { useMemo, useState, useEffect } from "react";
import { Loader2, SlidersHorizontal } from "lucide-react";
import ProductCard from "../products/ProductCard";
import BeautyFilterSidebar from "./BeautyFilterSidebar";
import MobileFilterDrawer from "../../components/MobileFilterDrawer";
import { useGetallBeautyProductsQuery } from "../../services/BeautyApi/beautyApi";

function BeautyProducts() {
  const { isLoading, data } = useGetallBeautyProductsQuery();

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

  /* Lock background scroll when filter drawer is open */
  useEffect(() => {
    document.body.style.overflow = openFilter ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [openFilter]);

  /* =======================
     FLATTEN BEAUTY DATA
  ======================= */
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

  /* =======================
     APPLY FILTERS
  ======================= */
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
    <div className="px-4 md:px-12 bg-gray-50">
      {/* Heading */}
      <h2 className="text-xl font-semibold mb-3">Beauty</h2>

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
          <BeautyFilterSidebar
            products={beautyProducts}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* PRODUCTS GRID */}
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

      {/* MOBILE FILTER DRAWER */}
      <MobileFilterDrawer
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <BeautyFilterSidebar
          products={beautyProducts}
          filters={filters}
          setFilters={setFilters}
        />
      </MobileFilterDrawer>
    </div>
  );
}

export default BeautyProducts;
