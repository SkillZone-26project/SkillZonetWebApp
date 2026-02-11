import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger icons

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 text-[14px]">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dqtyrjpeh/image/upload/v1770385830/LogoBlack_itldr3.png"
            alt="SkillZonet Logo"
            className="w-32 h-auto"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-textColor font-medium">
          <li>
            <Link to="/features" className="hover:text-yellow transition-colors hover:border hover: border-yellow p-[6px] rounded-[8px]">
              Features
            </Link>
          </li>
          <li>
            <Link to="/how-it-works" className="hover:text-yellow transition-colors hover:border hover: border-yellow p-[6px] rounded-[8px]">
              How It Works
            </Link>
          </li>
          <li>
            {/* ✅ ONLY CHANGE HERE */}
            <Link to="/dashboard" className="hover:text-yellow transition-colors hover:border hover: border-yellow p-[6px] rounded-[8px]">
              Sign In
            </Link>
            {/* signIn */}
            {/* dashboard */}
          </li>
          <li>
            <Link
              to="/joinAs"
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Join as Artisan
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-2xl focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <ul
        className={`md:hidden fixed top-16 left-0 w-full bg-white shadow-md z-50 flex flex-col gap-4 px-6 pb-4 transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <li>
          <Link
            to="/features"
            className="block hover:text-yellow transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Features
          </Link>
        </li>
        <li>
          <Link
            to="/how-it-works"
            className="block hover:text-yellow transition-colors"
            onClick={() => setIsOpen(false)}
          >
            How It Works
          </Link>
        </li>
        <li>
          {/* ✅ ONLY CHANGE HERE */}
          <Link
            to="/"
            className="block hover:text-yellow transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Sign In
          </Link>
        </li>
        <li>
          <Link
            to="/joinAs"
            className="block bg-black text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Join as Artisan
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
