import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';
import { Save, User, CheckCircle2 } from 'lucide-react';

const ProfileSettings = () => {
  const { data, updateProfile } = usePortfolio();
  const [formData, setFormData] = useState(data.profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(data.profile);
  }, [data.profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#0a192f]/60 border border-[#233554]/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(100,255,218,0.1)] transition-all";
  const labelClass = "block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white font-mono">
          {'<Profile />'}
        </h1>
        <p className="text-slate-500 text-sm font-mono mt-1">Manage your personal information and contact details.</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="relative rounded-2xl bg-[#112240]/40 border border-[#233554]/50 p-6 space-y-6"
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        {/* Avatar Preview */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(100,255,218,0.15)]">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-primary" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">{formData.name}</h3>
            <p className="text-sm text-slate-400">{formData.title}</p>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className={labelClass}>Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClass}
            required
          />
        </div>

        {/* Title */}
        <div>
          <label className={labelClass}>Professional Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={inputClass}
            required
          />
        </div>

        {/* Tagline */}
        <div>
          <label className={labelClass}>Tagline</label>
          <input
            type="text"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClass}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClass}
            placeholder="+251-912-345-678"
          />
        </div>

        {/* Location */}
        <div>
          <label className={labelClass}>Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className={inputClass}
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label className={labelClass}>Avatar URL</label>
          <input
            type="text"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            className={inputClass}
            placeholder="/profile.jpg"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4 pt-2">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#0a192f] font-semibold px-6 py-3 rounded-xl transition-colors shadow-[0_0_30px_rgba(100,255,218,0.2)]"
          >
            <Save size={20} />
            Save Changes
          </motion.button>
          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-emerald-400 text-sm"
            >
              <CheckCircle2 size={16} />
              Changes saved successfully!
            </motion.span>
          )}
        </div>
      </motion.form>
    </div>
  );
};

export default ProfileSettings;