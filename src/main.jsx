import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom'
import  CartProvider from "./context/CartContext.jsx"
import FavoriteProvider from './context/FavoriteContext.jsx'
import {Provider} from "react-redux";
import store from "./redux/store.jsx"

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <FavoriteProvider>
          <Provider store={store}>
          <App />
          </Provider>
       </FavoriteProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
