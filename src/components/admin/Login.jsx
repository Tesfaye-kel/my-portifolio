import { useState } from 'react';
import { Lock, Eye, EyeOff, LogIn, User, Sparkles, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import LoginTransition from './LoginTransition';
import ThreeBackground from '../ThreeBackground';
import { usePortfolio } from '../../context/PortfolioContext';

const Login = ({ onLogin }) => {
  const { login } = usePortfolio();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(username, password);
      setShowTransition(true);
      setTimeout(() => {
        onLogin();
      }, 800);
    } catch (err) {
      setError(err.message || 'Invalid username or password');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a192f] relative overflow-hidden">
      <ThreeBackground />
      
      {/* Premium background overlays */}
      <div className="absolute inset-0 bg-[#0a192f]" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px]" />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(204,214,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,214,246,0.06) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      {/* Premium form container */}
      <div className="relative w-full max-w-md mx-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`relative rounded-2xl bg-[#112240]/60 backdrop-blur-xl border border-[#233554]/50 p-8 shadow-[0_20px_60px_-15px_rgba(2,12,27,0.7)] transition-all duration-500 ${
            isLoading ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
          }`}
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-primary/10 border border-primary/30 shadow-[0_0_30px_rgba(100,255,218,0.15)]">
              <Sparkles className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1 font-mono">
              {'<Admin />'}
            </h1>
            <p className="text-slate-400 text-sm">Enter credentials to access the control panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Username
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a192f]/60 border border-[#233554]/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(100,255,218,0.1)] transition-all"
                  placeholder="Enter username"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#0a192f]/60 border border-[#233554]/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(100,255,218,0.1)] transition-all"
                  placeholder="Enter password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Submit button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-primary text-[#0a192f] hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(100,255,218,0.2)]"
              disabled={isLoading}
            >
              <LogIn size={18} />
              Sign In
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-[#233554]/50 flex items-center justify-center gap-2">
            <Code2 size={14} className="text-primary/60" />
            <span className="text-xs font-mono text-slate-500">Tesfaye Kelbesa Portfolio</span>
          </div>
        </motion.div>

        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-white text-sm font-mono">Authenticating...</p>
            </div>
          </div>
        )}
      </div>

      {/* Full-screen slide transition */}
      <LoginTransition isActive={showTransition} />
    </div>
  );
};

export default Login;