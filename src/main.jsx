// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './components/Home';
import AboutSection from './components/AboutSection';
import Carousel from './components/Carousel';
import ContactArea from './components/ContactArea';
import People from './components/People';
import Hero from './components/Hero';
import MathematicalSciencesFoundation from './components/MathematicalSciencesFoundation';
import CoursesPage1 from './components/coursesPage/CoursesPage1';
import CoursePage2 from './components/coursesPage/CoursePage2';
import CoursesPage from './components/coursesPage/CoursesPage';
import WorkshopPage from './components/WorkshopPage';
import EventPage from './components/EventPage';
import AdminLayout from './components/AdminLayout';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardCard from './components/DashboardCard';
import CourseForm1 from './components/dashBoard/inputForms/CourseForm1';
import CourseForm2 from './components/dashBoard/inputForms/CourseForm2';
import CoursesForm from './components/dashBoard/inputForms/CoursesForm';
import EventForm from './components/dashBoard/inputForms/EventForm';
import PeopleForm from './components/dashBoard/inputForms/PeopleForm';
import WorkshopForm from './components/dashBoard/inputForms/WorkshopForm';
import CourseSelection from './components/dashBoard/inputForms/CourseSelection';
import PrivacyPolicy from './components/PrivacyPolicy';
import CarouselImageForm from './components/dashBoard/inputForms/CarouselImageForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> },
      { path: 'about', element: <AboutSection /> },
      { path: 'carousel', element: <Carousel /> },
      { path: 'contact', element: <ContactArea /> },
      { path: 'people', element: <People /> },
      { path: 'hero', element: <Hero /> },
      { path: 'msf', element: <MathematicalSciencesFoundation /> },
      { path: 'courses', element: <CoursePage2 /> },
      { path: 'about/team', element: <People /> },
      { path: 'about/story', element: <MathematicalSciencesFoundation /> },
      { path: 'courses', element: <CoursePage2 /> },
      { path: 'courses/students', element: <CoursePage2 /> },
      { path: 'courses/teachers', element: <CoursesPage1 /> },
      //More Courses page in loop with id
      { path: 'workshop/GeoGebra', element: <WorkshopPage /> },
      //More workshop page in loop with id
      { path: 'event/1', element: <EventPage /> },
      //More event page in loop with id
      { path: 'admin/login', element: <AdminLogin /> },
      
      { path: 'course-selection', element: <CourseSelection /> },
      { path: 'forms/course1', element: <CourseForm1 /> },
      { path: 'forms/course2', element: <CourseForm2 /> },
      { path: 'forms/courses', element: <CoursesForm /> },
      { path: 'forms/event', element: <EventForm /> },
      { path: 'forms/people', element: <PeopleForm /> },
      { path: 'forms/workshop', element: <WorkshopForm /> },
      { path: 'PrivacyPolicy', element: <PrivacyPolicy /> },
      { path: 'forms/carousel', element: <CarouselImageForm /> },
      {
        path: 'admin',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <AdminLayout />,
            children: [
              { path: 'dashboard', element: <DashboardCard /> },
              { path: 'course-selection', element: <CourseSelection /> },
              { path: 'forms/course1', element: <CourseForm1 /> },
              { path: 'forms/course2', element: <CourseForm2 /> },
              { path: 'forms/courses', element: <CoursesForm /> },
              { path: 'forms/event', element: <EventForm /> },
              { path: 'forms/people', element: <PeopleForm /> },
              { path: 'forms/workshop', element: <WorkshopForm /> },
              { path: 'forms/carousel', element: <CarouselImageForm /> },
              // Add more protected admin routes here
            ],
          },
        ],
      },
      // Additional non-admin routes can be added here
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
