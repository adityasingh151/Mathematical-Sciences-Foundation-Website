import React, { useEffect, useRef, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import HeaderSection from './workshopPage/HeaderSection';
import AboutSection from './workshopPage/AboutSection';
import ScheduleSection from './workshopPage/ScheduleSection';
import OutcomesSection from './workshopPage/OutcomesSection';
import QuoteSection from './workshopPage/QuoteSection';
import RegistrationSection from './workshopPage/RegistrationSection';
import HowToReach from './workshopPage/HowToReach';
import Loading from './LoadSaveAnimation/Loading';

const WorkshopPage = () => {
  const [workshopData, setWorkshopData] = useState(null);


  useEffect(() => {
    const db = getDatabase();
    const workshopRef = ref(db, 'workshops');

    onValue(workshopRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const lastEntryKey = Object.keys(data).pop();
        setWorkshopData(data[lastEntryKey]);
      } else {
        console.log("No data available");
      }
    });
  }, []);

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
  }, [workshopData]);


  if (!workshopData) {
    return <Loading />;
  }

  return (
    <div className="font-lato text-gray-900 bg-gradient-to-r from-cyan-50 to-blue-100">
      <HeaderSection
        ref={sectionRefs.header}
        title={workshopData.headerTitle}
        subtitle={workshopData.headerSubtitle}
        buttonText="Register Now"
        onButtonClick={() => window.location.href = '#registration'}
      />
      <AboutSection
        ref={sectionRefs.about}
        title={workshopData.aboutTitle}
        content={workshopData.aboutDescription}
        imageUrl={workshopData.aboutImage}
      />
      <OutcomesSection
        ref={sectionRefs.outcomes}
        title={workshopData.outcomeTitle}
        content={workshopData.outcomeContent}
      />
      <QuoteSection
        ref={sectionRefs.quote}
        quote={workshopData.quote}
      />
      <RegistrationSection
        ref={sectionRefs.registration}
        title="Register for the Workshop"
        details={[
          { label: 'Date', value: workshopData.workshopDate },
          { label: 'Time', value: `${workshopData.workshopStartTime} - ${workshopData.workshopEndTime}` },
          { label: 'Prerequisite', value: workshopData.prerequisites },
          { label: 'Designed for', value: workshopData.designedFor },
          { label: 'Fees(Rupees)', value: workshopData.workshopRegistrationFee },
        ]}
        registrationInfo={workshopData.registrationInfo}
        buttonText="Register Now"
        onButtonClick={() => window.location.href = '#registration'}
      />
      <HowToReach
        ref={sectionRefs.directions}
        location={{ name: workshopData.address, embedParams: workshopData.addressURL }}
      />
    </div>
  );
};

export default WorkshopPage;
