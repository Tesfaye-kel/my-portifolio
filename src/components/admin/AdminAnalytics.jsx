import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Globe, Monitor, Clock, TrendingUp, Activity,
} from 'lucide-react';
import {
  getVisitors, getUniqueVisitors, getVisitorsInRange,
  getTodayVisitors, getTopSources, getTopCountries,
  getTopPages, getWeeklyVisits, getDeviceBreakdown,
  getBrowserBreakdown,
} from '../../utils/visitor';

const AdminAnalytics = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const loadVisitors = async () => {
      const data = await getVisitors();
      setVisitors(data);
    };
    loadVisitors();
  }, []);

  const totalVisitors = visitors.length;
  const uniqueVisitors = getUniqueVisitors(visitors);
  const todayVisitors = getTodayVisitors(visitors).length;
  const weeklyVisitors = getVisitorsInRange(visitors, 7).length;
  const monthlyVisitors = getVisitorsInRange(visitors, 30).length;
  const returningVisitors = visitors.filter(v => v.returning).length;

  const weeklyData = getWeeklyVisits(visitors);
  const topSources = getTopSources(visitors);
  const topCountries = getTopCountries(visitors);
  const topPages = getTopPages(visitors);
  const deviceBreakdown = getDeviceBreakdown(visitors);
  const browserBreakdown = getBrowserBreakdown(visitors);
  const recentVisitors = [...visitors].reverse().slice(0, 10);

  const maxWeekly = Math.max(...weeklyData.map(d => d.count), 1);
  const maxSource = Math.max(...topSources.map(s => s.count), 1);

  const statCards = [
    { label: 'Total Visits', value: totalVisitors, icon: Users, color: '#64ffda', bg: 'rgba(100,255,218,0.1)' },
    { label: 'Unique Visitors', value: uniqueVisitors, icon: Activity, color: '#60a5fa', bg: 'rgba(96,165,250,0.1)' },
    { label: 'Today', value: todayVisitors, icon: Clock, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
    { label: 'This Week', value: weeklyVisitors, icon: TrendingUp, color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
    { label: 'This Month', value: monthlyVisitors, icon: Globe, color: '#f472b6', bg: 'rgba(244,114,182,0.1)' },
    { label: 'Returning', value: returningVisitors, icon: Monitor, color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-2xl font-bold text-white font-mono">{'<Analytics />'}</h1>
        <p className="text-slate-500 text-sm font-mono mt-1">Visitor analytics and insights from your portfolio.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl bg-[#112240]/40 border border-[#233554]/50 p-5 hover:border-primary/30 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-mono">{stat.label}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className="p-3 rounded-xl" style={{ backgroundColor: stat.bg, color: stat.color }}>
                <stat.icon size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Weekly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="rounded-2xl bg-[#112240]/40 border border-[#233554]/50 p-6"
      >
        <h2 className="text-lg text-white font-semibold mb-6 flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          Weekly Visitors
        </h2>
        <div className="flex items-end gap-3 h-40">
          {weeklyData.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">{d.count}</span>
              <div
                className="w-full rounded-t-lg bg-gradient-to-t from-primary/20 to-primary/60 hover:from-primary/30 hover:to-primary transition-all"
                style={{ height: `${Math.max((d.count / maxWeekly) * 120, 4)}px` }}
              />
              <span className="text-[10px] text-slate-500 font-mono">{d.date.slice(5)}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Sources & Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl bg-[#112240]/40 border border-[#233554]/50 p-6"
        >
          <h2 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
            <Globe size={20} className="text-primary" />
            Top Sources
          </h2>
          {topSources.length > 0 ? (
            <div className="space-y-3">
              {topSources.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-slate-300 font-mono">{s.source}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#0a192f]/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary/40 to-primary"
                      style={{ width: `${(s.count / maxSource) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{s.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No data yet</p>
          )}
        </motion.div>

        {/* Top Countries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="rounded-2xl bg-[#112240]/40 border border-[#233554]/50 p-6"
        >
          <h2 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
            <Globe size={20} className="text-primary" />
            Top Countries
          </h2>
          {topCountries.length > 0 ? (
            <div className="space-y-3">
              {topCountries.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-slate-300 font-mono">{c.country}</span>
                  <div className="flex-1 h-2 rounded-full bg-[#0a192f]/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-400/40 to-blue-400"
                      style={{ width: `${(c.count / Math.max(...topCountries.map(x => x.count), 1)) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{c.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No data yet</p>
          )}
        </motion.div>
      </div>

      {/* Pages & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="rounded-2xl bg-[#112240]/40 border border-[#233554]/50 p-6"
        >
          <h2 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-primary" />
            Most Visited Pages
          </h2>
          {topPages.length > 0 ? (
            <div className="space-y-3">
              {topPages.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-300 font-mono">{p.page}</span>
                  <span className="text-xs text-slate-400 font-mono">{p.count} visits</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No data yet</p>
          )}
        </motion.div>

        {/* Devices & Browsers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="rounded-2xl bg-[#112240]/40 border border-[#233554]/50 p-6"
        >
          <h2 className="text-lg text-white font-semibold mb-4 flex items-center gap-2">
            <Monitor size={20} className="text-primary" />
            Devices & Browsers
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-mono text-slate-500 mb-2">Devices</p>
              <div className="flex flex-wrap gap-2">
                {deviceBreakdown.map((d, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 text-xs text-slate-300">
                    {d.device}: {d.count}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 mb-2">Browsers</p>
              <div className="flex flex-wrap gap-2">
                {browserBreakdown.map((b, i) => (
                  <span key={i} className="px-3 py-1 rounded-lg bg-[#0a192f]/60 border border-[#233554]/50 text-xs text-slate-300">
                    {b.browser}: {b.count}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Visitors Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="rounded-2xl bg-[#112240]/40 border border-[#233554]/50 overflow-hidden"
      >
        <div className="p-6 border-b border-[#233554]/50">
          <h2 className="text-lg text-white font-semibold flex items-center gap-2">
            <Users size={20} className="text-primary" />
            Recent Visitors
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0a192f]/60 border-b border-[#233554]/50">
                <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Name / Username</th>
                <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Source</th>
                <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Location</th>
                <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-500">IP / ISP</th>
                <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Device</th>
                <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Date</th>
                <th className="px-6 py-3 text-left text-xs font-mono uppercase tracking-wider text-slate-500">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentVisitors.length > 0 ? (
                recentVisitors.map((v, i) => (
                  <tr key={i} className="border-b border-[#233554]/30 hover:bg-primary/5 transition-colors">
                    <td className="px-6 py-3">
                      <div className="text-white text-sm">{v.name}</div>
                      {v.username && v.username !== v.name && (
                        <div className="text-primary text-xs font-mono mt-0.5">@{v.username}</div>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-1 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono">
                        {v.source}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="text-slate-400 text-sm">{v.country}</div>
                      {v.city && v.city !== 'Unknown' && (
                        <div className="text-slate-500 text-xs">{v.city}{v.region && v.region !== 'Unknown' ? `, ${v.region}` : ''}</div>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <div className="text-slate-400 text-sm font-mono">{v.ip}</div>
                      {v.isp && v.isp !== 'Unknown' && (
                        <div className="text-slate-500 text-xs">{v.isp}</div>
                      )}
                    </td>
                    <td className="px-6 py-3 text-slate-400 text-sm">{v.device}</td>
                    <td className="px-6 py-3 text-slate-400 text-sm font-mono">{v.date}</td>
                    <td className="px-6 py-3 text-slate-400 text-sm font-mono">{v.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">No visitors recorded yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;