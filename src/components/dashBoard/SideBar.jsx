// src/components/dashBoard/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineForm, AiOutlineSetting, AiOutlineUser, AiOutlinePieChart } from 'react-icons/ai';

const Sidebar = () => {
    return (
        <div className="w-64 h-full bg-gray-800 text-white z-10"> 
            <div className="flex items-center justify-center mt-8">
                <span className="text-2xl font-semibold">Admin Dashboard</span>
            </div>
            <nav className="mt-10">
                <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active-link" : "inactive-link"}>
                    <AiOutlineDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to="/admin/forms/course1" className={({ isActive }) => isActive ? "active-link" : "inactive-link"}>
                    <AiOutlineForm className="w-5 h-5" />
                    <span>Forms</span>
                </NavLink>
                {/* Add more links as necessary */}
            </nav>
        </div>
    );
};

export default Sidebar;
