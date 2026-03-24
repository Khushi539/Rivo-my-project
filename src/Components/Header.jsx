import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import { CartContext } from "../context/CartContext";
import card from "../assets/card.png";
import { ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";

const list = [
  { name: "HOME", id: "home" },
  { name: "SHOP", id: "shop" },
  { name: "FEATURES", id: "features" },
  { name: "CONTACT", id: "contact" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const { cart } = useContext(CartContext);

  const Product = useSelector(state => state.cartdata.cart);
  const Prolength = Product.length;

  const user = useSelector(state => state.auth.user); 

  const from = location.state?.from;
  const PreviousPage = location.state?.PreviousPage;

  const handleNavClick = (id) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { targetId: id } });
    }
  };

  const handleLogin = () => {
    if (user) {
      // User is already logged in → go to dashboard directly
      navigate("/dashboard");
    } else {
      // User not logged in → go to login page
      navigate("/login", {
        state: {
          from: "header",
          PreviousPage: location.pathname,
        },
      });
    }
  }

  return (
    <header className="bg-[#dff5e6] ">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <b
          className="md:text-[50px] text-[35px] text-green-900 font-rufina cursor-pointer"
          onClick={() => navigate("/")}
        >
          Rivo
        </b>

        <ul className="hidden md:flex gap-8 text-green-900 font-medium">
          {list.map((item) => (
            <li
              className="hover:underline font-medium cursor-pointer hover:text-green-900"
              key={item.id}
              onClick={() => handleNavClick(item.id)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className="flex gap-5 md:gap-12">
          <div className="relative">
            <div className="absolute text-center top-[13px] items-center text-[12px] my-auto bg-[#6BC785] rounded-full h-3 w-3">
              {Prolength}
              {cart?.length > 0 && (
                <span>
                  {cart.length}
                </span>
              )}
            </div>  
            <div>
              <ShoppingCart
                onClick={() => navigate("/card")} 
                className="text-black text-[22px] mt-4 cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          </div>
          <button
            onClick={handleLogin}
            className="border cursor-pointer border-[#224F34] hover:text-white hover:bg-[#224F34] border-[2px] py-2 px-5 md:px-8 rounded"
          >
            {user ? "Dashboard" : "Login"} {/* dynamic button text */}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;