import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
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
  Sparkles,
  ChevronRight,
  Cpu,
  Brain,
  BarChart3,
  KeyRound,
} from 'lucide-react';
import LoginTransition from './LoginTransition';

const AdminLayout = () => {
  const { data, logout, toggleTheme } = usePortfolio();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExiting, setIsExiting] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleViewSite = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/');
    }, 500);
  };

  const navItems = [
    { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', color: '#64ffda' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics', color: '#fbbf24' },
    { path: '/admin/profile', icon: User, label: 'Profile', color: '#60a5fa' },
    { path: '/admin/social', icon: Link2, label: 'Social Links', color: '#a78bfa' },
    { path: '/admin/hero', icon: Home, label: 'Hero Section', color: '#fbbf24' },
    { path: '/admin/about', icon: FileText, label: 'About', color: '#34d399' },
    { path: '/admin/projects', icon: Code, label: 'Projects', color: '#f87171' },
    { path: '/admin/skills', icon: Cpu, label: 'Skills', color: '#38bdf8' },
    { path: '/admin/gallery', icon: Image, label: 'Gallery', color: '#f472b6' },
    { path: '/admin/messages', icon: MessageSquare, label: 'Messages', color: '#fb923c' },
    { path: '/admin/password', icon: KeyRound, label: 'Change Password', color: '#f472b6' },
  ];

  const unreadCount = data.messages?.filter((m) => !m.read).length || 0;
  const currentPage = navItems.find((item) => location.pathname.startsWith(item.path));

  return (
    <div className="min-h-screen bg-[#0a192f] relative">
      {/* Premium Background */}
      <div className="fixed inset-0 bg-[#0a192f]" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-[#020c1b]/60" />
      <div className="fixed inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(204,214,246,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(204,214,246,0.06) 1px, transparent 1px)', backgroundSize: '72px 72px' }} />

      {/* Fixed Left Sidebar - Glassmorphic */}
      <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-[#112240]/80 backdrop-blur-xl border-r border-[#233554]/50 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-[#233554]/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-mono font-bold text-white text-base">Admin</span>
              <p className="text-[10px] font-mono text-primary/60">Control Panel</p>
            </div>
          </div>
        </div>

        {/* Vertical Navigation */}
        <nav className="flex-1 py-5 overflow-y-auto px-3">
          <p className="px-3 pb-3 text-[10px] font-mono uppercase tracking-widest text-slate-500">Menu</p>
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'bg-primary/10 border border-primary/30 text-primary shadow-[0_0_20px_rgba(100,255,218,0.1)]'
                        : 'border border-transparent text-slate-400 hover:text-primary hover:bg-primary/5 hover:border-primary/20'
                    }`
                  }
                >
                  <item.icon size={18} style={{ color: item.color }} />
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.label === 'Messages' && unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-bold">
                      {unreadCount}
                    </span>
                  )}
                  <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#233554]/50 space-y-1">
          <button
            onClick={handleViewSite}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 hover:border hover:border-primary/20 border border-transparent transition-all duration-300"
          >
            <Globe size={18} className="text-primary" />
            <span className="text-sm font-medium">View Site</span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-primary hover:bg-primary/5 hover:border hover:border-primary/20 border border-transparent transition-all duration-300"
          >
            {data.theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-400" />}
            <span className="text-sm font-medium">{data.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:border hover:border-red-500/20 border border-transparent transition-all duration-300"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content - Always offset by sidebar width */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-primary text-sm">{'<'}</span>
              <h1 className="text-2xl font-bold text-white">{currentPage?.label || 'Dashboard'}</h1>
              <span className="font-mono text-primary text-sm">{'/>'}</span>
            </div>
            <p className="text-slate-500 text-sm font-mono">Manage your portfolio content</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="px-4 py-2 rounded-xl bg-[#112240]/60 border border-[#233554]/50 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-primary">System Online</span>
            </div>
          </div>
        </div>

        {/* Animated page content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Logo watermark */}
      <div className="fixed bottom-6 right-8 opacity-10 pointer-events-none select-none">
        <span className="font-mono text-5xl font-bold text-primary">{'<TK />'}</span>
      </div>
      <LoginTransition isActive={isExiting} text="Loading Site..." />
    </div>
  );
};

export default AdminLayout;