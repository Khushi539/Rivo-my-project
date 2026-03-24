import React, { useEffect, useState } from "react";
import { getOrderHistory } from "../API/productapi";
import shirt from "../assets/Shirt.avif";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrderHistory();
        setOrders(res?.orders || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!orders.length) return <p>No orders</p>;

  return (
    <div className="w-full">
      <h1 className="text-2xl  font-medium md:text-4xl mb-[35px]  font-roboto text-[#224F34]  text-center">Your Orders</h1>

      <div className="bg-white border rounded-lg overflow-x-auto">
        <table className="w-[1800px] whitespace-nowrap border-collapse">
          <thead className="bg-gray-100 text-gray-500">
            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Invoice No</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Address</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Products</th>
              <th className="p-4 text-left">Total</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">
                  <img
                    src={order.products?.[0]?.images?.[0] || shirt}
                    alt=""
                    className="h-14 w-14 rounded object-cover"
                  />
                </td>

                <td className="p-4 font-medium">
                  #{order.invoiceNumber || order.id.slice(-6)}
                </td>

                <td className="p-4">{order.user?.name}</td>

                <td className="p-4">{order.user?.email}</td>

                <td className="p-4 max-w-[250px] truncate">
                  {order.address}
                </td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">{order.status}</td>

                <td className="p-4">
                  {order.products.map((p) => (
                    <div key={p._id}>
                      {p.name} ×{p.qty}
                    </div>
                  ))}
                </td>

                <td className="p-4 font-medium">₹{order.total}</td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/invoice/${order.id}`)
                    }
                    className="px-4 cursor-pointer py-2 bg-green-700 text-white rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;