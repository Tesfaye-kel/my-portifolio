import { usePortfolio } from '../../context/PortfolioContext';
import { motion } from 'framer-motion';
import {
  Code,
  Image,
  MessageSquare,
  Link2,
  Users,
  Star,
  GitBranch,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

const Dashboard = () => {
  const { data } = usePortfolio();

  const stats = [
    {
      label: 'Total Projects',
      value: data.projects?.length || 0,
      icon: Code,
      color: '#64ffda',
      bg: 'rgba(100,255,218,0.1)',
    },
    {
      label: 'Gallery Images',
      value: data.gallery?.length || 0,
      icon: Image,
      color: '#f472b6',
      bg: 'rgba(244,114,182,0.1)',
    },
    {
      label: 'Unread Messages',
      value: data.messages?.filter((m) => !m.read).length || 0,
      icon: MessageSquare,
      color: '#fb923c',
      bg: 'rgba(251,146,60,0.1)',
    },
    {
      label: 'Social Links',
      value: data.socialLinks?.length || 0,
      icon: Link2,
      color: '#a78bfa',
      bg: 'rgba(167,139,250,0.1)',
    },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#112240]/80 to-[#0a192f]/80 border border-[#233554]/50 p-8 mb-8"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
              Welcome Back
            </span>
            <span className="px-3 py-1 rounded-full bg-[#0a192f]/60 border border-[#233554]/50 text-slate-400 text-xs font-mono">
              Admin Panel
            </span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
          <p className="text-slate-400 max-w-lg">Here's a snapshot of your portfolio's current state and recent activity.</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-[#112240]/40 border border-[#233554]/50 p-6 hover:border-primary/30 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-mono">{stat.label}</p>
                <p className="text-4xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: stat.bg, color: stat.color }}>
                <stat.icon size={28} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-8"
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Add Project', icon: Code, color: '#64ffda' },
            { label: 'Upload Image', icon: Image, color: '#f472b6' },
            { label: 'View Messages', icon: MessageSquare, color: '#fb923c' },
            { label: 'Edit Profile', icon: Users, color: '#60a5fa' },
          ].map((action, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-[#112240]/40 border border-[#233554]/50 hover:border-primary/30 cursor-pointer transition-all duration-300"
            >
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${action.color}15`, color: action.color }}>
                <action.icon size={20} />
              </div>
              <span className="text-sm text-slate-300 font-medium flex-1">{action.label}</span>
              <ArrowRight size={16} className="text-slate-500" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Messages Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MessageSquare size={20} className="text-primary" />
          Recent Messages
        </h2>
        <div className="rounded-xl bg-[#112240]/40 border border-[#233554]/50 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0a192f]/60 border-b border-[#233554]/50">
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Name</th>
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Email</th>
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Message</th>
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-6 py-4 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.messages && data.messages.length > 0 ? (
                data.messages.slice(0, 5).map((message, index) => (
                  <tr key={message._id || message.id} className="border-b border-[#233554]/30 hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-4 text-white text-sm">{message.name}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{message.email}</td>
                    <td className="px-6 py-4 text-slate-300 text-sm max-w-[300px] truncate">{message.message}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm font-mono">{message.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        message.read 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/30'
                      }`}>
                        {message.read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">No messages yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;