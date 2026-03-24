import React from "react";


import Banner from "./Banner"
import { useNavigate } from "react-router-dom";
import DashboardOrders from "./DashboardOrders"
const Dashboard = () => {
  
  const navigate = useNavigate();

  return (
    <div>
      <Banner/>
      <DashboardOrders/>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-[#0D542B] cursor-pointer text-white rounded"
      >
        Click to Home page
      </button>
      
    </div>
  );
};

export default Dashboard;
