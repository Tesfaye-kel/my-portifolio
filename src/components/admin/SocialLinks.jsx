import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, ExternalLink, Link2, CheckCircle2 } from 'lucide-react';

const SocialLinks = () => {
  const { data, updateSocialLinks } = usePortfolio();
  const [links, setLinks] = useState(data.socialLinks || []);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setLinks(data.socialLinks || []);
  }, [data.socialLinks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSocialLinks(links);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addLink = () => {
    setLinks([...links, { name: '', url: '', icon: '' }]);
  };

  const updateLink = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const removeLink = (index) => {
    if (window.confirm('Are you sure you want to remove this link?')) {
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#0a192f]/60 border border-[#233554]/50 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:shadow-[0_0_20px_rgba(100,255,218,0.1)] transition-all";
  const labelClass = "block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 ml-1";

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-white font-mono">{'<Social />'}</h1>
        <p className="text-slate-500 text-sm font-mono mt-1">Manage your social media links displayed on your portfolio.</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="relative rounded-2xl bg-[#112240]/40 border border-[#233554]/50 p-6 space-y-6"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

        {links.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Link2 size={28} />
            </div>
            <p className="text-slate-400 mb-4">No social links yet. Add your first one below.</p>
            <button
              type="button"
              onClick={addLink}
              className="flex items-center gap-2 mx-auto px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
            >
              <Plus size={18} />
              Add Social Link
            </button>
          </div>
        ) : (
          <>
            {links.map((link, index) => (
              <div key={index} className="rounded-xl bg-[#0a192f]/40 border border-[#233554]/50 p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className={labelClass}>Platform Name</label>
                      <input
                        type="text"
                        value={link.name}
                        onChange={(e) => updateLink(index, 'name', e.target.value)}
                        className={inputClass}
                        placeholder="GitHub"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>URL</label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        className={inputClass}
                        placeholder="https://github.com/username"
                        required
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Icon Name</label>
                      <input
                        type="text"
                        value={link.icon}
                        onChange={(e) => updateLink(index, 'icon', e.target.value)}
                        className={inputClass}
                        placeholder="e.g., Github"
                      />
                      <p className="text-xs text-slate-500 mt-1 font-mono">Use icon name from Lucide Icons.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-colors"
            >
              <Plus size={18} />
              Add Social Link
            </button>

            <div className="flex items-center gap-4 pt-4">
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
          </>
        )}
      </motion.form>

      {/* Preview */}
      {links.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl bg-[#112240]/40 border border-[#233554]/50 p-6"
        >
          <h2 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
            <ExternalLink size={20} className="text-primary" />
            Preview
          </h2>
          <div className="flex flex-wrap gap-4">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0a192f]/60 border border-[#233554]/50 text-white hover:border-primary/30 hover:text-primary transition-all"
              >
                <ExternalLink size={16} />
                {link.name || 'Untitled'}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SocialLinks;