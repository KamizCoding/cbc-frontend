import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa6";
import toast from "react-hot-toast";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    try {
      const { data } = await axios.get(
        import.meta.env.VITE_BACKEND_URL + "/api/reviews"
      );
      setReviews(Array.isArray(data.list) ? data.list : []);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!selectedReview) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/delete/${selectedReview._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Review deleted successfully");
      fetchReviews();
    } catch (error) {
      console.error("Failed to delete review:", error);
      toast.error("Failed to delete review. Please try again.");
    }
    setSelectedReview(null);
  }

  return (
    <div className="p-6 bg-lime-50 flex flex-col items-center relative overflow-hidden">
      <h1 className="text-4xl font-extrabold text-lime-700 mb-8">
        Admin Reviews Page
      </h1>

      {loading ? (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
          <div className="w-12 h-12 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
          <p className="mt-3 text-dark text-lg font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      ) : (
        <div className="w-full max-w-6xl shadow-lg rounded-lg flex-grow">
          <table className="w-full bg-white rounded-lg border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-lime-700 text-white uppercase text-md font-bold">
                <th className="py-4 px-6 text-left w-20">Name</th>
                <th className="py-4 px-6 text-left w-40">Email</th>
                <th className="py-4 px-6 text-left w-16">Rating</th>
                <th className="py-4 px-6 text-left">Comment</th>
                <th className="py-4 px-6 text-left w-32">Submitted On</th>
                <th className="py-4 px-6 text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-600">
                    No reviews available
                  </td>
                </tr>
              ) : (
                reviews.map((review, index) => (
                  <tr
                    key={review._id}
                    className={`${
                      index % 2 === 0 ? "bg-lime-100" : "bg-lime-200"
                    } hover:bg-lime-300 transition duration-200`}
                  >
                    <td className="py-4 px-6 font-semibold">{review.name}</td>
                    <td className="py-4 px-6">{review.userEmail}</td>
                    <td className="py-4 px-6 text-yellow-500 font-bold">
                      {review.rating}/5
                    </td>
                    <td className="py-4 px-6 text-gray-700">{review.comment}</td>
                    <td className="py-4 px-6">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setSelectedReview(review)}
                        className="p-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{selectedReview.userEmail}'s</span>{" "}
              review?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={() => setSelectedReview(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
