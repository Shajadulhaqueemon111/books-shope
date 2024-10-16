import { useState } from "react";

import { FaAlignJustify } from "react-icons/fa";
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
          <a href="/" className="text-white hover:text-blue-200">
            Home
          </a>
          <a href="/wishlist" className="text-white hover:text-blue-200">
            Wishlist
          </a>
          <a href="/book-details" className="text-white hover:text-blue-200">
            Book
          </a>
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
          <a href="/" className="block text-white py-2 px-4 hover:bg-blue-600">
            Home
          </a>
          <a
            href="/wishlist"
            className="block text-white py-2 px-4 hover:bg-blue-600"
          >
            Wishlist
          </a>
          <a
            href="/book-details"
            className="block text-white py-2 px-4 hover:bg-blue-600"
          >
            Book
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
