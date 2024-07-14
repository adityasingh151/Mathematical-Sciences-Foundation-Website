import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaCalendarPlus, FaUsers, FaChalkboardTeacher, FaImages } from 'react-icons/fa'; // Added FaImages for carousel icon

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
    {
      icon: <FaImages className="text-white" size={24} />, // New icon for adding carousel images
      count: 25638, // You can change this to reflect the number of images or keep it static
      label: 'Add Carousel',
      bgColor: 'bg-yellow-500',
      link: '/forms/carousel' // Ensure this route is configured in your React Router setup
    }
  ];

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <div className="p-8 bg-gray-100 w-full h-fit flex flex-wrap"> {/* Changed to flex layout for better alignment */}
      {cardsData.map(card => (
        <div key={card.label} className={`${card.bgColor} p-4 m-2 cursor-pointer flex-1 min-w-[200px] flex items-center justify-between`} onClick={() => handleCardClick(card.link)}>
          <div className="flex items-center gap-2">
            {card.icon}
            <p className="text-white">{card.label}</p>
          </div>
          <p className="text-white font-bold">{card.count}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
