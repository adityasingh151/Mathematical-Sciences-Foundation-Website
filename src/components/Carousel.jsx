import React, { useEffect, useState } from 'react';
import Loading from './LoadSaveAnimation/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getDatabase, ref, onValue, off } from "firebase/database";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const imagesRef = ref(db, 'carouselImages');
    
    const unsubscribe = onValue(imagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedImages = Object.values(data).map(item => item.imageUrl);
        setImages(loadedImages);
      } else {
        setError("No images found");
      }
      setIsLoading(false);
    }, (error) => {
      console.error(error);
      setError("Failed to fetch images");
      setIsLoading(false);
    });

    return () => {
      off(imagesRef, 'value', unsubscribe);
    };
  }, []);

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-auto py-1">
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
        style={{ width: '100%', height: '700px' }} // Height can be adjusted as needed
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover', // Ensures full image is visible
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center' // Centers the image in the slide
              }}
            >
              <div className="absolute inset-0 bg-black opacity-25"></div> 
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
