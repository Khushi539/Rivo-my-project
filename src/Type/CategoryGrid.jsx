import React from 'react';

import { useNavigate } from 'react-router-dom';

import Heading from "../Style/Heading";
import { 
ChevronRight 
} from 'lucide-react';



const CategoryGrid = ({showViewAll = true, categories=[]}) => {
  const navigate = useNavigate();
  return (
    <section className=" py-8 bg-white">
      <div className=" mx-auto">
        <h3 className="text-2xl  font-medium md:text-4xl  font-roboto text-[#224F34]  text-center">
            Browse by Category
          </h3>
            <p className="text-center text-[#016630] font-medium mt-4 md:mt-[35px]">
              Everything you need, organized and ready to explore.
            </p>
         {showViewAll &&(
          <div className="flex justify-self-end md:flex-row md:items-end justify-between mt-5 md:mt-0 md:mb-10 gap-4">
          <button onClick={() => navigate("/AllCategory")} className=" flex cursor-pointer  items-center gap-2 hover:underline">
            View all categories <ChevronRight size={20} />
          </button>
        </div>
         )}   
         <div className='py-2'></div>  
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2 md:gap-6">
          {categories.map((cat, index) => (
            <div 
              key={index}
              className="group relative md:p-6 p-2 bg-white border border-gray-200 rounded-2xl hover:border-transparent hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className={`inline-flex md:p-3 rounded-xl ${cat.bgColor} mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <img onClick={() => navigate(cat.path)} src={cat.icon} className='md:h-[300px] cursor-pointer mx-auto h-[98px] w-[157px] md:w-[400px]' alt="" />
              </div>
              
              <h3 className="font-medium text-center text-[16px] md:text-[25px]  text-gray-900 mb-2">
                {cat.title}
              </h3>
              
              <p className="text-gray-500 text-center text-sm leading-relaxed mb-4">
                {cat.description}
              </p>

              <span onClick={() => navigate(cat.path)}  className="inline-flex cursor-pointer items-center text-xs  uppercase tracking-wider text-gray-400 group-hover:text-gray-900 transition-colors">
                Explore Now <ChevronRight size={14} className="ml-1" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;