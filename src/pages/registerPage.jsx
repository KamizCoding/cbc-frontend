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
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Register</h1>
                <div className="input-group">
                    <label>First Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Last Name</label>
                    <input 
                        type="text" 
                        placeholder="Enter Your Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="register-button" onClick={register}>
                    Register
                </button>
            </div>
        </div>
    );
}
