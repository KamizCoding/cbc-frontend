import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaUserLock,
  FaShoppingCart,
  FaChartPie,
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

  const [productStats, setProductStats] = useState({
    inStock: 0,
    outOfStock: 0,
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
    {/* Metrics Heading with Icon */}
    <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
      <span className="text-primary">
        <FaChartPie className="text-3xl text-blue-600" />
      </span>
      Metrics
    </h2>
  
    {/* Pie Charts Grid */}
    <div className="grid grid-cols-3 gap-6 mb-6 justify-center">
      
      {/* Orders Section */}
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📦 Orders</h3>
        <PieChart width={250} height={250}>
          <Pie data={orderPieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label>
            {orderPieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" align="center" wrapperStyle={{ fontSize: "13px" }} />
        </PieChart>
      </div>
  
      {/* Customers Section */}
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">👥 Customers</h3>
        <PieChart width={250} height={250}>
          <Pie data={customerPieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label>
            {customerPieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" align="center" wrapperStyle={{ fontSize: "13px" }} />
        </PieChart>
      </div>
  
      {/* Products Section */}
      <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center transition-transform transform hover:scale-105 duration-300">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🛒 Products</h3>
        <PieChart width={250} height={250}>
          <Pie data={productPieData} cx="50%" cy="50%" outerRadius={75} dataKey="value" label>
            {productPieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" align="center" wrapperStyle={{ fontSize: "13px" }} />
        </PieChart>
      </div>
      
    </div>
  </div>
  
  );
}
