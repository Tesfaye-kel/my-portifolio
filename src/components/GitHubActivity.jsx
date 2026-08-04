import { motion } from 'framer-motion';
import { useState } from 'react';
import { Github, Star, GitFork, Users, GitCommit, Code2 } from 'lucide-react';

// --- GitHub Contribution Graph ---
const GitHubContributionGraph = () => {
  const [hoveredDay, setHoveredDay] = useState(null);
  
  const weeks = 52;
  const days = 7;
  
  // Deterministic pseudo-random generation based on position
  const getContributionLevel = (week, day) => {
    const seed = ((week * 7 + day) * 2654435761) % 100;
    if (seed < 30) return 0;
    if (seed < 55) return 1;
    if (seed < 75) return 2;
    if (seed < 90) return 3;
    return 4;
  };
  
  const levelColors = [
    'bg-[#1e293b]',
    'bg-primary/20',
    'bg-primary/40',
    'bg-primary/60',
    'bg-primary/90',
  ];

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Github size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">GitHub Activity</h3>
            <p className="text-xs text-slate-500 font-mono">@Tesfaye-kel</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Star size={12} /> 12</span>
          <span className="flex items-center gap-1"><GitFork size={12} /> 8</span>
          <span className="flex items-center gap-1"><Users size={12} /> 5</span>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[600px]">
          {/* Month labels */}
          <div className="flex justify-between mb-2 px-1">
            {monthLabels.map((month, i) => (
              <span key={i} className="text-[10px] text-slate-600 font-mono">{month}</span>
            ))}
          </div>
          
          {/* Graph grid */}
          <div className="flex gap-[3px]">
            {Array.from({ length: weeks }).map((_, week) => (
              <div key={week} className="flex flex-col gap-[3px] flex-1">
                {Array.from({ length: days }).map((_, day) => {
                  const level = getContributionLevel(week, day);
                  const isHovered = hoveredDay === `${week}-${day}`;
                  return (
                    <motion.div
                      key={day}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.2, delay: (week * 0.005) + (day * 0.01) }}
                      onMouseEnter={() => setHoveredDay(`${week}-${day}`)}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`w-full aspect-square rounded-[2px] ${levelColors[level]} ${
                        isHovered ? 'ring-2 ring-primary/50 scale-125 z-10' : ''
                      } transition-all duration-150 cursor-pointer`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-end gap-1 mt-3 text-[10px] text-slate-600">
            <span>Less</span>
            {levelColors.map((color, i) => (
              <div key={i} className={`w-3 h-3 rounded-[2px] ${color}`} />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#233554]/50">
        <div className="text-center">
          <p className="text-2xl font-bold gradient-text">156</p>
          <p className="text-xs text-slate-500 font-mono mt-1">Contributions</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold gradient-text">10+</p>
          <p className="text-xs text-slate-500 font-mono mt-1">Repositories</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold gradient-text">3</p>
          <p className="text-xs text-slate-500 font-mono mt-1">Languages</p>
        </div>
      </div>
    </div>
  );
};

// --- Language Distribution ---
const LanguageDistribution = () => {
  const languages = [
    { name: 'JavaScript', percentage: 45, color: '#f7df1e' },
    { name: 'TypeScript', percentage: 20, color: '#3178c6' },
    { name: 'HTML/CSS', percentage: 20, color: '#e34c26' },
    { name: 'Python', percentage: 10, color: '#3776ab' },
    { name: 'Other', percentage: 5, color: '#8892b0' },
  ];

  return (
    <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Code2 size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Language Distribution</h3>
          <p className="text-xs text-slate-500 font-mono">Across repositories</p>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {languages.map((lang, i) => {
            const offset = languages.slice(0, i).reduce((sum, l) => sum + l.percentage, 0);
            const circumference = 2 * Math.PI * 40;
            const dashLength = (lang.percentage / 100) * circumference;
            return (
              <circle
                key={i}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={lang.color}
                strokeWidth="12"
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={-((offset / 100) * circumference)}
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-slate-100">10+</p>
            <p className="text-xs text-slate-500 font-mono">Repos</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {languages.map((lang, i) => (
          <div key={i} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: lang.color }} />
              <span className="text-slate-300">{lang.name}</span>
            </div>
            <span className="text-slate-500 font-mono text-xs">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Commit Activity ---
const CommitActivity = () => {
  const commits = [
    { day: 'Mon', count: 8 },
    { day: 'Tue', count: 12 },
    { day: 'Wed', count: 6 },
    { day: 'Thu', count: 15 },
    { day: 'Fri', count: 10 },
    { day: 'Sat', count: 4 },
    { day: 'Sun', count: 2 },
  ];

  const maxCount = Math.max(...commits.map(c => c.count));

  return (
    <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <GitCommit size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Commit Activity</h3>
          <p className="text-xs text-slate-500 font-mono">Weekly pattern</p>
        </div>
      </div>

      <div className="flex items-end justify-between gap-3 h-32">
        {commits.map((commit, i) => (
          <div key={i} className="flex flex-col items-center gap-2 flex-1">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(commit.count / maxCount) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
              className="w-full rounded-t-lg bg-gradient-to-t from-primary/20 to-primary/60 hover:from-primary/40 hover:to-primary transition-colors"
              style={{ minHeight: '8px' }}
            />
            <span className="text-[10px] text-slate-500 font-mono">{commit.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#233554]/50">
        <p className="text-center text-xs text-slate-500 font-mono">
          Most active on <span className="text-primary">Thursdays</span> · {maxCount} commits/day
        </p>
      </div>
    </div>
  );
};

// --- Main Export ---
const GitHubActivity = () => {
  return (
    <div className="space-y-6">
      <GitHubContributionGraph />
      <div className="grid md:grid-cols-2 gap-6">
        <LanguageDistribution />
        <CommitActivity />
      </div>
    </div>
  );
};

export default GitHubActivity;