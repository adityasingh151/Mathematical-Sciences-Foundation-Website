import React from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './dashBoard/InfoCard/Dashboard';
import { FaUserPlus, FaCalendarPlus, FaUsers, FaChalkboardTeacher } from 'react-icons/fa';

const DashboardCard = () => {
  const navigate = useNavigate();
  const cardsData = [
    {
      icon: <FaUserPlus className="text-white" size={24} />,
      count: 8282,
      label: 'Add Courses',
      bgColor: 'bg-purple-500',
      link: '/course-selection' 
    },
    {
      icon: <FaCalendarPlus className="text-white" size={24} />,
      count: 200521,
      label: 'Add Events',
      bgColor: 'bg-blue-500',
      link: '/forms/event'
    },
    {
      icon: <FaUsers className="text-white" size={24} />,
      count: 215542,
      label: 'Add People',
      bgColor: 'bg-pink-500',
      link: '/forms/people'
    },
    {
      icon: <FaChalkboardTeacher className="text-white" size={24} />,
      count: 12345,
      label: 'Add Workshop',
      bgColor: 'bg-green-500',
      link: '/forms/workshop'
    },
  ];

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <div className="p-8 bg-gray-100 w-full h-fit">
      {cardsData.map(card => (
        <div key={card.label} className={`${card.bgColor} p-4 m-2 cursor-pointer`} onClick={() => handleCardClick(card.link)}>
          {card.icon}
          <p>{card.label} - {card.count}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
