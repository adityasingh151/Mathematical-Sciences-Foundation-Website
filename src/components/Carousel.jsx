import React, { useEffect, useState } from 'react';
import Loading from './LoadSaveAnimation/Loading';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref, onValue, off } from "firebase/database";

const Carousel = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const imagesRef = ref(db, 'carouselImages');
    
    const unsubscribe = onValue(imagesRef, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const storage = getStorage();
        const loadedImages = await Promise.all(Object.values(data).map(async item => {
          try {
            const imageRef = storageRef(storage, item.imageUrl);
            const url = await getDownloadURL(imageRef);
            return url;
          } catch (err) {
            console.error('Failed to get download URL', err);
            return null; // Handle image loading error
          }
        }));
        setImages(loadedImages.filter(url => url !== null)); // Filter out any failed URLs
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
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-auto py-8 rounded-md bg-gradient-to-r from-teal-600 to-blue-700 shadow-lg">
      {/* <h2 className="text-4xl font-bold text-center text-white mb-8">
        Discover Our Stunning Collection
      </h2> */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        className="mySwiper rounded-md shadow-md"
        style={{ width: '98%', height: '550px' }} // Height can be adjusted as needed
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full rounded-md overflow-hidden"
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                height: '100%', // Ensure it takes up the full height
              }}
              loading="lazy" // Add lazy loading attribute
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-md"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
