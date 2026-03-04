import { useState, useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { Save, Plus, Trash2 } from "lucide-react";

// Helper to safely initialize form data
const getInitialFormData = (aboutData = {}) => ({
  technicalSkills: aboutData.technicalSkills || [],
  tools: aboutData.tools || [],
  softSkills: aboutData.softSkills || [],
  experience: aboutData.experience || [],
  education: aboutData.education || [],
  whatMakesMeDifferent: aboutData.whatMakesMeDifferent || "",
  careerGoals: aboutData.careerGoals || "",
});

const AboutSettings = () => {
  const { data, updateAbout } = usePortfolio();
  const [formData, setFormData] = useState(() => getInitialFormData(data.about));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(getInitialFormData(data.about));
  }, [data.about]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAbout(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // --- Technical Skills Handlers ---
  const addTechnicalSkill = () => {
    setFormData({
      ...formData,
      technicalSkills: [
        ...(formData.technicalSkills || []),
        { name: "", percentage: 50 },
      ],
    });
  };

  const updateTechnicalSkill = (index, field, value) => {
    const newSkills = [...(formData.technicalSkills || [])];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setFormData({ ...formData, technicalSkills: newSkills });
  };

  const removeTechnicalSkill = (index) => {
    const newSkills = (formData.technicalSkills || []).filter((_, i) => i !== index);
    setFormData({ ...formData, technicalSkills: newSkills });
  };

  // --- String Array Handlers (Tools & Soft Skills) ---
  const addStringItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...(formData[field] || []), ""],
    });
  };

  const updateStringItem = (field, index, value) => {
    const newItems = [...(formData[field] || [])];
    newItems[index] = value;
    setFormData({ ...formData, [field]: newItems });
  };

  const removeStringItem = (field, index) => {
    const newItems = (formData[field] || []).filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newItems });
  };

  // --- Experience Handlers ---
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...(formData.experience || []),
        { role: "", company: "", period: "", description: "" },
      ],
    });
  };

  const updateExperience = (index, field, value) => {
    const newExp = [...(formData.experience || [])];
    newExp[index] = { ...newExp[index], [field]: value };
    setFormData({ ...formData, experience: newExp });
  };

  const removeExperience = (index) => {
    const newExp = (formData.experience || []).filter((_, i) => i !== index);
    setFormData({ ...formData, experience: newExp });
  };

  // --- Education Handlers ---
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...(formData.education || []),
        { degree: "", university: "", period: "" },
      ],
    });
  };

  const updateEducation = (index, field, value) => {
    const newEdu = [...(formData.education || [])];
    newEdu[index] = { ...newEdu[index], [field]: value };
    setFormData({ ...formData, education: newEdu });
  };

  const removeEducation = (index) => {
    const newEdu = (formData.education || []).filter((_, i) => i !== index);
    setFormData({ ...formData, education: newEdu });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">About Section</h1>
        <p className="text-gray-400 mt-1">
          Manage your skills, experience, and bio.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6"
      >
        {/* Technical Skills */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Technical Skills
          </h3>
          <div className="space-y-3">
            {(formData.technicalSkills || []).map((skill, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) =>
                    updateTechnicalSkill(index, "name", e.target.value)
                  }
                  placeholder="Skill Name"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                />
                <input
                  type="number"
                  value={skill.percentage}
                  min="0"
                  max="100"
                  onChange={(e) =>
                    updateTechnicalSkill(index, "percentage", e.target.value)
                  }
                  placeholder="%"
                  className="w-20 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="button"
                  onClick={() => removeTechnicalSkill(index)}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTechnicalSkill}
              className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm"
            >
              <Plus size={16} /> Add Skill
            </button>
          </div>
        </div>

        {/* Tools */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Tools</h3>
          <div className="flex flex-wrap gap-3">
            {(formData.tools || []).map((tool, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={tool}
                  onChange={(e) =>
                    updateStringItem("tools", index, e.target.value)
                  }
                  className="w-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeStringItem("tools", index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addStringItem("tools")}
              className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm px-3 py-2 border border-dashed border-primary/50 rounded-lg"
            >
              <Plus size={16} /> Add Tool
            </button>
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Soft Skills</h3>
          <div className="flex flex-wrap gap-3">
            {(formData.softSkills || []).map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={skill}
                  onChange={(e) =>
                    updateStringItem("softSkills", index, e.target.value)
                  }
                  className="w-32 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeStringItem("softSkills", index)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addStringItem("softSkills")}
              className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm px-3 py-2 border border-dashed border-primary/50 rounded-lg"
            >
              <Plus size={16} /> Add Soft Skill
            </button>
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Experience</h3>
          <div className="space-y-4">
            {(formData.experience || []).map((exp, index) => (
              <div
                key={index}
                className="p-4 bg-gray-700/50 rounded-lg border border-gray-600"
              >
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) =>
                      updateExperience(index, "role", e.target.value)
                    }
                    placeholder="Role"
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateExperience(index, "company", e.target.value)
                    }
                    placeholder="Company"
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) =>
                      updateExperience(index, "period", e.target.value)
                    }
                    placeholder="Period (e.g., 2021 - Present)"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex gap-3">
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    placeholder="Description"
                    rows={2}
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg h-fit"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm"
            >
              <Plus size={16} /> Add Experience
            </button>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Education</h3>
          <div className="space-y-4">
            {(formData.education || []).map((edu, index) => (
              <div
                key={index}
                className="p-4 bg-gray-700/50 rounded-lg border border-gray-600"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) =>
                      updateEducation(index, "degree", e.target.value)
                    }
                    placeholder="Degree"
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                  <input
                    type="text"
                    value={edu.university}
                    onChange={(e) =>
                      updateEducation(index, "university", e.target.value)
                    }
                    placeholder="University"
                    className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={edu.period}
                    onChange={(e) =>
                      updateEducation(index, "period", e.target.value)
                    }
                    placeholder="Period (e.g., 2018 - 2022)"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg h-fit"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addEducation}
              className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm"
            >
              <Plus size={16} /> Add Education
            </button>
          </div>
        </div>

        {/* Text Areas */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What Makes Me Different
          </label>
          <textarea
            value={formData.whatMakesMeDifferent || ""}
            onChange={(e) =>
              setFormData({ ...formData, whatMakesMeDifferent: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Career Goals
          </label>
          <textarea
            value={formData.careerGoals || ""}
            onChange={(e) =>
              setFormData({ ...formData, careerGoals: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Save size={20} />
            Save Changes
          </button>
          {saved && (
            <span className="text-green-400">Changes saved successfully!</span>
          )}
        </div>
      </form>

      {/* Preview */}
      <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 space-y-8 mt-6">
        <h2 className="text-xl font-bold text-white mb-4">Preview</h2>

        {/* Skills Preview */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">💼 Skills</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-md font-semibold text-gray-300 mb-3">Technical Skills</h4>
              {(formData.technicalSkills || []).map((skill, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{skill.name || 'Unnamed Skill'}</span>
                    <span className="text-primary">{skill.percentage || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${skill.percentage || 0}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-300 mb-3">Tools & Soft Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[...(formData.tools || []), ...(formData.softSkills || [])].map((skill, index) => (
                  <span key={index} className="bg-gray-700 text-primary font-mono px-3 py-1 rounded-md text-xs">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Experience & Education Preview */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">🎯 Experience & Background</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-md font-semibold text-gray-300 mb-3">Work Experience</h4>
              <div className="space-y-4">
                {(formData.experience || []).map((exp, index) => (
                  <div key={index} className="border-l-2 border-primary/50 pl-4">
                    <p className="text-sm text-primary font-mono">{exp.period}</p>
                    <h5 className="font-bold text-white">{exp.role}</h5>
                    <p className="text-gray-400 text-sm">{exp.company}</p>
                    <p className="mt-1 text-gray-500 text-xs">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-300 mb-3">Education</h4>
              <div className="space-y-4">
                {(formData.education || []).map((edu, index) => (
                  <div key={index} className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-sm text-primary font-mono">{edu.period}</p>
                    <h5 className="font-bold text-white">{edu.degree}</h5>
                    <p className="text-gray-400 text-sm">{edu.university}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Text Sections Preview */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">🌟 What Makes Me Different</h3>
          <p className="text-gray-400 text-sm whitespace-pre-wrap">{formData.whatMakesMeDifferent}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">📈 Career Goals</h3>
          <p className="text-gray-400 text-sm whitespace-pre-wrap">{formData.careerGoals}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutSettings;
