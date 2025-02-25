import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function OrdersMetrics() {
  const [orderStats, setOrderStats] = useState({
    processing: 0,
    shipped: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (!response.data || !Array.isArray(response.data.list)) {
          console.error("Invalid data format:", response.data);
          return;
        }

        const orders = response.data.list;

        const statusCounts = {
          processing: orders.filter((order) => order.status === "processing")
            .length,
          shipped: orders.filter((order) => order.status === "shipped").length,
          completed: orders.filter((order) => order.status === "completed")
            .length,
          cancelled: orders.filter((order) => order.status === "cancelled")
            .length,
        };

        setOrderStats(statusCounts);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const pieData = [
    { name: "Processing", value: orderStats.processing, color: "#ffcc00" },
    { name: "Shipped", value: orderStats.shipped, color: "#3498db" },
    { name: "Completed", value: orderStats.completed, color: "#2ecc71" },
    { name: "Cancelled", value: orderStats.cancelled, color: "#e74c3c" },
  ];

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6">
      {/* Metrics Heading */}
      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2 text-center">
        📊 Metrics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Status Overview */}
        <div className="grid grid-cols-2 gap-6">
          {/* Processing */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
            <div className="bg-yellow-100 p-4 rounded-full">
              <FaBoxOpen className="text-yellow-600 text-3xl" />
            </div>
            <div>
              <p className="text-gray-600 text-lg font-medium">
                Processing Orders
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {orderStats.processing}
              </h2>
            </div>
          </div>

          {/* Shipped */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <FaShippingFast className="text-blue-600 text-3xl" />
            </div>
            <div>
              <p className="text-gray-600 text-lg font-medium">
                Shipped Orders
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {orderStats.shipped}
              </h2>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-full">
              <FaCheckCircle className="text-green-600 text-3xl" />
            </div>
            <div>
              <p className="text-gray-600 text-lg font-medium">
                Completed Orders
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {orderStats.completed}
              </h2>
            </div>
          </div>

          {/* Cancelled */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
            <div className="bg-red-100 p-4 rounded-full">
              <FaTimesCircle className="text-red-600 text-3xl" />
            </div>
            <div>
              <p className="text-gray-600 text-lg font-medium">
                Cancelled Orders
              </p>
              <h2 className="text-3xl font-bold text-gray-900">
                {orderStats.cancelled}
              </h2>
            </div>
          </div>
        </div>

        {/* Orders Status Pie Chart */}
        <div className="flex justify-center">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
