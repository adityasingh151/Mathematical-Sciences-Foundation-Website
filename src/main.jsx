import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Home from './components/Home'; // Home component created for default rendering
import AboutSection from './components/AboutSection.jsx';
import Carousel from './components/Carousel.jsx';
import ContactArea from './components/ContactArea.jsx';
import People from './components/People.jsx';
import Hero from './components/Hero.jsx';
import MathematicalSciencesFoundation from './components/MathematicalSciencesFoundation.jsx';
import CoursePage1 from './components/coursesPage/CoursePage1.jsx';
import CoursePage2 from './components/coursesPage/CoursePage2.jsx';
import CoursesPage from './components/coursesPage/CoursesPage.jsx';
import WorkshopPage from './components/WorkshopPage.jsx';
import EventPage from './components/EventPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> }, // Default route for all components
      { path: 'about/team', element: <People /> },
      { path: 'about/story', element: <MathematicalSciencesFoundation /> },
      { path: 'courses', element: <CoursesPage /> },
      { path: 'courses/students', element: <CoursePage2 /> },
      { path: 'courses/teachers', element: <CoursePage1 /> },
      //More Courses page in loop with id
      { path: 'workshop/GeoGebra', element: <WorkshopPage /> },
      //More workshop page in loop with id
      { path: 'event/1', element: <EventPage /> },
      //More event page in loop with id
      

    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
