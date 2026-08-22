import React, { useState, useEffect } from 'react';

const AttendanceTracker = () => {
  // Global Simulation Context Role States
  // Switch to 'admin' to unlock global corporate logging filters instantly!
  const [userRole, setUserRole] = useState('employee'); 
  const [attendanceView, setAttendanceView] = useState('daily'); // 'daily' or 'weekly'
  const [searchQuery, setSearchQuery] = useState('');

  // Punch terminal tracking variables
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Real-time server sync ticker simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock Global Master Data Logs for Admin view auditing (Spec 3.4.2)
  const companyWideAttendanceLogs = [
    { id: 101, empId: 'EMP-2026-894', name: 'Amit Kumar', date: 'Today', inTime: '09:15 AM', outTime: '--:--', status: 'Present' },
    { id: 102, empId: 'EMP-2026-102', name: 'Rahul Sharma', date: 'Today', inTime: '--:--', outTime: '--:--', status: 'Leave' },
    { id: 103, empId: 'EMP-2026-405', name: 'Priya Patel', date: 'Today', inTime: '01:30 PM', outTime: '06:00 PM', status: 'Half-day' },
    { id: 104, empId: 'EMP-2026-711', name: 'Sunil Verma', date: 'Yesterday', inTime: '--:--', outTime: '--:--', status: 'Absent' },
  ];

  // Mock Personal Data Logs for regular employee scope (Spec 3.4.2)
  const personalAttendanceLogs = [
    { id: 1, date: 'Today', inTime: isCheckedIn ? '09:15 AM' : '--:--', outTime: '--:--', status: isCheckedIn ? 'Present' : 'Absent' },
    { id: 2, date: 'Yesterday', inTime: '09:02 AM', outTime: '06:05 PM', status: 'Present' },
    { id: 3, date: '20 Aug 2026', inTime: '09:30 AM', outTime: '01:30 PM', status: 'Half-day' },
    { id: 4, date: '19 Aug 2026', inTime: '--:--', outTime: '--:--', status: 'Leave' },
  ];

  // Filter roster queries exclusively for the administrative dashboard layer
  const filteredLogs = companyWideAttendanceLogs.filter(log =>
    log.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.empId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Subtle Gradient Glow Layer */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-6">
        
        {/* HEADER CONTROLS BAR WITH DESIGNATION SWAPPERS */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Attendance Records Engine
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${
                userRole === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {userRole === 'admin' ? 'Admin / HR Ledger' : 'My Terminal'}
              </span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Network Time Signal: <span className="font-mono text-indigo-400 font-semibold">{currentTime}</span></p>
          </div>

          {/* Developer Testing Sandbox Switcher Panel */}
          <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-lg flex-shrink-0 text-xs self-start sm:self-auto">
            <button type="button" onClick={() => setUserRole('employee')} className={`px-2.5 py-1 rounded transition-all ${userRole === 'employee' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Employee Mode</button>
            <button type="button" onClick={() => setUserRole('admin')} className={`px-2.5 py-1 rounded transition-all ${userRole === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-500'}`}>Admin Mode</button>
          </div>
        </div>

        {/* CONDITION ELEMENT 1: EMPLOYEE CONSOLE WITH LOGS + LIVE TERMINAL BUTTONS */}
        {userRole === 'employee' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Live Punch Clock Widget Terminal (Spec 3.4.1) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit shadow-xl space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Shift Control Base</h3>
                <p className="text-slate-400 text-xs">Authorize localized clock events securely.</p>
              </div>

              <div className="bg-slate-950 p-4 border border-slate-800/60 rounded-xl text-center font-mono">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-0.5">Active General Shift</span>
                <span className="text-base font-bold text-slate-200">09:30 AM — 06:30 PM</span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setIsCheckedIn(!isCheckedIn)}
                  className={`w-full py-3 rounded-xl font-bold text-sm shadow-lg transition-all ${
                    isCheckedIn ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/10' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10'
                  }`}
                >
                  {isCheckedIn ? '⏹ Check-Out (Leave Shift)' : '▶ Check-In (Clock Attendance)'}
                </button>
                <p className="text-[10px] text-center text-slate-500 font-medium">
                  {isCheckedIn ? '🟢 Attendance active: biometric logging frame running' : '🔴 marked off-duty: session cleared'}
                </p>
              </div>
            </div>
            {/* Employee Personal Ledger Views (Spec 3.4.2: Views only their own attendance) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">My Shift Ledger Sheets</h3>
                
                <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-md text-xs">
                  <button type="button" onClick={() => setAttendanceView('daily')} className={`px-2.5 py-1 rounded ${attendanceView === 'daily' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>Daily Ledger</button>
                  <button type="button" onClick={() => setAttendanceView('weekly')} className={`px-2.5 py-1 rounded ${attendanceView === 'weekly' ? 'bg-slate-800 text-white' : 'text-slate-500'}`}>Weekly Summary</button>
                </div>
              </div>

              <div className="overflow-x-auto text-xs sm:text-sm">
                {attendanceView === 'daily' ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-slate-500 font-mono text-[11px] border-b border-slate-800 uppercase">
                        <th className="pb-2">Date Frame</th>
                        <th className="pb-2">Check-In</th>
                        <th className="pb-2">Check-Out</th>
                        <th className="pb-2 text-right">Status Flag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40 text-slate-300">
                      {personalAttendanceLogs.map(log => (
                        <tr key={log.id} className="hover:bg-slate-800/10 transition-colors">
                          <td className="py-3 text-white font-medium">{log.date}</td>
                          <td className="py-3 font-mono">{log.inTime}</td>
                          <td className="py-3 font-mono">{log.outTime}</td>
                          <td className="py-3 text-right">
                            <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                              log.status === 'Present' ? 'bg-emerald-500/10 text-emerald-400' :
                              log.status === 'Half-day' ? 'bg-amber-500/10 text-amber-400' :
                              log.status === 'Leave' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>{log.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4 bg-slate-950/50 border border-slate-800/60 rounded-xl font-mono text-slate-400 text-center leading-relaxed">
                    📊 Weekly Aggregation Summary: <span className="text-white">4 / 5 Shifts Compliant</span> • Total Expected Frame Met (34.5 hrs)
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* CONDITION ELEMENT 2: ADMIN / HR VIEW WORKSPACE (Spec 3.4.2: Can view attendance of all employees) */}
        {userRole === 'admin' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Global Enterprise Roster Audit Tracker</h3>
              
              {/* Live Search Parameter Filters */}
              <input 
                type="text" 
                placeholder="Search via staff name or UID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 w-full sm:w-64 transition-colors"
              />
            </div>

            <div className="overflow-x-auto text-xs sm:text-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 font-mono text-[11px] border-b border-slate-800 uppercase">
                    <th className="pb-2">Corporate ID</th>
                    <th className="pb-2">Employee Name</th>
                    <th className="pb-2">Log In</th>
                    <th className="pb-2">Log Out</th>
                    <th className="pb-2 text-right">Status Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {filteredLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-800/10 transition-colors">
                      <td className="py-3 font-mono text-slate-500">{log.empId}</td>
                      <td className="py-3 font-semibold text-white">{log.name}</td>
                      <td className="py-3 font-mono">{log.inTime}</td>
                      <td className="py-3 font-mono">{log.outTime}</td>
                      <td className="py-3 text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          log.status === 'Present' ? 'bg-emerald-500/10 text-emerald-400' :
                          log.status === 'Half-day' ? 'bg-amber-500/10 text-amber-400' :
                          log.status === 'Leave' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>{log.status}</span>
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr><td colSpan="5" className="py-8 text-center font-mono text-slate-600 text-xs">Zero matching employee credentials found within records ledger.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AttendanceTracker;
