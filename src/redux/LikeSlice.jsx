import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedProducts: JSON.parse(localStorage.getItem("likedProducts")) || [],
};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLikes: (state, action) => {
      state.likedProducts = action.payload;
      localStorage.setItem("likedProducts", JSON.stringify(state.likedProducts));
    },

    toggleLike: (state, action) => {
      const productId = action.payload;
      const index = state.likedProducts.indexOf(productId);

      if (index === -1) {
        state.likedProducts.push(productId);
      } else {
        state.likedProducts.splice(index, 1);
      }

      localStorage.setItem("likedProducts", JSON.stringify(state.likedProducts));
    },
  },
});

export const { toggleLike, setLikes } = likeSlice.actions;
export default likeSlice.reducer;