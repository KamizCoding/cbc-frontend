import React from "react";
import { Route, Routes } from "react-router-dom";
import CartPage from "./Customer/cartPage";
import ProductsPage from "./Customer/productsPage";
import ContactPage from "./Customer/contactpage";
import LoginPage from "./loginPage";
import RegisterPage from "./registerPage";
import Header from "../components/header";
import ProductInfoPage from "./Customer/productInfoPage";
import ShippingPage from "./Customer/shipping";
import OrdersPage from "./Customer/ordersPage";
import UserDetailsPage from "./Customer/userDetailsPage";

export default function Homepage() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />

            <div className="h-[calc(100vh-150px)] bg-primary flex flex-col overflow-hidden">
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/productinfo/:id" element={<ProductInfoPage />} />
                    <Route path="/user" element={<UserDetailsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/shipping" element={<ShippingPage />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/*" element={<h1>404 Error</h1>} />
                </Routes>               
            </div>
            <footer className="bg-gray-800 text-white text-center py-4 mt-0">
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>
        </div>
    );
}