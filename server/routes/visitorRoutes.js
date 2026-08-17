import express from 'express';
import Visitor from '../models/Visitor.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Record a visitor visit
// @route   POST /api/visitors
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      visitorId,
      name,
      source,
      username,
      country,
      device,
      browser,
      os,
      page,
      date,
      time,
      timestamp,
      returning,
    } = req.body;

    if (!visitorId) {
      return res.status(400).json({ message: 'visitorId is required' });
    }

    const visit = await Visitor.create({
      visitorId,
      name: name || 'Anonymous Visitor',
      source: source || 'Direct',
      username: username || null,
      country: country || 'Unknown',
      device: device || 'Desktop',
      browser: browser || 'Unknown',
      os: os || 'Unknown',
      page: page || 'Home',
      date: date || new Date().toISOString().split('T')[0],
      time: time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      timestamp: timestamp || Date.now(),
      returning: returning || false,
    });

    res.status(201).json(visit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get all visitors
// @route   GET /api/visitors
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ timestamp: -1 }).limit(1000);
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get visitor analytics
// @route   GET /api/visitors/analytics
// @access  Private
router.get('/analytics', protect, async (req, res) => {
  try {
    const visitors = await Visitor.find();

    // Total visits
    const totalVisits = visitors.length;

    // Unique visitors
    const uniqueVisitors = new Set(visitors.map(v => v.visitorId)).size;

    // Today's visitors
    const today = new Date().toISOString().split('T')[0];
    const todayVisits = visitors.filter(v => v.date === today).length;

    // Top sources
    const sourceCounts = {};
    visitors.forEach(v => {
      sourceCounts[v.source] = (sourceCounts[v.source] || 0) + 1;
    });
    const topSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Top countries
    const countryCounts = {};
    visitors.forEach(v => {
      countryCounts[v.country] = (countryCounts[v.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCounts)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Top pages
    const pageCounts = {};
    visitors.forEach(v => {
      pageCounts[v.page] = (pageCounts[v.page] || 0) + 1;
    });
    const topPages = Object.entries(pageCounts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    // Device breakdown
    const deviceCounts = {};
    visitors.forEach(v => {
      deviceCounts[v.device] = (deviceCounts[v.device] || 0) + 1;
    });
    const deviceBreakdown = Object.entries(deviceCounts).map(([device, count]) => ({ device, count }));

    // Browser breakdown
    const browserCounts = {};
    visitors.forEach(v => {
      browserCounts[v.browser] = (browserCounts[v.browser] || 0) + 1;
    });
    const browserBreakdown = Object.entries(browserCounts).map(([browser, count]) => ({ browser, count }));

    // Weekly visits (last 7 days)
    const weeklyVisits = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = visitors.filter(v => v.date === dateStr).length;
      weeklyVisits.push({ date: dateStr, count });
    }

    res.json({
      totalVisits,
      uniqueVisitors,
      todayVisits,
      topSources,
      topCountries,
      topPages,
      deviceBreakdown,
      browserBreakdown,
      weeklyVisits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get visitors in date range
// @route   GET /api/visitors/range?days=7
// @access  Private
router.get('/range', protect, async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
    const visitors = await Visitor.find({ timestamp: { $gte: cutoff } }).sort({ timestamp: -1 });
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;