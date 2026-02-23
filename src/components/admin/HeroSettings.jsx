import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save } from 'lucide-react';

const HeroSettings = () => {
  const { data, updateHero } = usePortfolio();
  const [formData, setFormData] = useState(data.hero);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(data.hero);
  }, [data.hero]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateHero(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Hero Section</h1>
        <p className="text-gray-400 mt-1">Customize your hero section content.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
        {/* Greeting */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Greeting Text</label>
          <input
            type="text"
            value={formData.greeting}
            onChange={(e) => setFormData({ ...formData, greeting: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
            placeholder="Hi, my name is"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
            placeholder="John Doe"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle</label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
            placeholder="I build things for the web."
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
            placeholder="I'm a software engineer..."
          />
        </div>

        {/* CTA Text */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">CTA Button Text</label>
          <input
            type="text"
            value={formData.ctaText}
            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
            placeholder="Check out my work"
          />
        </div>

        {/* CTA Link */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">CTA Button Link</label>
          <input
            type="text"
            value={formData.ctaLink}
            onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
            placeholder="#projects"
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
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
        <div className="space-y-4">
          <p className="text-primary font-mono">{formData.greeting}</p>
          <h3 className="text-4xl font-bold text-white">{formData.name}</h3>
          <p className="text-2xl text-gray-400">{formData.subtitle}</p>
          <p className="text-gray-400">{formData.description}</p>
          <a
            href={formData.ctaLink}
            className="inline-block bg-primary text-gray-900 px-6 py-3 rounded-md font-semibold"
          >
            {formData.ctaText}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSettings;
