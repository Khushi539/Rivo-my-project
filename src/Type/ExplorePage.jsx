import React, { useState } from 'react';
import { 
  ArrowLeft, Filter, SlidersHorizontal, 
  ChevronDown, Star, ShoppingCart 
} from 'lucide-react';
import { IoMdHeartEmpty } from "react-icons/io";
const products = [
  { id: 1, name: "Premium Leather Bag", price: "$120", category: "Fashion & Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400" },
  { id: 2, name: "FootWear", price: "$299", category: "Fashion & Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 3, name: "jewelry.", price: "$25", category: "Fashion & Apparel", rating: 4.7, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 4, name: "premium Cloth", price: "$45", category: "Fashion & Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1570172619380-4101bdce470c?auto=format&fit=crop&q=80&w=400" },
  { id: 5, name: "Premium Leather Bag", price: "$120", category: "Fashion & Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400" },
  { id: 6, name: "FootWear", price: "$299", category: "Fashion & Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 7, name: "jewelry.", price: "$25", category: "Fashion & Apparel", rating: 4.7, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 8, name: "premium Cloth", price: "$45", category: "Fashion & Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1570172619380-4101bdce470c?auto=format&fit=crop&q=80&w=400" },
  { id: 9, name: "Premium Leather Bag", price: "$120", category: "Fashion & Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400" },
  { id: 10, name: "FootWear", price: "$299", category: "Fashion & Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 11, name: "jewelry.", price: "$25", category: "Fashion & Apparel", rating: 4.7, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 12, name: "premium Cloth", price: "$45", category: "Fashion & Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1570172619380-4101bdce470c?auto=format&fit=crop&q=80&w=400" },
  { id: 13, name: "Premium Leather Bag", price: "$120", category: "Fashion & Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400" },
  { id: 14, name: "FootWear", price: "$299", category: "Fashion & Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 15, name: "jewelry.", price: "$25", category: "Fashion & Apparel", rating: 4.7, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 16, name: "premium Cloth", price: "$45", category: "Fashion & Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1570172619380-4101bdce470c?auto=format&fit=crop&q=80&w=400" },
  { id: 17, name: "Premium Leather Bag", price: "$120", category: "Fashion & Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400" },
  { id: 18, name: "FootWear", price: "$299", category: "Fashion & Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 19, name: "jewelry.", price: "$25", category: "Fashion & Apparel", rating: 4.7, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 20, name: "premium Cloth", price: "$45", category: "Fashion & Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1570172619380-4101bdce470c?auto=format&fit=crop&q=80&w=400" },
  { id: 21, name: "Premium Leather Bag", price: "$120", category: "Fashion & Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400" },
  { id: 22, name: "FootWear", price: "$299", category: "Fashion & Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 23, name: "jewelry.", price: "$25", category: "Fashion & Apparel", rating: 4.7, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 24, name: "premium Cloth", price: "$45", category: "Fashion & Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1570172619380-4101bdce470c?auto=format&fit=crop&q=80&w=400" },
  { id: 25, name: "Premium Leather Bag", price: "$120", category: "Fashion & Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400" },
  { id: 26, name: "FootWear", price: "$299", category: "Fashion & Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 27, name: "jewelry.", price: "$25", category: "Fashion & Apparel", rating: 4.7, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 28, name: "premium Cloth", price: "$45", category: "Fashion & Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1570172619380-4101bdce470c?auto=format&fit=crop&q=80&w=400" },
  { id: 29, name: "Premium Leather Bag", price: "$120", category: "Fashion & Apparel", rating: 4.8, image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=400" },
  { id: 30, name: "FootWear", price: "$299", category: "Fashion & Apparel", rating: 4.9, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
  { id: 31, name: "jewelry.", price: "$25", category: "Fashion & Apparel", rating: 4.7, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=400" },
  { id: 32, name: "premium Cloth", price: "$45", category: "Fashion & Apparel", rating: 4.6, image: "https://images.unsplash.com/photo-1570172619380-4101bdce470c?auto=format&fit=crop&q=80&w=400" },
];

const ExplorePage = ({category, onBack}) => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium hidden sm:inline">Back to Categories</span>
          </button>
          
          <h1 className="text-lg font-bold text-gray-900">{category}</h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-black"><Filter size={20} /></button>
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
               <img src="https://ui-avatars.com/api/?name=User" alt="profile" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Showing 1-12 of 48 results for</p>
            <h2 className="text-2xl font-bold text-gray-900 capitalize">"{category}"</h2>
          </div>
          
          <div className="flex justify-between md:items-center  md:gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50">
              <SlidersHorizontal size={16} /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50">
              Sort by: Newest <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2  transition-all duration-300">
                  <IoMdHeartEmpty size={18} className="text-blue-600" />
                </button>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;