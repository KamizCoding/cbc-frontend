import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewModal({ isOpen, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen]);

  async function fetchReviews() {
    try {
      const { data } = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/reviews");
      setReviews(data);

      const token = localStorage.getItem("token");
      if (token) {
        const user = JSON.parse(atob(token.split(".")[1]));
        setHasReviewed(data.some(review => review.user === user._id));
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews",
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Review submitted!");
      setRating(5);
      setComment("");
      fetchReviews();
      setLoading(false);
    } catch (error) {
      toast.error("Failed to submit review.");
      setLoading(false);
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

        {!hasReviewed && (
          <form onSubmit={handleSubmit} className="mb-4">
            <label className="block text-md font-semibold">Rating:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="p-2 border rounded w-full">
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>{star} Stars</option>
              ))}
            </select>

            <label className="block text-md font-semibold mt-2">Comment:</label>
            <textarea 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
              rows="3" 
              className="p-2 border rounded w-full">
            </textarea>

            <button 
              type="submit" 
              className="mt-3 w-full bg-accent text-white py-2 rounded hover:bg-dark transition" 
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        )}

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
