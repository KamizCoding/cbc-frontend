import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBoxOpen, FaEnvelope, FaHome, FaClipboardList } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import HamburgerMenu from "./hamburgerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  async function handleLogout() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        nav("/login");
        return;
      }

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      setUser(null);
      nav("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  }

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {isMenuOpen && (
        <HamburgerMenu closeHamburgerMenu={() => setIsMenuOpen(false)} />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Logout
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-white-full flex h-[93px] justify-between items-center px-10 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            className="h-[60px] w-[60px] rounded-full cursor-pointer p-1 hover:opacity-80 hover:scale-105 transition-transform duration-300"
            alt="Pure & Pristine Logo"
          />
          <span className="text-2xl lg:text-lg pl-3 font-bold text-secondary tracking-wide">
            Shimmer Muse
          </span>
        </div>

        <RxHamburgerMenu
          className="text-3xl absolute cursor-pointer text-dark right-[10px] lg:hidden"
          onClick={() => setIsMenuOpen(true)}
        />

        <div className="gap-12 flex-1 justify-center hidden lg:flex">
          <Link
            to="/"
            className={`flex flex-col items-center text-lg ${
              isActive("/")
                ? "text-secondary font-bold border-b-2 border-white"
                : "text-dark hover:text-secondary"
            }`}
          >
            <FaHome size={30} />
            <span>Home</span>
          </Link>
          <Link
            to="/products"
            className={`flex flex-col items-center text-lg ${
              isActive("/products")
                ? "text-secondary font-bold border-b-2 border-secondary"
                : "text-dark hover:text-secondary"
            }`}
          >
            <FaBoxOpen size={30} />
            <span>Products</span>
          </Link>
          <Link
            to="/orders"
            className={`flex flex-col items-center text-lg ${
              isActive("/orders")
                ? "text-secondary font-bold border-b-2 border-secondary"
                : "text-dark hover:text-secondary"
            }`}
          >
            <FaClipboardList size={30} />
            <span>Orders</span>
          </Link>
          <Link
            to="/contact"
            className={`flex flex-col items-center text-lg ${
              isActive("/contact")
                ? "text-secondary font-bold border-b-2 border-secondary"
                : "text-dark hover:text-secondary"
            }`}
          >
            <FaEnvelope size={30} />
            <span>Contact</span>
          </Link>
        </div>

        <div className="space-x-6 ml-auto hidden lg:flex">
          {user ? (
            <div className="flex flex-col items-center gap-1">
              <button onClick={() => nav("/user", { state: { user: user } })}>
                <img
                  src={
                    user.profilePicture ||
                    "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform duration-300"
                />
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-1 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-7 py-3 bg-secondary text-white text-lg font-semibold rounded-lg hover:bg-accent"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-7 py-3 bg-accent text-white text-lg font-semibold rounded-lg hover:bg-secondary"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </header>
    </>
  );
}
