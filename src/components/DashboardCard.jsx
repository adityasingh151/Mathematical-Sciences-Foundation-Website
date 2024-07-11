import React from 'react';
import Dashboard from './dashBoard/InfoCard/Dashboard';
import { FaUserPlus, FaCalendarPlus, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

const DashboardCard = () => {
  const cardsData = [
    {
      icon: <FaUserPlus className="text-white" size={24} />,
      count: 8282,
      label: 'Add Courses',
      bgColor: 'bg-purple-500',
    },
    {
      icon: <FaCalendarPlus className="text-white" size={24} />,
      count: 200521,
      label: 'Add Events',
      bgColor: 'bg-blue-500',
    },
    {
      icon: <FaUsers className="text-white" size={24} />,
      count: 215542,
      label: 'Add People',
      bgColor: 'bg-pink-500',
    },
    {
      icon: <FaChalkboardTeacher className="text-white" size={24} />,
      count: 12345,
      label: 'Add Workshop',
      bgColor: 'bg-green-500',
    },
  ];

  return (
    <div className="p-8 bg-gray-100 w-full h-fit">
      <Dashboard cardsData={cardsData} />
    </div>
  );
};

export default DashboardCard;
