import { createSlice } from "@reduxjs/toolkit";

// ✅ localStorage helpers
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(), // ✅ refresh ke baad bhi data rahega
  },

  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existing = state.cart.find(
        (p) => p.id === item.id
      );

      if (existing) {
        existing.qty += 1;
      } else {
        state.cart.push({ ...item, qty: 1 });
      }

      saveCartToStorage(state.cart); // ✅ persist
    },

    increaseQty: (state, action) => {
      const item = state.cart.find(
        (p) => p.id === action.payload
      );
      if (item) {
        item.qty += 1;
        saveCartToStorage(state.cart);
      }
    },

    decreaseQty: (state, action) => {
      const item = state.cart.find(
        (p) => p.id === action.payload
      );
      if (item && item.qty > 1) {
        item.qty -= 1;
        saveCartToStorage(state.cart);
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (p) => p.id !== action.payload
      );
      saveCartToStorage(state.cart);
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;