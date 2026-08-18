import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, X, Sparkles } from 'lucide-react';
import { setVisitorName, getVisitorName, getVisitorId } from '../utils/visitor';
import { visitorsAPI } from '../utils/api';

const VisitorNamePrompt = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show prompt only if no name is stored and not dismissed before
    const storedName = getVisitorName();
    const wasDismissed = localStorage.getItem('portfolio_name_prompt_dismissed');
    
    if (!storedName && !wasDismissed) {
      // Show after a short delay so it doesn't interrupt initial load
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) {
      setVisitorName(trimmedName);
      // Update visitor records with the name
      try {
        await visitorsAPI.updateName(getVisitorId(), trimmedName);
      } catch (err) {
        console.error('Failed to update visitor name:', err);
      }
    }
    setShow(false);
    localStorage.setItem('portfolio_name_prompt_dismissed', 'true');
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('portfolio_name_prompt_dismissed', 'true');
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-sm mx-4 rounded-2xl bg-[#112240]/90 backdrop-blur-xl border border-[#233554]/50 p-8 shadow-[0_20px_60px_-15px_rgba(2,12,27,0.7)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-4 rounded-2xl bg-primary/10 border border-primary/30">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white font-mono">Welcome!</h3>
              <p className="text-slate-400 text-sm mt-2">
                What's your name? This helps me know who's visiting.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name or GitHub username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0a192f]/60 border border-[#233554]/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(100,255,218,0.1)] transition-all"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="flex-1 py-3 rounded-xl font-semibold bg-[#0a192f]/60 border border-[#233554]/50 text-slate-400 hover:text-slate-200 hover:border-slate-500 transition-all"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-semibold bg-primary text-[#0a192f] hover:bg-primary/90 transition-colors shadow-[0_0_30px_rgba(100,255,218,0.2)]"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VisitorNamePrompt;