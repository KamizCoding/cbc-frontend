import { Link } from "react-router-dom";
import { FaShoppingCart, FaBoxOpen, FaEnvelope, FaHome } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import HamburgerMenu from "./hamburgerMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      {isMenuOpen&&<HamburgerMenu closeHamburgerMenu={() => setIsMenuOpen(false)}/> }
      <header className="bg-secondary w-full flex h-[93px] justify-between items-center px-10 shadow-md">
        <img
          src="/logo.png"
          className="h-[85px] rounded-full cursor-pointer p-1 hover:opacity-80 hover:scale-105 transition-transform duration-300"
        />

        <RxHamburgerMenu className="text-3xl absolute cursor-pointer text-dark right-[10px] lg:hidden" onClick={() => {setIsMenuOpen(true)}} />

        <div className="gap-12 flex-1 justify-center  hidden lg:flex">
          <Link
            to="/"
            className="flex flex-col items-center text-dark text-lg hover:text-white px-5 py-2 font-semibold transition-all duration-300 relative 
          after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0 
          after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <FaHome size={30} />
            <span>Home</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center text-dark text-lg hover:text-white px-5 py-2 font-semibold transition-all duration-300 relative 
          after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0 
          after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <FaBoxOpen size={30} />
            <span>Products</span>
          </Link>
          <Link
            to="/cart"
            className="flex flex-col items-center text-dark text-lg hover:text-white px-5 py-2 font-semibold transition-all duration-300 relative 
          after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0 
          after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <FaShoppingCart size={30} />
            <span>Cart</span>
          </Link>
          <Link
            to="/contact"
            className="flex flex-col items-center text-dark text-lg hover:text-white px-5 py-2 font-semibold transition-all duration-300 relative 
          after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-white after:bottom-0 after:left-0 
          after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            <FaEnvelope size={30} />
            <span>Contact</span>
          </Link>
        </div>

        <div className="space-x-6 ml-auto  hidden lg:flex">
          <Link
            to="/login"
            className="px-7 py-3 bg-dark text-white text-lg font-semibold rounded-lg hover:bg-accent hover:text-muted transition-all duration-300 
          shadow-md hover:shadow-xl hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-7 py-3 bg-accent text-white text-lg font-semibold rounded-lg hover:bg-dark hover:text-muted transition-all duration-300 
          shadow-md hover:shadow-xl hover:scale-105"
          >
            Register
          </Link>
        </div>
      </header>
    </>
  );
}
