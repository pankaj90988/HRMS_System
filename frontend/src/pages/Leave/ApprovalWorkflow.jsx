import React, { useState } from 'react';

const ApprovalWorkflow = () => {
  // Global Simulation Context Role States
  const [userRole, setUserRole] = useState('admin'); // 'admin' / 'hr' access verification
  
  // Track text area entries dynamically using card ID index mapping keys
  const [adminComments, setAdminComments] = useState({});

  // Mock global active queue datasets containing items matching Spec 3.5.2
  const [pendingRequests, setPendingRequests] = useState([
    { id: 'LV-701', name: 'Rahul Sharma', empId: 'EMP-2026-102', type: 'Casual Leave', range: '25 Aug 2026 to 27 Aug 2026', reason: 'Family gathering at native village.' },
    { id: 'LV-702', name: 'Priya Patel', empId: 'EMP-2026-405', type: 'Medical Leave', range: '28 Aug 2026', reason: 'Scheduled wisdom teeth surgery extraction.' },
    { id: 'LV-703', name: 'Sunil Verma', empId: 'EMP-2026-711', type: 'Unpaid Leave', range: '01 Sept 2026 to 05 Sept 2026', reason: 'Urgent housing registration paperwork.' },
  ]);

  const handleCommentChange = (id, textValue) => {
    setAdminComments({ ...adminComments, [id]: textValue });
  };

  const executeDecisionAction = (id, targetVerdict) => {
    const feedbackComment = adminComments[id] || 'No comment provided by HR.';
    
    // Spec Requirement: Changes reflect immediately in operational lists
    alert(`System Message:\nRequest ${id} has been [${targetVerdict}].\nAdmin Comment: "${feedbackComment}"`);
    
    // Immediate reactive filtration state wipe to clear queue stack logs
    setPendingRequests(pendingRequests.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Blur Mesh Elements */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-6">
        
        {/* TOP STATUS CONTROL HUB HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">HR Operational Leave Workflow Queue</h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Audit global staff entries, write compliance notes, and process time-off files.</p>
          </div>

          <div className="bg-slate-950 p-1 border border-slate-800 rounded-lg flex text-xs">
            <button type="button" onClick={() => setUserRole(userRole === 'admin' ? 'employee' : 'admin')} className={`px-3 py-1.5 rounded transition-all font-semibold ${userRole === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-500'}`}>
              {userRole === 'admin' ? '✓ HR Authenticated' : 'Access Restricted'}
            </button>
          </div>
        </div>

        {/* WORKSPACE ELEMENT PANEL GRID CARD GRID OVERVIEW */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <div className="border-b border-slate-800 pb-2 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Pending Submissions Backlog Log ({pendingRequests.length})
            </h3>
            <span className="text-slate-500 font-mono text-xs">Awaiting HR Officer Authorization</span>
          </div>

          <div className="space-y-4">
            {/* DYNAMIC CARD RENDERING CONTAINER ENGINE (Spec 3.5.2) */}
            {pendingRequests.map(request => (
              <div key={request.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row md:items-start justify-between gap-4 hover:border-slate-700/60 transition-colors">
                
                {/* Section Left Blocks: Roster contextual metadata profiles info */}
                <div className="space-y-1.5 flex-1 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-base leading-none">{request.name}</span>
                    <span className="text-[10px] bg-slate-900 text-slate-500 px-2 py-0.5 rounded border border-slate-800 font-mono">UID: {request.empId}</span>
                    <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-mono font-bold">{request.id}</span>
                  </div>
                  
                  <p className="text-slate-300 font-semibold">{request.type} • <span className="text-indigo-400 font-mono">{request.range}</span></p>
                  <p className="text-slate-500 text-xs italic leading-relaxed">" {request.reason} "</p>
                </div>

                {/* Section Right Blocks: Operational comment parameter inputs and verifiers */}
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 w-full md:w-auto">
                  <div className="w-full sm:w-60">
                    <input 
                      type="text" 
                      placeholder="Add administrative review notes..." 
                      value={adminComments[request.id] || ''}
                      onChange={(e) => handleCommentChange(request.id, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Immediate Operational Trigger Action Buttons Row */}
                  <div className="flex gap-2 shrink-0">
                    <button 
                      type="button" 
                      onClick={() => executeDecisionAction(request.id, 'Rejected')}
                      className="px-3 py-2 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold rounded-lg transition-all"
                    >
                      Deny
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => executeDecisionAction(request.id, 'Approved')}
                      className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold rounded-lg transition-all"
                    >
                      Authorize
                    </button>
                  </div>
                </div>

              </div>
            ))}

            {/* Empty backlogs verification placeholder message overlay */}
            {pendingRequests.length === 0 && (
              <div className="py-12 text-center text-slate-600 font-mono text-xs max-w-sm mx-auto space-y-2">
                <p className="text-xl">☕</p>
                <p className="font-semibold text-slate-400">All Backlogs Processed Clean</p>
                <p className="text-[11px] text-slate-600 leading-normal font-sans">Zero inbound workforce time-off requests are awaiting compliance evaluation at this moment.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ApprovalWorkflow;
