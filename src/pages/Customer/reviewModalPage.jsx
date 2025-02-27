import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewModalPage({ isOpen, onClose }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen]);

  async function fetchReviews() {
    try {
      const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
      setReviews(data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg">
          ✖
        </button>

        <div className="border-t pt-4">
          {reviews.length === 0 ? (
            <p>No reviews yet. Be the first to review!</p>
          ) : (
            reviews.map((review) => (
              <div key={review._id} className="border-b pb-3 mb-3">
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-yellow-500">⭐ {review.rating}/5</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
