import { useParams, Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { motion } from 'framer-motion';
import { 
  Github, ExternalLink, ArrowLeft, 
  AlertCircle, Lightbulb, Layers, 
  ListChecks, GitBranch, Trophy, 
  User, Link2, Users, ShoppingCart, Calculator,
  CloudSun, ShoppingBag
} from 'lucide-react';

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

  const allProjects = (data.projects && data.projects.length > 0) ? data.projects : defaultProjects;
  const project = allProjects.find(p => (p._id || p.id) === id);

  if (!project) {
    return (
      <section className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Project Not Found</h2>
          <p className="text-slate-400 mb-8">The project you are looking for does not exist.</p>
          <Link to="/#projects" className="magnetic-btn">
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const caseStudySections = [
    {
      icon: <AlertCircle size={20} />,
      title: 'The Problem',
      content: project.problem,
      color: '#f87171'
    },
    {
      icon: <Lightbulb size={20} />,
      title: 'The Solution',
      content: project.solution,
      color: '#fbbf24'
    },
    {
      icon: <Layers size={20} />,
      title: 'Architecture',
      content: project.architecture,
      color: '#60a5fa'
    },
    {
      icon: <GitBranch size={20} />,
      title: 'Challenges',
      content: project.challenges,
      color: '#a78bfa'
    },
    {
      icon: <Trophy size={20} />,
      title: 'Results',
      content: project.results,
      color: '#34d399'
    },
    {
      icon: <User size={20} />,
      title: 'My Contribution',
      content: project.contribution,
      color: '#64ffda'
    }
  ];

  return (
    <section className="min-h-screen py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/#projects" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 font-mono transition-all hover:-translate-x-1">
            <ArrowLeft size={18} />
            Back to Projects
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
                {project.category || 'Project'}
              </span>
              {project.featured && (
                <span className="px-3 py-1 rounded-full bg-[#0a192f]/60 border border-[#233554]/50 text-slate-400 text-xs font-mono">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-4">{project.title}</h1>
            <p className="text-slate-400 text-lg leading-relaxed">{project.description}</p>
          </div>

          {/* Project Visual */}
          <div className="relative overflow-hidden rounded-xl aspect-video mb-12 border border-[#233554]/50 shadow-2xl">
            {project.image ? (
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#112240] to-[#0a192f] flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                    {project.icon}
                  </div>
                  <span className="text-slate-500 font-mono">Project Preview</span>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                <ListChecks size={24} className="text-primary" />
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-[#112240]/40 border border-[#233554]/50"
                  >
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-slate-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Case Study Sections */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Layers size={24} className="text-primary" />
              Case Study
            </h2>
            <div className="space-y-6">
              {caseStudySections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${section.color}15`, color: section.color }}
                    >
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100">{section.title}</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{section.content}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-2">
              <Layers size={24} className="text-primary" />
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies?.map((tech, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary font-mono text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-[#233554]/50">
            {project.github && (
              <a 
                href={project.github}
                className="magnetic-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={20} />
                View on GitHub
              </a>
            )}
            {project.live && (
              <a 
                href={project.live}
                className="magnetic-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={20} />
                View Live Demo
              </a>
            )}
            <Link to="/#projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-mono text-sm">
              <Link2 size={16} />
              More Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;