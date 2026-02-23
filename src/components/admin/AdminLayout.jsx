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
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';

const AdminLayout = () => {
  const { data, logout, toggleTheme } = usePortfolio();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
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
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 className="text-white font-bold">Admin Panel</h1>
        <div className="w-10" />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } bg-gray-800 border-r border-gray-700 flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
          <span className={`font-bold text-white ${!isSidebarOpen && 'hidden'}`}>
            Admin Panel
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hidden lg:block text-gray-400 hover:text-white"
          >
            <ChevronLeft
              className={`w-5 h-5 transition-transform ${!isSidebarOpen && 'rotate-180'}`}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-gray-900'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    } ${!isSidebarOpen && 'justify-center'}`
                  }
                >
                  <item.icon size={20} />
                  <span className={!isSidebarOpen ? 'hidden' : ''}>
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
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors ${
              !isSidebarOpen && 'justify-center'
            }`}
          >
            {data.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className={!isSidebarOpen ? 'hidden' : ''}>
              {data.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors ${
              !isSidebarOpen && 'justify-center'
            }`}
          >
            <LogOut size={20} />
            <span className={!isSidebarOpen ? 'hidden' : ''}>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
        } pt-16 lg:pt-0`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
