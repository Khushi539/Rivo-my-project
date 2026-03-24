import React, { useState } from 'react';
import { 
  Shirt, Smartphone, Utensils, Sparkles, 
  Home, Hammer, Gamepad2, LayoutGrid, ChevronRight 
} from 'lucide-react';

const categories = [
  { id: 'fashion', title: "Fashion & Apparel", items: ["Clothing", "Footwear", "Jewelry", "Bags"], icon: <Shirt size={20} />, color: "bg-blue-500" },
  { id: 'electronics', title: "Electronics", items: ["Smartphones", "Laptops", "Cameras", "Wearables"], icon: <Smartphone size={20} />, color: "bg-purple-500" },
  { id: 'food', title: "Food & Beverages", items: ["Groceries", "Specialty Drinks", "Snacks"], icon: <Utensils size={20} />, color: "bg-green-500" },
  { id: 'beauty', title: "Beauty & Personal Care", items: ["Skincare", "Cosmetics", "Perfumes", "Hair Care"], icon: <Sparkles size={20} />, color: "bg-pink-500" },
  { id: 'home', title: "Home & Furniture", items: ["Decor", "Lighting", "Rugs", "Furniture"], icon: <Home size={20} />, color: "bg-amber-500" },
  { id: 'hardware', title: "DIY & Hardware", items: ["Tools", "Building Materials", "Home Improvement"], icon: <Hammer size={20} />, color: "bg-slate-700" },
  { id: 'toys', title: "Toys & Hobbies", items: ["Educational", "Collectibles", "Craft Materials"], icon: <Gamepad2 size={20} />, color: "bg-red-500" },
];

const CategoryPartsLayout = () => {
  const [activeTab, setActiveTab] = useState('fashion');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* --- Part 1: Sidebar Navigation (Scrolls horizontally on mobile) --- */}
      <aside className="w-full md:w-72 bg-white border-b md:border-r border-gray-200 flex-shrink-0">
        <div className="p-6 hidden md:block">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <LayoutGrid className="text-blue-600" /> Departments
          </h1>
        </div>
        
        <nav className="flex md:flex-col overflow-x-auto md:overflow-x-visible p-2 md:p-4 gap-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all whitespace-nowrap w-max md:w-full ${
                activeTab === cat.id 
                ? 'bg-blue-50 text-blue-700 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className={`${activeTab === cat.id ? 'text-blue-600' : 'text-gray-400'}`}>
                {cat.icon}
              </span>
              {cat.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* --- Part 2: Main Content Area --- */}
      <main className="flex-1 p-6 md:p-12">
        {categories.filter(c => c.id === activeTab).map((category) => (
          <div key={category.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-8">
              <span className={`inline-block px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider mb-4 ${category.color}`}>
                Department
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group flex items-center justify-between p-5 bg-white border border-gray-200 rounded-xl hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
                >
                  <span className="font-medium text-gray-700 group-hover:text-blue-600">{item}</span>
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default CategoryPartsLayout;