import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Slidebaar from "./Slidebaar";
import DashboardHeader from "./DashboardHeader";
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  return (
    <div className=" min-h-screen bg-[#FFFFFF]">
      
        <DashboardHeader toggleSidebar={() => setIsSidebarOpen (!isSidebarOpen)} className=""/>

       <div className="flex ">
          <Slidebaar isOpen= {isSidebarOpen} 
                   toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
         <div className={`flex-1 min-w-0 px-4 md:px-6 py-24 md:py-30 transition-all duration-300 scroll-   ${isSidebarOpen ? "lg:ml-64 ml-0" : "md:ml-20"}`}>
          <Outlet className=""/>
         </div>
      </div>
    </div>
  );
};

export default DashboardLayout;