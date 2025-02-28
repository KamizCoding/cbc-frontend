import { FaBoxOpen, FaEnvelope, FaHome, FaClipboardList } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function HamburgerMenu(props) {
  const closeHamburgerMenu = props.closeHamburgerMenu;
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser(JSON.parse(atob(token.split(".")[1])));
    }
  }, []);

  return (
    <div className="fixed w-full h-screen bg-[#00000080] z-[10] lg:hidden">
      <div className="bg-primary flex flex-col w-[300px] h-screen shadow-xl">
        
        <div className="bg-secondary w-full flex h-[93px] items-center justify-between px-5 shadow-md">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              className="h-[60px] w-[60px] rounded-full cursor-pointer p-1 transition-transform duration-300 hover:scale-105"
            />
            <span className="text-xl font-bold text-lime-800 tracking-wide">
              Pure & Pristine Cosmetics
            </span>
          </div>
          <IoMdClose 
            className="text-3xl cursor-pointer text-dark hover:text-accent transition-all"
            onClick={closeHamburgerMenu}
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-6 py-6">
          <Link to="/" className="flex flex-col items-center text-dark hover:text-accent transition-all duration-300" onClick={closeHamburgerMenu}>
            <FaHome size={28} className="mb-1" />
            <span className="text-lg font-semibold">Home</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center text-dark hover:text-accent transition-all duration-300" onClick={closeHamburgerMenu}>
            <FaBoxOpen size={28} className="mb-1" />
            <span className="text-lg font-semibold">Products</span>
          </Link>
          <Link to="/orders" className="flex flex-col items-center text-dark hover:text-accent transition-all duration-300" onClick={closeHamburgerMenu}>
            <FaClipboardList size={28} className="mb-1" />
            <span className="text-lg font-semibold">Orders</span>
          </Link>
          <Link to="/contact" className="flex flex-col items-center text-dark hover:text-accent transition-all duration-300" onClick={closeHamburgerMenu}>
            <FaEnvelope size={28} className="mb-1" />
            <span className="text-lg font-semibold">Contact</span>
          </Link>
        </div>

        {user ? (
          <div className="flex flex-col items-center gap-3 mt-4">
            <button onClick={() => { nav("/user", { state: { user } }); closeHamburgerMenu(); }}>
              <img
                src={user.profilePicture || "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg"}
                alt="Profile"
                className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer hover:scale-110 transition-transform duration-300"
              />
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                closeHamburgerMenu();
                nav("/login");
              }}
              className="w-[150px] px-5 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-xl"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="mt-auto pb-6 flex flex-col items-center gap-3 px-6">
            <Link to="/login" className="w-full text-center bg-dark text-white py-3 rounded-lg font-semibold hover:bg-accent transition-all" onClick={closeHamburgerMenu}>
              Login
            </Link>
            <Link to="/register" className="w-full text-center bg-accent text-white py-3 rounded-lg font-semibold hover:bg-dark transition-all" onClick={closeHamburgerMenu}>
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
