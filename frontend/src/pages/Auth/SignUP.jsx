import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  
  // Form Fields State
  const [formData, setFormData] = useState({
    employeeId: '',
    email: '',
    password: '',
    role: 'employee',
  });

  // UI Flow States
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [touchedPassword, setTouchedPassword] = useState(false);

  // Security Rules Checklist Calculations
  const passwordRules = {
    length: formData.password.length >= 8,
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>|]/.test(formData.password),
    upper: /[A-Z]/.test(formData.password),
  };

  const isPasswordValid = Object.values(passwordRules).every(Boolean);
  const isFormValid = formData.employeeId && formData.email && isPasswordValid;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordValid) return;

    // Triggering the required email verification layout
    setShowVerificationModal(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10">
        
        {/* Header Block */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Create HRMS Account</h2>
          <p className="text-slate-400 text-sm mt-1">Register using your official corporate credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Employee ID Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              required
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="e.g., EMP-2026-894"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Corporate Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="username@company.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Secure Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setTouchedPassword(true)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />

            {/* Live Password Security Rules Checklist */}
            {touchedPassword && (
              <div className="mt-3 p-3 bg-slate-950 border border-slate-800/80 rounded-lg grid grid-cols-2 gap-2 text-xs">
                <div className={`flex items-center gap-2 ${passwordRules.length ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span>{passwordRules.length ? '✓' : '•'}</span> At least 8 characters
                </div>
                <div className={`flex items-center gap-2 ${passwordRules.upper ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span>{passwordRules.upper ? '✓' : '•'}</span> One uppercase letter
                </div>
                <div className={`flex items-center gap-2 ${passwordRules.number ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span>{passwordRules.number ? '✓' : '•'}</span> One numeric digit
                </div>
                <div className={`flex items-center gap-2 ${passwordRules.special ? 'text-emerald-400' : 'text-slate-500'}`}>
                  <span>{passwordRules.special ? '✓' : '•'}</span> One special symbol
                </div>
              </div>
            )}
          </div>

          {/* Role Selection Blocks (Employee / HR) */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Corporate Designation Role</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'employee' })}
                className={`flex flex-col items-start gap-1 border rounded-xl p-3 text-left transition-all ${
                  formData.role === 'employee' 
                    ? 'border-indigo-500 bg-indigo-500/5 text-white shadow-md shadow-indigo-600/5' 
                    : 'border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-sm font-semibold">Employee Portal</span>
                <span className="text-[11px] text-slate-500">Track logs & apply for leaves</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'admin' })} // map HR to admin workspace layout
                className={`flex flex-col items-start gap-1 border rounded-xl p-3 text-left transition-all ${
                  formData.role === 'admin' 
                    ? 'border-amber-500 bg-amber-500/5 text-white shadow-md shadow-amber-600/5' 
                    : 'border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="text-sm font-semibold">HR / Admin Panel</span>
                <span className="text-[11px] text-slate-500">Manage approvals & compliance</span>
              </button>
            </div>
          </div>

          {/* Registration Submit Action Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full mt-2 font-semibold py-2.5 rounded-lg shadow-lg text-sm transition-all duration-200 ${
              isFormValid 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
            }`}
          >
            Register Account
          </button>
        </form>

        {/* Dynamic Redirect Footer */}
        <div className="mt-6 text-center text-sm border-t border-slate-800 pt-4">
          <p className="text-slate-400">
            Already have an account?{' '}
            <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Sign In here
            </Link>
          </p>
        </div>
      </div>

      {/* Required Email Verification Modal Layout overlay */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-md w-full text-center shadow-2xl animate-in scale-in duration-150">
            <div className="h-12 w-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400 text-xl font-bold mb-4">
              ✉
            </div>
            <h3 className="text-lg font-bold text-white">Verification Link Dispatched!</h3>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              We have dispatched a verification link to <span className="text-indigo-400 font-medium">{formData.email}</span>. 
              Please click the validation URL inside the inbox to authorize your configuration workspace access.
            </p>
            <button
              type="button"
              onClick={() => {
                setShowVerificationModal(false);
                navigate('/'); // Forward to login screen
              }}
              className="mt-6 w-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2 rounded-lg transition-colors border border-slate-700"
            >
              Acknowledge & Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
