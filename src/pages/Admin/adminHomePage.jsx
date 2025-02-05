import { Link, Route, Routes } from "react-router-dom";
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

export default function AdminHomePage() {
    return (
        <div className="bg-lime-50 w-full min-h-screen flex">
            {/* Sidebar */}
            <div className="bg-lime-200 w-[20%] h-screen fixed left-0 top-0 flex flex-col p-4">
                <Link className="flex flex-row items-center gap-4 p-3 text-2xl border border-lime-700 bg-lime-300 rounded-2xl transition-all duration-300 hover:bg-lime-400 hover:text-white hover:shadow-lg" to="/admin/dashboard">
                    <TbLayoutDashboardFilled />
                    <span>Dashboard</span>
                </Link>
                <Link className="flex flex-row items-center gap-4 p-3 text-2xl mt-4 border border-lime-700 bg-lime-300 rounded-2xl transition-all duration-300 hover:bg-lime-400 hover:text-white hover:shadow-lg" to="/admin/products">
                    <FaShoppingBag />
                    <span>Products</span>
                </Link>
                <Link className="flex flex-row items-center gap-4 p-3 text-2xl mt-4 border border-lime-700 bg-lime-300 rounded-2xl transition-all duration-300 hover:bg-lime-400 hover:text-white hover:shadow-lg" to="/admin/orders">
                    <GoListOrdered />
                    <span>Orders</span>
                </Link>
                <Link className="flex flex-row items-center gap-4 p-3 text-2xl mt-4 border border-lime-700 bg-lime-300 rounded-2xl transition-all duration-300 hover:bg-lime-400 hover:text-white hover:shadow-lg" to="/admin/customers">
                    <HiIdentification />
                    <span>Customers</span>
                </Link>
            </div>
            
            {/* Main Content */}
            <div className="ml-[20%] w-[80%] min-h-screen p-6">
                <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProductsPage />} />
                    <Route path="products/addProducts" element={<AddProductForm />} />
                    <Route path="products/updateProducts" element={<UpdateProductForm />} />
                    <Route path="orders" element={<AdminOrdersPage />} />
                    <Route path="customers" element={<AdminCustomersPage />} />
                    <Route path="*" element={<h1 className='text-center text-3xl text-red-600'>404 Error - Page Not Found</h1>} />
                </Routes>
            </div>
        </div>
    );
}
