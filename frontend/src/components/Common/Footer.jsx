import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
        
        {/* Left Side: System Core Meta Note */}
        <div>
          <p className="font-medium text-slate-300">Enterprise HRMS Framework Console</p>
          <p className="text-slate-500 text-[11px] mt-0.5">Secure Cloud Architecture Layer • Sync Verified</p>
        </div>

        {/* Right Side: Copyright Integrity Statement */}
        <div className="text-center sm:text-right">
          <p>© {currentYear} Corporate Systems Inc. All rights reserved.</p>
          <p className="text-slate-600 text-[11px] mt-0.5">Compliant under operational HR specifications metadata guidelines.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
