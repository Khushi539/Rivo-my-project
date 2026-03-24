import React,{useContext} from "react";
import {CartContext} from "../context/CartContext"
import {Navigate, useNavigate} from "react-router-dom"


import Heading from "../Style/Heading"

import star from "../assets/star.png"
import { CiStar } from "react-icons/ci";

import { FaShoppingCart } from "react-icons/fa";
import { RiShoppingBag2Fill } from "react-icons/ri";

import { useEffect, useState } from "react";
import axios from "axios"; 
import ExploreProducts from "../DashboardLayout/ExploreProducts";

const list = [
  "SALE",
  "HOT",
  "NEW ARRIVALS",
  "ACCESSORIES",
]
const Products = () => {
  const {addToCart} = useContext(CartContext);
   const navigate = useNavigate();

   const [products, setProducts] = useState ([]);

   
    return (
      <>
        
        <div className="max-w-7xl mx-auto">
            <ExploreProducts/>
        </div>
      </>
    );
}
export default Products;