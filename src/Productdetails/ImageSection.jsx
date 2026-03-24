import React from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../redux/CartSlice";

import { useDispatch } from "react-redux";

const ImageSection = ({ product, mainImage, setMainImage, onAddToCart }) => {
    const dispatch = useDispatch();
  
  return (
    <div className="bg-[#DFF5E6] shadow flex flex-col items-center">
      <div className="bg-[#DFF5E6] p-2 md:p-5 shadow-sm">
        <img
          src={mainImage}
          alt={product.name}
          className="h-[297px] object-contain"
        />
      </div>

      <div className="grid gap-3 grid-cols-3 md:grid-cols-4 overflow-y-auto h-[110px] md:h-[135px] scrollbar-hide pr-1 mt-4">
        {product.images?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={product.name}
            onClick={() => setMainImage(img)}
            className={`md:h-[127px] h-[100px] cursor-pointer border-[2px] ${
              mainImage === img ? "border-black" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      

      <div className="flex w-full gap-1 mt-4">
        <button
className ="w-full cursor-pointer hover:bg-[#93B9A2] bg-[#7da38c] text-white py-4 rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors active:scale-95"                          onClick={() =>
                            dispatch(
                              addToCart({
                                id: product._id,
                                name: product.name,
                                brand: product.brand,
                                description: product.description,
                                user_price: product.user_price,
                                product_mrp: product.product_mrp,
                                images: product.images,
                                qty: 1,
                              })
                            )
                          }
                        >
                          Add to Cart
                          <FaShoppingCart className="text-white mt-[4px]" />
                        </button>
      </div>
    </div>
  );
};

export default ImageSection;