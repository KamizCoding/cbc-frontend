import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";
import { HiIdentification } from "react-icons/hi2";
import AdminProductsPage from "./adminProductsPage";
import AdminDashboard from "./adminDashboard";
import AdminOrdersPage from "./adminOrdersPage";
import AdminCustomersPage from "./adminCustomersPage";
import AddProductForm from "./addProductForm";
import UpdateProductForm from "./updateProductForm";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminHomePage() {
  const [user, setUser] = useState(null);
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
      <div className="w-[20%] h-screen fixed left-0 top-0 flex flex-col p-5 bg-lime-200 shadow-lg">
        
        {user && (
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.profilePicture || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"}
              alt="Profile"
              className="w-20 h-20 rounded-full border border-gray-300 shadow-md cursor-pointer hover:scale-105 transition-transform"
              onClick={() => nav("/user", { state: { user: user } })}  
            />
            <p className="text-lg font-semibold text-gray-900 mt-2">{user.name || "Admin"}</p>
            <p className="text-sm text-gray-700">{user.email}</p>
            <button
              onClick={handleLogout}
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
            <Route
              path="*"
              element={<h1 className="text-center text-3xl text-red-600">404 Error - Page Not Found</h1>}
            />
          </Routes>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
              <div className="w-12 h-12 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
              <p className="mt-3 text-dark text-lg font-semibold animate-pulse">Loading...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
