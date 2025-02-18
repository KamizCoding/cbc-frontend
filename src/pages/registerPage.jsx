import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function register() {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/register", {
            firstName,
            lastName,
            email,
            password
        }).then((res) => {
            toast.success(res.data.message);
        }).catch(() => {
            toast.error("Failed to Register");
        });
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">Register</h1>
                
                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold">First Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold">Last Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold">Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-600 font-semibold">Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button 
                    onClick={register} 
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-all">
                    Register
                </button>
            </div>
        </div>
    );
}
