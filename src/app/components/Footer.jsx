import React from "react";
import GlobalShareButtons from "./GlobalShareButtons";
import EmailSection from "./EmailSection";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <EmailSection />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Name */}
          <div className="text-lg font-medium text-gray-900">
            Sajjad Ahmad
          </div>


          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © 2025 Sajjad Ahmad. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;