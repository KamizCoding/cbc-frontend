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
        <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-green-300 to-green-500">
            <img src="/logo.png" className="rounded-full w-[150px] p-3" />
            <div className="w-full max-w-md bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center text-green-700 mb-2 bg-green-400 rounded-3xl">Register</h1>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-200 font-bold">First Name:</label>
                        <input 
                            type="text" 
                            placeholder="Enter Your First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-200 font-bold">Last Name:</label>
                        <input 
                            type="text" 
                            placeholder="Enter Your Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-200 font-bold">Email:</label>
                        <input 
                            type="email" 
                            placeholder="Enter Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-200 font-bold">Password:</label>
                        <input 
                            type="password" 
                            placeholder="Enter Your Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button 
                        onClick={register} 
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
                        Create Account
                    </button>
                </div>
            </div>
        </div>
    );
}
