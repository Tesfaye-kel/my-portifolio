import { createContext, useContext, useState } from 'react';

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
    whatMakesMeDifferent: [],
    careerGoals: "",
  },
  projects: [],
  socialLinks: [],
  messages: [],
  gallery: [],
  theme: 'dark',
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(initialData);
  const [isAdmin, setIsAdmin] = useState(false);

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