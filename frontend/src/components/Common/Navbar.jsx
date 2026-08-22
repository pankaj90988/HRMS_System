import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; // Importing your shared context hook

const Navbar = () => {
  const { user, logout } = useAuth(); // Destructuring real-time active user state and methods
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect to login if a non-authenticated session drops onto the navbar layer
  if (!user) return null; 

  // Helper to dynamically highlight active routes inside the corporate navigation tree
  const isActive = (path) => location.pathname === path;
  const linkClasses = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive(path)
        ? 'bg-indigo-600 text-white'
        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
    }`;

  const handleSignOut = () => {
    logout(); // Triggers context function to wipe session storage parameters
    navigate('/'); // Forwards user terminal back to Auth Gate
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* LOGO BRANDING CONSOLE TERMINAL JUMP */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/home')}>
            <div className="h-9 w-9 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-600/20">
              H
            </div>
            <span className="font-bold text-xl tracking-wider bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              HRMS<span className="text-indigo-500 text-xs font-semibold ml-1">v1.0</span>
            </span>
          </div>

          {/* DESKTOP ROUTING LINKS - Contextually rendered via user.role state context (Single URL optimized) */}
          <div className="hidden md:flex items-center space-x-3">
            <Link to="/home" className={linkClasses('/home')}>Dashboard</Link>
            <Link to="/profile" className={linkClasses('/profile')}>Profile</Link>
            <Link to="/attendance" className={linkClasses('/attendance')}>Attendance</Link>
            <Link to="/leave" className={linkClasses('/leave')}>Leaves Management</Link>
            <Link to="/payroll" className={linkClasses('/payroll')}>Payroll Controls</Link>
          </div>
          {/* RIGHT IDENTITY AREA: PORTAL ROLES & DROPDOWN PARAMETERS */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Dynamic designation validation badge tracking layout */}
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
              user.role === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            }`}>
              {user.role === 'admin' ? 'HR Officer' : 'Staff Employee'}
            </span>

            {/* Profile configuration menu dropdown block */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none p-1 rounded-full hover:bg-slate-800 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white shadow">
                  {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
                </div>
                <span className="text-sm font-medium text-slate-300 max-w-[120px] truncate">{user.name || 'User'}</span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-800 border border-slate-700 shadow-xl py-1 z-50 animate-in fade-in duration-100">
                  <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                    Account Profile
                  </Link>
                  <hr className="border-slate-700 my-1" />
                  <button type="button" onClick={handleSignOut} className="w-full text-left block px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 font-medium">
                    Logout Session
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE RESPONSIVE HAMBURGER ICON TRACER */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER LINK SLIDER OVERLAY */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-2 pt-2 pb-4 space-y-1">
          <Link to="/home" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800">Dashboard</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800">Profile</Link>
          <Link to="/attendance" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800">Attendance</Link>
          <Link to="/leave" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800">Leaves</Link>
          <Link to="/payroll" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-sm text-slate-300 hover:bg-slate-800">Payroll</Link>
          <hr className="border-slate-800 my-2" />
          <div className="px-3 py-1 flex items-center justify-between text-xs text-slate-400">
            <span>Logged as: <b className="text-white capitalize">{user.role}</b></span>
            <button type="button" onClick={handleSignOut} className="text-rose-400 font-bold hover:underline">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;