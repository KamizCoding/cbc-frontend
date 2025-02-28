import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      nav("/login");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/userdetail", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.type !== "admin") {
          toast.error("Unauthorized Access");
          nav("/login");
        } else {
          setUser(res.data);
        }
      })
      .catch(() => {
        toast.error("Failed To Fetch User Data");
        nav("/login");
      });
  }, []);

  async function handleLogout() {
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
      toast.error("Logout failed. Please try again.");
    }
  }

  return (
    <div className="bg-lime-50 w-full min-h-screen flex flex-col md:flex-row">
      
      <div className="bg-lime-200 flex items-center justify-between px-4 py-3 shadow-md md:hidden">
        <h1 className="text-lg font-bold text-gray-900">Admin Panel</h1>
        <button onClick={() => setIsSidebarOpen(true)} className="text-xl">
          <FaBars />
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[40] md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <div
        className={`fixed md:relative top-0 left-0 w-64 md:w-[20%] h-full bg-lime-200 shadow-lg p-5 transition-transform duration-300 z-[50] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex md:flex-col md:fixed`}
      >
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-3 right-3 text-2xl text-gray-700 md:hidden"
        >
          <FaTimes />
        </button>

        {user && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={
                user.profilePicture ||
                "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"
              }
              alt="Profile"
              className="w-14 h-14 rounded-full border border-gray-300 shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => nav("/user", { state: { user: user } })}
            />
            <p className="text-lg font-semibold text-gray-900 mt-2">
              {user.name || "Admin"}
            </p>
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

        <div className="flex flex-col gap-2">
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/dashboard"
            onClick={() => setIsSidebarOpen(false)}
          >
            <TbLayoutDashboardFilled size={24} />
            <span>Dashboard</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/products"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaShoppingBag size={24} />
            <span>Products</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/orders"
            onClick={() => setIsSidebarOpen(false)}
          >
            <GoListOrdered size={24} />
            <span>Orders</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/customers"
            onClick={() => setIsSidebarOpen(false)}
          >
            <HiIdentification size={24} />
            <span>Customers</span>
          </Link>
          <Link
            className="flex items-center gap-4 p-3 text-lg text-black bg-lime-300 rounded-lg transition-all duration-300 hover:bg-lime-400 hover:shadow-md"
            to="/admin/reviews"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaStar size={24} />
            <span>User Reviews</span>
          </Link>
        </div>
      </div>

      <div className="w-full md:w-[80%] p-6 overflow-auto h-screen">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/addProducts" element={<AddProductForm />} />
          <Route path="products/updateProducts" element={<UpdateProductForm />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="customers" element={<AdminCustomersPage />} />
          <Route path="reviews" element={<AdminReviewsPage />} />
        </Routes>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-2 text-gray-700">Are you sure you want to log out?</p>
            <div className="flex justify-end gap-4">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
