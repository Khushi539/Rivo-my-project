import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { addReviewApi, GetReviewApi } from "../../API/productapi";

const ReviewSection = () => {
  const location = useLocation();
  const product = location.state;
  const productId = product?._id;

  const storedUser = localStorage.getItem("user");
  const userInfo = storedUser ? JSON.parse(storedUser) : null;

  const [rating, setRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Fetch reviews for this product
  const fetchReviews = async () => {
    if (!productId) return;

    try {
      setFetching(true);
      const response = await GetReviewApi(productId);
      console.log("Reviews API response:", response);

      // ✅ Use the correct reviews array from API
      setReviews(response.data.reviews || []);
    } catch (err) {
      console.error("❌ Error fetching reviews:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // ✅ Submit review
  const submitReview = async () => {
    if (!userInfo) return alert("Please login first");
    if (!productId) return alert("Product ObjectId missing");
    if (!rating || !newReview.trim())
      return alert("Rating & comment required");

    const payload = {
      userId: userInfo._id,
      username: userInfo.name, // matches API field
      rating,
      comment: newReview,
    };

    try {
      setLoading(true);
      await addReviewApi(productId, payload); // pass productId separately
      setNewReview("");
      setRating(0);
      alert("Review added 🎉");

      // ✅ Refetch reviews to include the new one
      fetchReviews();
    } catch (err) {
      console.error("❌ Review Error", err);
      alert("Failed to post review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-medium md:text-4xl font-roboto text-[#224F34] text-center">
        Ratings & Reviews
      </h2>

      {/* ⭐ Rating input */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <FaStar
            key={i}
            size={26}
            color={i <= rating ? "#ffc107" : "#e4e5e9"}
            onClick={() => setRating(i)}
            className="cursor-pointer"
          />
        ))}
      </div>

      {/* ✍️ Comment input */}
      <textarea
        value={newReview}
        onChange={(e) => setNewReview(e.target.value)}
        placeholder="Write your review..."
        className="border w-full p-2 rounded"
      />

      <button
        onClick={submitReview}
        disabled={loading}
        className="bg-[#93B9A2] hover:opacity-90 text-black px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer md:w-auto w-full justify-center mt-2"
      >
        {loading ? "Posting..." : "Post Review"}
      </button>

      {/* 📝 Reviews list */}
      <div className="mt-6 space-y-4">
        {fetching ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-400">No reviews yet</p>
        ) : (
          reviews.map((r) => (
            <div key={r._id} className="border p-3 rounded">
              {/* Reviewer name */}
              <p className="font-medium">{r.username}</p>

              {/* Rating stars */}
              <div className="flex mb-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={14}
                    color={i < r.rating ? "#ffc107" : "#e4e5e9"}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;