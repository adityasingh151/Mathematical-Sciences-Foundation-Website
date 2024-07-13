import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Navbar from './components/NavBar';
import EventPage from './components/EventPage'
import WorkshopForm from './components/dashBoard/inputForms/WorkshopForm'; // Assuming WorkshopForm is exported correctly
import EventForm from './components/dashBoard/inputForms/EventForm';
import DashboardCard from './components/DashboardCard';
import CoursesForm from './components/dashBoard/inputForms/CoursesForm';
import CourseForm1 from './components/dashBoard/inputForms/CourseForm1';
import PeopleForm from './components/dashBoard/inputForms/PeopleForm';
import "./index.css"
import CourseForm2 from './components/dashBoard/inputForms/CourseForm2';
import CoursePage2 from './components/coursesPage/CoursePage2';
import CoursePage1 from './components/coursesPage/CoursePage1';
import WorkshopPage from './components/WorkshopPage';
import SideBar from './components/dashBoard/SideBar';
import Dashboard from './components/dashBoard/InfoCard/Dashboard';


function App() {
  return (
    <>
       <NavBar />
      <Outlet />
      <Footer/> 
      {/* <WorkshopPage /> */}
      {/* <Dashboard/> */}  
    
    </>
  );
}

export default App;
