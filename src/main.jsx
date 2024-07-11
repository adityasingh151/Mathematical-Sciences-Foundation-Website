import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Home from './components/Home'; // Home component created for default rendering
import AboutSection from './components/AboutSection.jsx';
import Carousel from './components/Carousel.jsx';
import ContactArea from './components/ContactArea.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <Home /> }, // Default route for all components
      { path: 'about', element: <AboutSection /> },
      { path: 'carousel', element: <Carousel /> },
      { path: 'contact', element: <ContactArea /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
