import { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Save, Plus, Trash2, Edit, X, ExternalLink, Github } from 'lucide-react';

const ProjectsManager = () => {
  const { data, addProject, updateProject, deleteProject } = usePortfolio();
  const [projects, setProjects] = useState(data.projects || []);
  const [isEditing, setIsEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    github: '',
    live: '',
    image: null,
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProjects(data.projects || []);
  }, [data.projects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
    };

    if (isEditing) {
      updateProject(isEditing, projectData);
    } else {
      addProject(projectData);
    }

    resetForm();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      technologies: project.technologies.join(', '),
    });
    setIsEditing(project.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteProject(id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      github: '',
      live: '',
      image: null,
    });
    setIsEditing(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>

      {/* Project Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={resetForm} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Technologies (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub URL</label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Live Demo URL</label>
                  <input
                    type="url"
                    value={formData.live}
                    onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  <Save size={20} />
                  {isEditing ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
          >
            <div className="aspect-video bg-gray-700 flex items-center justify-center">
              {project.image ? (
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl">🚀</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white text-lg">{project.title}</h3>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-primary/20 text-primary rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <Github size={18} />
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <div className="ml-auto flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {saved && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg">
          Changes saved successfully!
        </div>
      )}
    </div>
  );
};

export default ProjectsManager;
