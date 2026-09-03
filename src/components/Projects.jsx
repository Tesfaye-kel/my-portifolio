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

  const projects = (contextProjects && contextProjects.length > 0)
    ? [...contextProjects].sort((a, b) => {
        const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.createdAt ? new Date(a.createdAt).getTime() : (typeof a.order === 'number' ? a.order : 0));
        const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.createdAt ? new Date(b.createdAt).getTime() : (typeof b.order === 'number' ? b.order : 0));
        return bTime - aTime;
      })
    : defaultProjects;

  const handleCardKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      sessionStorage.setItem('portfolio-project-scroll', String(window.scrollY || 0));
      navigate(`/project/${id}`);
    }
  };

  const handleProjectOpen = (id) => {
    sessionStorage.setItem('portfolio-project-scroll', String(window.scrollY || 0));
    navigate(`/project/${id}`);
  };

  return (
    <section id="projects" className="relative pt-8 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-white/60 max-w-[80px]" />
            <h2 className="text-white font-mono text-base tracking-widest uppercase">Featured Projects</h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/40 to-white/60 max-w-[80px]" />
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">A selection of projects I've built, showcasing my skills in full-stack development.</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project._id || project.id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              onClick={() => handleProjectOpen(project._id || project.id)}
              onKeyDown={(e) => handleCardKeyDown(e, project._id || project.id)}
              role="link"
              tabIndex="0"
              className="project-card group flex h-full min-h-[360px] cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#233554]/50 bg-[#112240]/80 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="relative aspect-[16/10] overflow-hidden shadow-[0_14px_24px_-20px_rgba(100,255,218,0.45)]">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full bg-[#112240] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#112240] to-[#0a192f]">
                    <div className="text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                        {project.icon || <ArrowRight size={18} />}
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{project.category || 'Project'}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col bg-[#112240]/80 p-4 md:p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-slate-100 transition-colors group-hover:text-primary md:text-lg">
                    {project.title}
                  </h3>
                  <div className="flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.github && (
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-lg p-2 text-slate-400 transition-colors hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="mb-3 line-clamp-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.technologies?.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded bg-[#0a192f]/60 border border-[#233554]/50 px-2 py-0.5 text-[9px] font-mono text-primary/70 md:text-[10px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProjectOpen(project._id || project.id);
                  }}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/40 bg-transparent px-3 py-2 text-[11px] font-medium text-primary transition-all duration-300 hover:bg-primary/10 md:text-xs"
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