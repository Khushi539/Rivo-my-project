import React, { useState } from "react";
import DashboardMain from "../DashboardLayout/DashboardMain";
import { RxCross2 } from "react-icons/rx";

const Automotive = () => {
  const [filters, setFilters] = useState({
  page: "Automotive",
  category: ["FourWheelers"],     
  brand: "Hyundai",
  minPrice: 0,
  maxPrice: 200000,
  sort: "priceLow",
  search: "",
});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ["FourWheelers"];
  const brands = ["Hyundai", "All"];

  const toggleCategory = (cat) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat],
    }));
  };

  const handleBrand = (e) =>
    setFilters((prev) => ({ ...prev, brand: e.target.value }));

  const handleSort = (e) =>
    setFilters((prev) => ({ ...prev, sort: e.target.value }));

  const handleSearch = (e) =>
    setFilters((prev) => ({ ...prev, search: e.target.value }));

  return (
    <div className="md:p-4 p-2">
      <h2 className="text-3xl font-medium md:text-4xl font-roboto text-[#224F34] text-center py-4">
        Automotive Accessories
      </h2>

      <div className="flex justify-end mb-4 md:hidden">
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="bg-[#7DA38C] text-white px-4 py-2 rounded"
        >
          Filters
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div
          className={`fixed inset-0 z-50 bg-white w-64 p-4 shadow-lg overflow-auto transform transition-transform duration-300
          md:relative md:translate-x-0 md:block
          ${mobileFilterOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex justify-end md:hidden mb-4">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="text-gray-600 text-xl"
            >
              <RxCross2 />
            </button>
          </div>

          <h3 className="font-medium mb-2">Search</h3>
          <input
            type="text"
            placeholder="Search Home & Furniture..."
            value={filters.search}
            onChange={handleSearch}
            className="border px-3 py-1 rounded w-full mb-4"
          />

          <h3 className="font-medium mb-2">Categories</h3>
          <div className="flex flex-col gap-2 mb-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-3 py-1 rounded text-sm text-left ${
                  filters.category.includes(cat)
                    ? "bg-[#7DA38C] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <h3 className="font-medium mb-2">Brand</h3>
          <select
            value={filters.brand}
            onChange={handleBrand}
            className="border px-3 py-1 rounded w-full mb-4"
          >
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <h3 className="font-medium mb-2">Sort By</h3>
          <select
            value={filters.sort}
            onChange={handleSort}
            className="border px-3 py-1 rounded w-full"
          >
            <option value="priceLow">Price Low to High</option>
            <option value="priceHigh">Price High to Low</option>
          </select>
        </div>

        <div className="flex-1 h-[calc(100vh-100px)] overflow-auto">
          <DashboardMain title="" titleClaasname="" filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default Automotive;