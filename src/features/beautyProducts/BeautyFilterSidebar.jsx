import React, { useMemo } from "react";

function BeautyFilterSidebar({ products, filters, setFilters }) {
  // unique brands
  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))],
    [products]
  );

  // unique categories
  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

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
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold mb-4">FILTERS</h3>

      {/* Brand */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Brand</h4>
        {brands.map((brand) => (
          <label key={brand} className="flex gap-2 text-sm mb-1">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Category */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Category</h4>
        {categories.map((category) => (
          <label key={category} className="flex gap-2 text-sm mb-1">
            <input
              type="checkbox"
              checked={filters.categories.includes(category)}
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </div>

      {/* Price */}
      <div>
        <h4 className="font-medium mb-2">Price</h4>
        <select
          className="w-full border rounded px-2 py-1 text-sm"
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
