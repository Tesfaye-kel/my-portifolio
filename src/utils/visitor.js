// Visitor tracking utility - sends data to backend API
// Tracks referral source, device, browser, OS, country, page visits

import { visitorsAPI } from './api';

const VISITOR_ID_KEY = 'portfolio_visitor_id';
const FIRST_VISIT_KEY = 'portfolio_first_visit';

// Detect referral source from document.referrer
export const detectSource = () => {
  const referrer = document.referrer || '';
  
  if (!referrer) return 'Direct';
  
  try {
    const url = new URL(referrer);
    const host = url.hostname.toLowerCase();
    
    if (host.includes('linkedin.com')) return 'LinkedIn';
    if (host.includes('github.com')) return 'GitHub';
    if (host.includes('facebook.com') || host.includes('fb.com')) return 'Facebook';
    if (host.includes('google.com') || host.includes('google.co')) return 'Google';
    if (host.includes('twitter.com') || host.includes('x.com')) return 'Twitter';
    if (host.includes('t.me') || host.includes('telegram.org')) return 'Telegram';
    if (host.includes('instagram.com')) return 'Instagram';
    if (host.includes('youtube.com')) return 'YouTube';
    if (host.includes('whatsapp.com')) return 'WhatsApp';
    if (host.includes('reddit.com')) return 'Reddit';
    if (host.includes('medium.com')) return 'Medium';
    if (host.includes('dev.to')) return 'Dev.to';
    if (host.includes('stackoverflow.com')) return 'Stack Overflow';
    
    return host.replace('www.', '');
  } catch {
    return 'unknown';
  }
};

// Detect device type
export const detectDevice = () => {
  const ua = navigator.userAgent;
  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'Tablet';
  if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'Mobile';
  return 'Desktop';
};

// Detect browser
export const detectBrowser = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('Chrome/')) return 'Chrome';
  if (ua.includes('Firefox/')) return 'Firefox';
  if (ua.includes('Safari/')) return 'Safari';
  if (ua.includes('Opera/') || ua.includes('OPR/')) return 'Opera';
  if (ua.includes('MSIE') || ua.includes('Trident/')) return 'Internet Explorer';
  return 'Unknown';
};

// Detect operating system
export const detectOS = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac OS')) return 'macOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  if (ua.includes('Linux')) return 'Linux';
  if (ua.includes('CrOS')) return 'Chrome OS';
  return 'Unknown';
};

// Get country via free IP geolocation API
export const getCountry = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) return 'Unknown';
    const data = await response.json();
    return data.country_name || 'Unknown';
  } catch {
    return 'Unknown';
  }
};

// Get or create visitor ID
export const getVisitorId = () => {
  let id = localStorage.getItem(VISITOR_ID_KEY);
  if (!id) {
    id = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(VISITOR_ID_KEY, id);
  }
  return id;
};

// Check if returning visitor
export const isReturningVisitor = () => {
  return !!localStorage.getItem(FIRST_VISIT_KEY);
};

// Get current page name from path
export const getCurrentPage = () => {
  const path = window.location.pathname;
  if (path.includes('/admin')) return 'Admin';
  if (path.includes('/project/')) return `Project: ${path.split('/').pop()}`;
  return 'Home';
};

// Record a visitor visit - sends to backend
export const recordVisit = async () => {
  try {
    const visitorId = getVisitorId();
    const returning = isReturningVisitor();
    
    // Mark as returning for future visits
    if (!returning) {
      localStorage.setItem(FIRST_VISIT_KEY, new Date().toISOString());
    }
    
    const country = await getCountry();
    
    const visit = {
      visitorId,
      name: 'Anonymous Visitor',
      source: detectSource(),
      username: null,
      country,
      device: detectDevice(),
      browser: detectBrowser(),
      os: detectOS(),
      page: getCurrentPage(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: Date.now(),
      returning,
    };
    
    // Send to backend
    try {
      await visitorsAPI.record(visit);
    } catch (error) {
      console.error('Failed to record visit to backend:', error);
    }
    
    return visit;
  } catch (error) {
    console.error('Failed to record visit:', error);
    return null;
  }
};

// Get all recorded visitors from backend
export const getVisitors = async () => {
  try {
    return await visitorsAPI.getAll();
  } catch {
    return [];
  }
};

// Get unique visitors count
export const getUniqueVisitors = (visitors) => {
  return new Set(visitors.map(v => v.visitorId)).size;
};

// Get visitors for a date range
export const getVisitorsInRange = (visitors, days) => {
  const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
  return visitors.filter(v => new Date(v.timestamp).getTime() >= cutoff);
};

// Get today's visitors
export const getTodayVisitors = (visitors) => {
  const today = new Date().toISOString().split('T')[0];
  return visitors.filter(v => v.date === today);
};

// Get top sources
export const getTopSources = (visitors) => {
  const counts = {};
  visitors.forEach(v => {
    counts[v.source] = (counts[v.source] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
};

// Get top countries
export const getTopCountries = (visitors) => {
  const counts = {};
  visitors.forEach(v => {
    counts[v.country] = (counts[v.country] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
};

// Get most visited pages
export const getTopPages = (visitors) => {
  const counts = {};
  visitors.forEach(v => {
    counts[v.page] = (counts[v.page] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([page, count]) => ({ page, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
};

// Get device breakdown
export const getDeviceBreakdown = (visitors) => {
  const counts = {};
  visitors.forEach(v => {
    counts[v.device] = (counts[v.device] || 0) + 1;
  });
  return Object.entries(counts).map(([device, count]) => ({ device, count }));
};

// Get browser breakdown
export const getBrowserBreakdown = (visitors) => {
  const counts = {};
  visitors.forEach(v => {
    counts[v.browser] = (counts[v.browser] || 0) + 1;
  });
  return Object.entries(counts).map(([browser, count]) => ({ browser, count }));
};

// Get weekly visitor counts (last 7 days)
export const getWeeklyVisits = (visitors) => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const count = visitors.filter(v => v.date === dateStr).length;
    days.push({ date: dateStr, count });
  }
  return days;
};