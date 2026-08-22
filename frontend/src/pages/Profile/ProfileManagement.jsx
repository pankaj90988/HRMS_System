import React, { useState } from 'react';

const ProfileManagement = () => {
  // Global Simulation Context Role States
  // Toggle to 'admin' to unlock editing constraints across all columns instantly!
  const [userRole, setUserRole] = useState('employee'); 
  const [activeTab, setActiveTab] = useState('personal'); 
  const [isEditing, setIsEditing] = useState(false);

  // Structural Dataset matching Specification Document Matrix 3.3
  const [profile, setProfile] = useState({
    name: 'Amit Kumar',
    employeeId: 'EMP-2026-894',
    email: 'amit.kumar@company.com',
    phone: '+91 98765 43210',
    address: '123, Sector 4, HSR Layout, Bangalore, India',
    profilePic: 'https://unsplash.com',
    designation: 'Senior Software Engineer',
    department: 'Engineering',
    joiningDate: '15 January 2024',
    manager: 'Rohan Deshmukh',
    baseSalary: '₹1,20,000 / month',
    hra: '₹40,000',
    allowances: '₹15,000',
    providentFund: '₹14,400',
  });

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Ambient Blur Circles */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-6">
        
        {/* PROFILE PROFILE IMAGE IDENTITY CONTAINER */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center gap-6">
          <div className="relative group">
            
            {/* Rule 3.3.2: Editable profile image component layout state trigger */}
            {isEditing && (
              <label className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center text-[10px] text-slate-300 font-bold cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                Change Pic
                <input type="file" className="hidden" accept="image/*" />
              </label>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl font-bold text-white">{profile.name}</h1>
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold self-center sm:self-auto">
                {profile.employeeId}
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium">{profile.designation} • {profile.department}</p>
            <p className="text-xs text-slate-500 font-mono">Sandbox View Context: <span className="text-indigo-400 uppercase font-bold">{userRole}</span></p>
          </div>

          {/* Development Slider Workspace Controls Toggle Button */}
          <div className="bg-slate-950 p-1 border border-slate-800 rounded-lg flex text-xs">
            <button type="button" onClick={() => { setUserRole('employee'); setIsEditing(false); }} className={`px-2.5 py-1 rounded transition-all ${userRole === 'employee' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Employee Mode</button>
            <button type="button" onClick={() => { setUserRole('admin'); setIsEditing(false); }} className={`px-2.5 py-1 rounded transition-all ${userRole === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-500'}`}>Admin / HR Mode</button>
          </div>
        </div>

        {/* PROFILE VIEWS SELECTION SUB-TABS TAB HEADER ROW */}
        <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl overflow-x-auto space-x-1">
          <button type="button" onClick={() => setActiveTab('personal')} className={`flex-1 min-w-[100px] text-center py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'personal' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>Personal Details</button>
          <button type="button" onClick={() => setActiveTab('job')} className={`flex-1 min-w-[100px] text-center py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'job' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>Job Profile</button>
          <button type="button" onClick={() => setActiveTab('salary')} className={`flex-1 min-w-[100px] text-center py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'salary' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>Salary Structure</button>
          <button type="button" onClick={() => setActiveTab('documents')} className={`flex-1 min-w-[100px] text-center py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'documents' ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}>Documents Dossier</button>
        </div>
        {/* DISPLAY BLOCK CONTAINER CARDS FOR CHOSEN TAB */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl min-h-[260px]">
          
          {/* TAB CONTENT MODULE A: PERSONAL DETAILS FORM (Handles limited vs full user authorization) */}
          {activeTab === 'personal' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Personal Records Matrix</h3>
                {!isEditing ? (
                  <button type="button" onClick={() => setIsEditing(true)} className="text-xs bg-indigo-600/10 border border-indigo-500/20 hover:bg-indigo-600 px-3 py-1 rounded text-indigo-400 hover:text-white transition-all">Edit Records</button>
                ) : (
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setIsEditing(false)} className="text-xs text-slate-500 hover:underline">Cancel</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="text-xs bg-emerald-500 text-slate-950 font-bold px-3 py-1 rounded transition-all">Commit Save</button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Legal Name</label>
                  <input 
                    type="text" name="name" disabled={userRole !== 'admin' || !isEditing} value={profile.name} onChange={handleInputChange}
                    className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white text-xs sm:text-sm focus:outline-none ${isEditing && userRole === 'admin' ? 'border-indigo-500' : 'border-slate-800 opacity-60'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Corporate Email Address</label>
                  <input 
                    type="email" name="email" disabled={userRole !== 'admin' || !isEditing} value={profile.email} onChange={handleInputChange}
                    className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white text-xs sm:text-sm focus:outline-none ${isEditing && userRole === 'admin' ? 'border-indigo-500' : 'border-slate-800 opacity-60'}`}
                  />
                </div>

                {/* Specific Spec Implemenation Rule 3.3.2: Limited Fields unlocked for general employee */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Contact Phone (Editable by All)</label>
                  <input 
                    type="text" name="phone" disabled={!isEditing} value={profile.phone} onChange={handleInputChange}
                    className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white text-xs sm:text-sm focus:outline-none ${isEditing ? 'border-indigo-500' : 'border-slate-800'}`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Home Address (Editable by All)</label>
                  <input 
                    type="text" name="address" disabled={!isEditing} value={profile.address} onChange={handleInputChange}
                    className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-white text-xs sm:text-sm focus:outline-none ${isEditing ? 'border-indigo-500' : 'border-slate-800'}`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT MODULE B: JOB DETAILS CARD */}
          {activeTab === 'job' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Operational Corporate Allocation</h3>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div><span className="block text-slate-500 mb-0.5">Assigned Designation</span><p className="font-semibold text-white">{profile.designation}</p></div>
                <div><span className="block text-slate-500 mb-0.5">Department Bracket</span><p className="font-semibold text-white">{profile.department}</p></div>
                <div><span className="block text-slate-500 mb-0.5">Onboarding Joining Date</span><p className="font-semibold text-white">{profile.joiningDate}</p></div>
                <div><span className="block text-slate-500 mb-0.5">Direct Line Manager</span><p className="font-semibold text-white">{profile.manager}</p></div>
              </div>
            </div>
          )}

          {/* TAB CONTENT MODULE C: SALARY STRUCTURE CARD */}
          {activeTab === 'salary' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Compensation Ledger Records Overview</h3>
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl"><span className="block text-slate-500 text-xs mb-1 font-sans">Gross Salary Base</span><p className="font-bold text-white text-base">{profile.baseSalary}</p></div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl"><span className="block text-slate-500 text-xs mb-1 font-sans">HRA Calculations</span><p className="font-bold text-emerald-400">{profile.hra}</p></div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl"><span className="block text-slate-500 text-xs mb-1 font-sans">Ancillary Allowances</span><p className="font-bold text-white">{profile.allowances}</p></div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl"><span className="block text-slate-500 text-xs mb-1 font-sans">PF Account Retainment Deductions</span><p className="font-bold text-rose-400">-{profile.providentFund}</p></div>
              </div>
            </div>
          )}

          {/* TAB CONTENT MODULE D: COMPLIANCE DOCUMENTS FILE LIST */}
          {activeTab === 'documents' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">Official Dossier Documents Ledger</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div><p className="font-semibold text-slate-200">KYC_Verification_NationalID.pdf</p><span className="text-[10px] text-slate-500">Synced Onboard • 12 Jan 2024</span></div>
                  <span className="text-indigo-400 text-xs cursor-pointer hover:underline font-medium">Download</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <div><p className="font-semibold text-slate-200">Signed_Employment_Contract_Agreement.pdf</p><span className="text-[10px] text-slate-500">Synced Onboard • 15 Jan 2024</span></div>
                  <span className="text-indigo-400 text-xs cursor-pointer hover:underline font-medium">Download</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default ProfileManagement;
