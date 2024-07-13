import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      name: "About ↓",
      path: "/about/story",
      dropdown: [
        { name: "Our Team", path: "/about/team" },
        { name: "Our Story", path: "/about/story" },
      ],
    },
    {
      name: "Initiatives ↓",
      path: "/initiatives",
      dropdown: [
        { name: "Initiative 1", path: "/initiatives/1" },
        { name: "Initiative 2", path: "/initiatives/2" },
      ],
    },
    {
      name: "Online Courses ↓",
      path: "/courses",
      dropdown: [
        { name: "Courses for Students", path: "courses/students" },
        { name: "Courses for Teachers", path: "courses/teachers" },
      ],
    },
    {
      name: "Workshops ↓",
      path: "/workshop/geogebra",
      dropdown: [
        { name: "GeoGebra Workshop", path: "/workshop/geogebra" },
        {
          name: "Art Integrated Maths",
          path: "/workshop/art-integrated-maths",
        },
        { name: "Communication Workshop", path: "/workshop/communication" },
      ],
    },
    {
      name: "Events ↓",
      path: "/event/1",
      dropdown: [
        { name: "Recognising Ramanujan 2023", path: "/event/1" },
        { name: "Inviting All Young Minds(IAYM)", path: "/event/2" },
      ],
    },
    {
      name: "Result ↓",
      path: "/result",
      dropdown: [
        { name: "Recognising Ramanujan 2020 Result", path: "/result/2023" },
        { name: "2022 Results", path: "/result/2022" },
      ],
    },
    { name: "Latest", path: "/latest" },
  ];

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="mx-auto px-3 py-1 md:flex md:items-center md:justify-between">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img src="/msflogo.jpg" alt="Logo" className="h-12 w-12" />
          </Link>
          <div className="md:hidden">
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

        <div className={`md:flex items-center ${isOpen ? "block" : "hidden"}`}>
          <div className="flex flex-col md:flex-row md:mx-6 gap-1">
            {navItems.map((item, index) =>
              item.dropdown ? (
                <div key={index} className="relative group">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "w-fit mt-1 mb-0 text-center text-blue-500 md:mx-4 md:my-0"
                        : "w-fit mt-1 mb-0 text-gray-700 text-center hover:text-blue-500 md:mx-4 md:my-0"
                    }
                  >
                    {item.name}
                  </NavLink>
                  <div className="w-fit absolute hidden group-hover:block bg-white shadow-md rounded-md mt-0 z-50">
                    {item.dropdown.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) =>
                          isActive
                            ? "block px-4 py-2 text-blue-500 hover:bg-gray-200 text-center rounded-md"
                            : "block px-4 py-2 text-gray-700 hover:bg-gray-200 text-center rounded-md"
                        }
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 my-1 hover:text-blue-500 md:mx-4 md:my-0"
                      : "my-1 text-gray-700 hover:text-blue-500 md:mx-4 md:my-0"
                  }
                >
                  {item.name}
                </NavLink>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
