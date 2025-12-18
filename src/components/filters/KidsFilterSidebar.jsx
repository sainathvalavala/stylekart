import React, { useMemo } from "react";

function KidsFilterSidebar({ products, filters, setFilters }) {
  // ✅ UNIQUE BRANDS
  const brands = useMemo(() => {
    return [...new Set(products.map((p) => p.brand))];
  }, [products]);

  // ✅ UNIQUE CATEGORIES
  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  // ✅ HANDLERS
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
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      price: value === "all" ? null : Number(value),
    }));
  };

  return (
    <div className="border rounded-lg p-4 bg-white">
      <h3 className="font-semibold mb-4">FILTERS</h3>

      {/* BRAND */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="mb-6">
        <h4 className="font-medium mb-2">Category</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => toggleCategory(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h4 className="font-medium mb-2">Price</h4>
        <select
          className="w-full border rounded px-2 py-1 text-sm"
          value={filters.price ?? "all"}
          onChange={handlePriceChange}
        >
          <option value="all">All</option>
          <option value="500">Under ₹500</option>
          <option value="1000">Under ₹1000</option>
          <option value="1500">Under ₹1500</option>
          <option value="2000">Under ₹2000</option>
        </select>
      </div>
    </div>
  );
}

export default KidsFilterSidebar;
