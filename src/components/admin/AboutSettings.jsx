import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2 } from 'lucide-react';

const AboutSettings = () => {
  const { data, updateAbout } = usePortfolio();
  const [formData, setFormData] = useState(data.about);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(data.about);
  }, [data.about]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAbout(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateParagraph = (index, value) => {
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = value;
    setFormData({ ...formData, paragraphs: newParagraphs });
  };

  const addParagraph = () => {
    setFormData({ ...formData, paragraphs: [...formData.paragraphs, ''] });
  };

  const removeParagraph = (index) => {
    const newParagraphs = formData.paragraphs.filter((_, i) => i !== index);
    setFormData({ ...formData, paragraphs: newParagraphs });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">About Section</h1>
        <p className="text-gray-400 mt-1">Customize your about section content.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Section Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
          />
        </div>

        {/* Paragraphs */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">About Paragraphs</label>
          {formData.paragraphs.map((paragraph, index) => (
            <div key={index} className="flex items-start gap-3 mb-3">
              <textarea
                value={paragraph}
                onChange={(e) => updateParagraph(index, e.target.value)}
                rows={4}
                className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => removeParagraph(index)}
                className="p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addParagraph}
            className="flex items-center gap-2 text-primary hover:text-primary/80"
          >
            <Plus size={20} />
            Add Paragraph
          </button>
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
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">{formData.title}</h3>
          {formData.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-gray-400">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSettings;
