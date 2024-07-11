import React from 'react'
import AboutSection from './AboutSection';
import Carousel from './Carousel';
import MathematicalSciencesFoundation from './MathematicalSciencesFoundation';
import EventPage from './EventPage';
import Hero from './Hero' ;
import People from './People';
import SponsersSection from './SponsorsSection';
import WorkshopPage from './WorkshopPage';
import WorksSection from './WorksSection';
import ContactArea from './ContactArea';

function Home() {
    return (
      <>
        <AboutSection /> 
        <Carousel />
        {/* <EventPage/> */}
        <Hero/>
         <MathematicalSciencesFoundation/>
        <People/>
        <SponsersSection/>
         <WorkshopPage/> 
        <WorksSection/>
        <ContactArea />
        
      </>
    );
  }

export default Home
