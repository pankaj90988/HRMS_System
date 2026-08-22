import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Global state context manager wrapper
import { AuthProvider, useAuth } from './components/Context/AuthContext';

// Common core operational layout shells
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/Sidebar';
import Footer from './components/Common/Footer';

// Core Authentication Gateways 
import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUP';

// Workspace Dashboards (Admin vs Employee Views Mapping)
import AdminDashboard from './pages/Dashboard/AdminDashboard';
import EmployeeDashboard from './pages/Dashboard/EmployeeDashboard';

// Core Functional Module Resource Panels
import ProfileManagement from './pages/Profile/ProfileManagement';
import AttendanceTracker from './pages/Attendance/AttendanceTracker';
import LeaveManagement from './pages/Leave/LeaveManagement';
import ApprovalWorkflow from './pages/Leave/ApprovalWorkflow';
import PayrollControl from './pages/Payroll/PayrollControl';
import { ToastContainer } from 'react-toastify';

const AppContent = () => {
  const { user } = useAuth(); // Reads global logged-in context session state live
  const location = useLocation();

  // -------------------------------------------------------------
  // CONDITIONAL VIEW BLOCK A: USER IS NOT LOGGED IN 
  // Strictly renders isolated Auth forms. Navbar & Footer are invisible here.
  // -------------------------------------------------------------
  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<SignIn />} />
        {/* <Route path="/" element={ <AdminDashboard/>} /> */}
       
        <Route path="/signup" element={<SignUp />} />
        {/* If an unauthenticated user inputs a broken link path, bounce them back to SignIn gate */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // -------------------------------------------------------------
  // CONDITIONAL VIEW BLOCK B: USER IS LOGGED IN SUCCESSFULLY
  // Returns full app wrapper where / maps to Home layout, with Navbar & Footer locked.
  // -------------------------------------------------------------
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Navbar stays consistently rendered on top across every functional dashboard node */}
      <Navbar />

      {/* Main horizontal core structure panel grid frame layout */}
      <div className="flex flex-grow w-full max-w-7xl mx-auto">
        <Sidebar />
        
        <main className="flex-grow p-4 sm:p-6 lg:p-8 relative z-10 overflow-x-hidden">
          <Routes>
            {/* 🏠 Root URL Path / now acts natively as your Dashboard landing page hub */}
          <Route path="/home" element={user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />} />

            {/* Section 3.3: Profile Management Section */}
            <Route path="/profile" element={<ProfileManagement />} />

            {/* Section 3.4: Attendance Tracking Module Ledger */}
            <Route path="/attendance" element={<AttendanceTracker />} />

            {/* Section 3.5: Leave Module Resolution Grid (Single URL role lookup resolution) */}
            <Route 
              path="/leave" 
              element={user.role === 'admin' ? <ApprovalWorkflow /> : <LeaveManagement />} 
            />

            {/* Section 3.6: Payroll Financial Compensation Matrix Sheet */}
            <Route path="/payroll" element={<PayrollControl />} />

            {/* Fallback Catch-All Redirect for authenticated users typing garbage paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      {/* Footer stays consistently rendered at the baseline underneath all data containers */}
      <Footer />
    </div>
  );
};

// Foundational Component Root Entry Assembly Point
const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer/>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
