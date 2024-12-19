import { Link } from "react-router-dom";
export function AdminHomePage() {
    return(
        <div className="bg-gray-400 w-full h-screen flex">
            <div className="bg-blue-100 w-[25%] h-screen flex flex-col items-center">
            <Link to="/admin/dahboard">Dashboard</Link>
            <Link to="/admin/products">Products</Link>
            <Link to="/admin/orders">Orders</Link>
            <Link to="/admin/Customers">Customers</Link>
            </div>

            <div className="w-[75%] h-screen">

            </div>
        </div>
    );
}