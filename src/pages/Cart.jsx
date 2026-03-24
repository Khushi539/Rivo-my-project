import React from "react";
import PageHeading from "../Style/PageHeading";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { MdAdminPanelSettings } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../redux/CartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const cart = useSelector((state) => state.cartdata.cart);
  console.log("cart ", cart);

  const getTotalPrice = () =>
    cart.reduce(
      (total, item) => total + item.user_price * item.qty,
      0
    );

  const getDiscount = () => Math.floor(getTotalPrice() * 0.1);
  const getFinalAmount = () => getTotalPrice() - getDiscount() + 1;

  const handleClick = () => {
    navigate("/selectaddress");
  };

  return (
    <div className="max-w-7xl mx-auto py-5">
      <PageHeading h2="My Cart" />

      <div className="flex flex-col md:flex-row md:gap-6 ">
        {cart.length === 0 ? (
          <p className="text-center mt-10 w-full">Cart is empty</p>
        ) : (
          <div className="w-full md:w-[785px] overflow-y-auto scrollbar-hide h-200 pr-1 ">
            {cart.map((item) => (
              <div
                key={item.id}
                className="mb-6 shadow px-2 py-4 flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <img
                    src={item.images?.[0]}
                    className="h-[180px] object-contain"
                    alt={item.name}
                  />

                  <div className="flex gap-4 mt-2 items-center">
                    <CiCircleMinus
                      onClick={() =>
                        dispatch(decreaseQty(item.id))
                      }
                      className="text-[30px] text-[#224F34] cursor-pointer"
                    />

                    <p className="border border-[#224F34] border-[2px] px-3 ">
                      {item.qty}
                    </p>

                    <CiCirclePlus
                      onClick={() =>
                        dispatch(increaseQty(item.id))
                      }
                      className="text-[30px] text-[#224F34] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex-1 px-4">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-500">{item.brand}</p>

                  <p className="mt-2 font-medium">
                    ₹{item.user_price}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Amount: ₹{item.user_price * item.qty}
                  </p>

                  <p
                    className="mt-6 text-red-500 cursor-pointer"
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    Remove
                  </p>
                </div>
              </div>
            ))}

            <div className="bg-white flex justify-end shadow py-4 px-2">
              <button
                onClick={handleClick}
                className="bg-[#224F34] cursor-pointer text-white px-10 py-4"
              >
                Checkout To Pay
              </button>
            </div>
          </div>
        )}

        {cart.length > 0 && (
          <div className="w-full md:w-[393px] md:sticky md:top-4 h-fit shadow p-4">
            <p className="font-semibold text-gray-500">
              Price details
            </p>

            <p className="mt-2">
              Price: ₹{getTotalPrice()}
            </p>
            <p>Discount: − ₹{getDiscount()}</p>
            <p>Platform Fee: ₹1</p>

            <p className="font-medium mt-2">
              Total Amount ₹{getFinalAmount()}
            </p>

            <div className="flex gap-3 mt-4">
              <MdAdminPanelSettings className="text-[40px]" />
              <p className="text-sm text-gray-500">
                Safe and Secure Payments
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;