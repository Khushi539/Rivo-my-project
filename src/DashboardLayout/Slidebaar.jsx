import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard, MdAutorenew } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { FaShoppingBag, FaArrowAltCircleLeft } from "react-icons/fa";
import { ShoppingCart, Heart, User } from "lucide-react";
import { SlLogout } from "react-icons/sl";
import { RiLockPasswordLine } from "react-icons/ri";

const Slidebaar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    if (window.innerWidth < 768) toggleSidebar(); 
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 768) toggleSidebar(); 
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "New Arrivals", path: "/dashboard/newarrivals", icon: <MdAutorenew /> },
    { name: "Wishlist", path: "/dashboard/mywishlist", icon: <Heart size={22} /> },
    { name: "Orders", path: "/dashboard/orderhistory", icon: <ShoppingCart size={22} /> },
    { name: "Profile", path: "/dashboard/myprofile", icon: <User size={22} /> },
    { name: "Cart", path: "/dashboard/card", icon: <FaShoppingBag /> },
    { name: "Change Password", path: "/dashboard/changepassword", icon: <RiLockPasswordLine /> },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed md:top-24 top-15 left-0 h-full bg-white z-40 transition-all duration-300 ease-in-out border-r border-gray-100 shadow-2xl
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20"}`}
      >
        <div className={`flex items-center p-6 mb-4 md:h-20 ${isOpen ? "justify-between" : "justify-center"}`}>
          {isOpen && (
            <h2 className="text-2xl font-bold font-rufina text-[#0D542B] tracking-tight whitespace-nowrap">
              Rivo Shop
            </h2>
          )}
          <button 
            onClick={toggleSidebar}
            className="focus:outline-none"
          >
            <FaArrowAltCircleLeft
              className={`text-[28px] cursor-pointer text-[#0D542B] hover:text-red-500 transition-transform duration-500 
              ${!isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <nav className="px-3 flex flex-col h-[calc(100%-160px)] justify-between overflow-y-auto custom-scrollbar">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200
                ${isOpen ? "justify-start px-4" : "justify-center"}
                ${isActive(item.path) ? "bg-[#0D542B] text-white shadow-md" : "hover:bg-gray-100 text-gray-600"}`}
              >
                <span className={`text-[22px] ${isActive(item.path) ? "text-white" : "text-[#0D542B]"}`}>
                  {item.icon}
                </span>
                
                <span className={` font-medium transition-all duration-300 whitespace-nowrap
                  ${isOpen ? "opacity-100 visible" : "opacity-0 invisible w-0"}`}>
                  {item.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-100 pt-4 mb-6">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center p-3 rounded-xl hover:bg-red-50 text-red-600 transition-all
              ${isOpen ? "justify-start px-4" : "justify-center"}`}
            >
              <SlLogout className="text-[20px]" />
              <span className={`ml-4 font-bold cursor-pointer transition-all duration-300
                ${isOpen ? "opacity-100 visible" : "opacity-0 invisible w-0"}`}>
                Logout
              </span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Slidebaar;