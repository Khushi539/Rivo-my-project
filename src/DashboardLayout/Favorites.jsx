import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { toggleLike } from "../redux/LikeSlice";
import { GetProduct } from "../API/productapi";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/CartSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const likedProductIds = useSelector(
    (state) => state.like.likedProducts
  );

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await GetProduct();
        setProducts(res.products || []);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const favoriteProducts = useMemo(() => {
    return products.filter((p) => likedProductIds.includes(p._id));
  }, [products, likedProductIds]);

  if (!loading && favoriteProducts.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">
        No favorites yet 
      </p>
    );
  }

  return (
    <div className="">
      <h3 className ="text-2xl  font-medium md:text-4xl mb-[35px]  font-roboto text-[#224F34]  text-center">
        My Favorites 
      </h3>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="animate-pulse text-gray-500">Loading favorites...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-6">
          {favoriteProducts.map((product) => {
            const mrp = product.product_mrp;
            const price = product.user_price;
            const discount =
              mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;

            return (
              <div
                key={product._id}
                className="group relative shadow-sm rounded-lg hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200 flex flex-col h-full"
              >
                <div className="rounded-t-md overflow-hidden relative">
                  <img
                    onClick={() =>
                      navigate("/ProductDetail", { state: product })
                    }
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-[130px] object-fill px-5 md:px-10 w-full bg-[#93B9A2] md:h-[240px] cursor-pointer object-contain group-hover:scale-105 transition-transform"
                  />

                  <FaHeart
                    onClick={() => dispatch(toggleLike(product._id))}
                    className="absolute top-3 right-3 text-xl cursor-pointer text-red-500"
                  />

                  {discount > 0 && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                      {discount}% OFF
                    </span>
                  )}
                </div>

                <div className="md:p-4 p flex flex-col flex-grow">
                  <h4 className="font-semibold text-sm md:text-base line-clamp-1 text-gray-800">
                    {product.name}
                  </h4>

                  <p className="text-[11px] uppercase tracking-wider text-gray-400 font-bold mb-1">
                    {product.brand}
                  </p>

                  <p className="text-xs text-gray-500 line-clamp-2 mb-3 flex-grow">
                    {product.description}
                  </p>

                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-lg font-bold text-green-700">
                      ₹{price}
                    </span>
                    <span className="text-xs line-through text-gray-400">
                      ₹{mrp}
                    </span>
                  </div>

                  <p className="text-[10px] text-gray-400 mb-4">
                    Inclusive of all taxes
                  </p>

                  <button
                    className="w-full hover:bg-[#93B9A2] bg-[#7da38c] text-white py-2.5 rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors active:scale-95"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: product._id,
                          name: product.name,
                          brand: product.brand,
                          user_price: product.user_price,
                          product_mrp: product.product_mrp,
                          images: product.images,
                          qty: 1,
                        })
                      )
                    }
                  >
                    Add to Cart
                    <FaShoppingCart size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;