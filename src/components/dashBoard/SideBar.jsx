import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineTable, AiOutlineForm, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BiGridAlt } from 'react-icons/bi';
import { MdOutlineCardMembership } from 'react-icons/md';
import { IoIosPaper } from 'react-icons/io';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = "bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100";
  const inactiveClass = "border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100";

  return (
    <div className="flex">
      {/* Backdrop */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
        } fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="mx-2 text-2xl font-semibold text-white">Admin Dashboard</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-10">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <AiOutlineDashboard className="w-5 h-5" />
            <span className="mx-4">Dashboard</span>
          </NavLink>

          <NavLink
            to="/ui-elements"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <BiGridAlt className="w-5 h-5" />
            <span className="mx-4">UI Elements</span>
          </NavLink>

          <NavLink
            to="/tables"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <AiOutlineTable className="w-5 h-5" />
            <span className="mx-4">Tables</span>
          </NavLink>

          <NavLink
            to="/forms"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <AiOutlineForm className="w-5 h-5" />
            <span className="mx-4">Forms</span>
          </NavLink>

          <NavLink
            to="/cards"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <MdOutlineCardMembership className="w-5 h-5" />
            <span className="mx-4">Cards</span>
          </NavLink>

          <NavLink
            to="/blank"
            className={({ isActive }) =>
              `flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
                isActive ? activeClass : inactiveClass
              }`
            }
          >
            <IoIosPaper className="w-5 h-5" />
            <span className="mx-4">Blank Page</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;