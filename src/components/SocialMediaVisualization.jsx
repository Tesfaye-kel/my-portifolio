import { motion } from 'framer-motion';
import { useState } from 'react';
import { Github, Linkedin, Twitter, Facebook, Share2, MessageCircle, Eye, ThumbsUp } from 'lucide-react';

// --- Social Media Presence Visualization ---
const SocialMediaVisualization = () => {
  const [activePlatform, setActivePlatform] = useState('github');
  const [hoveredPost, setHoveredPost] = useState(null);

  const platforms = [
    { id: 'github', name: 'GitHub', icon: <Github size={18} />, color: '#64ffda', followers: '10+ repos', posts: '156 contributions' },
    { id: 'linkedin', name: 'LinkedIn', icon: <Linkedin size={18} />, color: '#0a66c2', followers: '500+ connections', posts: 'Professional network' },
    { id: 'twitter', name: 'Twitter/X', icon: <Twitter size={18} />, color: '#1da1f2', followers: '100+ followers', posts: 'Tech insights' },
    { id: 'facebook', name: 'Facebook', icon: <Facebook size={18} />, color: '#1877f2', followers: '200+ friends', posts: 'Personal updates' },
  ];

  const posts = [
    {
      id: 1,
      platform: 'github',
      title: 'Built Zenivial Social Network',
      content: 'Just shipped a full MERN stack social media platform with real-time messaging! 🚀',
      likes: 45,
      comments: 12,
      views: 230,
      time: '2 days ago',
    },
    {
      id: 2,
      platform: 'linkedin',
      title: 'Open to Opportunities',
      content: 'I\'m excited to share that I\'m open to new opportunities as a Full Stack Developer!',
      likes: 89,
      comments: 23,
      views: 1200,
      time: '1 week ago',
    },
    {
      id: 3,
      platform: 'twitter',
      title: 'Learning TypeScript',
      content: 'Day 15 of learning TypeScript. The type system is a game changer! 💪 #TypeScript #WebDev',
      likes: 34,
      comments: 8,
      views: 450,
      time: '3 days ago',
    },
    {
      id: 4,
      platform: 'facebook',
      title: 'Restaurant Management System',
      content: 'Proud of my latest project - a complete restaurant management system! 🍽️',
      likes: 67,
      comments: 15,
      views: 890,
      time: '5 days ago',
    },
  ];

  const activePlatformData = platforms.find(p => p.id === activePlatform);
  const platformPosts = posts.filter(p => p.platform === activePlatform);

  return (
    <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Share2 size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Social Media Presence</h3>
          <p className="text-xs text-slate-500 font-mono">Where I share my work</p>
        </div>
      </div>

      {/* Platform Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setActivePlatform(platform.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
              activePlatform === platform.id
                ? 'bg-primary/10 border border-primary/30 text-primary'
                : 'bg-[#0a192f]/60 border border-[#233554]/50 text-slate-400 hover:text-primary hover:border-primary/30'
            }`}
          >
            <span style={{ color: platform.color }}>{platform.icon}</span>
            <span className="font-mono text-xs">{platform.name}</span>
          </button>
        ))}
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50">
          <p className="text-xs text-slate-500 font-mono mb-1">Reach</p>
          <p className="text-lg font-semibold text-slate-100">{activePlatformData?.followers}</p>
        </div>
        <div className="p-4 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50">
          <p className="text-xs text-slate-500 font-mono mb-1">Activity</p>
          <p className="text-lg font-semibold text-slate-100">{activePlatformData?.posts}</p>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {platformPosts.length > 0 ? (
          platformPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                hoveredPost === post.id
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-[#0a192f]/60 border-[#233554]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-slate-500">{post.time}</span>
                <span className="text-xs text-slate-500">{post.title}</span>
              </div>
              <p className="text-sm text-slate-300 mb-3">{post.content}</p>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1"><ThumbsUp size={12} className="text-primary" /> {post.likes}</span>
                <span className="flex items-center gap-1"><MessageCircle size={12} /> {post.comments}</span>
                <span className="flex items-center gap-1"><Eye size={12} /> {post.views}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-slate-500">
            <p className="font-mono text-sm">No recent posts on this platform</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaVisualization;