import React, { useState } from 'react';

const PayrollControl = () => {
  // Global Simulation Context Role States
  // Switch to 'admin' to unlock global corporate metrics and salary adjustments!
  const [userRole, setUserRole] = useState('employee'); 
  const [selectedMonth, setSelectedMonth] = useState('August 2026');

  // Stateful tracking array for Admin modifications (Specification 3.6.2)
  const [payrollRoster, setPayrollRoster] = useState([
    { id: 1, empId: 'EMP-2026-894', name: 'Amit Kumar', designation: 'Sr. Engineer', base: 120000, allowances: 15000, status: 'Verified' },
    { id: 2, empId: 'EMP-2026-102', name: 'Rahul Sharma', designation: 'HR Specialist', base: 85000, allowances: 8000, status: 'Verified' },
    { id: 3, empId: 'EMP-2026-405', name: 'Priya Patel', designation: 'UI/UX Designer', base: 95000, allowances: 10000, status: 'Pending Review' },
  ]);

  // Handler for administrative salary updates (Specification 3.6.2)
  const handleSalaryChange = (id, newBase) => {
    setPayrollRoster(payrollRoster.map(emp => 
      emp.id === id ? { ...emp, base: Number(newBase) } : emp
    ));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-6">
        
        {/* GLOBAL NAVIGATION HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Financial Payroll Systems
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide ${
                userRole === 'admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              }`}>
                {userRole === 'admin' ? 'Admin Control' : 'Employee View'}
              </span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Audit architecture summaries, check salary parameters, and ensure payroll accuracy.</p>
          </div>

          {/* Sandbox Development Switching Mechanism */}
          <div className="flex bg-slate-950 p-1 border border-slate-800 rounded-lg flex-shrink-0 text-xs self-start sm:self-auto">
            <button type="button" onClick={() => setUserRole('employee')} className={`px-2.5 py-1 rounded transition-all ${userRole === 'employee' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Employee View</button>
            <button type="button" onClick={() => setUserRole('admin')} className={`px-2.5 py-1 rounded transition-all ${userRole === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-500'}`}>Admin View</button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMPONENT SEGMENT A: SPEC 3.6.1 - EMPLOYEE READ-ONLY SLIP */}
        {/* ======================================================== */}
        {userRole === 'employee' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Payslip Configuration Sidebar Selector */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl h-fit space-y-4 shadow-xl">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Statement Cycles</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Select Statement Month</label>
                <select 
                  value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs sm:text-sm text-indigo-400 font-semibold focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="August 2026">August 2026 (Current)</option>
                  <option value="July 2026">July 2026 (Passed)</option>
                  <option value="June 2026">June 2026 (Passed)</option>
                </select>
              </div>
              <button type="button" onClick={() => alert('Downloading encrypted salary certificate asset...')} className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md transition-colors uppercase tracking-wider">
                Download Official Payslip PDF
              </button>
            </div>

            {/* Read-Only Breakdown Ledger Card Layout (Spec 3.6.1) */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-6">
              <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Salary Statement Itemization</h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">Cycle Context: {selectedMonth}</p>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold rounded">Disbursed</span>
              </div>

              {/* Itemized Calculation Matrix */}
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800/60 rounded-xl"><span className="text-slate-400 font-sans">Basic Gross Pay Rate</span><span className="text-white font-bold">₹1,20,000.00</span></div>
                <div className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800/60 rounded-xl"><span className="text-slate-400 font-sans">House Rent Allowance (HRA)</span><span className="text-emerald-400 font-bold">+₹40,000.00</span></div>
                <div className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800/60 rounded-xl"><span className="text-slate-400 font-sans">Ancillary Conveyance Allowances</span><span className="text-emerald-400 font-bold">+₹15,000.00</span></div>
                <div className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800/60 rounded-xl"><span className="text-slate-400 font-sans">Provident Fund Co-Retainment</span><span className="text-rose-400 font-bold">-₹14,400.00</span></div>
                <hr className="border-slate-800 my-2" />
                <div className="flex justify-between items-center p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-xl text-white text-base font-sans"><span className="font-semibold">Net Take-Home Salary</span><span className="font-mono font-bold text-indigo-400">₹1,60,600.00</span></div>
              </div>
            </div>

          </div>
        )}
        {/* ======================================================== */}
        {/* COMPONENT SEGMENT B: SPEC 3.6.2 - ADMIN CONTROL PANEL     */}
        {/* ======================================================== */}
        {userRole === 'admin' && (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Enterprise Salary Registry Ledger</h3>
              <p className="text-xs text-slate-400 mt-0.5">Edit baseline salary configurations and monitor global accuracy structures instantly.</p>
            </div>

            {/* Admin Dynamic Form Adjustment Table Layout (Spec 3.6.2) */}
            <div className="overflow-x-auto text-xs sm:text-sm">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 border-b border-slate-800 font-mono text-[11px] uppercase">
                    <th className="pb-2">Corporate ID</th>
                    <th className="pb-2">Staff Profile</th>
                    <th className="pb-2">Designation</th>
                    <th className="pb-2">Adjust Base Salary (₹)</th>
                    <th className="pb-2">Allowances (₹)</th>
                    <th className="pb-2 text-right">Registry Audit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {payrollRoster.map(emp => (
                    <tr key={emp.id} className="hover:bg-slate-800/10 transition-colors">
                      <td className="py-3.5 font-mono text-slate-500">{emp.empId}</td>
                      <td className="py-3.5 font-bold text-white">{emp.name}</td>
                      <td className="py-3.5 text-slate-400 font-medium">{emp.designation}</td>
                      
                      {/* Interactive adjustment numerical input fields to fulfill spec 3.6.2 */}
                      <td className="py-3.5">
                        <input 
                          type="number" 
                          value={emp.base} 
                          onChange={(e) => handleSalaryChange(emp.id, e.target.value)}
                          className="bg-slate-950 border border-slate-800/80 rounded px-2.5 py-1 text-xs font-mono text-emerald-400 font-bold focus:outline-none focus:border-indigo-500 w-32"
                        />
                      </td>
                      
                      <td className="py-3.5 font-mono text-slate-300">₹{emp.allowances.toLocaleString()}</td>
                      <td className="py-3.5 text-right">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                          emp.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>{emp.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quality Check Verification Footer */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500">
              <p className="italic">💡 Modifying database records live alters financial projection indexes across analytics layers instantly.</p>
              <button type="button" onClick={() => alert('Payroll calculations audited and synchronized with company registers.')} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-all self-end sm:self-auto uppercase tracking-wide">
                Commit & Sync Accounts Ledger
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default PayrollControl;