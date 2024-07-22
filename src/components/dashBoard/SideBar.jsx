import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard} from 'react-icons/ai';

const Sidebar = () => {
    return (
        <div className="w-64 min-h-screen bg-gray-900 text-gray-300 shadow-lg flex flex-col">
            <div className="flex items-center justify-center mt-8">
                <span className="text-3xl font-bold text-white">Admin Dashboard</span>
            </div>
            <nav className="mt-10 flex flex-col space-y-2 px-4">
                <NavLink 
                    to="/admin/dashboard" 
                    className={({ isActive }) => isActive ? "bg-gray-700 text-white flex items-center p-4 rounded-lg transition duration-300" : "flex items-center p-4 rounded-lg transition duration-300 hover:bg-gray-700 hover:text-white"}
                >
                    <AiOutlineDashboard className="w-6 h-6 mr-4" />
                    <span className="text-lg">Dashboard</span>
                </NavLink>
               
            </nav>
        </div>
    );
};

export default Sidebar;
