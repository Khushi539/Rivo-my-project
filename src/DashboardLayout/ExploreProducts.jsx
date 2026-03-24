import React, { useEffect, useMemo, useState } from "react";
import DashboardMain from "./DashboardMain";
import { FaRegStar } from "react-icons/fa";
import Heading from "../Style/Heading";
const PRODUCTS = [
  { id: 1, title: "Wireless Headphones", category: "Electronics", price: 1999, rating: 4.5, brand: "Boat", image: "https://via.placeholder.com/200" },
  { id: 2, title: "Smart Watch", category: "Electronics", price: 2999, rating: 4.2, brand: "Noise", image: "https://via.placeholder.com/200" },
  { id: 3, title: "Men T-Shirt", category: "Fashion", price: 599, rating: 4.0, brand: "Puma", image: "https://via.placeholder.com/200" },
  { id: 4, title: "Women Dress", category: "Fashion", price: 1499, rating: 4.6, brand: "Zara", image: "https://via.placeholder.com/200" },
  { id: 5, title: "Mixer Grinder", category: "Home", price: 3499, rating: 4.3, brand: "Philips", image: "https://via.placeholder.com/200" },
  { id: 6, title: "Face Cream", category: "Beauty", price: 399, rating: 3.9, brand: "Lakme", image: "https://via.placeholder.com/200" },
];

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty"];
const brands = ["All", "Boat", "Noise", "Puma", "Zara", "Philips", "Lakme"];

export default function ExploreProducts() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");

  const filteredProducts = useMemo(() => {
    let data = PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category) &&
      (brand === "All" || p.brand === brand) &&
      p.price >= minPrice &&
      p.price <= maxPrice &&
      p.rating >= rating
    );

    if (sort === "priceLow") data.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") data.sort((a, b) => b.price - a.price);
    if (sort === "rating") data.sort((a, b) => b.rating - a.rating);

    return data;
  }, [search, category, brand, minPrice, maxPrice, rating, sort]);

  return (
    <div>
      <div>
        <Heading text="Our products"></Heading>
      </div>
  
    <div className="flex gap-6   min-h-screen">
      <aside className="w-174 hidden h-[fit-content]  bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-medium mb-4">Filters</h2>

        <input
          type="text"
          placeholder="Search products"
          className="w-full border p-2 rounded mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="mb-4 hidden">
          <p className="font-medium mb-2">Category</p>
          {categories.map((c) => (
            <label key={c} className="block text-sm cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={category === c}
                onChange={() => setCategory(c)}
              />{" "}{c}
            </label>
          ))}
        </div>

        <div className="mb-4 hidden">
          <p className="font-medium mb-2">Brand</p>
          <select
            className="w-full border p-2 rounded cursor-pointer"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          >
            {brands.map((b) => (
              <option className="curso" key={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="mb-4 hidden">
          <p className="font-medium mb-2">Price</p>
          <div className="flex gap-2">
            <input
              type="number"
              className="w-1/2 border p-1 rounded"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
            <input
              type="number"
              className="w-1/2 border p-1 rounded"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mb-4">
          <p className="font-medium hidden mb-2">Rating</p>
          <select
            className="w-full border p-2 rounded"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={0}>All</option>
            <option value={4}>4★ & above</option>
            <option value={3}>3★ & above</option>
          </select>
        </div>
      </aside>
      

    <div>
    
      <main className="flex-1 mt-[35px]">
        <div className="flex hidden justify-between items-center mb-4">
          <select
            className="border p-2 rounded cursor-pointer"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="" className="cursor-pointer">Sort By</option>
            <option value="priceLow" className="cursor-pointer">Price: Low to High</option>
            <option value="priceHigh" className="cursor-pointer">Price: High to Low</option>
            <option value="rating" className="cursor-pointer">Rating</option>
          </select>
        </div>

        
         <div className="">
              <DashboardMain
            apiUrl="/user/get-products"
             filters={{
                     search,
                     category,
                     brand,
                     minPrice,
                     maxPrice,
                     rating,
                     sort,
                   }}
            />
         </div>
      </main>
     </div> 
    </div>
  </div> 
  );
}
