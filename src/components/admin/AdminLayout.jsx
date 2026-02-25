import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  LayoutDashboard,
  User,
  Link2,
  Home,
  FileText,
  Code,
  Image,
  MessageSquare,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';

const AdminLayout = () => {
  const { data, logout, toggleTheme } = usePortfolio();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/profile', icon: User, label: 'Profile' },
    { path: '/admin/social', icon: Link2, label: 'Social Links' },
    { path: '/admin/hero', icon: Home, label: 'Hero Section' },
    { path: '/admin/about', icon: FileText, label: 'About' },
    { path: '/admin/projects', icon: Code, label: 'Projects' },
    { path: '/admin/skills', icon: Code, label: 'Skills' },
    { path: '/admin/gallery', icon: Image, label: 'Gallery' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages' },
  ];

  const unreadCount = data.messages?.filter((m) => !m.read).length || 0;

  return (
    <div className={`min-h-screen ${data.theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* Fixed Left Sidebar - Vertical Navigation */}
      <aside
        className="fixed top-0 left-0 z-40 h-screen w-64 bg-gray-800 border-r border-gray-700 flex flex-col"
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-gray-700">
          <span className="font-bold text-white text-lg">
            Admin Panel
          </span>
        </div>

        {/* Vertical Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-gray-900 font-medium'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  <item.icon size={20} />
                  <span>
                    {item.label}
                    {item.label === 'Messages' && unreadCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-700 space-y-2">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
          >
            {data.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span>
              {data.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content - Always offset by sidebar width */}
      <main className="ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
