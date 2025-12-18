import React, { useMemo } from "react";

function BeautyFilterSidebar({ products, filters, setFilters }) {
  /* ================================
     UNIQUE BRANDS & CATEGORIES
     ================================ */
  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))],
    [products]
  );

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  /* ================================
     FILTER HANDLERS
     ================================ */
  const toggleBrand = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));
  };

  const toggleCategory = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handlePriceChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      price: e.target.value === "all" ? null : Number(e.target.value),
    }));
  };

  return (
    <div
      className="
        bg-white
        border
        rounded-lg
        p-4
        md:p-5
        shadow-sm
      "
    >
      {/* 
        p-4 → mobile padding
        md:p-5 → slightly more space on desktop
        shadow-sm → subtle elevation like Myntra
      */}

      {/* ================================
         FILTER TITLE
         ================================ */}
      <h3 className="font-semibold text-sm md:text-base mb-4">
        FILTERS
      </h3>

      {/* ================================
         BRAND FILTER
         ================================ */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-3">
          Brand
        </h4>

        <div
          className="
            space-y-2
            max-h-40
            overflow-y-auto
            pr-1
          "
        >
          {/* 
            max-h + overflow-y-auto
            → prevents long brand lists from stretching page
          */}
          {brands.map((brand) => (
            <label
              key={brand}
              className="
                flex
                items-center
                gap-2
                text-sm
                cursor-pointer
                hover:text-pink-600
              "
            >
              <input
                type="checkbox"
                className="accent-pink-600"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span className="truncate">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ================================
         CATEGORY FILTER
         ================================ */}
      <div className="mb-6">
        <h4 className="font-medium text-sm mb-3">
          Category
        </h4>

        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category}
              className="
                flex
                items-center
                gap-2
                text-sm
                cursor-pointer
                hover:text-pink-600
              "
            >
              <input
                type="checkbox"
                className="accent-pink-600"
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              <span className="capitalize">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ================================
         PRICE FILTER
         ================================ */}
      <div>
        <h4 className="font-medium text-sm mb-3">
          Price
        </h4>

        <select
          className="
            w-full
            border
            rounded-md
            px-3
            py-2
            text-sm
            focus:outline-none
            focus:ring-2
            focus:ring-pink-500
          "
          value={filters.price ?? "all"}
          onChange={handlePriceChange}
        >
          <option value="all">All</option>
          <option value="300">Under ₹300</option>
          <option value="500">Under ₹500</option>
          <option value="800">Under ₹800</option>
          <option value="1000">Under ₹1000</option>
        </select>
      </div>
    </div>
  );
}

export default BeautyFilterSidebar;
