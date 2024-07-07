import { useState } from 'react'
import Navbar from './components/NavBar'
import Hero from './components/Hero'
import Carousel from './components/Carousel'
import AboutSection from './components/AboutSection'
import SponsorsSection from './components/SponsorsSection'
import './App.css'
// import SimpleSlider from './components/WorksSection'
import ContactArea from './components/ContactArea'
import WorksSection from './components/WorksSection'
import Footer from './components/Footer'
import People from './components/People'
import MathematicalSciencesFoundation from './components/MathematicalSciencesFoundation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Carousel/>
     <Hero />
     <AboutSection/> 
     <SponsorsSection/>
     <WorksSection/>
     <ContactArea/>
     <People/>
     <MathematicalSciencesFoundation/>
     <Footer/>
    </>
  )
}

export default App
