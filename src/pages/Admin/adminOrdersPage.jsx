import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [orderDetails, setOrderDetails] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loadedOrders, setLoadedOrders] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please Login To View Orders");
            return;
        }

        if (!loadedOrders) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                if (res.data.list && Array.isArray(res.data.list)) {
                    setOrders(res.data.list);
                    setLoadedOrders(true);
                } else {
                    setOrders([]);
                }
            })
            .catch(() => {
                toast.error("Failed To Fetch Orders. Please Try Again");
            });
        }
    }, [loadedOrders]);

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
        <div className="p-6 bg-lime-50 flex flex-col items-center relative overflow-hidden">
            <h1 className="text-4xl font-extrabold text-lime-700 mb-8">Admin Orders Page</h1>

            {loadedOrders ? (
                <div className="w-full max-w-6xl shadow-lg rounded-lg flex-grow">
                    <div className="max-h-[350px] overflow-y-auto">
                        <table className="w-full bg-white rounded-lg border border-gray-300 shadow-md">
                            <thead>
                                <tr className="bg-lime-700 text-white uppercase text-md font-semibold">
                                    <th className="py-4 px-6 text-left">Order ID</th>
                                    <th className="py-4 px-6 text-left">Customer</th>
                                    <th className="py-4 px-6 text-left">Status</th>
                                    <th className="py-4 px-6 text-left">Date</th>
                                    <th className="py-4 px-6 text-left">Total</th>
                                    <th className="py-4 px-6 text-center">View</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
                                {orders.map((order, index) => (
                                    <tr key={order.orderId} className={`${index % 2 === 0 ? 'bg-lime-100' : 'bg-lime-200'} hover:bg-lime-300 transition duration-200`}>
                                        <td className="py-4 px-6 text-left">{order.orderId}</td>
                                        <td className="py-4 px-6 text-left">{order.name}</td>
                                        <td className={`py-4 px-6 font-semibold capitalize ${order.status === 'completed' ? 'text-green-600' : order.status === 'cancelled' ? 'text-red-600' : 'text-dark'}`}>
                                            {order.status}
                                        </td>
                                        <td className="py-4 px-6 text-left">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="py-4 px-6 text-left font-bold text-dark">
                                            LKR {calculateTotal(order.orderedItems).toFixed(2)}
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <button className="text-lime-600 hover:text-lime-800 transition duration-200 p-2 rounded-lg bg-lime-300 hover:bg-lime-400"
                                                onClick={() => openModal(order)}>
                                                <FaEye />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 border-b-green-600 rounded-full animate-spin"></div>
                </div>
            )}

            {selectedOrder && orderDetails && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
                    <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-2xl transform scale-95">
                        <h2 className="text-2xl font-extrabold text-lime-700 border-b pb-2 text-center">
                            Order Details
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                            <div className="bg-lime-200 p-3 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold text-lime-800 mb-1">Order Information</h3>
                                <p className="text-gray-800"><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                                <p className="text-gray-800"><strong>Status:</strong> 
                                    <span className={`${selectedOrder.status === 'completed' ? 'text-green-600' : selectedOrder.status === 'cancelled' ? 'text-red-600' : 'text-dark'}`}> {selectedOrder.status}</span>
                                </p>
                                <p className="text-gray-800"><strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                                <p className="text-gray-800"><strong>Payment ID:</strong> {selectedOrder.paymentId || "N/A"}</p>
                                <p className="text-gray-800"><strong>Notes:</strong> {selectedOrder.notes || "No notes available"}</p>
                            </div>
                            
                            <div className="bg-lime-200 p-3 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold text-lime-800 mb-1">Shipping Information</h3>
                                <p className="text-gray-800"><strong>Name:</strong> {selectedOrder.name}</p>
                                <p className="text-gray-800"><strong>Address:</strong> {selectedOrder.address}</p>
                                <p className="text-gray-800"><strong>Phone:</strong> {selectedOrder.phone}</p>
                            </div>
                        </div>

                        <div className="max-h-[180px] overflow-y-auto mt-3 border-t pt-2 bg-lime-50 p-3 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold text-lime-800">Items Ordered</h3>
                            <ul className="divide-y">
                                {selectedOrder.orderedItems.map((item, index) => (
                                    <li key={index} className="py-2 flex items-center gap-3 bg-lime-100 p-2 rounded-lg shadow-md">
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="w-12 h-12 rounded-lg object-cover shadow-md"
                                        />
                                        <div className="flex-1">
                                            <p className="text-gray-800">{item.name}</p>
                                            <p className="text-gray-600 text-sm">LKR {item.price.toFixed(2)} x {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-dark">LKR {(item.price * item.quantity).toFixed(2)}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button 
                                className="bg-red-600 text-white px-4 py-1.5 rounded-lg hover:bg-red-700 transition-all shadow-md"
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
