import React from "react";
import Main from "../Components/Main";
import BestSelling from "../Components/BestSelling";
import Offers from "../Components/Offer";
import Categories from "../Components/Categories";
import Products from "../Components/Products";
import Feedback from "../Components/Feedback";
import Footer from "../Components/Footer";
import CategoryGrid from "../Type/CategoryGrid"
import cloth from "../assets/cloths.avif";

import Electronics from "../assets/Electronics.avif";
import Homes from "../assets/Home.avif";
import Beauty from "../assets/Beauty.avif";
import toy from "../assets/toy.avif";
import diy from "../assets/diy.avif";

const dashboardCategories = [
  {
    title: "Fashion & Apparel",
    description: "Clothing, footwear, and jewelry.",
    icon: cloth,
    bgColor: "bg-blue-50",
    path: "/fashion",
  },
  {
    title: "Electronics",
    description: "Smartphones, laptops, and wearables.",
    icon: Electronics,
    bgColor: "bg-purple-50",
    path: "/electronics",
  },
  {
    title: "Beauty & Personal Care",
    description: "Skincare, cosmetics, and perfumes.",
    icon: Beauty,
    bgColor: "bg-pink-50",
    path: "/beauty",
  },
];

const Home = () => {
    return (
      <>
        <div id="home">
          <Main />
        </div>
        <div id="bestselling"> 
          <BestSelling />
        </div>
        <div id="shop">
          <Products />
        </div>
        <div id="features">
          <Offers />
        </div>
        <div>
          
        </div>
        <div className="max-w-7xl mx-auto">
           <CategoryGrid
           showViewAll={true}
           categories={dashboardCategories}
           />
        </div>
        <div>
          <Feedback />
        </div>
        <div id="contact">
          <Footer />
        </div>
      </>
    );
}

export default Home;