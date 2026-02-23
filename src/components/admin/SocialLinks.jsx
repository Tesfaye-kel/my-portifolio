import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2, ExternalLink } from 'lucide-react';

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
    setLinks([...links, { name: '', url: '', icon: 'link' }]);
  };

  const updateLink = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Social Links</h1>
        <p className="text-gray-400 mt-1">Manage your social media links displayed on your portfolio.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl p-6 border border-gray-700 space-y-6">
        {links.map((link, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Platform Name</label>
                <input
                  type="text"
                  value={link.name}
                  onChange={(e) => updateLink(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="GitHub"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(index, 'url', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="https://github.com/username"
                  required
                />
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
        ))}

        <button
          type="button"
          onClick={addLink}
          className="flex items-center gap-2 text-primary hover:text-primary/80"
        >
          <Plus size={20} />
          Add Social Link
        </button>

        <div className="flex items-center gap-4 pt-4">
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
        <div className="flex gap-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <ExternalLink size={16} />
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
