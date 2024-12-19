import { Link } from "react-router-dom";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaShoppingBag } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";
import { HiIdentification } from "react-icons/hi2";
export function AdminHomePage() {
    return(
        <div className="bg-gray-400 w-full h-screen flex">
            <div className="bg-blue-100 w-[25%] h-screen flex flex-col items-center">
            <Link className="flex flex-row items-center" to="/admin/dahboard"><TbLayoutDashboardFilled />Dashboard</Link>
            <Link className="flex flex-row items-center" to="/admin/products"><FaShoppingBag />Products</Link>
            <Link className="flex flex-row items-center" to="/admin/orders"><GoListOrdered />Orders</Link>
            <Link className="flex flex-row items-center" to="/admin/Customers"><HiIdentification />Customers</Link>
            </div>

            <div className="w-[75%] h-screen">

            </div>
        </div>
    );
}