import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {

    const [email,setEmail] = useState("")
    const [password,setPassword]=useState("")

    function login(){
        axios.post("http://localhost:5000/api/users/login",{
            email : email,
            password : password
        }).then(
            (res)=>{

                if(res.data.user == null){
                    toast.error(res.data.message)
                    return
                }
                toast.success(res.data.message)
                localStorage.setItem("token",res.data.token)
                if(res.data.user.type == "admin"){
                    window.location.href = "/admin"
                }else{
                    window.location.href = "/"
                }
            }
        )
    }

    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-green-300 to-green-500">
            <img src="/logo.png" className="rounded-full w-[150px] p-3" />
            <div className="w-full max-w-md bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center text-green-700 mb-2 bg-green-400 rounded-3xl">Login</h1>
                <div className="space-y-4">
                    <span className="pl-44 text-xl text-gray-200 font-bold">Email : </span>
                    <input
                        type="text"
                        placeholder="Enter Your Email"
                        defaultValue={email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                    />
                    <span className="pl-40 text-xl text-gray-200 font-bold">Password : </span>
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        defaultValue={password}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e)=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                    onClick={login}>
                        Login To Your Account
                    </button>
                </div>
            </div>
        </div>
    );
}
