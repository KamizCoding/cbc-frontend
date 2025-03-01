import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/google", {
          token: res.access_token,
        })
        .then((res) => {
          if (res.data.message == "The New User Was Succesfully Created ") {
            toast.success(
              "Your Account Is Created. Now You Can Login Via Google!!!"
            );
          } else {
            localStorage.setItem("token", res.data.token);
            if (res.data.user.type == "admin") {
              window.location.href = "/admin";
            } else {
              window.location.href = "/";
            }
          }
        });
    },
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.user == null) {
          toast.error(res.data.message);
          return;
        }

        if (res.data.blocked) {
          toast.error("Your account has been blocked. Contact support.");
          return;
        }

        toast.success(res.data.message);
        localStorage.setItem("token", res.data.token);
        if (res.data.user.type == "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
        }
      });
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-green-300 to-green-500">
      <img src="/logo.png" className="rounded-full w-[150px] p-3" />
      <div className="w-full max-w-md bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-2 bg-green-400 rounded-3xl">
          Login
        </h1>
        <div className="space-y-4">
          <span className="pl-44 text-xl text-gray-200 font-bold">
            Email :
          </span>
          <input
            type="text"
            placeholder="Enter Your Email"
            defaultValue={email}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span className="pl-40 text-xl text-gray-200 font-bold">
            Password :
          </span>
          <input
            type="password"
            placeholder="Enter Your Password"
            defaultValue={password}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            onClick={login}
          >
            Login To Your Account
          </button>

          <button
            className="w-full py-2 flex items-center justify-center gap-3 bg-muted text-dark border border-muted font-semibold rounded-full shadow-md 
    hover:bg-secondary transition duration-300"
            onClick={() => {
              googleLogin();
            }}
          >
            <FcGoogle className="text-xl" />
            <span className="text-dark">Login with Google</span>
          </button>

          <div className="text-center mt-3">
            <p className="text-gray-100">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-300 hover:text-blue-500 font-semibold transition"
              >
                Register Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
