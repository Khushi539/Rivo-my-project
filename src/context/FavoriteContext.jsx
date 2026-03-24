import React, { createContext, useState } from "react";

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (item) => item._id === product._id
      );
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFavorite = (id) => {
    setFavorites((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;