import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CreateOrder, VerifyPayment, GetAddress } from "../API/productapi";
// import { clearCart } from "../redux/cartSlice";

const SelectAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartProducts = useSelector((state) => state.cartdata.cart);
  const selectedProducts = cartProducts;

  const totalAmount = selectedProducts.reduce(
    (sum, item) => sum + item.user_price * item.qty,
    0
  );

  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = storedUser?._id;

  const [userData, setUserData] = useState({
    address: "",
  });

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleChange = (e) => {
    setUserData({ ...userData, address: e.target.value });
  };

  const handlePayment = async () => {
    if (!userData.address) {
      alert("Please enter shipping address!");
      return;
    }

    setPaymentProcessing(true);

    try {
      const orderResponse = await CreateOrder({
        products: selectedProducts,   
        total: totalAmount,           
        address: userData.address,    
      });

      const orderId = orderResponse.orderId;

      const options = {
        key: "rzp_test_S4wdK6lTGXQjb2", 
        amount: totalAmount * 100,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: orderId,

        handler: async function (response) {
          try {
            const verifyRes = await VerifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              alert("Payment Successful ");
              navigate("/", { replace: true });
            } else {
              alert("Payment verification failed ");
            }
          } catch (err) {
            alert("Verification error");
          }
        },

        prefill: {
          name: storedUser.name || "",
          email: storedUser.email || "",
          contact: storedUser.number || "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert("Something went wrong ");
    } finally {
      setPaymentProcessing(false);
    }
  };

  
useEffect(() => {
  const fetchAddress = async () => {
    if (!userId) return;

    try {
      const res = await GetAddress(userId);
      console.log("User ID:", userId);
      console.log(res);

      if (res?.data?.address) {
        setUserData({ address: res.data.address.address });
      }
    } catch (error) {
      console.log("No saved address found");
    }
  };

  fetchAddress();
}, [userId]);

  return (
    <div className="px-6 py-5 max-w-7xl mx-auto">
      <h1 className="text-3xl py-2  font-medium md:text-4xl  font-roboto text-[#224F34]  text-center">Checkout</h1>

      <div className="mb-4 space-y-2">
        <p ><span className="font-medium">Name:</span> {storedUser.name}</p>
        <p><span className="font-medium">Email:</span> {storedUser.email}</p>
        <p><span className="font-medium">Phone:</span> {storedUser.number}</p>
      </div>
{userData.address && (
  <div className="mb-4 p-3  border border-[2px] border-[#224F34] rounded bg-gray-50">
    <p className="text-sm font-medium text-gray-700">Saved Address</p>
    <p className="text-gray-600 text-sm">{userData.address}</p>
    <p className="text-xs text-blue-600 mt-1">
      You can edit this or enter a new address below
    </p>
  </div>
)}
  
      

      <h2 className=" font-medium mb-2">Enter the Shipping Address</h2>
      <textarea
        name="address"
        placeholder="Full Address"
        value={userData.address}
        onChange={handleChange}
        className="w-full border border-[2px] border-[#224F34] p-2 rounded mb-6"
      />

      <ul className="space-y-4 mb-4">
        {selectedProducts.map((product) => (
          <li key={product.id} className="border border-[2px] border-[#224F34] p-4 rounded flex gap-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-24 w-24 object-contain"
            />
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-gray-500">{product.brand}</p>
              <p>Qty: {product.qty} | ₹{product.user_price}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mb-4 font-medium text-lg">Total: ₹{totalAmount}</div>

      <button
        onClick={handlePayment}
        disabled={paymentProcessing}
        className="cursor-pointer bg-[#224F34] text-white px-5 py-2 rounded disabled:opacity-50"
      >
        {paymentProcessing ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default SelectAddress;