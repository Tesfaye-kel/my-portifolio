import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Plus, Trash2, Briefcase, GraduationCap, Star, Target, Cpu, Wrench, Heart, Mail, Link } from 'lucide-react';

const AboutSettings = () => {
  const { data, updateAbout } = usePortfolio();
  
  // Initialize state with default structure
  const [formData, setFormData] = useState({
    careerGoals: '',
    experience: [],
    education: [],
    whatMakesMeDifferent: [],
    technicalSkills: [],
    tools: [],
    softSkills: [],
    contactInfo: []
  });
  
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (data?.about) {
      setFormData({
        careerGoals: data.about.careerGoals || '',
        experience: data.about.experience || [],
        education: data.about.education || [],
        whatMakesMeDifferent: data.about.whatMakesMeDifferent || [],
        technicalSkills: data.about.technicalSkills || [],
        tools: data.about.tools || [],
        softSkills: data.about.softSkills || [],
        contactInfo: (data.about.contactInfo && data.about.contactInfo.length > 0) ? data.about.contactInfo : [
          { label: "Email", value: "tesfayekelbesa912@gmail.com", href: "mailto:tesfayekelbesa912@gmail.com", icon: "Mail" },
          { label: "LinkedIn", value: "linkedin.com/in/tesfaye-kel", href: "https://linkedin.com", icon: "Linkedin" },
          { label: "GitHub", value: "github.com/Tesfaye-kel", href: "https://github.com/Tesfaye-kel", icon: "Github" },
          { label: "Phone", value: "+251-912-345-678", href: "tel:+251912345678", icon: "Phone" }
        ]
      });
    }
  }, [data.about]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAbout(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Helper to update simple array fields (strings)
  const updateArrayField = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: newArray });
    }
  };

  // Helper for Experience (objects)
  const updateExperience = (index, key, value) => {
    const newExp = [...formData.experience];
    newExp[index] = { ...newExp[index], [key]: value };
    setFormData({ ...formData, experience: newExp });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { role: '', company: '', period: '', description: '' }]
    });
  };

  // Helper for Technical Skills (objects)
  const updateTechSkill = (index, key, value) => {
    const newSkills = [...formData.technicalSkills];
    newSkills[index] = { ...newSkills[index], [key]: value };
    setFormData({ ...formData, technicalSkills: newSkills });
  };

  const addTechSkill = () => {
    setFormData({
      ...formData,
      technicalSkills: [...formData.technicalSkills, { name: '', percentage: 50 }]
    });
  };

  // Helper to auto-select icon based on label
  const getIconForLabel = (label) => {
    const l = label.toLowerCase();
    if (l.includes('mail') || l.includes('email')) return 'Mail';
    if (l.includes('phone') || l.includes('call') || l.includes('mobile')) return 'Phone';
    if (l.includes('linkedin')) return 'Linkedin';
    if (l.includes('github') || l.includes('git')) return 'Github';
    if (l.includes('twitter') || l.includes('x')) return 'Twitter';
    if (l.includes('facebook') || l.includes('fb')) return 'Facebook';
    if (l.includes('instagram') || l.includes('insta')) return 'Instagram';
    if (l.includes('youtube') || l.includes('yt')) return 'Youtube';
    if (l.includes('web') || l.includes('site')) return 'Globe';
    if (l.includes('location') || l.includes('address') || l.includes('map')) return 'MapPin';
    return 'Link';
  };

  // Helper for Contact Info (objects)
  const updateContactInfo = (index, key, value) => {
    const newInfo = [...formData.contactInfo];
    newInfo[index] = { ...newInfo[index], [key]: value };
    
    // Auto-update icon if label changes
    if (key === 'label') {
      newInfo[index].icon = getIconForLabel(value);
    }
    
    setFormData({ ...formData, contactInfo: newInfo });
  };

  const addContactInfo = () => {
    setFormData({
      ...formData,
      contactInfo: [...formData.contactInfo, { label: '', value: '', href: '', icon: 'Link' }]
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.2 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">About Settings</h1>
          <p className="text-gray-400 mt-1">Manage your bio, experience, and skills.</p>
        </div>
      </div>

      {/* Career Goals */}
      <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4 text-primary">
          <Target size={24} />
          <h2 className="text-xl font-bold text-white">Career Goals</h2>
        </div>
        <textarea
          value={formData.careerGoals}
          onChange={(e) => setFormData({ ...formData, careerGoals: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
          placeholder="Write about your career goals..."
        />
      </motion.div>

      {/* Experience */}
      <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3 text-primary">
            <Briefcase size={24} />
            <h2 className="text-xl font-bold text-white">Experience</h2>
          </div>
          <button onClick={addExperience} className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-4">
          <AnimatePresence>
            {formData.experience.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 bg-gray-700/50 rounded-lg border border-gray-600 space-y-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Role"
                    value={exp.role}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white w-full"
                  />
                  <input
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, 'company', e.target.value)}
                    className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white w-full"
                  />
                  <input
                    placeholder="Period (e.g. 2020 - Present)"
                    value={exp.period}
                    onChange={(e) => updateExperience(index, 'period', e.target.value)}
                    className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white w-full"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(index, 'description', e.target.value)}
                  className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white w-full"
                  rows={2}
                />
                <button onClick={() => removeArrayItem('experience', index)} className="text-red-400 text-sm flex items-center gap-1 hover:text-red-300">
                  <Trash2 size={14} /> Remove
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Technical Skills */}
      <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3 text-primary">
            <Cpu size={24} />
            <h2 className="text-xl font-bold text-white">Technical Skills</h2>
          </div>
          <button onClick={addTechSkill} className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {formData.technicalSkills.map((skill, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600"
              >
                <input
                  placeholder="Skill Name"
                  value={skill.name}
                  onChange={(e) => updateTechSkill(index, 'name', e.target.value)}
                  className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white flex-1"
                />
                <input
                  type="number"
                  placeholder="%"
                  value={skill.percentage}
                  onChange={(e) => updateTechSkill(index, 'percentage', e.target.value)}
                  className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white w-20"
                />
                <button onClick={() => removeArrayItem('technicalSkills', index)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Contact Information */}
      <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3 text-primary">
            <Mail size={24} />
            <h2 className="text-xl font-bold text-white">Contact Information</h2>
          </div>
          <button onClick={addContactInfo} className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors flex items-center gap-1">
            <Plus size={16} /> Add
          </button>
        </div>
        <div className="space-y-4">
          <AnimatePresence>
            {formData.contactInfo.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600"
              >
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    placeholder="Type (e.g. Phone, GitHub)"
                    value={item.label}
                    onChange={(e) => updateContactInfo(index, 'label', e.target.value)}
                    className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white w-full"
                  />
                  <input
                    placeholder="Display Text (e.g. +123...)"
                    value={item.value}
                    onChange={(e) => updateContactInfo(index, 'value', e.target.value)}
                    className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white w-full"
                  />
                  <input
                    placeholder="Link URL (e.g. https://...)"
                    value={item.href}
                    onChange={(e) => updateContactInfo(index, 'href', e.target.value)}
                    className="bg-gray-600 border-gray-500 rounded px-3 py-2 text-white w-full"
                  />
                </div>
                <button 
                  onClick={() => removeArrayItem('contactInfo', index)} 
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  title="Remove"
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Lists (Education, Tools, Soft Skills, Differences) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 text-primary">
              <GraduationCap size={24} />
              <h2 className="text-xl font-bold text-white">Education</h2>
            </div>
            <button onClick={() => addArrayItem('education')} className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors"><Plus size={16} /></button>
          </div>
          <div className="space-y-2">
            {formData.education.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => updateArrayField('education', index, e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-full focus:border-primary outline-none"
                />
                <button onClick={() => removeArrayItem('education', index)} className="text-red-400"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 text-primary">
              <Wrench size={24} />
              <h2 className="text-xl font-bold text-white">Tools</h2>
            </div>
            <button onClick={() => addArrayItem('tools')} className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors"><Plus size={16} /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tools.map((item, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded border border-gray-600">
                <input
                  value={item}
                  onChange={(e) => updateArrayField('tools', index, e.target.value)}
                  className="bg-transparent text-white w-24 outline-none"
                />
                <button onClick={() => removeArrayItem('tools', index)} className="text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 text-primary">
              <Heart size={24} />
              <h2 className="text-xl font-bold text-white">Soft Skills</h2>
            </div>
            <button onClick={() => addArrayItem('softSkills')} className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors"><Plus size={16} /></button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.softSkills.map((item, index) => (
              <div key={index} className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded border border-gray-600">
                <input
                  value={item}
                  onChange={(e) => updateArrayField('softSkills', index, e.target.value)}
                  className="bg-transparent text-white w-24 outline-none"
                />
                <button onClick={() => removeArrayItem('softSkills', index)} className="text-red-400"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* What Makes Me Different */}
        <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3 text-primary">
              <Star size={24} />
              <h2 className="text-xl font-bold text-white">Unique Qualities</h2>
            </div>
            <button onClick={() => addArrayItem('whatMakesMeDifferent')} className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors"><Plus size={16} /></button>
          </div>
          <div className="space-y-2">
            {formData.whatMakesMeDifferent.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  value={item}
                  onChange={(e) => updateArrayField('whatMakesMeDifferent', index, e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white w-full focus:border-primary outline-none"
                />
                <button onClick={() => removeArrayItem('whatMakesMeDifferent', index)} className="text-red-400"><Trash2 size={18} /></button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex justify-end pt-4 border-t border-gray-700">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all hover:scale-105 active:scale-95"
        >
          <Save size={20} />
          Save Changes
        </button>
      </div>

      {saved && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold z-50"
        >
          Settings Saved Successfully!
        </motion.div>
      )}
    </motion.div>
  );
};

export default AboutSettings;