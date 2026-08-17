import { motion } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { useNavigate } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Users, ShoppingCart, Calculator, ListChecks, CloudSun, ShoppingBag } from 'lucide-react';

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
      image: null,
      category: 'Full-Stack',
      featured: true,
      icon: <Users size={24} />,
      features: ['Real-time messaging', 'User authentication', 'Post sharing', 'Interactive feeds'],
      problem: 'Social media platforms often lack real-time interactivity and user engagement features.',
      solution: 'Built a full-featured social network with real-time messaging using Socket.io, secure JWT authentication, and a responsive React frontend.',
      architecture: 'MERN stack with RESTful API architecture. MongoDB for data persistence, Express for the API layer, React for the frontend, and Socket.io for real-time communication.',
      challenges: 'Implementing real-time messaging across multiple clients, managing WebSocket connections, and ensuring data consistency in a distributed environment.',
      results: 'A fully functional social media platform with real-time capabilities, secure authentication, and a modern, responsive UI.',
      contribution: 'Designed and implemented the entire application from scratch - database schema, REST API, real-time messaging system, and the React frontend.'
    },
    {
      id: 'restaurant-management',
      title: 'Restaurant Management System',
      description: 'A comprehensive solution for restaurant operations. Handles menu management, order processing, table reservations, and staff coordination.',
      technologies: ['React', 'Firebase', 'Context API', 'Tailwind CSS'],
      github: 'https://github.com/Tesfaye-kel/restaurant-management',
      live: null,
      image: null,
      category: 'Web App',
      featured: false,
      icon: <ShoppingCart size={24} />,
      features: ['Menu management', 'Order processing', 'Table reservations', 'Staff coordination'],
      problem: 'Restaurants struggle with managing orders, reservations, and staff coordination efficiently.',
      solution: 'Created a comprehensive management system with Firebase for real-time data sync, Context API for state management, and a clean Tailwind CSS interface.',
      architecture: 'React frontend with Firebase backend. Context API for global state management, Firebase Firestore for real-time data, and Firebase Auth for user management.',
      challenges: 'Managing real-time data synchronization, implementing role-based access control, and designing an intuitive interface for staff.',
      results: 'A complete restaurant management solution that streamlines operations and improves efficiency.',
      contribution: 'Built the entire system including the React frontend, Firebase integration, and state management architecture.'
    },
    {
      id: 'simple-calculator',
      title: 'Simple Calculator',
      description: 'A web-based calculator with a clean UI. Performs basic arithmetic operations with history tracking and responsive design.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      github: 'https://github.com/Tesfaye-kel/simple-calculator',
      live: null,
      image: null,
      category: 'Frontend',
      featured: false,
      icon: <Calculator size={24} />,
      features: ['Basic arithmetic', 'History tracking', 'Responsive design', 'Clean UI'],
      problem: 'Need for a simple, fast, and reliable calculator with a clean interface.',
      solution: 'Developed a lightweight calculator with vanilla JavaScript, featuring history tracking and a responsive design.',
      architecture: 'Pure frontend application using HTML5, CSS3, and vanilla JavaScript. No external dependencies for maximum performance.',
      challenges: 'Handling edge cases in arithmetic operations and implementing a clean, intuitive UI.',
      results: 'A fast, reliable calculator that works seamlessly across all devices.',
      contribution: 'Designed and implemented the entire application from scratch.'
    },
    {
      id: 'task-manager',
      title: 'Task Manager Pro',
      description: 'A productivity application for managing tasks and projects. Features include drag-and-drop task organization, priority levels, and progress tracking.',
      technologies: ['React', 'Context API', 'LocalStorage', 'Tailwind CSS'],
      github: 'https://github.com/Tesfaye-kel',
      live: null,
      image: null,
      category: 'Web App',
      featured: false,
      icon: <ListChecks size={24} />,
      features: ['Drag-and-drop tasks', 'Priority levels', 'Progress tracking', 'Local storage persistence'],
      problem: 'People need a simple yet powerful way to organize tasks and track project progress.',
      solution: 'Built a feature-rich task manager with drag-and-drop functionality, priority levels, and persistent local storage.',
      architecture: 'React frontend with Context API for state management. LocalStorage for data persistence. Tailwind CSS for styling.',
      challenges: 'Implementing smooth drag-and-drop interactions and managing complex state updates.',
      results: 'A polished productivity tool that helps users stay organized and focused.',
      contribution: 'Designed and built the entire application from scratch.'
    },
    {
      id: 'weather-dashboard',
      title: 'Weather Dashboard',
      description: 'A real-time weather application with interactive visualizations. Displays current conditions, forecasts, and historical data.',
      technologies: ['React', 'REST API', 'Chart.js', 'CSS3'],
      github: 'https://github.com/Tesfaye-kel',
      live: null,
      image: null,
      category: 'Frontend',
      featured: false,
      icon: <CloudSun size={24} />,
      features: ['Real-time weather', '7-day forecast', 'Interactive charts', 'Location search'],
      problem: 'Weather data is often presented in a dry, unengaging format.',
      solution: 'Created an interactive weather dashboard with beautiful visualizations and real-time data from a public API.',
      architecture: 'React frontend consuming a weather REST API. Chart.js for data visualization. Responsive CSS3 design.',
      challenges: 'Handling API rate limits, caching data, and creating smooth chart animations.',
      results: 'An engaging weather experience that makes checking the forecast enjoyable.',
      contribution: 'Built the entire application including API integration and data visualization.'
    },
    {
      id: 'ecommerce-store',
      title: 'E-Commerce Store',
      description: 'A full-featured e-commerce platform with product catalog, shopping cart, and checkout flow. Includes user authentication and order management.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
      github: 'https://github.com/Tesfaye-kel',
      live: null,
      image: null,
      category: 'Full-Stack',
      featured: false,
      icon: <ShoppingBag size={24} />,
      features: ['Product catalog', 'Shopping cart', 'Checkout flow', 'User authentication'],
      problem: 'Small businesses need an affordable way to sell products online.',
      solution: 'Developed a complete e-commerce solution with product management, cart functionality, and secure checkout.',
      architecture: 'MERN stack with Stripe payment integration. MongoDB for product and order data. JWT for authentication.',
      challenges: 'Implementing secure payment processing and managing complex cart state.',
      results: 'A production-ready e-commerce platform that enables online selling.',
      contribution: 'Built the full-stack application including payment integration.'
    }
  ];

  const projects = (contextProjects && contextProjects.length > 0) ? contextProjects : defaultProjects;
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => (p._id || p.id) !== (featuredProject._id || featuredProject.id));

  const handleCardKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate(`/project/${id}`);
    }
  };

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <div className="flex-1 h-px bg-[#233554] max-w-[200px]" />
            <span className="font-mono text-primary text-lg">06.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100">Featured Projects</h2>
            <div className="flex-1 h-px bg-[#233554] max-w-[200px]" />
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">A selection of projects I've built, showcasing my skills in full-stack development.</p>
        </motion.div>

        {/* Featured Project - Large Immersive Layout */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#233554]/50 bg-gradient-to-br from-[#112240]/80 to-[#0a192f]/80">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

              <div className="relative p-8 md:p-12">
                <div className="flex items-center gap-2 mb-6">
                  <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
                    Featured Project
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#0a192f]/60 border border-[#233554]/50 text-slate-400 text-xs font-mono">
                    {featuredProject.category}
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Project Visual */}
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-primary/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-[#233554]/50 bg-[#0a192f]/60 flex items-center justify-center">
                      {featuredProject.image ? (
                        <img 
                          src={featuredProject.image} 
                          alt={featuredProject.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-center p-8">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                            {featuredProject.icon}
                          </div>
                          <p className="text-slate-500 font-mono text-sm">Project Preview</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
                      {featuredProject.title}
                    </h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6">
                      {featuredProject.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="text-sm font-mono text-primary mb-3">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {featuredProject.features?.map((feature, i) => (
                          <span key={i} className="px-3 py-1 rounded-md bg-[#0a192f]/60 border border-[#233554]/50 text-xs text-slate-300">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                      <h4 className="text-sm font-mono text-primary mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {featuredProject.technologies?.map((tech, i) => (
                          <span key={i} className="px-3 py-1 rounded-md bg-primary/10 border border-primary/30 text-xs font-mono text-primary">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => navigate(`/project/${featuredProject._id || featuredProject.id}`)}
                        className="magnetic-btn"
                      >
                        View Case Study
                        <ArrowRight size={16} />
                      </button>
                      {featuredProject.github && (
                        <a
                          href={featuredProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-[#112240]/50 border border-[#233554]/50 text-slate-400 hover:text-primary hover:border-primary/50 transition-all"
                          aria-label="GitHub"
                        >
                          <Github size={20} />
                        </a>
                      )}
                      {featuredProject.live && (
                        <a
                          href={featuredProject.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 rounded-lg bg-[#112240]/50 border border-[#233554]/50 text-slate-400 hover:text-primary hover:border-primary/50 transition-all"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project._id || project.id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => navigate(`/project/${project._id || project.id}`)}
              onKeyDown={(e) => handleCardKeyDown(e, project._id || project.id)}
              role="link"
              tabIndex="0"
              className="project-card group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="relative aspect-video overflow-hidden">
                {project.image ? (
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#112240] to-[#0a192f] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {project.icon}
                      </div>
                      <span className="text-slate-500 font-mono text-xs">{project.category}</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-slate-100 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {project.github && (
                      <a 
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg text-slate-400 hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg text-slate-400 hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies?.map((tech, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-[#0a192f]/60 border border-[#233554]/50 text-xs font-mono text-primary/70">
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/project/${project._id || project.id}`);
                  }}
                  className="magnetic-btn w-full justify-center text-sm"
                >
                  View Case Study
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;