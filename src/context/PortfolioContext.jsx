import { createContext, useContext, useState, useEffect } from 'react';

const PortfolioContext = createContext();

export const usePortfolio = () => useContext(PortfolioContext);

const initialData = {
  docId: 'main',
  profile: {
    name: "Tesfaye Kelbesa",
    title: "Full Stack Developer",
    tagline: "Building digital experiences",
    email: "tesfayekelbesa912@gmail.com",
    location: "Addis Ababa, Ethiopia",
    avatar: "/me.jpg",
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
      "🧩 Problem-Solving Mindset - I naturally enjoy breaking complicated problems into smaller, manageable pieces. Whether I'm debugging code, planning a project, or handling everyday challenges, I focus on understanding the root cause and finding practical solutions.",
      "📅 Consistency Over Motivation - I believe progress comes from consistent effort rather than waiting for motivation. I maintain daily habits of learning, coding, experimenting, and improving—even when the results aren't immediate.",
      "🎯 Building With Purpose - I don't want to write code simply because I can. I'm interested in understanding why something needs to be built and who it helps. I aim to create software that is useful, maintainable, and meaningful to its users.",
      "🤝 Independent Thinker & Collaborative Teammate - I'm comfortable exploring ideas independently, researching solutions, and taking ownership of my work. At the same time, I value teamwork, open communication, feedback, and learning from people with different experiences.",
      "🧘 Calm Under Pressure - I believe staying calm is one of the most valuable skills when facing difficult problems. When things don't go as planned, I take a step back, understand the situation, and approach the problem logically rather than reacting emotionally. This helps me make better decisions, solve problems effectively, and remain reliable when challenges arise."
    ],
    careerGoals: "",
  },
  projects: [],
  socialLinks: [],
  messages: [],
  gallery: [],
  theme: 'dark',
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    return { ...initialData, theme: savedTheme || 'dark' };
  });
  const [isAdmin, setIsAdmin] = useState(false);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('portfolio-theme', data.theme);
  }, [data.theme]);

  // --- Generic Update Function ---
  const updateSection = (section, sectionData) => {
    setData(prev => ({ ...prev, [section]: sectionData }));
  };

  // --- Specific Update Functions ---
  const updateProfile = (profileData) => updateSection('profile', profileData);
  const updateHero = (heroData) => updateSection('hero', heroData);
  const updateAbout = (aboutData) => updateSection('about', aboutData);
  const updateSocialLinks = (links) => updateSection('socialLinks', links);
  const toggleTheme = () => updateSection('theme', data.theme === 'dark' ? 'light' : 'dark');

  // --- Projects ---
  const addProject = (projectData) => {
    const newProject = { ...projectData, id: Date.now().toString() };
    setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const updateProject = (projectId, projectData) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projectId ? { ...projectData, id: projectId } : p)
    }));
  };

  const deleteProject = (projectId) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };

  // --- Auth (Client-side) ---
  const login = () => setIsAdmin(true);
  const logout = () => setIsAdmin(false);

  const value = {
    data,
    loading: false,
    isAdmin,
    login,
    logout,
    toggleTheme,
    updateProfile,
    updateHero,
    updateAbout,
    updateSocialLinks,
    addProject,
    updateProject,
    deleteProject,
    // Add other update functions here as you build them out
    // e.g., addMessage, deleteMessage, addGalleryImage, etc.
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};