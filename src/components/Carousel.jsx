import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import heroBackground from '../assets/images/hero-background.png'

const Carousel = () => {
  return (
    <div className=" mx-auto py-1">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="mySwiper"
        style={{ width: '100%', height: '400px' }} // Adjust width and height here
      >
        <SwiperSlide>
          <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage:`url(${heroBackground})`, backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat', }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              Slide 1
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage:`url(${heroBackground})`, backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat', }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              Slide 1
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage:`url(${heroBackground})`, backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat', }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
              Slide 1
            </div>
          </div>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
};

export default Carousel;
