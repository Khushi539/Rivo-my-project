

import React, { useEffect, useMemo, useState } from "react";
import { getOrderHistory } from "../API/productapi";

const StatCard = ({ title, value }) => {
  return (
    <div className="p-6 bg-[#DFF5E6] rounded-xl shadow border border-[#0D542B] border-[2px] hover:shadow-lg transition">
      <p className="text-sm text-[#0D542B] mb-2">{title}</p>
      <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
    </div>
  );
};

const DashboardOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getOrderHistory()
      .then((res) => {
        console.log("ORDER API RESPONSE:", res); 
        setOrders(res.orders || []); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Order fetch error:", err);
        setError("Failed to fetch orders.");
        setLoading(false);
      });
  }, []);

  const stats = useMemo(() => {
    const totalOrders = orders.length;

    const paidOrders = orders.filter((order) => order.status === "paid").length;

    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);

    const totalProductsSold = orders.reduce((sum, order) => {
      return (
        sum +
        (order.products || []).reduce((pSum, p) => pSum + (p.qty || 0), 0)
      );
    }, 0);

    return {
      totalOrders,
      paidOrders,
      totalRevenue,
      totalProductsSold,
    };
  }, [orders]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="">
      <h2 className="text-2xl font-medium md:text-4xl mb-[35px] font-roboto text-[#224F34] text-center">
        Orders Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Orders" value={stats.totalOrders} />
        <StatCard title="Paid Orders" value={stats.paidOrders} />
        <StatCard title="Total Revenue" value={`₹ ${stats.totalRevenue}`} />
        <StatCard title="Products Sold" value={stats.totalProductsSold} />
      </div>

      
    </div>
  );
};

export default DashboardOrders;