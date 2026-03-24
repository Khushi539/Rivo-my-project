import React, { useEffect, useState, useMemo } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { GetProduct } from "../API/productapi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { toggleLike } from "../redux/LikeSlice";

const DashboardMain = ({ title, filters, titleClaasname }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const likedProducts = useSelector((state) => state.like.likedProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetProduct();
        setProducts(response.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    if (filters?.category && Array.isArray(filters.category)) {
      data = data.filter(
        (p) =>
          Array.isArray(p.product_category) &&
          p.product_category.some((cat) =>
            filters.category.some(
              (c) => c.toLowerCase() === cat.name.toLowerCase()
            )
          )
      );
    }

    if (filters?.attributeValue) {
      data = data.filter(
        (p) =>
          Array.isArray(p.attributes) &&
          p.attributes.some((attr) =>
            attr.values?.some(
              (v) => v.toLowerCase() === filters.attributeValue.toLowerCase()
            )
          )
      );
    }

    if (filters?.brand && filters.brand !== "All") {
      data = data.filter(
        (p) => p.brand?.toLowerCase() === filters.brand.toLowerCase()
      );
    }

    if (filters?.search) {
      data = data.filter(
        (p) =>
          p.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          p.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters?.sort === "priceLow") {
      data.sort((a, b) => a.user_price - b.user_price);
    }

    if (filters?.sort === "priceHigh") {
      data.sort((a, b) => b.user_price - a.user_price);
    }

    return data;
  }, [products, filters]);

  return (
    <div className="md:p-4 p-2">
      {title && (
        <h3
          className={`text-2xl font-medium md:text-4xl font-roboto text-[#224F34] text-center ${titleClaasname}`}
        >
          {title}
        </h3>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="animate-pulse text-gray-500">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
          {filteredProducts.map((product) => {
            const mrp = product.product_mrp;
            const price = product.user_price;
            const discount =
              mrp && price ? Math.round(((mrp - price) / mrp) * 100) : 0;

            const isLiked = likedProducts.includes(product._id);

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
                    className={`absolute top-3 right-3 text-xl cursor-pointer transition-colors ${
                      isLiked
                        ? "text-red-500"
                        : "text-white hover:text-gray-400"
                    }`}
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
                    className="w-full cursor-pointer hover:bg-[#93B9A2] bg-[#7da38c] text-white py-2.5 rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors active:scale-95"
                    onClick={() => {
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
                      );
                      alert("Product added to cart!"); 
                    }}
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

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20 text-gray-500">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );


  
};

export default DashboardMain;