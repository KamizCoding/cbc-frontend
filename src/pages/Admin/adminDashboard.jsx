import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaClock,
  FaUserCheck,
  FaExclamationTriangle,
  FaBox,
  FaSyncAlt,
  FaDollarSign,
  FaChartLine,
  FaShoppingCart,
  FaCreditCard,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const lowStockThreshold = 5;

  const [stats, setStats] = useState({
    totalRevenue: 0,
    transactionsToday: 0,
    pendingRefunds: 0,
    weeklyGrowth: 0,
  });

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
    lowStock: 0,
  });

  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [replenishmentNeeded, setReplenishmentNeeded] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [recentLogins, setRecentLogins] = useState([]);

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
        if (!Array.isArray(response.data.list)) return;
        const products = response.data.list;

        const lowStock = products.filter(
          (product) => product.stock > 0 && product.stock <= lowStockThreshold
        );
        const outOfStock = products.filter((product) => product.stock === 0);
        const replenishment = products
          .map((product) => ({
            ...product,
            daysLeft: product.stock / (product.totalSales / 30 || 1),
          }))
          .filter((product) => product.daysLeft < 10);

        setLowStockProducts(lowStock);
        setOutOfStockProducts(outOfStock);
        setReplenishmentNeeded(replenishment);

        setProductStats({
          inStock: products.filter((product) => product.stock > 0).length,
          outOfStock: outOfStock.length,
          lowStock: lowStock.length,
        });
      })
      .catch((error) => console.error("Error fetching products:", error));

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/activity`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setActiveUsers(response.data.activeUsers);
        setRecentLogins(response.data.recentLogins);
      })
      .catch((error) => console.error("Error fetching user activity:", error));

    axios
      .get("/api/orders/revenue-stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch((error) => {
        console.error("Error fetching revenue stats:", error);
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

  const productPieData = [
    { name: "In Stock", value: productStats.inStock, color: "#4CAF50" },
    { name: "Out of Stock", value: productStats.outOfStock, color: "#F44336" },
  ];

  return (
    <>
      <h1 className="text-5xl font-extrabold text-center text-lime-700 mb-8 uppercase tracking-wide drop-shadow-lg">
        🚀 Admin <span className="text-green-900">DashBoard</span>
      </h1>
      <div className="w-full">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
            <FaChartPie className="text-3xl text-blue-600" />
            Metrics
          </h2>

          <div className="grid grid-cols-3 gap-6 mb-6 justify-center">
            {[
              { title: "Orders", data: orderPieData, stats: orderStats },
              {
                title: "Customers",
                data: customerPieData,
                stats: customerStats,
              },
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
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5 text-center flex items-center justify-center">
            👤 User Activity
          </h2>
          <div className="bg-white shadow-lg rounded-2xl p-6 mb-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  🟢 Active Users
                </h4>
                {activeUsers.length === 0 ? (
                  <p className="text-sm text-gray-500">No active users</p>
                ) : (
                  <ul>
                    {activeUsers.map((user, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <FaUserCheck className="text-green-500" /> {user.email}{" "}
                        ({user.type})
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <h4 className="text-md font-medium text-gray-700 mb-2">
                  ⏰ Recent Logins
                </h4>
                {recentLogins.length === 0 ? (
                  <p className="text-sm text-gray-500">No recent logins</p>
                ) : (
                  <ul>
                    {recentLogins.map((user, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <FaClock className="text-blue-500" /> {user.email} -{" "}
                        {new Date(user.lastLogin).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-5 text-center flex items-center justify-center">
          💰 Revenue & Financial Overview
        </h2>
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full mb-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-green-100 shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-green-700 flex items-center gap-2">
                <FaDollarSign /> Total Revenue
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                ${stats.totalRevenue?.toLocaleString() || "0"}
              </p>
              <p className="text-sm text-gray-500">Today</p>
            </div>

            <div className="bg-blue-100 shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
                <FaChartLine /> Weekly Growth
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {stats.weeklyGrowth?.toFixed(2) || "0"}%
              </p>
              <p className="text-sm text-gray-500">Compared to last week</p>
            </div>

            <div className="bg-yellow-100 shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
                <FaShoppingCart /> Transactions
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {stats.transactionsToday || 0}
              </p>
              <p className="text-sm text-gray-500">Processed today</p>
            </div>

            <div className="bg-red-100 shadow-md rounded-lg p-4 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
                <FaCreditCard /> Pending Refunds
              </h3>
              <p className="text-2xl font-bold text-gray-800">
                {stats.pendingRefunds || 0}
              </p>
              <p className="text-sm text-gray-500">Awaiting processing</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">
          📦 Inventory & Stock Alerts
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-yellow-100 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-700 flex items-center gap-2">
              <FaExclamationTriangle /> Low Stock ⚠️
            </h3>
            <ul className="mt-3 text-sm text-gray-700">
              {lowStockProducts.length > 0 ? (
                lowStockProducts.map((product) => (
                  <li key={product.productId} className="border-b py-1">
                    {product.productName} ({product.stock} left)
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No low stock items.</p>
              )}
            </ul>
          </div>

          <div className="bg-red-100 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2">
              <FaBox /> Out of Stock ❌
            </h3>
            <ul className="mt-3 text-sm text-gray-700">
              {outOfStockProducts.length > 0 ? (
                outOfStockProducts.map((product) => (
                  <li key={product.productId} className="border-b py-1">
                    {product.productName}
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No out-of-stock items.</p>
              )}
            </ul>
          </div>

          <div className="bg-blue-100 shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <FaSyncAlt /> Stock Replenishment 🔄
            </h3>
            <ul className="mt-3 text-sm text-gray-700">
              {replenishmentNeeded.length > 0 ? (
                replenishmentNeeded.map((product) => (
                  <li key={product.productId} className="border-b py-1">
                    {product.productName} (Restock in{" "}
                    {Math.ceil(product.daysLeft)} days)
                  </li>
                ))
              ) : (
                <p className="text-gray-500">No restocking needed.</p>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div>
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
    </>
  );
}
