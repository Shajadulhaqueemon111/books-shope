import { useState } from "react";

import { FaAlignJustify } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="" className="text-white text-2xl font-bold">
          Book Shope
        </a>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-200">
            Home
          </Link>
          <Link to="/wishlist" className="text-white hover:text-blue-200">
            Wishlist
          </Link>
          <Link to="/details" className="text-white hover:text-blue-200">
            Book
          </Link>
        </div>

        <button
          onClick={handleMenuToggle}
          className="md:hidden text-white focus:outline-none"
        >
          <FaAlignJustify className="text-3xl font-bold"></FaAlignJustify>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4">
          <Link to="/" className="block text-white py-2 px-4 hover:bg-blue-600">
            Home
          </Link>
          <Link
            to="/wishlist"
            className="block text-white py-2 px-4 hover:bg-blue-600"
          >
            Wishlist
          </Link>
          <Link
            to="/details"
            className="block text-white py-2 px-4 hover:bg-blue-600"
          >
            Book
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
