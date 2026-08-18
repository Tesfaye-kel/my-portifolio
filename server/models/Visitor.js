import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema({
  visitorId: { type: String, required: true },
  name: { type: String, default: 'Anonymous Visitor' },
  source: { type: String, default: 'Direct' },
  username: { type: String, default: null },
  country: { type: String, default: 'Unknown' },
  city: { type: String, default: 'Unknown' },
  region: { type: String, default: 'Unknown' },
  isp: { type: String, default: 'Unknown' },
  ip: { type: String, default: 'Unknown' },
  timezone: { type: String, default: 'Unknown' },
  device: { type: String, default: 'Desktop' },
  browser: { type: String, default: 'Unknown' },
  os: { type: String, default: 'Unknown' },
  page: { type: String, default: 'Home' },
  date: { type: String, default: '' },
  time: { type: String, default: '' },
  timestamp: { type: Number, default: Date.now },
  returning: { type: Boolean, default: false },
}, {
  timestamps: true,
});

// Index for faster queries
visitorSchema.index({ timestamp: -1 });
visitorSchema.index({ visitorId: 1 });
visitorSchema.index({ date: 1 });

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;