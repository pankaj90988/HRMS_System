import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  // Core Application States
  const [userRole, setUserRole] = useState('employee'); 
  const [userName] = useState('Amit Kumar');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [attendanceTab, setAttendanceTab] = useState('daily'); 

  // Live Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock Dataset Arrays
  const dailyLogs = [
    { id: 1, date: 'Today', checkIn: '09:15 AM', checkOut: '--:--', status: 'On-Duty' },
    { id: 2, date: 'Yesterday', checkIn: '09:02 AM', checkOut: '06:05 PM', status: 'Present' },
  ];

  const weeklyLogs = [
    { id: 1, week: 'Week 34 (Current)', compliance: '4 / 5 Days', status: 'Compliant' },
    { id: 2, week: 'Week 33 (Passed)', compliance: '5 / 5 Days', status: 'Compliant' },
  ];

  const pendingLeaves = [
    { id: 101, name: 'Rahul Sharma', type: 'Casual Leave', duration: '3 Days' },
    { id: 102, name: 'Priya Patel', type: 'Medical Leave', duration: '1 Day' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Radial Glow Layer */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-6">
        
        {/* SECTION 1: WELCOME & SIMULATION BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Jai Hind, {userName}
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold capitalize ${
                userRole === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {userRole} Mode
              </span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Live Tracker: <span className="font-mono text-indigo-400 font-semibold">{currentTime}</span></p>
          </div>

          {/* Tester Toggle Buttons */}
          <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-lg self-start sm:self-auto">
            <button type="button" onClick={() => setUserRole('employee')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${userRole === 'employee' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>Employee</button>
            <button type="button" onClick={() => setUserRole('admin')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${userRole === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-400'}`}>Admin / HR</button>
          </div>
        </div>

        {/* SECTION 2A: EMPLOYEE PORTAL VIEW */}
        {userRole === 'employee' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Quick Summary Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl"><div className="text-xs font-medium text-slate-400 mb-1">Compliance</div><div className="text-2xl font-bold text-white">94.2%</div></div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl"><div className="text-xs font-medium text-slate-400 mb-1">Leaves Left</div><div className="text-2xl font-bold text-white">12 Days</div></div>
                <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl"><div className="text-xs font-medium text-slate-400 mb-1">Pending Slips</div><div className="text-2xl font-bold text-amber-500">1 Form</div></div>
              </div>

              {/* Attendance Toggle Lists */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Attendance Ledger</h3>
                  <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-md text-xs">
                    <button type="button" onClick={() => setAttendanceTab('daily')} className={`px-2.5 py-1 rounded ${attendanceTab === 'daily' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>Daily</button>
                    <button type="button" onClick={() => setAttendanceTab('weekly')} className={`px-2.5 py-1 rounded ${attendanceTab === 'weekly' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>Weekly</button>
                  </div>
                </div>

                <div className="overflow-x-auto text-sm">
                  {attendanceTab === 'daily' ? (
                    <table className="w-full text-left">
                      <thead><tr className="text-slate-500 text-xs font-mono border-b border-slate-800"><th className="pb-2">Date</th><th className="pb-2">In</th><th className="pb-2">Out</th><th className="pb-2 text-right">Status</th></tr></thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {dailyLogs.map(log => (
                          <tr key={log.id} className="text-slate-300"><td className="py-2 text-white font-medium">{log.date}</td><td className="py-2 font-mono">{log.checkIn}</td><td className="py-2 font-mono">{log.checkOut}</td><td className="py-2 text-right"><span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded">{log.status}</span></td></tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left">
                      <thead><tr className="text-slate-500 text-xs font-mono border-b border-slate-800"><th className="pb-2">Week No</th><th className="pb-2">Present Rate</th><th className="pb-2 text-right">Audit</th></tr></thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {weeklyLogs.map(w => (
                          <tr key={w.id} className="text-slate-300"><td className="py-2 text-white font-medium">{w.week}</td><td className="py-2">{w.compliance}</td><td className="py-2 text-right"><span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded">{w.status}</span></td></tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            {/* Shift Clock Card Sidebar */}
            <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between h-64 shadow-xl">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Shift Control</h3>
                  <p className="text-slate-400 text-xs mb-4">Clock in or out securely from here.</p>
                  <div className="bg-slate-950 py-3 rounded-xl border border-slate-800/60 font-mono text-center text-white text-sm">09:30 AM — General Shift</div>
                </div>
                <button type="button" onClick={() => setIsCheckedIn(!isCheckedIn)} className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all ${isCheckedIn ? 'bg-rose-600 hover:bg-rose-500' : 'bg-indigo-600 hover:bg-indigo-500'}`}>{isCheckedIn ? '⏹ Punch-Out' : '▶ Punch-In'}</button>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <button type="button" onClick={() => navigate('/employee/leaves')} className="w-full text-left p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-xs transition-colors flex justify-between"><span>Request Formal Leave Forms</span><span>→</span></button>
                <button type="button" onClick={() => navigate('/employee/profile')} className="w-full text-left p-3 bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-lg text-xs transition-colors flex justify-between"><span>Edit Personal Profile Data</span><span>→</span></button>
              </div>
            </div>
          </div>
        )}
        {/* SECTION 2B: ADMIN / HR PORTAL VIEW */}
        {userRole === 'admin' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl"><div className="text-xs text-slate-400 mb-1">Total Staff</div><div className="text-2xl font-bold text-white">1,240</div></div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl"><div className="text-xs text-slate-400 mb-1">Active Now</div><div className="text-2xl font-bold text-emerald-400">892</div></div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl"><div className="text-xs text-slate-400 mb-1">Open Leaves</div><div className="text-2xl font-bold text-amber-500">23 Applications</div></div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl"><div className="text-xs text-slate-400 mb-1">Compliance</div><div className="text-2xl font-bold text-white">99.1%</div></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2"><h3 className="text-sm font-bold text-white uppercase tracking-wider">Approval Workflow Queue</h3><button type="button" onClick={() => navigate('/admin/leaves')} className="text-xs text-indigo-400 font-semibold hover:underline">View All</button></div>
                <div className="space-y-3">
                  {pendingLeaves.map(item => (
                    <div key={item.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div><div className="flex items-center gap-2"><span className="font-semibold text-white text-sm">{item.name}</span><span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">#{item.id}</span></div><p className="text-xs text-slate-400 mt-0.5">{item.type} • <span className="text-indigo-400">{item.duration}</span></p></div>
                      <div className="flex items-center gap-2 self-end sm:self-auto"><button type="button" className="px-2.5 py-1 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs rounded-md">Reject</button><button type="button" className="px-2.5 py-1 bg-emerald-500 text-slate-950 text-xs font-bold rounded-md">Approve</button></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between h-64">
                <div><h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Admin Consoles</h3><p className="text-slate-400 text-xs">Direct core routing adjustments.</p></div>
                <div className="space-y-2">
                  <button type="button" onClick={() => navigate('/admin/employees')} className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-left flex justify-between"><span>👥 Open Staff Directory Control</span><span>→</span></button>
                  <button type="button" onClick={() => navigate('/admin/attendance')} className="w-full p-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs rounded-lg text-left flex justify-between"><span>📊 Biometric Audit Overrides</span><span>→</span></button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;
