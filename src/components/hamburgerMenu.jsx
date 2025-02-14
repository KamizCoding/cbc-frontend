import { FaBoxOpen, FaEnvelope, FaHome, FaShoppingCart } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

export default function HamburgerMenu(props) {
  const closeHamburgerMenu = props.closeHamburgerMenu;

  return (
    <div className="fixed w-full h-screen bg-[#00000080] z-[10] lg:hidden">
      <div className="bg-primary flex flex-col w-[300px] h-screen shadow-xl">
        
        {/* 🔹 Top Section */}
        <div className="bg-secondary w-full flex h-[93px] items-center justify-between px-5 shadow-md">
          <img
            src="/logo.png"
            className="h-[70px] rounded-full cursor-pointer p-1 transition-transform duration-300 hover:scale-105"
          />
          <IoMdClose 
            className="text-3xl cursor-pointer text-dark hover:text-accent transition-all"
            onClick={closeHamburgerMenu}
          />
        </div>

        {/* 🔹 Navigation Links */}
        <div className="flex flex-col items-center justify-center gap-6 py-6">
          <Link to="/" className="flex flex-col items-center text-dark hover:text-accent transition-all duration-300">
            <FaHome size={28} className="mb-1" />
            <span className="text-lg font-semibold">Home</span>
          </Link>
          <Link to="/products" className="flex flex-col items-center text-dark hover:text-accent transition-all duration-300">
            <FaBoxOpen size={28} className="mb-1" />
            <span className="text-lg font-semibold">Products</span>
          </Link>
          <Link to="/cart" className="flex flex-col items-center text-dark hover:text-accent transition-all duration-300">
            <FaShoppingCart size={28} className="mb-1" />
            <span className="text-lg font-semibold">Cart</span>
          </Link>
          <Link to="/contact" className="flex flex-col items-center text-dark hover:text-accent transition-all duration-300">
            <FaEnvelope size={28} className="mb-1" />
            <span className="text-lg font-semibold">Contact</span>
          </Link>
        </div>

        {/* 🔹 Login & Register Buttons */}
        <div className="mt-auto pb-6 flex flex-col items-center gap-3 px-6">
          <Link to="/login" className="w-full text-center bg-dark text-white py-3 rounded-lg font-semibold hover:bg-accent transition-all">
            Login
          </Link>
          <Link to="/register" className="w-full text-center bg-accent text-white py-3 rounded-lg font-semibold hover:bg-dark transition-all">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
