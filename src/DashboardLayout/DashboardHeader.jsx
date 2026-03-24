import React from "react";
import { ShoppingCart, Heart, User, Search } from "lucide-react";
import { FaBars } from "react-icons/fa";
import {useNavigate} from "react-router-dom"

const DashboardHeader = ({toggleSidebar}) => {
   const navigate = useNavigate();
    return (
        <>
         <div>
            <header className="bg-[#DFF5E6] shadow fixed top-0 left-0  w-full z-50">
                 
                    <div className=" md:px-6 px-2 py-4 flex gap-[8px] md:gap-0 items-center justify-between">
                      <div className="flex md:gap-10 gap-2 items-center">
                      <button onClick={toggleSidebar} className="">
                        <FaBars className="block md:hidden text-[#0D542B] md:mt-2 cursor-pointer text-[22px]"/>
                      </button>
                       <b className="md:text-[50px] text-[35px] text-green-900 font-rufina cursor-pointer" >
                        Rivo
                      </b>
                      </div>
                      <div className="flex items-center gap-4  md:w-1/2">
                        {/* <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full">
                          <Search className="w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-transparent outline-none px-2 w-full"
                          />
                        </div> */}
                      </div>
                      <div className="md:flex hidden items-center gap-1 md:gap-6">
                        <Heart onClick={() => navigate ("/dashboard/mywishlist")} className="w-6 h-6 cursor-pointer hover:scale-105" />
                        <ShoppingCart onClick={() => navigate ("/dashboard/card")}  className="w-6 h-6 cursor-pointer hover:scale-105" />
                        <User onClick={() => navigate ("/dashboard/myprofile")} className="w-6 h-6 cursor-pointer hover:scale-105" />
                      </div>
                    </div>
                  </header>
            
         </div>
        </>
    )
} 
export default DashboardHeader;
