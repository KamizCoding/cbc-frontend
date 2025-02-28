import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function ReviewModalPage({ isOpen, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [reviewId, setReviewId] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchReviews();
    }
  }, [isOpen]);

  async function fetchReviews() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews"
      );
      if (Array.isArray(data.list)) {
        setReviews(data.list);
      } else {
        setReviews([]);
      }

      const token = localStorage.getItem("token");
      if (token) {
        const user = JSON.parse(atob(token.split(".")[1]));
        setUserEmail(user.email);

        const userReview = data.list.find(
          (review) => review.userEmail === user.email
        );
        if (userReview) {
          setReviewId(userReview._id);
          setRating(userReview.rating);
          setComment(userReview.comment);
        }
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      setReviews([]);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to update a review.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews/update",
        { reviewId, rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Review updated successfully!");
      setEditing(false); 
      fetchReviews();
      setLoading(false);
    } catch (error) {
      console.error("Failed to update review:", error);
      toast.error("Failed to update review.");
      setLoading(false);
    }
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {editing ? "Edit Your Review" : "Customer Reviews"}
        </h2>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg"
        >
          ✖
        </button>

        {editing ? (
          <form onSubmit={handleUpdate}>
            <label className="block text-md font-semibold">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="p-2 border rounded w-full"
            >
              {[5, 4, 3, 2, 1].map((star) => (
                <option key={star} value={star}>
                  {star} Stars
                </option>
              ))}
            </select>

            <label className="block text-md font-semibold mt-2">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
              className="p-2 border rounded w-full"
            ></textarea>

            <button
              type="submit"
              className="mt-3 w-full bg-accent text-white py-2 rounded hover:bg-dark transition"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Review"}
            </button>

            <button
              onClick={() => setEditing(false)}
              className="mt-2 w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </form>
        ) : (
          <div className="border-t pt-4 max-h-[50vh] overflow-y-auto">
            {reviews.length === 0 ? (
              <p className="text-center text-gray-600">
                No reviews yet. Be the first to leave one!
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="border-b pb-3 mb-3 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-yellow-500">⭐ {review.rating}/5</p>
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-500">
                      Reviewed on {formatDate(review.createdAt)}
                    </p>
                  </div>
                  {review.userEmail === userEmail && (
                    <button
                      onClick={() => setEditing(true)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
