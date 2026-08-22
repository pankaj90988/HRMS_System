import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';

import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import Dashboard from '../pages/dashboard/Dashboard';
import Profile from '../pages/profile/Profile';
import Attendance from '../pages/attendance/Attendance';
import Leave from '../pages/leave/Leave';
import Payroll from '../pages/payroll/Payroll';

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignIn />} />
      <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignUp />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
      <Route path="/leave" element={<ProtectedRoute><Leave /></ProtectedRoute>} />
      <Route path="/payroll" element={<ProtectedRoute><Payroll /></ProtectedRoute>} />

      <Route path="/" element={<Navigate to={isAuthenticated ? '/dashboard' : '/signin'} replace />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard' : '/signin'} replace />} />
    </Routes>
  );
}
