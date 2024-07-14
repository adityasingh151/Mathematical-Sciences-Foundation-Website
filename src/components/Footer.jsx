import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-gradient-to-r from-gray-100 via-[#bce1ff] to-gray-100">
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img src="/msflogo.jpg" className="mr-5 h-6 sm:h-9" alt="MSF logo" />
            <p className="max-w-xs mt-4 text-sm text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, accusantium.
            </p>
            {/* Social icons section */}
          </div>
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-medium">Organisation</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500" aria-label="Organisation navigation">
                <Link className="hover:opacity-75" to="/about">About</Link>
                <Link className="hover:opacity-75" to="/team">Meet the Team</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium">Works</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500" aria-label="Works navigation">
                <Link className="hover:opacity-75" to="/workshops">Workshops</Link>
                <Link className="hover:opacity-75" to="/courses">Courses</Link>
                <Link className="hover:opacity-75" to="/event/1">Events</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium">Helpful Links</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500" aria-label="Helpful links navigation">
                <Link className="hover:opacity-75" to="/contact">Contact</Link>
                <Link className="hover:opacity-75" to="/admin/login">Admin login</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium">Legal</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-500" aria-label="Legal navigation">
                <Link className="hover:opacity-75" to="/PrivacyPolicy">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-800">
          © {currentYear} Mathematical Sciences Organisation
        </p>
      </div>
    </footer>
  );
}

export default Footer;
