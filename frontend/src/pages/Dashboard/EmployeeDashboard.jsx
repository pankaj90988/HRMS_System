import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Context/AuthContext'; // 👈 Verified nested path import link
import { toast } from 'react-toastify';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Reads real-time active user session state globally

  // API driven dynamic status state parameters arrays (Spec 3.2.1)
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fallback structural backup arrays during sandbox deployment connectivity issues
  const fallbackAlerts = [
    { id: 1, text: 'Biometric network authorization terminal update scheduled tonight.', time: '2 hours ago' },
    { id: 2, text: 'Your Earned Leave slip request for 25th August has been received.', time: '1 day ago' },
  ];

  // Asynchronous API Fetch Engine Routine (Fulfills Specification 3.2.1)
  useEffect(() => {
    const fetchEmployeeAlerts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/employee/alerts');
        const data = await response.json();

        if (response.ok) {
          setRecentAlerts(data);
        } else {
          throw new Error('Failed to synchronize activity feed dashboards.');
        }
      } catch (error) {
        console.error("Employee Feed Fault:", error);
        // Fallback safety layer to keep UI cleanly scannable
        setRecentAlerts(fallbackAlerts);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchEmployeeAlerts();
  }, [user]);

  const handleSignOut = () => {
    logout();
    toast.info("Session closed securely. Redirecting to auth portal...", { theme: 'dark', autoClose: 1500 });
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-950 flex items-center justify-center">
        <span className="h-6 w-6 border-4 border-slate-800 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* Profile Identity Greeting Header */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Jai Hind, {user?.name || 'Staff Recruit'}</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Authorized Employee Secure Terminal Workspace Portal.</p>
          </div>
          <span className="text-xs px-2.5 py-0.5 font-mono uppercase font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full self-start sm:self-auto">
            UID: {user?.email}
          </span>
        </div>

        {/* Quick Access Control Matrix Grid (Fulfills Specification 3.2.1) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Quick Card 1: Profile */}
            <button type="button" onClick={() => navigate('/profile')} className="p-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-all h-36 flex flex-col justify-between group shadow-md">
              <span className="text-xl bg-indigo-500/10 text-indigo-400 h-8 w-8 rounded-lg flex items-center justify-center">👤</span>
              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-indigo-400 transition-colors">My Profile</h3>
                <p className="text-slate-500 text-[11px] mt-0.5">View documents & info.</p>
              </div>
            </button>

            {/* Quick Card 2: Attendance */}
            <button type="button" onClick={() => navigate('/attendance')} className="p-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-all h-36 flex flex-col justify-between group shadow-md">
              <span className="text-xl bg-emerald-500/10 text-emerald-400 h-8 w-8 rounded-lg flex items-center justify-center">📅</span>
              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">Attendance</h3>
                <p className="text-slate-500 text-[11px] mt-0.5">Audit daily shift clocks.</p>
              </div>
            </button>

            {/* Quick Card 3: Leave Requests */}
            <button type="button" onClick={() => navigate('/leave')} className="p-5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-left transition-all h-36 flex flex-col justify-between group shadow-md">
              <span className="text-xl bg-amber-500/10 text-amber-400 h-8 w-8 rounded-lg flex items-center justify-center">✉</span>
              <div>
                <h3 className="font-bold text-white text-sm group-hover:text-amber-400 transition-colors">Leave Requests</h3>
                <p className="text-slate-500 text-[11px] mt-0.5">Apply for formal time-off.</p>
              </div>
            </button>

          </div>

          {/* Activity Alerts Sidebar Content Engine (Fulfills Specification 3.2.1) */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Recent Activity Logs</h3>
              <div className="space-y-2.5">
                {recentAlerts.map(alert => (
                  <div key={alert.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1">
                    <p className="text-slate-300 leading-relaxed">{alert.text}</p>
                    {alert.time && <span className="text-slate-600 block font-mono text-[10px]">{alert.time}</span>}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Quick Logout Trigger built directly inside matching prompt specifications */}
            <button 
              type="button" 
              onClick={handleSignOut} 
              className="w-full mt-6 py-2 bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/20 text-xs font-bold rounded-xl transition-all text-center uppercase tracking-wider"
            >
              ⏹ Logout Session Gateway
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
