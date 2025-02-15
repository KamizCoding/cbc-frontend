import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaEye } from "react-icons/fa6";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedNotes, setUpdatedNotes] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please Login To View Orders");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
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

  function openModal(order, type) {
    setSelectedOrder(order);
    setModalType(type);
    setUpdatedStatus(order.status);
    setUpdatedNotes(order.notes || "");
  }

  function closeModal() {
    setSelectedOrder(null);
    setModalType(null);
  }

  function updateOrder() {
    const token = localStorage.getItem("token");
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL +
          `/api/orders/${selectedOrder.orderId}`,
        {
          status: updatedStatus,
          notes: updatedNotes,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOrders(
          orders.map((order) =>
            order.orderId === selectedOrder.orderId
              ? { ...order, status: updatedStatus, notes: updatedNotes }
              : order
          )
        );
        closeModal();
      })
      .catch(() => {
        toast.error("Failed to update order. Please try again.");
      });
  }

  return (
    <div className="p-6 bg-lime-50 flex flex-col items-center relative overflow-hidden">
      <h1 className="text-4xl font-extrabold text-lime-700 mb-8">
        Admin Orders Page
      </h1>

      {orders.length === 0 ? (
        <p className="text-accent text-lg">No orders found.</p>
      ) : (
        <div className="w-full max-w-6xl shadow-lg rounded-lg flex-grow">
          <div className="max-h-[350px] overflow-y-auto">
            <table className="w-full bg-white rounded-lg border border-gray-300 shadow-md">
            <thead>
                <tr className="bg-lime-700 text-white uppercase text-md font-semibold">
                    <th className="py-4 px-6 text-center">Order ID</th>
                    <th className="py-4 px-6 text-center">Status</th>
                    <th className="py-4 px-6 text-center">Date</th>
                    <th className="py-4 px-6 text-center">Total</th>
                    <th className="py-4 px-6 text-center">View</th>
                    <th className="py-4 px-6 text-center">Update</th>
                </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
                {orders.map((order, index) => (
                  <tr
                    key={order.orderId}
                    className={`${
                      index % 2 === 0 ? "bg-lime-100" : "bg-lime-200"
                    } hover:bg-lime-300 transition duration-200`}
                  >
                    <td className="py-4 px-6 text-left">{order.orderId}</td>
                    <td className="py-4 px-6 text-left">
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-center w-[120px]
                                ${order.status === "completed" ? "bg-green-100 text-green-700 border border-green-500 shadow-sm" : ""}
                                ${order.status === "processing" ? "bg-yellow-100 text-yellow-800 border border-yellow-500 shadow-sm" : ""}
                                ${order.status === "shipped" ? "bg-blue-100 text-blue-700 border border-blue-500 shadow-sm" : ""}
                                ${order.status === "cancelled" ? "bg-red-100 text-red-700 border border-red-500 shadow-sm" : ""}
                            `}
                        >
                            {order.status}
                        </span>
                    </td>
                    <td className="py-4 px-6 text-left">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 font-bold text-dark">
                      LKR {calculateTotal(order.orderedItems).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        className="text-lime-600 hover:text-lime-800 transition duration-200 p-2 rounded-lg bg-lime-300 hover:bg-lime-400"
                        onClick={() => openModal(order, "view")}
                      >
                        <FaEye />
                      </button>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition duration-200 p-2 rounded-lg bg-blue-300 hover:bg-blue-400"
                        onClick={() => openModal(order, "update")}
                      >
                        <FaPencil />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalType === "view" && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold text-dark border-b pb-2">
                  Order Details
                </h2>
                <p className="text-gray-800 mt-2">
                  <strong>Order ID:</strong> {selectedOrder.orderId}
                </p>
                <p className="text-gray-800">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`${
                      selectedOrder.status === "completed"
                        ? "text-green-600"
                        : selectedOrder.status === "cancelled"
                        ? "text-red-600"
                        : "text-dark"
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </p>
                <p className="text-gray-800">
                  <strong>Order Date:</strong>{" "}
                  {new Date(selectedOrder.date).toLocaleDateString()}
                </p>
                <p className="text-gray-800">
                  <strong>Payment ID:</strong>{" "}
                  {selectedOrder.paymentId || "N/A"}
                </p>
                <p className="text-gray-800">
                  <strong>Notes:</strong>{" "}
                  {selectedOrder.notes || "No notes available"}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-dark border-b pb-2">
                  Shipping Information
                </h2>
                <p className="text-gray-800 mt-2">
                  <strong>Name:</strong> {selectedOrder.name}
                </p>
                <p className="text-gray-800">
                  <strong>Address:</strong> {selectedOrder.address}
                </p>
                <p className="text-gray-800">
                  <strong>Phone:</strong> {selectedOrder.phone}
                </p>
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
                      <p className="text-gray-600 text-sm">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-dark">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
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

      {modalType === "update" && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
            <h2 className="text-2xl font-bold text-dark text-center">
              Update Order
            </h2>
            <label className="block mt-2 font-semibold">Status:</label>
            <select
              value={updatedStatus}
              onChange={(e) => setUpdatedStatus(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <label className="block mt-2 font-semibold">Notes:</label>
            <textarea
              value={updatedNotes}
              onChange={(e) => setUpdatedNotes(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="3"
            ></textarea>
            <div className="mt-4 flex justify-between">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition-all"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-lime-600 text-white px-4 py-2 rounded-lg hover:bg-lime-700 transition-all"
                onClick={updateOrder}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
