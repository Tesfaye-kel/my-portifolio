import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';

const Projects = () => {
  const { data } = usePortfolio();
  const { projects: contextProjects } = data;
  const navigate = useNavigate();

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

  const projects = (contextProjects && contextProjects.length > 0) ? contextProjects : defaultProjects;

  const handleCardKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/project/${id}`);
    }
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="projects" className="min-h-screen py-20 bg-navy text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-mono text-lg mb-2"> My Work</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-100">
            Some Things I've Built
          </h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id || index}
              variants={itemVariants}
              onClick={() => navigate(`/project/${project.id}`)}
              onKeyDown={(e) => handleCardKeyDown(e, project.id)}
              role="link"
              tabIndex="0"
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg overflow-hidden flex flex-col group transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="relative overflow-hidden aspect-video">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                    <span className="text-5xl text-slate-500">🚀</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-slate-400 mt-3 text-sm flex-grow line-clamp-3">
                  {project.description}
                </p>
                <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-primary/80 mt-4">
                  {project.technologies?.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
                <div className="flex gap-4 pt-5 mt-auto">
                  {project.github && (
                    <a 
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="GitHub"
                    >
                      <Github size={22} />
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-400 hover:text-primary transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
