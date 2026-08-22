import React, { useState } from 'react';

const LeaveManagement = () => {
  // Leave Form Input Fields State (Specification 3.5.1)
  const [leaveType, setLeaveType] = useState('Paid'); // Paid, Sick, Unpaid
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [remarks, setRemarks] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Mock employee leave quota allocation cards matrix
  const leaveBalances = [
    { type: 'Paid Leave', total: 12, consumed: 4, available: 8, color: 'text-indigo-400 bg-indigo-500/10' },
    { type: 'Sick Leave', total: 6, consumed: 2, available: 4, color: 'text-emerald-400 bg-emerald-500/10' },
    { type: 'Unpaid Leave', total: 'N/A', consumed: 0, available: '∞', color: 'text-slate-400 bg-slate-500/10' },
  ];

  // History dataset representing status tracking lists (Specification 3.5.1)
  const [myLeaveHistory, setMyLeaveHistory] = useState([
    { id: 'LV-401', type: 'Paid Leave', range: '25 Aug 2026 - 27 Aug 2026', remarks: 'Family event function', status: 'Pending' },
    { id: 'LV-389', type: 'Sick Leave', range: '10 Aug 2026', remarks: 'Severe viral fever doctor checkup', status: 'Approved' },
    { id: 'LV-312', type: 'Unpaid Leave', range: '05 Jul 2026 - 06 Jul 2026', remarks: 'Urgent personal work outside station', status: 'Rejected' },
  ]);

  const handleApplyLeave = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !remarks) return;

    setIsSubmitting(true);

    // Mock network dispatch delay animation
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      const newRequest = {
        id: `LV-${Math.floor(100 + Math.random() * 900)}`,
        type: `${leaveType} Leave`,
        range: `${startDate} to ${endDate}`,
        remarks: remarks,
        status: 'Pending' // Initial state requirement is always marked pending
      };

      setMyLeaveHistory([newRequest, ...myLeaveHistory]);
      
      // Reset form submission fields tracking hooks
      setStartDate('');
      setEndDate('');
      setRemarks('');

      setTimeout(() => setSubmitSuccess(false), 3500);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Ambient Radial Drops */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-6">
        
        {/* Main Section Header Banner */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <h1 className="text-xl sm:text-2xl font-bold text-white">Leave & Time-Off Application Portal</h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Submit formal company absence requests and audit status tracking history trees.</p>
        </div>

        {/* Quota balance indicator display block elements */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {leaveBalances.map((bal, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex items-center justify-between shadow-md">
              <div>
                <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider block mb-0.5">{bal.type} Balance</span>
                <span className="text-2xl font-bold text-white font-mono">{bal.available}</span>
                <span className="text-[10px] text-slate-600 block mt-0.5">{bal.consumed} days utilized this financial year</span>
              </div>
              <div className={`h-9 w-9 rounded-lg flex items-center justify-center font-bold text-sm ${bal.color}`}>✉</div>
            </div>
          ))}
        </div>
        {/* INTERACTIVE WORKSPACE HUB SPLIT GRID STRUCTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          
          {/* LEAVE SELECTION SUBMISSION COMPONENT FORM LAYOUT */}
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl h-fit shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Apply New Absence Request</h3>
            
            {submitSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-medium animate-in fade-in duration-150">
                ✓ Leave request dispatched to validation workflow routers successfully.
              </div>
            )}

            <form onSubmit={handleApplyLeave} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Leave Classification Type</label>
                <select 
                  value={leaveType} 
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white font-medium focus:outline-none focus:border-indigo-500 cursor-pointer text-xs sm:text-sm"
                >
                  <option value="Paid">Paid Leave (Annual/Casual)</option>
                  <option value="Sick">Sick Leave (Medical/Health)</option>
                  <option value="Unpaid">Unpaid Leave (LWP / Break)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Start Date</label>
                  <input type="date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-xs sm:text-sm cursor-pointer" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">End Date</label>
                  <input type="date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-indigo-500 text-xs sm:text-sm cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Remarks & Justification Notes</label>
                <textarea 
                  required rows="3" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Provide contextual validation parameters for your time-off request..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 resize-none transition-colors"
                />
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className={`w-full py-2.5 font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-md ${
                  isSubmitting ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/10'
                }`}
              >
                {isSubmitting ? 'Transmitting Request...' : 'Transmit Leave Slip Form'}
              </button>
            </form>
          </div>

          {/* HISTORICAL LOG TRACKER TIMELINE LEDGER MODULE */}
          <div className="lg:col-span-3 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">My Time-Off Request Status Ledger</h3>
            
            <div className="overflow-x-auto text-xs sm:text-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 font-mono text-[11px] border-b border-slate-800 uppercase">
                    <th className="pb-2">Token Token</th>
                    <th className="pb-2">Leave Category</th>
                    <th className="pb-2">Duration Frame Range</th>
                    <th className="pb-2 text-right">Workflow Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {myLeaveHistory.map(log => (
                    <tr key={log.id} className="hover:bg-slate-800/10 transition-colors">
                      <td className="py-3 font-mono text-slate-500">{log.id}</td>
                      <td className="py-3 font-semibold text-white">{log.type}</td>
                      <td className="py-3 text-slate-400">
                        <div className="font-mono text-[11px] sm:text-xs text-slate-300">{log.range}</div>
                        <div className="text-[10px] text-slate-600 truncate max-w-[150px] font-sans mt-0.5" title={log.remarks}>{log.remarks}</div>
                      </td>
                      <td className="py-3 text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          log.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' :
                          log.status === 'Pending' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'
                        }`}>{log.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LeaveManagement;
