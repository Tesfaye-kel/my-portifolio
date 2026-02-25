import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, LogIn, User } from 'lucide-react';
import LoginTransition from './LoginTransition';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const navigate = useNavigate();

  // Hardcoded credentials
  const CORRECT_USERNAME = 'admin';
  const CORRECT_PASSWORD = '1234';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      setIsLoading(true);
      onLogin();
      // Show transition animation before navigating
      setTimeout(() => {
        setShowTransition(true);
        // Navigate after transition completes
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 800);
      }, 300);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      {/* Flat background */}
      <div className="absolute inset-0 bg-slate-900"></div>
      
      {/* Flat form container */}
      <div className="relative w-full max-w-md mx-4">
        <div className={`bg-slate-800 rounded-lg p-8 border border-slate-700 transition-all duration-500 ${isLoading ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          {/* Flat header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-lg bg-blue-600">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome Back</h1>
            <p className="text-slate-400 text-sm">Enter credentials to access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Flat input fields */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 rounded-lg bg-red-900/30 border border-red-800 text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Flat button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <LogIn size={18} />
              Sign In
            </button>
          </form>

          {/* Flat footer */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <p className="text-center text-slate-500 text-xs">
              Demo: <span className="text-blue-400 font-mono">admin / 1234</span>
            </p>
          </div>
        </div>

        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white text-sm font-medium">Creating Admin Account...</p>
            </div>
          </div>
        )}
      </div>

      {/* Full-screen slide transition from left to right */}
      <LoginTransition isActive={showTransition} />
    </div>
  );
};

export default Login;
