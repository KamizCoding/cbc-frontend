import { Link } from "react-router-dom";
import { FaShoppingCart, FaBoxOpen, FaEnvelope, FaHome } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-secondary w-full h-[85px] flex justify-between items-center px-8 shadow-md">
      {/* Logo - Adjusted for new header height */}
      <img
        src="/logo.png"
        className="h-[70px] rounded-full cursor-pointer p-1 hover:opacity-80 hover:scale-105 transition-transform duration-300"
      />

      {/* Navigation - Adjusted for spacing */}
      <div className="flex gap-10 flex-1 justify-center">
        <Link
          to="/"
          className="flex flex-col items-center text-dark text-base hover:text-white px-4 py-2 font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          <FaHome size={26} />
          <span>Home</span>
        </Link>
        <Link
          to="/products"
          className="flex flex-col items-center text-dark text-base hover:text-white px-4 py-2 font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          <FaBoxOpen size={26} />
          <span>Products</span>
        </Link>
        <Link
          to="/cart"
          className="flex flex-col items-center text-dark text-base hover:text-white px-4 py-2 font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          <FaShoppingCart size={26} />
          <span>Cart</span>
        </Link>
        <Link
          to="/contact"
          className="flex flex-col items-center text-dark text-base hover:text-white px-4 py-2 font-semibold transition-all duration-300 relative after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
        >
          <FaEnvelope size={26} />
          <span>Contact</span>
        </Link>
      </div>

      {/* Login and Register Buttons - Adjusted for proportional look */}
      <div className="flex space-x-5 ml-auto">
        <Link
          to="/login"
          className="px-6 py-2 bg-dark text-white text-base font-semibold rounded-md hover:bg-accent hover:text-muted transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-accent text-white text-base font-semibold rounded-md hover:bg-dark hover:text-muted transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
