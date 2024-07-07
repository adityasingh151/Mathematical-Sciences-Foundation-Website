import React, { useState } from 'react';
import logo from '../assets/images/logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto px-6 py-3 lg:flex lg:items-center lg:justify-between">
        <div className="flex items-center justify-between">
          <a href="index.html">
            <img src={logo} alt="Logo" className="h-8 w-auto" />
          </a>
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
            <a
              href="#home"
              className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0"
            >
              Home
            </a>
            <a
              href="#about"
              className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0"
            >
              About
            </a>
            <a
              href="#services"
              className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0"
            >
              Services
            </a>
            <a
              href="#projects"
              className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0"
            >
              Projects
            </a>
            <a
              href="#pricing"
              className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0"
            >
              Pricing
            </a>
            <a
              href="#blog"
              className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0"
            >
              Blog
            </a>
            <a
              href="#contact"
              className="my-1 text-gray-700 hover:text-blue-500 lg:mx-4 lg:my-0"
            >
              Contact
            </a>
          </div>

          <div className="flex justify-center lg:block">
            <a
              href="#"
              className="block w-full px-4 py-2 mt-2 text-sm text-center text-white bg-blue-500 rounded-md hover:bg-blue-400 lg:mt-0 lg:w-auto"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
