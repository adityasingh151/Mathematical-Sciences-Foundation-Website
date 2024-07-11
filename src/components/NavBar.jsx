// Navbar.jsx
import React, { useState } from 'react';
import logo from '../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-6 py-3 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src= '/msflogo.jpg' alt="Logo" className="h-14 w-14" />
          </Link>
          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
              aria-label="toggle menu"
              onClick={toggleNavbar}
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M18.36 6.64a1 1 0 00-1.41 0L12 11.59 7.05 6.64a1 1 0 00-1.41 1.41L10.59 13l-4.95 4.95a1 1 0 001.41 1.41L12 14.41l4.95 4.95a1 1 0 001.41-1.41L13.41 13l4.95-4.95a1 1 0 000-1.41z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`lg:flex items-center ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col lg:flex-row lg:mx-6">
            <Link to="/" className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0">
              Home
            </Link>
            <Link to="/about" className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0">
              About
            </Link>
            <Link to="/carousel" className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0">
              Carousel
            </Link>
            <Link to="/contact" className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0">
              Contact
            </Link>
            <div className="relative">
              <button className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0">
                More
              </button>
              <div className="absolute hidden bg-white shadow-md rounded-md">
                <Link to="/event" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Event
                </Link>
                <Link to="/people" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  People
                </Link>
                <Link to="/sponsors" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Sponsors
                </Link>
                <Link to="/workshop" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Workshop
                </Link>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:block">
            <Link
              to="/get-started"
              className="block w-full px-4 py-2 mt-2 text-sm text-center text-white bg-blue-500 rounded-md hover:bg-blue-400 lg:mt-0 lg:w-auto"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
