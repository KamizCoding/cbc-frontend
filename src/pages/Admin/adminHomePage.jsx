import { Link, Route, Routes, useNavigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
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
        if(res.data.type != "admin"){
            toast.error("Unauthorized Access")
            nav("/login")
        } else {
            setUser(res.data)
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed To Fetch User Data");
        nav("/login");
      });
  }, []);

  return (
    <div className="bg-lime-50 w-full min-h-screen flex">
      <div className="bg-lime-200 w-[20%] h-screen fixed left-0 top-0 flex flex-col p-4">
        <Link
          className="flex flex-row items-center gap-4 p-3 text-2xl border border-lime-700 bg-lime-300 rounded-2xl transition-all duration-300 hover:bg-lime-400 hover:text-white hover:shadow-lg"
          to="/admin/dashboard"
        >
          <TbLayoutDashboardFilled />
          <span>Dashboard</span>
        </Link>
        <Link
          className="flex flex-row items-center gap-4 p-3 text-2xl mt-4 border border-lime-700 bg-lime-300 rounded-2xl transition-all duration-300 hover:bg-lime-400 hover:text-white hover:shadow-lg"
          to="/admin/products"
        >
          <FaShoppingBag />
          <span>Products</span>
        </Link>
        <Link
          className="flex flex-row items-center gap-4 p-3 text-2xl mt-4 border border-lime-700 bg-lime-300 rounded-2xl transition-all duration-300 hover:bg-lime-400 hover:text-white hover:shadow-lg"
          to="/admin/orders"
        >
          <GoListOrdered />
          <span>Orders</span>
        </Link>
        <Link
          className="flex flex-row items-center gap-4 p-3 text-2xl mt-4 border border-lime-700 bg-lime-300 rounded-2xl transition-all duration-300 hover:bg-lime-400 hover:text-white hover:shadow-lg"
          to="/admin/customers"
        >
          <HiIdentification />
          <span>Customers</span>
        </Link>
      </div>

      <div className="ml-[20%] w-[80%] min-h-screen p-6">
        {user != null && (
          <Routes path = "/">
            <Route path="/" element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/addProducts" element={<AddProductForm />} />
            <Route
              path="products/updateProducts"
              element={<UpdateProductForm />}
            />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="customers" element={<AdminCustomersPage />} />
            <Route
              path="*"
              element={
                <h1 className="text-center text-3xl text-red-600">
                  404 Error - Page Not Found
                </h1>
              }
            />
          </Routes>
        )}
        {user == null && (
          <div className="w-full h-full flex justify-center items-center">
            <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
              <div className="w-12 h-12 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
              <p className="mt-3 text-dark text-lg font-semibold animate-pulse">
                Loading...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
