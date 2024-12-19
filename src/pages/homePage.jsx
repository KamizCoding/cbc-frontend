import React from 'react';
import { Link } from 'react-router-dom';

export function Homepage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header Section */}
            <header className="bg-blue-600 text-white text-center py-12">
                <h1 className="text-4xl font-bold mb-4">Welcome to My Website</h1>
                <p className="text-lg mb-6">Your one-stop destination for all things awesome!</p>
                <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-md hover:bg-blue-100 transition">
                    Get Started
                </button>
            </header>

            {/* Features Section */}
            <section className="py-12 bg-gray-100">
                <div className="max-w-4xl mx-auto px-6 grid gap-8 md:grid-cols-3">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-blue-600 mb-2">Feature 1</h2>
                        <p className="text-gray-700">Discover amazing content curated just for you.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-blue-600 mb-2">Feature 2</h2>
                        <p className="text-gray-700">Stay updated with the latest trends and news.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-blue-600 mb-2">Feature 3</h2>
                        <p className="text-gray-700">Join a community of like-minded individuals.</p>
                    </div>
                </div>
                <div className="text-center mt-8">
                    <Link
                        to="/login"
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </Link>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white text-center py-6 mt-auto">
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>
        </div>
    );
}
