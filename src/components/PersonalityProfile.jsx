import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Brain, Coffee, Music, BookOpen, Code2, 
  Gamepad2, Camera, Globe, Zap, 
  Users, Compass, Dumbbell, Plane
} from 'lucide-react';

// --- Personality Traits Radar ---
const PersonalityRadar = () => {
  const traits = [
    { label: 'Problem Solving', value: 90 },
    { label: 'Creativity', value: 85 },
    { label: 'Communication', value: 80 },
    { label: 'Teamwork', value: 88 },
    { label: 'Adaptability', value: 92 },
    { label: 'Leadership', value: 75 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = 100;
  const angleStep = (Math.PI * 2) / traits.length;

  const getPoint = (index, value) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = traits.map((trait, i) => {
    const point = getPoint(i, trait.value);
    return `${point.x},${point.y}`;
  }).join(' ');

  return (
    <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Brain size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Personality Radar</h3>
          <p className="text-xs text-slate-500 font-mono">Core traits</p>
        </div>
      </div>

      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          {/* Grid rings */}
          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
            <polygon
              key={i}
              points={traits.map((_, j) => {
                const point = getPoint(j, scale * 100);
                return `${point.x},${point.y}`;
              }).join(' ')}
              fill="none"
              stroke="#233554"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}

          {/* Axis lines */}
          {traits.map((_, i) => {
            const point = getPoint(i, 100);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={point.x}
                y2={point.y}
                stroke="#233554"
                strokeWidth="0.5"
                opacity="0.5"
              />
            );
          })}

          {/* Data polygon */}
          <motion.polygon
            points={polygonPoints}
            fill="rgba(100, 255, 218, 0.15)"
            stroke="#64ffda"
            strokeWidth="2"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />

          {/* Data points */}
          {traits.map((trait, i) => {
            const point = getPoint(i, trait.value);
            return (
              <motion.circle
                key={i}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#64ffda"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Labels */}
        {traits.map((trait, i) => {
          const point = getPoint(i, 120);
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
              style={{ left: point.x, top: point.y }}
            >
              <span className="text-[10px] font-mono text-slate-400 whitespace-nowrap">
                {trait.label}
              </span>
              <span className="block text-[10px] font-mono text-primary">{trait.value}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- Interests & Hobbies ---
const InterestsGrid = () => {
  const [activeInterest, setActiveInterest] = useState(null);

  const interests = [
    { icon: <Code2 size={20} />, label: 'Coding', desc: 'Building things that live on the internet', color: '#64ffda' },
    { icon: <Coffee size={20} />, label: 'Coffee', desc: 'Fuel for late-night debugging sessions', color: '#d97706' },
    { icon: <Music size={20} />, label: 'Music', desc: 'The soundtrack to my development flow', color: '#8b5cf6' },
    { icon: <BookOpen size={20} />, label: 'Learning', desc: 'Always exploring new technologies', color: '#3b82f6' },
    { icon: <Gamepad2 size={20} />, label: 'Gaming', desc: 'Strategy games sharpen my problem-solving', color: '#ef4444' },
    { icon: <Camera size={20} />, label: 'Photography', desc: 'Capturing moments and perspectives', color: '#f59e0b' },
    { icon: <Globe size={20} />, label: 'Travel', desc: 'Exploring new places and cultures', color: '#10b981' },
    { icon: <Dumbbell size={20} />, label: 'Fitness', desc: 'Keeping the body and mind sharp', color: '#f97316' },
    { icon: <Plane size={20} />, label: 'Adventure', desc: 'Seeking new challenges and experiences', color: '#06b6d4' },
  ];

  return (
    <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Compass size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Interests & Hobbies</h3>
          <p className="text-xs text-slate-500 font-mono">Beyond the code</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {interests.map((interest, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            onMouseEnter={() => setActiveInterest(i)}
            onMouseLeave={() => setActiveInterest(null)}
            className={`p-3 rounded-lg border transition-all duration-300 ${
              activeInterest === i
                ? 'bg-primary/10 border-primary/30 scale-105'
                : 'bg-[#0a192f]/60 border-[#233554]/50 hover:border-primary/30'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <span style={{ color: interest.color }}>{interest.icon}</span>
              <span className="text-xs font-mono text-slate-300">{interest.label}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Active interest description */}
      <div className="mt-4 min-h-[60px]">
        {activeInterest !== null ? (
          <motion.div
            key={activeInterest}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50"
          >
            <p className="text-sm text-slate-300">{interests[activeInterest].desc}</p>
          </motion.div>
        ) : (
          <p className="text-center text-xs text-slate-600 font-mono py-3">
            Hover over an interest to learn more
          </p>
        )}
      </div>
    </div>
  );
};

// --- Daily Habits ---
const DailyHabits = () => {
  const habits = [
    { icon: <Code2 size={16} />, label: 'Code', time: '4-6 hrs', color: '#64ffda' },
    { icon: <BookOpen size={16} />, label: 'Learn', time: '1-2 hrs', color: '#3b82f6' },
    { icon: <Coffee size={16} />, label: 'Coffee', time: '3 cups', color: '#d97706' },
    { icon: <Music size={16} />, label: 'Music', time: '2 hrs', color: '#8b5cf6' },
    { icon: <Dumbbell size={16} />, label: 'Exercise', time: '1 hr', color: '#f97316' },
    { icon: <Users size={16} />, label: 'Connect', time: '1 hr', color: '#10b981' },
  ];

  return (
    <div className="p-6 rounded-xl bg-[#112240]/40 border border-[#233554]/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Zap size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-slate-100">Daily Habits</h3>
          <p className="text-xs text-slate-500 font-mono">A typical day</p>
        </div>
      </div>

      <div className="space-y-3">
        {habits.map((habit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center justify-between p-3 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span style={{ color: habit.color }}>{habit.icon}</span>
              <span className="text-sm text-slate-300">{habit.label}</span>
            </div>
            <span className="text-xs font-mono text-primary">{habit.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Main Export ---
const PersonalityProfile = () => {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <PersonalityRadar />
        <InterestsGrid />
      </div>
      <DailyHabits />
    </div>
  );
};

export default PersonalityProfile;