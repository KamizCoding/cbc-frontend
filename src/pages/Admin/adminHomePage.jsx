import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";
import { HiIdentification } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import AdminProductsPage from "./adminProductsPage";
import AdminDashboard from "./adminDashboard";
import AdminOrdersPage from "./adminOrdersPage";
import AdminCustomersPage from "./adminCustomersPage";
import AdminReviewsPage from "./adminReviewsPage.jsx";
import AddProductForm from "./addProductForm";
import UpdateProductForm from "./updateProductForm";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminHomePage() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/userdetail", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.type !== "admin") {
          toast.error("Unauthorized Access");
          nav("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed To Fetch User Data");
        nav("/login");
      });
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        nav("/login");
        return;
      }

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      setUser(null);
      nav("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <div className="bg-lime-50 w-full min-h-screen flex">
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-[20%] h-screen fixed left-0 top-0 flex flex-col p-5 bg-lime-200 shadow-lg">
        {user && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.profilePicture || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-gray-300 shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => nav("/user", { state: { user: user } })}
            />
            <p className="text-lg font-semibold text-gray-900 mt-2">{user.name || "Admin"}</p>
            <p className="text-sm text-gray-700">{user.email}</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-5 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        )}

        <div className="border-t border-gray-400 opacity-50 mt-4 mb-4"></div>
        <div className="flex flex-col gap-4">
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/dashboard"
          >
            <TbLayoutDashboardFilled size={24} />
            <span>Dashboard</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/products"
          >
            <FaShoppingBag size={24} />
            <span>Products</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/orders"
          >
            <GoListOrdered size={24} />
            <span>Orders</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/customers"
          >
            <HiIdentification size={24} />
            <span>Customers</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/reviews"
          >
            <FaStar size={24} />
            <span>User Reviews</span>
          </Link>
        </div>
      </div>
      <div className="ml-[20%] w-[80%] min-h-screen p-6">
        {user ? (
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/addProducts" element={<AddProductForm />} />
            <Route path="products/updateProducts" element={<UpdateProductForm />} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route path="reviews" element={<AdminReviewsPage />} />
            <Route
              path="*"
              element={<h1 className="text-center text-3xl text-red-600">404 Error - Page Not Found</h1>}
            />
          </Routes>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <p className="text-lg font-semibold text-dark">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
