import React from "react";
import CategoryGrid from "../Type/CategoryGrid"
import cloth from "../assets/cloths.avif"
import Electronics from "../assets/Electronics.avif"
import Home from "../assets/Home.avif"
import Beauty from "../assets/Beauty.avif"
import diy from "../assets/diy.avif";
import toy from "../assets/toy.avif";

import Sports from "../assets/Sports.jpg"
import Books from "../assets/Books.avif"
import Auto from "../assets/Automotive.avif"
import Mobile from "../assets/Mobile.avif"
import Baby from "../assets/Baby.avif"
import Pet from "../assets/Pet.avif"






const baseCategories = [
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
  {
    title: "Home & Furniture",
    description: "Decor, lighting, and furniture.",
    icon: Home,
    bgColor: "bg-amber-50",
    path: "/homeall",
  },
  {
    title: "DIY & Hardware",
    description: "Tools and building materials.",
    icon: diy,
    bgColor: "bg-slate-100",
    path: "/diy",
  },
  {
    title: "Toys & Hobbies",
    description: "Educational toys and collectibles.",
    icon: toy,
    bgColor: "bg-red-50",
    path: "/toys",
  },
];
const extraCategories = [
  {
    title: "Sports & Fitness",
    description: "Gym equipment, yoga gear, and sportswear.",
    icon: Sports,
    bgColor: "bg-slate-100",
    path: "/sports",
  },
  {
    title: "Books & Stationery",
    description: "Novels, notebooks, and office supplies.",
    icon: Books,
    bgColor: "bg-red-50",
    path: "/books",
  },
  {
    title: "Automotive Accessories",
    description: "Car care, bike gear, and spare parts.",
    icon: Auto,
    bgColor: "bg-slate-100",
    path: "/automotive",
  },
  {
    title: "Mobile Accessories",
    description: "Chargers, earphones, and phone cases.",
    icon: Mobile,
    bgColor: "bg-red-50",
    path: "/mobile",
  },
  {
    title: "Baby & Kids",
    description: "Baby care, kids fashion, and toys.",
    icon: Baby,
    bgColor: "bg-red-50",
    path: "/kids",
  },
  {
    title: "Pet Supplies",
    description: "Food, toys, and grooming products.",
    icon: Pet,
    bgColor: "bg-red-50",
    path: "/pets",
  },
];
const allcategory = [...baseCategories, ...extraCategories]
const AllCategoryGrid = () => {
    return (
        <>
         <div className="p-4">
            <CategoryGrid 
           showViewAll={false}
           categories={allcategory}/>
         </div>
        </>
    )
}
export default AllCategoryGrid;
