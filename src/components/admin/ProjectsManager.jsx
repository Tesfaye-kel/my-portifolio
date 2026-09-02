import { useState, useEffect, useRef } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  Edit,
  X,
  ExternalLink,
  Github,
  RefreshCw,
} from "lucide-react";

const ProjectsManager = () => {
  const { data, addProject, updateProject, deleteProject, refreshData } = usePortfolio();
  const [projects, setProjects] = useState(data.projects || []);
  const [isEditing, setIsEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    github: "",
    live: "",
    image: "",
    certificateImage: "",
    certificateTitle: "Certificate",
    features: "",
    problem: "",
    solution: "",
    architecture: "",
    challenges: "",
    results: "",
    contribution: "",
  });
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const formPanelRef = useRef(null);

  useEffect(() => {
    setProjects(data.projects || []);
  }, [data.projects]);

  useEffect(() => {
    if (showForm) {
      formPanelRef.current?.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [showForm, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        features: formData.features
          .split(",")
          .map((feature) => feature.trim())
          .filter(Boolean),
      };

      if (isEditing) {
        await updateProject(isEditing, projectData);
      } else {
        await addProject(projectData);
      }

      resetForm();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (submitError) {
      setError(submitError.message || "Unable to save this project.");
    } finally {
      setBusy(false);
    }
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      technologies: (project.technologies || []).join(", "),
      image: project.image || "",
      certificateImage: project.certificateImage || "",
      certificateTitle: project.certificateTitle || "Certificate",
      features: (project.features || []).join(", "),
      problem: project.problem || "",
      solution: project.solution || "",
      architecture: project.architecture || "",
      challenges: project.challenges || "",
      results: project.results || "",
      contribution: project.contribution || "",
    });
    setIsEditing(project._id || project.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setBusy(true);
      setError("");
      try {
        await deleteProject(id);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch (deleteError) {
        setError(deleteError.message || "Unable to delete this project.");
      } finally {
        setBusy(false);
      }
    }
  };

  const handleRefresh = async () => {
    setBusy(true);
    setError("");
    try {
      await refreshData();
    } catch (refreshError) {
      setError(refreshError.message || "Unable to refresh projects.");
    } finally {
      setBusy(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      technologies: "",
      github: "",
      live: "",
      image: "",
      certificateImage: "",
      certificateTitle: "Certificate",
      features: "",
      problem: "",
      solution: "",
      architecture: "",
      challenges: "",
      results: "",
      contribution: "",
    });
    setIsEditing(null);
    setShowForm(false);
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
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={busy}
            className="flex items-center gap-2 border border-[#233554] bg-[#112240]/50 hover:border-primary/40 text-slate-300 px-4 py-2 rounded-lg transition-colors"
          >
            <RefreshCw size={18} className={busy ? "animate-spin" : ""} />
            Refresh
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-gray-900 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Plus size={20} />
            Add Project
          </button>
        </div>
      </div>

      {/* Project Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-4 overflow-hidden overscroll-contain backdrop-blur-sm"
          >
            <motion.div 
              ref={formPanelRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 rounded-xl p-6 my-0 sm:my-4 w-full max-w-2xl max-h-[calc(100dvh-2rem)] overflow-y-auto overscroll-contain touch-pan-y border border-gray-700 shadow-2xl"
            >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                {isEditing ? "Edit Project" : "Add New Project"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
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
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="React, Node.js, MongoDB"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) =>
                      setFormData({ ...formData, github: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://github.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    value={formData.live}
                    onChange={(e) =>
                      setFormData({ ...formData, live: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Screenshot URL
                  </label>
                  <input
                    type="url"
                    value={formData.image || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://.../project.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Certificate Screenshot URL
                  </label>
                  <input
                    type="url"
                    value={formData.certificateImage || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, certificateImage: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                    placeholder="https://.../certificate.png"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Certificate Label
                </label>
                <input
                  type="text"
                  value={formData.certificateTitle || "Certificate"}
                  onChange={(e) =>
                    setFormData({ ...formData, certificateTitle: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="Certificate / Achievement"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Key Features (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                  placeholder="User authentication, Dashboard, Search"
                />
              </div>

              <div className="border-t border-gray-700 pt-4">
                <h3 className="text-lg font-semibold text-white mb-4">Case Study Content</h3>
                <div className="space-y-4">
                  {[
                    ["problem", "The Problem", "What problem did this project solve?"],
                    ["solution", "The Solution", "How did your solution address the problem?"],
                    ["architecture", "Architecture", "Describe the technical architecture and stack."],
                    ["challenges", "Challenges", "What difficult parts did you solve?"],
                    ["results", "Results", "What was the outcome or impact?"],
                    ["contribution", "My Contribution", "What work did you personally complete?"],
                  ].map(([field, label, placeholder]) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
                      <textarea
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        rows={3}
                        placeholder={placeholder}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="sticky bottom-0 -mx-6 -mb-6 flex items-center gap-4 border-t border-gray-700 bg-gray-800/95 px-6 py-4 backdrop-blur-sm">
                <button
                  type="submit"
                  disabled={busy}
                  className="flex min-h-12 items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={20} />
                  {isEditing ? "Update Project" : "Add Project"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={busy}
                  className="min-h-12 px-3 text-gray-400 hover:text-white disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
        {projects.length === 0 ? (
          <div className="col-span-full rounded-xl border border-dashed border-[#233554] bg-[#112240]/30 p-8 text-center text-slate-400">
            No projects yet. Click “Add Project” to create your first project.
          </div>
        ) : (
          projects.map((project) => (
          <motion.div
            key={project._id || project.id}
            variants={itemVariants}
            layout
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-primary/50 transition-colors"
          >
            <div className="aspect-video bg-gray-700 flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-4xl">🚀</span>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white text-lg">{project.title}</h3>
              <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, index) => (
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
                    onClick={() => handleDelete(project._id || project.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          ))
        )}
        </AnimatePresence>
      </div>

      {saved && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold z-50"
        >
          Changes saved successfully!
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProjectsManager;
