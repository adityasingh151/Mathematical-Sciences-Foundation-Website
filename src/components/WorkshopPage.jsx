import React, { useEffect, useRef } from 'react';
import HeaderSection from './workshopPage/HeaderSection';
import AboutSection from './workshopPage/AboutSection';
import ScheduleSection from './workshopPage/ScheduleSection';
import OutcomesSection from './workshopPage/OutcomesSection';
import QuoteSection from './workshopPage/QuoteSection';
import RegistrationSection from './workshopPage/RegistrationSection';
import HowToReach from './workshopPage/HowToReach';

const WorkshopPage = () => {
  const location = {
    name: 'KR Mangalam Global School, Greater Kailash Part 1, N Block, New Delhi',
    nearestMetro: 'Kailash Colony (Violet Line)',
    embedParams: '!1m18!1m12!1m3!1d3504.462930872881!2d77.2338787152384!3d28.555858482448073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce36d56c94743%3A0xf0a6db7648cebdfa!2sK.R.%20Mangalam%20Global%20School!5e0!3m2!1sen!2sin!4v1570786231578!5m2!1sen!2sin'
  };

  const sectionRefs = {
    header: useRef(null),
    about: useRef(null),
    schedule: useRef(null),
    outcomes: useRef(null),
    quote: useRef(null),
    registration: useRef(null),
    directions: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(entry.target.dataset.animation);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100">
      <HeaderSection
        ref={sectionRefs.header}
        title="Enrich Your Maths Class with GeoGebra"
        subtitle="A WORKSHOP FOR MIDDLE-SCHOOL MATH TEACHERS"
        buttonText="Register Now"
        onButtonClick={() => window.location.href = '#registration'}
      />
      <AboutSection
        ref={sectionRefs.about}
        title="About GeoGebra"
        content="GeoGebra is a free dynamic mathematics software package used by teachers of mathematics in classrooms across the world. It joins geometry, algebra, tables, graphing, statistics, and calculus in one easy-to-use package. GeoGebra helps students visualize mathematical concepts and create dynamic applets for classrooms."
        imageUrl="https://images.pexels.com/photos/2681319/pexels-photo-2681319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />
      <ScheduleSection
        ref={sectionRefs.schedule}
        title="Workshop Schedule"
        sessions={[
          {
            title: 'Morning Session',
            details: [
              '09:00 AM - 11:00 AM: Introduction to GeoGebra',
              '11:15 AM - 01:15 PM: Exploring GeoGebra Tools',
            ],
          },
          {
            title: 'Afternoon Session',
            details: [
              '02:00 PM - 03:30 PM: Creating Interactive Lessons',
              '03:45 PM - 05:00 PM: Q&A and Wrap-up',
            ],
          },
        ]}
      />
      <OutcomesSection
        ref={sectionRefs.outcomes}
        title="Expected Outcomes"
        content="Participants will learn how to use GeoGebra as an instructional tool to enrich mathematics teaching, create their own GeoGebra content, and incorporate ICT-based hands-on activities within their lessons."
      />
      <QuoteSection
        ref={sectionRefs.quote}
        quote='"Introduce joyful learning into your math classroom using GeoGebra."'
      />
      <RegistrationSection
        ref={sectionRefs.registration}
        title="Register for the Workshop"
        details={[
          { label: 'Date', value: 'November 10, 2019' },
          { label: 'Time', value: '10:00 AM - 4:00 PM' },
          { label: 'Prerequisite', value: 'Basic knowledge of mathematics and geometry' },
          { label: 'Designed for', value: 'Teachers, students, and anyone interested in learning GeoGebra' },
        ]}
        registrationInfo="Registration is open until November 5, 2019. The fee is Rs. 1200 (including GST). Please bring your laptop with GeoGebra Classic 6 installed."
        buttonText="Register Now"
        onButtonClick={() => window.location.href = '#registration'}
      />
      <HowToReach
        ref={sectionRefs.directions}
        location={location}
      />
    </div>
  );
};

export default WorkshopPage;
