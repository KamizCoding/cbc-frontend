import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/reviews", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setReviews(res.data.list);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-lime-50 flex flex-col items-center relative overflow-hidden">
      <h1 className="text-4xl font-extrabold text-lime-700 mb-8">
        Admin Reviews Page
      </h1>
      {loading ? (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
          <div className="w-12 h-12 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
          <p className="mt-3 text-dark text-lg font-semibold animate-pulse">Loading...</p>
        </div>
      ) : (
        <div className="w-full max-w-6xl shadow-lg rounded-lg flex-grow">
          <table className="w-full bg-white rounded-lg border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-green-700 text-white uppercase text-md font-bold">
                <th className="py-4 px-3 text-left w-20">Name</th>
                <th className="py-4 px-3 text-left w-40">Email</th>
                <th className="py-4 px-3 text-left w-16">Rating</th>
                <th className="py-4 px-3 text-left w-64">Comment</th>
                <th className="py-4 px-3 text-left w-32">Submitted On</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
              {reviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-600">
                    No reviews available
                  </td>
                </tr>
              ) : (
                reviews.map((review, index) => (
                  <tr
                    key={review._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                    } hover:bg-gray-300 transition`}
                  >
                    <td className="py-4 px-3 font-semibold">{review.name}</td>
                    <td className="py-4 px-3">{review.userEmail}</td>
                    <td className="py-4 px-3 text-yellow-500 font-bold">{review.rating}/5</td>
                    <td className="py-4 px-3 text-gray-700">{review.comment}</td>
                    <td className="py-4 px-3">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
