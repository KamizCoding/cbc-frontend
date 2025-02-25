import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
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
    { name: "Processing", value: orderStats.processing, color: "#FFC107" },
    { name: "Shipped", value: orderStats.shipped, color: "#2196F3" },
    { name: "Completed", value: orderStats.completed, color: "#4CAF50" },
    { name: "Cancelled", value: orderStats.cancelled, color: "#F44336" },
  ];

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        📊Key Metrics
      </h2>

      <div className="flex justify-center gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-[320px]">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Orders</h3>
          <PieChart width={200} height={200}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={60}
              dataKey="value"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" align="center" wrapperStyle={{ fontSize: "9px" }} />
          </PieChart>
        </div>

       
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-[320px] mx-auto">
        {[
          { title: "Processing", count: orderStats.processing, color: "bg-yellow-100", textColor: "text-yellow-600", icon: <FaBoxOpen className="text-yellow-500 text-xl" /> },
          { title: "Shipped", count: orderStats.shipped, color: "bg-blue-100", textColor: "text-blue-600", icon: <FaShippingFast className="text-blue-500 text-xl" /> },
          { title: "Completed", count: orderStats.completed, color: "bg-green-100", textColor: "text-green-600", icon: <FaCheckCircle className="text-green-500 text-xl" /> },
          { title: "Cancelled", count: orderStats.cancelled, color: "bg-red-100", textColor: "text-red-600", icon: <FaTimesCircle className="text-red-500 text-xl" /> }
        ].map((metric, index) => (
          <div key={index} className={`flex items-center gap-3 p-4 ${metric.color} rounded-lg shadow-sm border`}>
            <div className="p-2 bg-white rounded-full shadow">{metric.icon}</div>
            <div className="flex flex-col">
              <p className={`text-sm font-medium ${metric.textColor}`}>{metric.title} Orders</p>
              <h2 className="text-lg font-bold text-gray-900">{metric.count}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
