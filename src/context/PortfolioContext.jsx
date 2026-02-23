import { createContext, useContext, useState, useEffect } from 'react';
import { initialData } from '../data/initialData';

const PortfolioContext = createContext();

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('portfolioData');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('isAdmin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('isAdmin', isAdmin);
  }, [isAdmin]);

  const login = (password) => {
    if (password === 'admin123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const updateProfile = (profile) => {
    setData((prev) => ({ ...prev, profile }));
  };

  const updateSocialLinks = (socialLinks) => {
    setData((prev) => ({ ...prev, socialLinks }));
  };

  const updateHero = (hero) => {
    setData((prev) => ({ ...prev, hero }));
  };

  const updateAbout = (about) => {
    setData((prev) => ({ ...prev, about }));
  };

  const updateSkills = (skills) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, skills },
    }));
  };

  const updateProjects = (projects) => {
    setData((prev) => ({ ...prev, projects }));
  };

  const addProject = (project) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...project, id: Date.now() }],
    }));
  };

  const updateProject = (id, updatedProject) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...updatedProject } : p
      ),
    }));
  };

  const deleteProject = (id) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateGallery = (gallery) => {
    setData((prev) => ({ ...prev, gallery }));
  };

  const addGalleryImage = (image) => {
    setData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, { ...image, id: Date.now() }],
    }));
  };

  const deleteGalleryImage = (id) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  const addMessage = (message) => {
    setData((prev) => ({
      ...prev,
      messages: [
        { ...message, id: Date.now(), date: new Date().toISOString().split('T')[0], read: false },
        ...prev.messages,
      ],
    }));
  };

  const markMessageRead = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) =>
        m.id === id ? { ...m, read: true } : m
      ),
    }));
  };

  const deleteMessage = (id) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  };

  const toggleTheme = () => {
    setData((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const value = {
    data,
    isAdmin,
    login,
    logout,
    updateProfile,
    updateSocialLinks,
    updateHero,
    updateAbout,
    updateSkills,
    updateProjects,
    addProject,
    updateProject,
    deleteProject,
    updateGallery,
    addGalleryImage,
    deleteGalleryImage,
    addMessage,
    markMessageRead,
    deleteMessage,
    toggleTheme,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
};
