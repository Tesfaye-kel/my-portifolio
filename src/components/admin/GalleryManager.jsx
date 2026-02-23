import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Plus, Trash2, Image } from 'lucide-react';

const GalleryManager = () => {
  const { data, addGalleryImage, deleteGalleryImage } = usePortfolio();
  const [gallery, setGallery] = useState(data.gallery || []);
  const [newImage, setNewImage] = useState({ title: '', url: '' });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setGallery(data.gallery || []);
  }, [data.gallery]);

  const handleAddImage = () => {
    if (newImage.title.trim() && newImage.url.trim()) {
      addGalleryImage(newImage);
      setNewImage({ title: '', url: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleRemoveImage = (id) => {
    if (window.confirm('Are you sure you want to remove this image?')) {
      deleteGalleryImage(id);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Gallery</h1>
        <p className="text-gray-400 mt-1">Manage your portfolio gallery images.</p>
      </div>

      {/* Add New Image */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">Add New Image</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <input
              type="text"
              value={newImage.title}
              onChange={(e) => setNewImage({ ...newImage, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
              placeholder="Image title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Image URL</label>
            <input
              type="text"
              value={newImage.url}
              onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
              placeholder="/image.jpg"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAddImage}
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-gray-900 font-semibold px-4 py-3 rounded-lg transition-colors w-full justify-center"
            >
              <Plus size={20} />
              Add Image
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((image) => (
          <div key={image.id} className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden group">
            <div className="aspect-square bg-gray-700 relative overflow-hidden">
              {image.url ? (
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-500" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleRemoveImage(image.id)}
                  className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-white">{image.title}</h3>
              <p className="text-sm text-gray-400 mt-1 truncate">{image.url}</p>
            </div>
          </div>
        ))}
      </div>

      {gallery.length === 0 && (
        <div className="bg-gray-800 rounded-xl p-12 border border-gray-700 text-center">
          <Image className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Images Yet</h3>
          <p className="text-gray-400">Add your first gallery image using the form above.</p>
        </div>
      )}

      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg">
          Image added successfully!
        </div>
      )}
    </div>
  );
};

export default GalleryManager;
