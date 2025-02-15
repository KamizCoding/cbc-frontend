import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please Login To View Your Orders");
            return;
        }

        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            if (res.data.list && Array.isArray(res.data.list)) {
                setOrders(res.data.list);
            } else {
                setOrders([]); 
            }
        })
        .catch(() => {
            toast.error("Failed To Fetch Orders. Please Try Again");
        });
    }, []);

    function calculateTotal(items) {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6 bg-primary">
            <h1 className="text-3xl font-bold text-dark mb-4">Your Orders</h1>

            {orders.length === 0 ? (
                <p className="text-accent text-lg">No orders found.</p>
            ) : (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mb-6">

                    
                    {/* ✅ Scrollable Table Container */}
                    <div className="max-h-[285px] overflow-y-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="sticky top-0 bg-secondary">
                                <tr className="text-dark">
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.orderId} className="border-b border-muted">
                                        <td className="px-4 py-3 text-sm text-gray-800">{order.orderId}</td>
                                        <td className={`px-4 py-3 font-semibold capitalize ${order.status === 'completed' ? 'text-green-600' : order.status === 'cancelled' ? 'text-red-600' : 'text-dark'}`}>
                                            {order.status}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {new Date(order.date).toLocaleDateString("en-US", { 
                                                year: "numeric", 
                                                month: "short", 
                                                day: "numeric" 
                                            })}
                                        </td>
                                        <td className="px-4 py-3 font-bold text-dark">
                                            ${calculateTotal(order.orderedItems).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            )}
        </div>
    );
}
