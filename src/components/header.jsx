import { Link, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaEnvelope, FaHome, FaClipboardList } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, useEffect } from "react";
import HamburgerMenu from "./hamburgerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded User:", payload);
        setUser(payload);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

   const nav = useNavigate();

  function handleLogout() {
    console.log("Logging out...");
    localStorage.removeItem("token");
    setUser(null);
    window.location.reload();
  }

  return (
    <>
      {isMenuOpen && (
        <HamburgerMenu closeHamburgerMenu={() => setIsMenuOpen(false)} />
      )}
      <header className="bg-secondary w-full flex h-[93px] justify-between items-center px-10 shadow-md">
        <div className="flex flex-col items-center">
          <img
            src="/logo.png"
            className="h-[60px] w-[60px] rounded-full cursor-pointer p-1 hover:opacity-80 hover:scale-105 transition-transform duration-300"
          />
          <span className="text-sm font-semibold text-dark mt-1">Pure & Pristine E-Market</span>  
        </div>

        <RxHamburgerMenu
          className="text-3xl absolute cursor-pointer text-dark right-[10px] lg:hidden"
          onClick={() => setIsMenuOpen(true)}
        />

        <div className="gap-12 flex-1 justify-center hidden lg:flex">
          <Link
            to="/"
            className="flex flex-col items-center text-dark text-lg hover:text-white"
          >
            <FaHome size={30} />
            <span>Home</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center text-dark text-lg hover:text-white"
          >
            <FaBoxOpen size={30} />
            <span>Products</span>
          </Link>
          <Link
            to="/orders"
            className="flex flex-col items-center text-dark text-lg hover:text-white"
          >
            <FaClipboardList size={30} />
            <span>Orders</span>
          </Link>
          <Link
            to="/contact"
            className="flex flex-col items-center text-dark text-lg hover:text-white"
          >
            <FaEnvelope size={30} />
            <span>Contact</span>
          </Link>
        </div>

        <div className="space-x-6 ml-auto hidden lg:flex">
          {user ? (
            <div className="flex flex-col items-center gap-1 mt-2">
              <button onClick={() => {
                nav("/user", {state : {user : user}})
              }}>
                <img
                  src={user.profilePicture || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform duration-300"
                />
              </button>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-xl mb-1"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-7 py-3 bg-dark text-white text-lg font-semibold rounded-lg hover:bg-accent"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-7 py-3 bg-accent text-white text-lg font-semibold rounded-lg hover:bg-dark"
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
