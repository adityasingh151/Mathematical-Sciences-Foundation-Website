import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const works = [
  {
    image: "https://images.pexels.com/photos/5444631/pexels-photo-5444631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    title: "Web Design",
    description: "NoCodeAPI",
    link: "#"
  },
  {
    image: "https://images.pexels.com/photos/545067/pexels-photo-545067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Creative Design",
    description: "UIdeck",
    link: "#"
  },
  {
    image: "https://images.pexels.com/photos/545067/pexels-photo-545067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Creative Design",
    description: "UIdeck",
    link: "#"
  },
  {
    image: "https://images.pexels.com/photos/545067/pexels-photo-545067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    title: "Creative Design",
    description: "UIdeck",
    link: "#"
  },
  // Add more items as needed
];

function WorksSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section id="work" className="bg-gray-100 pt-16 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h5 className="text-indigo-600 uppercase font-semibold">Works</h5>
          <h4 className="main_title text-3xl font-bold">Some of Our Recent Works</h4>
        </div>
        <Slider {...settings}>
          {works.map((work, index) => (
            <div key={index} className="p-4">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={work.image} alt={work.title} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h5 className="text-xl font-bold">{work.title}</h5>
                  <p className="text-gray-700">{work.description}</p>
                  <a href={work.link} className="text-blue-500 hover:text-blue-600 bg-white transition-colors duration-300">
                    <i className="lni lni-chevron-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default WorksSection;
