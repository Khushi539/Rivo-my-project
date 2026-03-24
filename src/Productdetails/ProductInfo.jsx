
import React from "react";
import { FaStar } from "react-icons/fa";
import sacle from "../assets/scale.svg";
import BankOffers from "./BankOffer";
import Sizepopup from "../pages/Sizepopup";

const ProductInfo = ({
  product,
  selectedSize,
  setSelectedSize,
  showPopup,
  setShowPopup,
}) => {

  const sizes =
    product?.attributes?.[0]?.values || [];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-2">
        {product.name}
      </h1>

      <p className="text-[#0D542B] font-semibold">
        Special Price
      </p>

      <p className="text-xl font-bold mb-4">
        ₹{product.user_price}
      </p>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2 bg-[#0D542B] text-white px-3 py-1 rounded-full text-sm">
          {product.rating || 4}
          <FaStar className="mb-[1px]" />
        </div>
        <p className="text-sm text-gray-600">
          {product.reviews?.length || 0} reviews
        </p>
      </div>

      {sizes.length > 0 && (
        <>
          <p className="font-semibold mb-2">
            Select 
          </p>

          <div className="md:flex">
            <div className="flex gap-2 mb-6 flex-wrap">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 cursor-pointer rounded-md transition ${
                    selectedSize === size
                      ? "bg-[#224F34] text-white"
                      : "hover:bg-[#224F34] hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="md:px-4 py-2 gap-2 flex font-medium hover:underline hover:text-[#2874F0]">
              <button
                onClick={() => setShowPopup(true)}
                className="hover:cursor-pointer md:mt-[-23px]"
              >
                Size Chart
              </button>
              <img
                src={sacle}
                className="h-[15px] mt-[5px] md:mt-[7px] cursor-pointer"
                alt="scale"
                onClick={() => setShowPopup(true)}
              />
            </div>

            {showPopup && (
              <Sizepopup closePopup={() => setShowPopup(false)} />
            )}
          </div>
        </>
      )}

      <p className="mt-4">
        {product.description}
      </p>

      <div className="pt-2">
        <BankOffers />
      </div>
    </div>
  );
};

export default ProductInfo;