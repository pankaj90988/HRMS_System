import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  // Active styles handler for sidebar buttons
  const linkClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      location.pathname === path
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10'
        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
    }`;

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-slate-900 border-r border-slate-800 min-h-[calc(100vh-4rem)] p-4 space-y-6 shrink-0 sticky top-16">
      
      {/* Session Context User Profile Tag info */}
      <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-sm text-white shadow">
            {user.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
          </div>
          <div className="truncate max-w-[140px]">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">{user.role}</span>
          </div>
        </div>
      </div>

      {/* Nav Link Tree Options Layout Grid */}
      <nav className="flex-grow space-y-1.5">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block px-4 mb-2">Main Menu</span>
        
        <NavLink to="/home" className={linkClasses('/home')}>
          <span>📊</span> Dashboard Home
        </NavLink>
        
        <NavLink to="/profile" className={linkClasses('/profile')}>
          <span>👤</span> Profile Desk
        </NavLink>
        
        <NavLink to="/attendance" className={linkClasses('/attendance')}>
          <span>📅</span> Attendance Ledger
        </NavLink>
        
        <NavLink to="/leave" className={linkClasses('/leave')}>
          <span>✉</span> Leaves Control
        </NavLink>
        
        <NavLink to="/payroll" className={linkClasses('/payroll')}>
          <span>💳</span> Payroll Center
        </NavLink>
      </nav>
      {/* Footer Meta indicator marker */}
      <div className="pt-4 border-t border-slate-800/80 text-center">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">Node: Active Session Verified</p>
      </div>

    </aside>
  );
};

export default Sidebar;
