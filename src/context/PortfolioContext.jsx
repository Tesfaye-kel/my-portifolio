import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioAPI, projectsAPI, messagesAPI, authAPI, setToken, removeToken, getToken } from '../utils/api';

const baseUrl = import.meta.env.BASE_URL || '/';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

const STORAGE_KEY = 'portfolio_local_data_v1';

const sortProjects = (projects = []) => {
  return [...projects].sort((a, b) => {
    const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : (a.createdAt ? new Date(a.createdAt).getTime() : (typeof a.order === 'number' ? a.order : 0));
    const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : (b.createdAt ? new Date(b.createdAt).getTime() : (typeof b.order === 'number' ? b.order : 0));

    if (aTime !== bTime) {
      return bTime - aTime;
    }

    const aOrder = typeof a.order === 'number' ? a.order : 0;
    const bOrder = typeof b.order === 'number' ? b.order : 0;
    return bOrder - aOrder;
  });
};

const getStoredPortfolio = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('Failed to read local portfolio cache:', error);
    return null;
  }
};

const saveStoredPortfolio = (portfolioData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolioData));
  } catch (error) {
    console.error('Failed to write local portfolio cache:', error);
  }
};

const fallbackData = {
  docId: 'main',
  profile: {
    name: "Tesfaye Kelbesa",
    title: "Full Stack Developer",
    tagline: "Building digital experiences",
    email: "tesfayekelbesa912@gmail.com",
    location: "Addis Ababa, Ethiopia",
    avatar: `${baseUrl}me.jpg`,
  },
  hero: {
    greeting: "Hi, I am",
    name: "Tesfaye Kelbesa",
    subtitle: "Full Stack Developer",
    description: "I build things for the web.",
    ctaText: "Get in Touch",
    ctaLink: "#contact",
  },
  about: {
    introduction: "Hi, I'm Tesfaye...",
    technicalSkills: [
      { name: "HTML & CSS", percentage: 95 },
      { name: "JavaScript (ES6+)", percentage: 90 },
      { name: "React & Next.js", percentage: 88 },
      { name: "Node.js & Express", percentage: 82 },
      { name: "Python & Django", percentage: 75 },
      { name: "Databases (SQL & NoSQL)", percentage: 80 },
    ],
    tools: ["Git & GitHub", "Figma", "VS Code", "Docker", "Jira", "Postman"],
    softSkills: ["Problem-Solving", "Teamwork", "Communication", "Adaptability", "Creativity"],
    experience: [],
    education: [
      "Bachelor’s Degree in Computer Science.",
      "Strong foundation in programming, algorithms, and database systems.",
      "Experience developing responsive and user-friendly web applications.",
      "Skilled in both front-end and back-end development.",
      "Passionate about building scalable web solutions and learning new technologies."
    ],
    whatMakesMeDifferent: [
      "🔍 Curiosity & Continuous Learning - I enjoy learning something new every day, whether it's a new technology, a better way to solve a problem, or a different perspective from others. Staying curious helps me continuously improve as an engineer and as a person.",
      "🌍 Cosmopolitan by Nature - I value diversity in cultures, backgrounds, ideas, and ways of thinking. My life has exposed me to struggles shaped by society and politics, but I choose to remain open-minded rather than defined by political labels. I learn from different perspectives while staying true to my own values, curiosity, and identity.",
      "📅 Consistency Over Motivation - I believe progress comes from consistent effort rather than waiting for motivation. I maintain daily habits of learning, coding, experimenting, and improving—even when the results aren't immediate.",
      "🎯 Building With Purpose - I don't want to write code simply because I can. I'm interested in understanding why something needs to be built and who it helps. I aim to create software that is useful, maintainable, and meaningful to its users.",
      "🤝 Independent Thinker & Collaborative Teammate - I'm comfortable exploring ideas independently, researching solutions, and taking ownership of my work. At the same time, I value teamwork, open communication, feedback, and learning from people with different experiences.",
      "🧘 Calm Under Pressure - I believe staying calm is one of the most valuable skills when facing difficult problems. When things don't go as planned, I take a step back, understand the situation, and approach the problem logically rather than reacting emotionally. This helps me make better decisions, solve problems effectively, and remain reliable when challenges arise."
    ],
    careerGoals: "",
  },
  projects: [
    {
      _id: 'sample-project-1',
      title: 'Zenivial Social Network',
      description: 'A real-time social platform built with MERN stack and Socket.io for live messaging.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      github: 'https://github.com/Tesfaye-kel/zenivial-social',
      live: '',
      image: null,
      certificateImage: '',
      certificateTitle: 'Certificate of Completion',
      featured: true,
      order: 1,
    },
    {
      _id: 'sample-project-2',
      title: 'Restaurant Management System',
      description: 'A restaurant operations app for staff coordination, orders, and reservations.',
      technologies: ['React', 'Firebase', 'Tailwind CSS'],
      github: 'https://github.com/Tesfaye-kel/restaurant-management',
      live: '',
      image: null,
      certificateImage: '',
      certificateTitle: 'Achievement Certificate',
      featured: false,
      order: 2,
    },
    {
      _id: 'sample-project-3',
      title: 'Weather Dashboard',
      description: 'Interactive weather analytics with real-time forecast and chart-based monitoring.',
      technologies: ['React', 'REST API', 'Chart.js'],
      github: '',
      live: '',
      image: null,
      certificateImage: '',
      certificateTitle: 'Course Certificate',
      featured: false,
      order: 3,
    }
  ],
  socialLinks: [],
  messages: [],
  gallery: [],
  contact: {
    email: "tesfayekelbesa912@gmail.com",
    description: "I'm currently looking for new opportunities. Whether you have a question or just want to say hi, my inbox is always open.",
  },
  theme: 'dark',
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Load portfolio data from backend
  const loadPortfolio = useCallback(async () => {
    try {
      setLoading(true);
      const stored = getStoredPortfolio();
      const [portfolioResult, projectsResult] = await Promise.allSettled([
        portfolioAPI.getPortfolio(),
        projectsAPI.getAll(),
      ]);
      const portfolioData = portfolioResult.status === 'fulfilled'
        ? portfolioResult.value
        : fallbackData;
      const allProjects = projectsResult.status === 'fulfilled' ? projectsResult.value : [];
      
      const sortedProjects = sortProjects(
        Array.isArray(allProjects) && allProjects.length > 0
          ? allProjects
          : (Array.isArray(portfolioData.projects) && portfolioData.projects.length > 0
            ? portfolioData.projects
            : (stored?.projects || fallbackData.projects))
      );

      const transformed = {
        ...portfolioData,
        profile: portfolioData.profile || fallbackData.profile,
        hero: portfolioData.hero || fallbackData.hero,
        about: portfolioData.about || fallbackData.about,
        socialLinks: portfolioData.socialLinks?.length ? portfolioData.socialLinks : fallbackData.socialLinks,
        projects: sortedProjects,
        messages: portfolioData.messages?.length ? portfolioData.messages : fallbackData.messages,
        gallery: Array.isArray(portfolioData.gallery) && portfolioData.gallery.length > 0 ? portfolioData.gallery : fallbackData.gallery,
        contact: portfolioData.contact || fallbackData.contact,
        theme: portfolioData.theme || 'dark',
      };

      if (portfolioResult.status === 'fulfilled' || projectsResult.status === 'fulfilled') {
        saveStoredPortfolio(transformed);
      }
      setData(transformed);
    } catch (error) {
      console.error('Failed to load portfolio:', error);
      const stored = getStoredPortfolio() || fallbackData;
      saveStoredPortfolio(stored);
      setData(stored);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial data
  useEffect(() => {
    loadPortfolio();
    
    // Check if admin token exists
    if (getToken()) {
      setIsAdmin(true);
    }
  }, [loadPortfolio]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('portfolio-theme', data.theme);
  }, [data.theme]);

  // --- Generic Update Function ---
  const updateSection = async (section, sectionData) => {
    try {
      await portfolioAPI.updateSection(section, sectionData);
      setData(prev => {
        const next = { ...prev, [section]: sectionData };
        saveStoredPortfolio(next);
        return next;
      });
    } catch (error) {
      console.error(`Failed to update ${section}:`, error);
      throw error;
    }
  };

  // --- Specific Update Functions ---
  const updateProfile = (profileData) => updateSection('profile', profileData);
  const updateHero = (heroData) => updateSection('hero', heroData);
  const updateAbout = (aboutData) => updateSection('about', aboutData);
  const updateSocialLinks = (links) => updateSection('socialLinks', links);
  const updateContact = (contactData) => updateSection('contact', contactData);
  const toggleTheme = () => updateSection('theme', data.theme === 'dark' ? 'light' : 'dark');

  // --- Projects ---
  const addProject = async (projectData) => {
    try {
      const newProject = await projectsAPI.create(projectData);
      setData(prev => {
        const next = { ...prev, projects: sortProjects([newProject, ...(prev.projects || [])]) };
        saveStoredPortfolio(next);
        return next;
      });
      await loadPortfolio();
      return newProject;
    } catch (error) {
      console.error('Failed to add project via API, using local storage fallback:', error);
      const nextProject = {
        ...projectData,
        _id: `local-${Date.now()}`,
        technologies: Array.isArray(projectData.technologies) ? projectData.technologies : (projectData.technologies || '').split(',').map((item) => item.trim()).filter(Boolean),
        image: projectData.image || null,
        certificateImage: projectData.certificateImage || null,
        certificateTitle: projectData.certificateTitle || 'Certificate',
        featured: Boolean(projectData.featured),
      };

      setData(prev => {
        const next = { ...prev, projects: sortProjects([nextProject, ...(prev.projects || [])]) };
        saveStoredPortfolio(next);
        return next;
      });
      return nextProject;
    }
  };

  const updateProject = async (projectId, projectData) => {
    try {
      const updatedProject = await projectsAPI.update(projectId, projectData);
      setData(prev => {
        const next = {
          ...prev,
          projects: mergeProjects((prev.projects || []).map(p => (p._id || p.id) === projectId ? updatedProject : p), [updatedProject])
        };
        saveStoredPortfolio(next);
        return next;
      });
      await loadPortfolio();
      return updatedProject;
    } catch (error) {
      console.error('Failed to update project via API, using local storage fallback:', error);
      const nextProject = {
        ...projectData,
        _id: projectId,
        technologies: Array.isArray(projectData.technologies) ? projectData.technologies : (projectData.technologies || '').split(',').map((item) => item.trim()).filter(Boolean),
        image: projectData.image || null,
        certificateImage: projectData.certificateImage || null,
        certificateTitle: projectData.certificateTitle || 'Certificate',
      };

      setData(prev => {
        const next = {
          ...prev,
          projects: sortProjects((prev.projects || []).map(p => (p._id || p.id) === projectId ? { ...p, ...nextProject } : p))
        };
        saveStoredPortfolio(next);
        return next;
      });
      return nextProject;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await projectsAPI.delete(projectId);
      setData(prev => {
        const next = { ...prev, projects: (prev.projects || []).filter(p => (p._id || p.id) !== projectId) };
        saveStoredPortfolio(next);
        return next;
      });
      await loadPortfolio();
    } catch (error) {
      console.error('Failed to delete project via API, using local storage fallback:', error);
      setData(prev => {
        const next = { ...prev, projects: (prev.projects || []).filter(p => (p._id || p.id) !== projectId) };
        saveStoredPortfolio(next);
        return next;
      });
    }
  };

  // --- Messages ---
  const addMessage = async (messageData) => {
    try {
      const newMessage = await messagesAPI.create(messageData);
      setData(prev => ({ ...prev, messages: [...prev.messages, newMessage] }));
      return newMessage;
    } catch (error) {
      console.error('Failed to add message:', error);
      throw error;
    }
  };

  const markMessageRead = async (messageId) => {
    try {
      const updatedMessage = await messagesAPI.markRead(messageId);
      setData(prev => ({
        ...prev,
        messages: prev.messages.map(m => m._id === messageId ? updatedMessage : m)
      }));
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await messagesAPI.delete(messageId);
      setData(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m._id !== messageId)
      }));
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  // --- Gallery ---
  const addGalleryImage = (imageData) => {
    const newImage = { ...imageData, id: Date.now().toString() };
    setData(prev => ({ ...prev, gallery: [...prev.gallery, newImage] }));
    // Sync gallery to backend
    updateSection('gallery', [...data.gallery, newImage]);
  };

  const deleteGalleryImage = (imageId) => {
    const updatedGallery = data.gallery.filter(img => img.id !== imageId);
    setData(prev => ({ ...prev, gallery: updatedGallery }));
    updateSection('gallery', updatedGallery);
  };

  // --- Auth ---
  const login = async (username, password) => {
    try {
      const user = await authAPI.login(username, password);
      setToken(user.token);
      setAdminUser(user);
      setIsAdmin(true);
      return user;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setAdminUser(null);
    setIsAdmin(false);
  };

  const value = {
    data,
    loading,
    isAdmin,
    adminUser,
    login,
    logout,
    toggleTheme,
    updateProfile,
    updateHero,
    updateAbout,
    updateSocialLinks,
    updateContact,
    addProject,
    updateProject,
    deleteProject,
    addMessage,
    markMessageRead,
    deleteMessage,
    addGalleryImage,
    deleteGalleryImage,
    refreshData: loadPortfolio,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};