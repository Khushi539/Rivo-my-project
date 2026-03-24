import React, { useState, useEffect } from "react";
import coma from "../assets/coma.png";
import Heading from "../Style/Heading";
import { addFeedback, GetFeedback } from "../API/productapi";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser({
        name: storedUser.name,
        email: storedUser.email,
      });
    }
  }, []);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const res = await GetFeedback();
      console.log("GET FEEDBACK 👉", res.data);

      const list = Array.isArray(res.data)
        ? res.data
        : res.data.data;

      const formatted = list.map((item) => ({
        id: item._id,
        name: item.name,
        email: item.email,
        peragraph: item.feedback,
      }));

      setFeedbacks(formatted); 
    } catch (error) {
      console.error("Get feedback error:", error);
    }
  };

  const handleSubmit = async () => {
    if (!message) return;

    const payload = {
      name: user.name,
      email: user.email,
      feedback: message,
    };

    try {
      setLoading(true);
      await addFeedback(payload);

      
      await fetchFeedbacks();

      setMessage("");
      setShowModal(false);
    } catch (error) {
      console.error("Feedback submit failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Heading text="Feedback Corner" />

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {feedbacks.length === 0 && (
            <p className="text-gray-500">No feedback yet.</p>
          )}

          {feedbacks.map((item) => (
            <div key={item.id} className="bg-white shadow p-4">
              <img src={coma} className="h-[15px] mb-3" alt="" />
              <h5 className="font-semibold text-[#224F34]">
                {item.name}
              </h5>
              <p className="text-xs text-gray-400">{item.email}</p>
              <p className="text-sm mt-2 text-gray-600">
                {item.peragraph}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="mt-6 cursor-pointer bg-green-800 hover:bg-[#6BC785] text-white px-6 py-3 rounded"
        >
          Send Feedback
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[90%] md:w-[400px] rounded p-6">
            <h3 className="text-lg font-semibold text-[#224F34] mb-2">
              Your Feedback
            </h3>

            <p className="text-sm text-gray-500 mb-3">
              {user.name} ({user.email})
            </p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your feedback..."
              rows="4"
              className="w-full border rounded px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="border px-4 cursor-pointer py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-800 cursor-pointer text-white px-4 py-2 rounded"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Feedback;