import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();

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

  const [productStats, setProductStats] = useState({
    inStock: 0,
    outOfStock: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

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

        const sortedOrders = orders
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5);
        setRecentOrders(sortedOrders);
      })
      .catch((error) => console.error("Error fetching orders:", error));

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
      .catch((error) => console.error("Error fetching users:", error));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (!response.data || !Array.isArray(response.data.list)) {
          console.error("Invalid data format:", response.data);
          return;
        }

        const products = response.data.list;

        setProductStats({
          inStock: products.filter((product) => product.stock > 0).length,
          outOfStock: products.filter((product) => product.stock === 0).length,
        });
      })
      .catch((error) => console.error("Error fetching products:", error));
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

  const productPieData = [
    { name: "In Stock", value: productStats.inStock, color: "#4CAF50" },
    { name: "Out of Stock", value: productStats.outOfStock, color: "#F44336" },
  ];

  return (
    <div className="w-full">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
        <FaChartPie className="text-3xl text-blue-600" />
        Metrics
      </h2>

      <div className="grid grid-cols-3 gap-6 mb-6 justify-center">
        {[
          { title: "Orders", data: orderPieData, stats: orderStats },
          { title: "Customers", data: customerPieData, stats: customerStats },
          { title: "Products", data: productPieData, stats: productStats },
        ].map((section, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform transform hover:scale-105 duration-300"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {section.title}
            </h3>
            <PieChart width={250} height={250}>
              <Pie
                data={section.data}
                cx="50%"
                cy="50%"
                outerRadius={75}
                dataKey="value"
                label
              >
                {section.data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="horizontal"
                align="center"
                wrapperStyle={{ fontSize: "13px" }}
              />
            </PieChart>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-1 text-center flex items-center justify-center pt-8">
        📋 Recent Orders
      </h2>
      <div className="w-full bg-white shadow-lg rounded-2xl p-6 mt-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700 text-left">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Status</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b hover:bg-gray-100 transition"
                  >
                    <td className="p-3 font-medium">{order.orderId}</td>
                    <td className="p-3">{order.name}</td>
                    <td className="p-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-lg font-semibold text-sm ${
                          {
                            processing: "bg-yellow-100 text-yellow-700",
                            shipped: "bg-blue-100 text-blue-700",
                            completed: "bg-green-100 text-green-700",
                            cancelled: "bg-red-100 text-red-700",
                          }[order.status]
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-green-600">
                      LKR{" "}
                      {order.orderedItems
                        .reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-5 text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/admin/orders")}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            View All Orders
          </button>
        </div>
      </div>
    </div>
  );
}
