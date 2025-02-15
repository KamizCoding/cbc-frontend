import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

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
                setOrderDetails(false);
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

    function openModal(order) {
        setSelectedOrder(order);
        setOrderDetails(true);
    }

    function closeModal() {
        setSelectedOrder(null);
        setOrderDetails(false);
    }

    return (
        <div className="w-full min-h-screen flex flex-col items-center p-6 bg-primary">
            <h1 className="text-3xl font-bold text-dark mb-4">Your Orders</h1>

            {orders.length === 0 ? (
                <p className="text-accent text-lg">No orders found.</p>
            ) : (
                <div className="w-full max-w-4xl bg-white shadow-md rounded-lg overflow-hidden mb-6">
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
                                    <tr 
                                        key={order.orderId} 
                                        className="border-b border-muted cursor-pointer hover:bg-gray-100 transition-all"
                                        onClick={() => openModal(order)} 
                                    >
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

            {selectedOrder && orderDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-2xl font-bold text-dark border-b pb-2">Order Details</h2>
                                <p className="text-gray-800 mt-2"><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                                <p className="text-gray-800"><strong>Status:</strong> <span className={`${selectedOrder.status === 'completed' ? 'text-green-600' : selectedOrder.status === 'cancelled' ? 'text-red-600' : 'text-dark'}`}>{selectedOrder.status}</span></p>
                                <p className="text-gray-800"><strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                                <p className="text-gray-800"><strong>Payment ID:</strong> {selectedOrder.paymentId || "N/A"}</p>
                                <p className="text-gray-800"><strong>Notes:</strong> {selectedOrder.notes || "No notes available"}</p>
                            </div>
                            
                            <div>
                                <h2 className="text-2xl font-bold text-dark border-b pb-2">Shipping Information</h2>
                                <p className="text-gray-800 mt-2"><strong>Name:</strong> {selectedOrder.name}</p>
                                <p className="text-gray-800"><strong>Address:</strong> {selectedOrder.address}</p>
                                <p className="text-gray-800"><strong>Phone:</strong> {selectedOrder.phone}</p>
                            </div>
                        </div>

                        <div className="max-h-[200px] overflow-y-auto mt-4 border-t pt-3">
                            <h3 className="text-lg font-semibold text-dark">Items Ordered</h3>
                            <ul className="divide-y">
                                {selectedOrder.orderedItems.map((item, index) => (
                                    <li key={index} className="py-2 flex items-center gap-4">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-14 h-14 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="text-gray-800">{item.name}</p>
                                            <p className="text-gray-600 text-sm">${item.price.toFixed(2)} x {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-dark">${(item.price * item.quantity).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button 
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
