import React from "react";

function FilterSidebar({ products, filters, setFilters }) {
  const brands = [...new Set(products.map((p) => p.BrandName))];
  const categories = [...new Set(products.map((p) => p.Individual_category))];

  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const exists = prev[type].includes(value);
      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((v) => v !== value)
          : [...prev[type], value],
      };
    });
  };

  return (
    <div className="bg-white border rounded-sm p-4 sticky top-20">
      <h3 className="font-semibold text-sm mb-4">FILTERS</h3>

      {/* BRAND */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Brand</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => toggleFilter("brands", brand)}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* CATEGORY */}
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Category</h4>
        <div className="space-y-2  max-h-48 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleFilter("categories", cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h4 className="text-sm font-medium mb-2">Price</h4>
        <select
          className="w-full border text-sm p-1"
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              price: e.target.value ? Number(e.target.value) : null,
            }))
          }
        >
          <option value="">All</option>
          <option value="1000">Below ₹1000</option>
          <option value="2000">Below ₹2000</option>
          <option value="3000">Below ₹3000</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSidebar;
