import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

const SkillsManager = () => {
  const { data, updateSkills } = usePortfolio();
  const [skills, setSkills] = useState(data.about?.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSkills(data.about?.skills || []);
  }, [data.about?.skills]);

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSkills(skills);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Skills</h1>
        <p className="text-gray-400 mt-1">Manage your skills and technologies.</p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Add New Skill</label>
          <div className="flex gap-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
              placeholder="Enter skill name (e.g., React)"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Skills List */}
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg group"
            >
              <span className="text-white">{skill}</span>
              <button
                onClick={() => handleRemoveSkill(index)}
                className="text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {skills.length === 0 && (
          <p className="text-gray-400 text-center py-8">No skills added yet. Add your first skill above.</p>
        )}

        {/* Save Button */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
          <button
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Save size={20} />
            Save Changes
          </button>
          {saved && (
            <span className="text-green-400">Changes saved successfully!</span>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-primary/20 text-primary rounded-lg font-mono text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsManager;
