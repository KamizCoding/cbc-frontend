import { Link, Route, Routes } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";
import { HiIdentification } from "react-icons/hi2";
import AdminProductsPage from "./adminProductsPage";
import AdminDashboard from "./adminDashboard";
import AdminOrdersPage from "./adminOrdersPage";
import AdminCustomersPage from "./adminCustomersPage";
export default function AdminHomePage() {
    return(
        <div className="bg-lime-50 w-full h-screen flex">
            <div className="bg-blue-100 w-[20%] h-screen flex flex-col">
                <Link className="flex flex-row items-center gap-4 p-2 text-2xl ml-5 border border-blue-500 bg-blue-200 mt-10 mr-5 rounded-2xl transition-all duration-300 hover:bg-blue-300 hover:text-white hover:shadow-lg" to="/admin/dashboard">
                    <div className="flex flex-col items-center">
                        <TbLayoutDashboardFilled />
                    </div>
                    <span>Dashboard</span>
                </Link>
                <Link className="flex flex-row items-center gap-4 p-2 text-2xl ml-5 border border-blue-500 bg-blue-200 mt-4 mr-5 rounded-2xl transition-all duration-300 hover:bg-blue-300 hover:text-white hover:shadow-lg" to="/admin/products">
                    <div className="flex flex-col items-center">
                        <FaShoppingBag />
                    </div>
                    <span>Products</span>
                </Link>
                <Link className="flex flex-row items-center gap-4 p-2 text-2xl ml-5 border border-blue-500 bg-blue-200 mt-4 mr-5 rounded-2xl transition-all duration-300 hover:bg-blue-300 hover:text-white hover:shadow-lg" to="/admin/orders">
                    <div className="flex flex-col items-center">
                        <GoListOrdered />
                    </div>
                    <span>Orders</span>
                </Link>
                <Link className="flex flex-row items-center gap-4 p-2 text-2xl ml-5 border border-blue-500 bg-blue-200 mt-4 mr-5 rounded-2xl transition-all duration-300 hover:bg-blue-300 hover:text-white hover:shadow-lg" to="/admin/customers">
                    <div className="flex flex-col items-center">
                        <HiIdentification />
                    </div>
                    <span>Customers</span>
                </Link>
            </div>

            <div className="w-[75%] h-screen">
                <Routes path="/*">
                    <Route path="/dashboard" element={<AdminDashboard/>}/>
                    <Route path="/products" element={<AdminProductsPage/>}/>
                    <Route path="/orders" element={<AdminOrdersPage/>}/>
                    <Route path="/customers" element={<AdminCustomersPage/>}/>
                    <Route path="/*" element={<h1>404 Error</h1>}/>
                </Routes>
            </div>
        </div>
    );
}