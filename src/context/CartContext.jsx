import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

 const addToCart = (product) => {
   setCart((prev) => {
     const existingItem = prev.find(
       (item) => item.id === product.id && item.size === product.size,
     );

     if (existingItem) {
       return prev.map((item) =>
         item.id === product.id && item.size === product.size
           ? { ...item, quantity: item.quantity + 1 }
           : item,
       );
     }

     return [...prev, product];
   });
 };


  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

 const remove = (id, size) => {
   setCart((prev) =>
     prev.filter((item) => !(item.id === id && item.size === size)),
   );
 };


  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const getDiscount = () => {
    return Math.floor(getTotalPrice() * 0.1);
  };

  const getFinalAmount = () => {
    return getTotalPrice() - getDiscount() + 7;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, remove }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;







