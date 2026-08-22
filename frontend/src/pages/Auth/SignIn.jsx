import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../components/Context/AuthContext';
import { toast } from 'react-toastify'; // 🚀 Importing toast triggers
import 'react-toastify/dist/ReactToastify.css'; // Importing baseline toast component styles

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Input states tracking parameters
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Asynchronous API Form controller mapping to Specification 3.1.2
  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Dispatch credential checking queries to global AuthContext
      await login(email, password);

      // 🌟 Pop-up Toastify notification alert on successful validation
      toast.success('Access Authenticated! Initializing corporate dashboard hub...', {
        theme: 'dark',
      });

      // Successful verification path forces redirection directly to the Protected root '/' URL layout
      navigate('/');
    } catch (error) {
      // 🌟 Pop-up Toastify failure notification fired when parameters do not match records database
      console.error("Session rejected:", error);
      toast.error(error || 'Invalid corporate credentials. Verify email/password and retry.', {
        theme: 'dark',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100vh] bg-slate-950 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Decorative Mesh Elements */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-8 relative z-10">

        {/* Branding Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 bg-indigo-600 rounded-xl items-center justify-center font-bold text-2xl text-white shadow-lg shadow-indigo-600/30 mb-3">
            H
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Sign In to HRMS</h2>
          <p className="text-slate-400 text-sm mt-1">Access your secure workplace communication gateway.</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          {/* Email Input Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Corporate Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Password Input Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Password</label>
              <a href="#forgot" className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Forgot?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Submit Action Button Container Grid */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-2 font-semibold py-2.5 rounded-lg shadow-lg text-sm transition-all duration-200 flex items-center justify-center ${isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed transform-none shadow-none'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 active:scale-[0.99]'
              }`}
          >
            {isLoading ? (
              <span className="inline-block h-4 w-4 border-2 border-slate-500 border-t-indigo-400 rounded-full animate-spin" />
            ) : (
              'Sign In to Workspace'
            )}
          </button>
        </form>

        {/* Redirect Alternative Register Link */}
        <div className="mt-6 text-center text-sm border-t border-slate-800 pt-4">
          <p className="text-slate-400">
            New corporate recruit?{' '}
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Create an account
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default SignIn;
