import React, { useMemo, useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../services/productsApi/productsApi";
import { Loader2, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/products/ProductCard";
import FilterSidebar from "../components/filters/FilterSidebar";
import MobileFilterDrawer from "../components/filters/MobileFilterDrawer";

function Women() {
  const { isLoading, data } = useGetAllProductsQuery();

  const womenProducts = useMemo(
    () => data?.filter((p) => p.category_by_Gender === "Women") || [],
    [data]
  );

  const [filters, setFilters] = useState({
    brands: [],
    categories: [],
    price: null,
  });

  const [openFilter, setOpenFilter] = useState(false);

  useEffect(() => {
    document.body.style.overflow = openFilter ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [openFilter]);

  const filteredProducts = useMemo(() => {
    return womenProducts.filter((p) => {
      const brandMatch =
        filters.brands.length === 0 || filters.brands.includes(p.BrandName);

      const categoryMatch =
        filters.categories.length === 0 ||
        filters.categories.includes(p.Individual_category);

      const priceMatch =
        !filters.price || Number(p["DiscountPrice (in Rs)"]) <= filters.price;

      return brandMatch && categoryMatch && priceMatch;
    });
  }, [womenProducts, filters]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="w-10 h-10 text-pink-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Women</h2>

      <div className="flex justify-end mb-4 md:hidden">
        <button
          onClick={() => setOpenFilter(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-full text-sm"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="hidden md:block md:col-span-3 lg:col-span-2">
          <FilterSidebar
            products={womenProducts}
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        <div className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.Product_id} product={product} type="women"/>
            ))}
          </div>
        </div>
      </div>

      <MobileFilterDrawer
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <FilterSidebar
          products={womenProducts}
          filters={filters}
          setFilters={setFilters}
        />
      </MobileFilterDrawer>
    </div>
  );
}

export default Women;
