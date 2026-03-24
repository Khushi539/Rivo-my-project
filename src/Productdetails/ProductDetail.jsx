

import React, { useState, useEffect, } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

import ImageSection from "./ImageSection";
import ProductInfo from "./ProductInfo";
import ReviewSection from "./reviewSections/ReviewSection";
import QuestionAnswer from "./QnASection";
import QAPagination from "../pages/QAPagination";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";

const quality = ["Overall", "Fabric", "Quality", "Colour", "Style", "Comfort", "Stitching"];
const reviewsData = [  ];
const questionsData = [  ];

const ProductDetails = () => {
  const { state: product } = useLocation();
  const navigate = useNavigate();

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState("Overall");
  const [allReview, setAllReview] = useState(reviewsData);
  const [newReview, setNewReview] = useState("");
  const [allQuestions, setAllQuestions] = useState(questionsData);
  const [newQuestion, setNewQuestion] = useState("");
  const [likedQuestion, setLikedQuestion] = useState(null);

  const user = useSelector((state) => state.auth.user);
  const handleRating = () => {
    if (!user) {
      alert ("please log in then rating");
      navigate ("/login");
    }else {
      (handleAddReview);
    }
  }

  useEffect(() => {
    if (product?.images?.length > 0) setMainImage(product.images[0]);
  }, [product]);

  if (!product) return <p className="text-center mt-10">No product found</p>;

  const handleAddToCart = () => {
    addToCart({ ...product, qty: 1 });
  };

  const handleAddReview = () => {
    if (!newReview.trim()) return;
    const newEntry = { id: Date.now(), name: "You", ago: "Just now", city: "India", comment: newReview, rating: "5.0", category: activeTab };
    setAllReview([newEntry, ...allReview]);
    setNewReview("");
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    const newEntry = { id: Date.now(), Q: newQuestion, A: "Seller will answer soon" };
    setAllQuestions([newEntry, ...allQuestions]);
    setNewQuestion("");
  };

  const filteredReviews = activeTab === "Overall" ? allReview : allReview.filter((r) => r.category === activeTab);

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 mt-6">
        <button onClick={() => navigate(-1)} className="flex cursor-pointer items-center gap-2 text-sm font-medium hover:underline">
          <FaLongArrowAltLeft /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <ImageSection product={product} mainImage={mainImage} setMainImage={setMainImage} onAddToCart={handleAddReview} />
          <ProductInfo  product={product} sizes={["S", "M", "L", "XL", "XXL"]} selectedSize={selectedSize} setSelectedSize={setSelectedSize} showPopup={showPopup} setShowPopup={setShowPopup} />
        </div>

        <ReviewSection quality={quality} activeTab={activeTab} setActiveTab={setActiveTab} newReview={newReview} setNewReview={setNewReview} onAddReview={handleRating} filteredReviews={filteredReviews} productRating={product.rating} />
        
        <QuestionAnswer allQuestions={allQuestions} newQuestion={newQuestion} setNewQuestion={setNewQuestion} onAddQuestion={handleAddQuestion} likedQuestion={likedQuestion} setLikedQuestion={setLikedQuestion} />
      </div>

    
      <Footer />
    </>
  );
};

export default ProductDetails;
