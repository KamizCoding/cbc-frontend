import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaUserLock,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const [orderStats, setOrderStats] = useState({
    processing: 0,
    shipped: 0,
    completed: 0,
    cancelled: 0,
  });

  const [customerStats, setCustomerStats] = useState({
    customers: 0,
    admins: 0,
    blocked: 0,
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

        setOrderStats({
          processing: orders.filter((order) => order.status === "processing")
            .length,
          shipped: orders.filter((order) => order.status === "shipped").length,
          completed: orders.filter((order) => order.status === "completed")
            .length,
          cancelled: orders.filter((order) => order.status === "cancelled")
            .length,
        });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (!response.data || !Array.isArray(response.data.list)) {
          console.error("Invalid data format:", response.data);
          return;
        }

        const users = response.data.list;

        setCustomerStats({
          customers: users.filter((user) => user.type === "customer").length,
          admins: users.filter((user) => user.type === "admin").length,
          blocked: users.filter((user) => user.blocked === "Yes").length,
        });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const orderPieData = [
    { name: "Processing", value: orderStats.processing, color: "#FFC107" },
    { name: "Shipped", value: orderStats.shipped, color: "#2196F3" },
    { name: "Completed", value: orderStats.completed, color: "#4CAF50" },
    { name: "Cancelled", value: orderStats.cancelled, color: "#F44336" },
  ];

  const customerPieData = [
    { name: "Customers", value: customerStats.customers, color: "#4CAF50" },
    { name: "Admins", value: customerStats.admins, color: "#2196F3" },
    { name: "Blocked", value: customerStats.blocked, color: "#F44336" },
  ];

  return (
    <div className="w-full px-6 py-6 bg-gray-50">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        📊 Dashboard Metrics
      </h2>
      <div className="grid grid-cols-2 gap-8 justify-center">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Orders</h3>
          <PieChart width={230} height={230}>
            <Pie
              data={orderPieData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
              label
            >
              {orderPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              align="center"
              wrapperStyle={{ fontSize: "15px" }}
            />
          </PieChart>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {[
              {
                title: "Processing",
                count: orderStats.processing,
                color: "bg-yellow-100",
                textColor: "text-yellow-600",
                icon: <FaBoxOpen className="text-yellow-500 text-xl" />,
              },
              {
                title: "Shipped",
                count: orderStats.shipped,
                color: "bg-blue-100",
                textColor: "text-blue-600",
                icon: <FaShippingFast className="text-blue-500 text-xl" />,
              },
              {
                title: "Completed",
                count: orderStats.completed,
                color: "bg-green-100",
                textColor: "text-green-600",
                icon: <FaCheckCircle className="text-green-500 text-xl" />,
              },
              {
                title: "Cancelled",
                count: orderStats.cancelled,
                color: "bg-red-100",
                textColor: "text-red-600",
                icon: <FaTimesCircle className="text-red-500 text-xl" />,
              },
            ].map((metric, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 ${metric.color} rounded-lg shadow-md border`}
              >
                <div className="p-2 bg-white rounded-full shadow">
                  {metric.icon}
                </div>
                <div className="flex flex-col">
                  <p className={`text-sm font-medium ${metric.textColor}`}>
                    {metric.title} Orders
                  </p>
                  <h2 className="text-lg font-bold text-gray-900">
                    {metric.count}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Customers
          </h3>
          <PieChart width={230} height={230}>
            <Pie
              data={customerPieData}
              cx="50%"
              cy="50%"
              outerRadius={70}
              dataKey="value"
              label
            >
              {customerPieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="horizontal"
              align="center"
              wrapperStyle={{ fontSize: "15px" }}
            />
          </PieChart>

          <div className="grid grid-cols-2 gap-4 mt-6">
            {[
              {
                title: "Admins",
                count: customerStats.admins,
                color: "bg-blue-100",
                textColor: "text-blue-600",
                icon: <FaUser className="text-blue-500 text-xl" />,
              },
              {
                title: "Customers",
                count: customerStats.customers,
                color: "bg-green-100",
                textColor: "text-green-600",
                icon: <FaUser className="text-green-500 text-xl" />,
              },
              {
                title: "Blocked",
                count: customerStats.blocked,
                color: "bg-red-100",
                textColor: "text-red-600",
                icon: <FaUserLock className="text-red-500 text-xl" />,
              },
            ].map((metric, index) => (
              <div
                key={index}
                className={`flex items-center gap-3 p-4 ${metric.color} rounded-lg shadow-md border`}
              >
                <div className="p-2 bg-white rounded-full shadow">
                  {metric.icon}
                </div>
                <div className="flex flex-col">
                  <p className={`text-sm font-medium ${metric.textColor}`}>
                    {metric.title}
                  </p>
                  <h2 className="text-lg font-bold text-gray-900">
                    {metric.count}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
