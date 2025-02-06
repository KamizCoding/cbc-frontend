import React from 'react';
import { Route, Routes } from "react-router-dom";
import CartPage from './Customer/cartPage';
import ProductsPage from './Customer/productsPage';
import ContactPage from './Customer/contactpage';
import LoginPage from './loginPage';
import RegisterPage from './registerPage';
import Header from '../components/header';

export default function Homepage() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header/> 

            {/* Routes Section */}
            <div className="flex-grow p-6">
                <Routes>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/*" element={<h1>404 Error</h1>} />
                </Routes>
            </div>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white text-center py-6 mt-auto">
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>
        </div>
    );
}
