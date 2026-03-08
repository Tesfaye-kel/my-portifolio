import { useParams, Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const { data } = usePortfolio();
  
  const defaultProjects = [
    {
      id: 'zenivial-social',
      title: 'Zenivial Social Network',
      description: 'A dynamic social media platform built with the MERN stack. Features include real-time messaging, post sharing, user authentication, and interactive feeds.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io'],
      github: 'https://github.com/Tesfaye-kel/zenivial-social',
      live: null,
      image: null
    },
    {
      id: 'restaurant-management',
      title: 'Restaurant Management System',
      description: 'A comprehensive solution for restaurant operations. Handles menu management, order processing, table reservations, and staff coordination.',
      technologies: ['React', 'Firebase', 'Context API', 'Tailwind CSS'],
      github: 'https://github.com/Tesfaye-kel/restaurant-management',
      live: null,
      image: null
    },
    {
      id: 'simple-calculator',
      title: 'Simple Calculator',
      description: 'A web-based calculator with a clean UI. Performs basic arithmetic operations with history tracking and responsive design.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      github: 'https://github.com/Tesfaye-kel/simple-calculator',
      live: null,
      image: null
    }
  ];

  const allProjects = (data.projects && data.projects.length > 0) ? data.projects : defaultProjects;
  const project = allProjects.find(p => p.id === id);

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-navy text-slate-300 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Project Not Found</h2>
          <p className="text-slate-400 mb-8">The project you are looking for does not exist.</p>
          <a href="/#projects" className="inline-flex items-center gap-2 bg-primary text-navy px-6 py-3 rounded-md font-mono font-semibold transition-transform active:scale-95">
            <ArrowLeft size={20} />
            Back to Projects
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-28 bg-navy text-slate-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-mono transition-all hover:-translate-x-1">
            <ArrowLeft size={18} />
            Back to Projects
          </a>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">{project.title}</h1>
          
          <div className="relative overflow-hidden rounded-lg aspect-video mb-8 border border-slate-700/50 shadow-lg">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <span className="text-6xl text-slate-500">🚀</span>
              </div>
            )}
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-slate-400 bg-slate-800/30 p-6 rounded-lg">
            <p>{project.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold text-slate-200 mb-4">Technologies Used</h3>
            <ul className="flex flex-wrap gap-3 font-mono text-sm text-primary/80">
              {project.technologies?.map((tech, i) => (
                <li key={i} className="bg-slate-800 px-3 py-1 rounded">{tech}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-slate-700/50">
            {project.github && (
              <a 
                href={project.github}
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github size={24} />
                <span>View on GitHub</span>
              </a>
            )}
            {project.live && (
              <a 
                href={project.live}
                className="flex items-center gap-2 text-slate-300 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live Demo"
              >
                <ExternalLink size={24} />
                <span>View Live Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;