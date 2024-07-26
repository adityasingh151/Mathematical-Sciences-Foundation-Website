import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 shadow-md">
      <div className="max-w-screen-xl px-4 py-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <img src="/msflogo.png" className="mr-5 h-12 sm:h-16" alt="MSF logo" />
            <p className="max-w-xs mt-4 text-sm text-gray-600">
              All rights reserved to Mathematical Sciences Foundation.
            </p>
            {/* Social icons section */}
          </div>
          <div className="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-medium text-blue-700">Organisation</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-600" aria-label="Organisation navigation">
                <Link className="hover:text-blue-600" to="/about/story">About</Link>
                <Link className="hover:text-blue-600" to="/about/team">Meet the Team</Link>
              </nav>
            </div>
            
            <div>
              <p className="font-medium text-blue-700">Helpful Links</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-600" aria-label="Helpful links navigation">
                <Link className="hover:text-blue-600" to="/contact">Contact</Link>
                <Link className="hover:text-blue-600" to="/admin/login">Admin login</Link>
              </nav>
            </div>
            <div>
              <p className="font-medium text-blue-700">Legal</p>
              <nav className="flex flex-col mt-4 space-y-2 text-sm text-gray-600" aria-label="Legal navigation">
                <Link className="hover:text-blue-600" to="/PrivacyPolicy">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-700">
          © {currentYear} Mathematical Sciences Foundation
        </p>
      </div>
    </footer>
  );
}

export default Footer;
