import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { getDatabase, ref, onValue } from 'firebase/database';
import Loading from './LoadSaveAnimation/Loading';
import ErrorNotification from './LoadSaveAnimation/ErrorNotification';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchReviews = () => {
      const db = getDatabase();
      const reviewsRef = ref(db, 'reviews');

      onValue(reviewsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const reviewList = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));
          setReviews(reviewList);
        } else {
          console.log('No data available');
          setShowError(true);
        }
        setIsLoading(false);
      }, (error) => {
        console.error('Error fetching reviews: ', error);
        setShowError(true);
        setIsLoading(false);
      });
    };

    fetchReviews();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (showError) {
    return <ErrorNotification message="Failed to load reviews!" onClose={() => setShowError(false)} />;
  }

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-cyan-50 to-blue-100 px-4 py-4 sm:py-4 lg:px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-8 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-14 lg:mr-0 xl:mr-8 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-3xl">
        <div className="text-center text-2xl font-bold leading-8 text-gray-900 sm:text-3xl sm:leading-9">
      <h5 className="text-lg text-indigo-600 uppercase font-semibold">Testimonials</h5>
          <p>Few words of our alumni!!</p>
        </div>
        <CarouselProvider
          naturalSlideWidth={100}
          isIntrinsicHeight
          totalSlides={reviews.length}
          infinite
        >
          <Slider>
            {reviews.map((review, index) => (
              <Slide key={review.id} index={index}>
                <figure className="mt-8">
                  <blockquote className="text-center text-base font-medium leading-6 text-gray-700 sm:text-lg sm:leading-7">
                    <p>{review.review}</p>
                  </blockquote>
                  <figcaption className="mt-8">
                    <img
                      alt={review.name}
                      src={review.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'}
                      className="mx-auto h-10 w-10 rounded-full"
                    />
                    <div className="mt-3 flex items-center justify-center space-x-2 text-sm">
                      <div className="font-semibold text-gray-900">{review.name}</div>
                      <svg width={2} height={2} viewBox="0 0 2 2" aria-hidden="true" className="fill-gray-900">
                        <circle r={1} cx={1} cy={1} />
                      </svg>
                      <div className="text-gray-600">{review.designation}</div>
                    </div>
                  </figcaption>
                </figure>
              </Slide>
            ))}
          </Slider>
          <div className="flex items-center mt-6 justify-center">
            <ButtonBack className="cursor-pointer" role="button" aria-label="previous slide">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonal-svg2.svg" alt="previous" />
            </ButtonBack>
            <ButtonNext className="cursor-pointer ml-2" role="button" aria-label="next slide">
              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/testimonial-svg3.svg" alt="next" />
            </ButtonNext>
          </div>
        </CarouselProvider>
      </div>
    </section>
  );
};

export default Testimonials;
