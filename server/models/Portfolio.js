import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  title: { type: String, default: '' },
  tagline: { type: String, default: '' },
  email: { type: String, default: '' },
  location: { type: String, default: '' },
  avatar: { type: String, default: '' },
}, { _id: false });

const heroSchema = new mongoose.Schema({
  greeting: { type: String, default: '' },
  name: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  description: { type: String, default: '' },
  background: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  ctaLink: { type: String, default: '' },
}, { _id: false });

const skillSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  percentage: { type: Number, default: 0 },
}, { _id: false });

const aboutSchema = new mongoose.Schema({
  introduction: { type: String, default: '' },
  cvUrl: { type: String, default: '' },
  technicalSkills: [skillSchema],
  tools: [String],
  softSkills: [String],
  experience: [mongoose.Schema.Types.Mixed],
  education: [String],
  whatMakesMeDifferent: [String],
  careerGoals: { type: String, default: '' },
}, { _id: false });

const socialLinkSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  url: { type: String, default: '' },
  icon: { type: String, default: '' },
}, { _id: false });

const galleryImageSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  url: { type: String, default: '' },
}, { _id: false });

const contactSchema = new mongoose.Schema({
  email: { type: String, default: '' },
  description: { type: String, default: '' },
}, { _id: false });

const portfolioSchema = new mongoose.Schema({
  docId: { type: String, default: 'main', unique: true },
  profile: profileSchema,
  hero: heroSchema,
  about: aboutSchema,
  socialLinks: [socialLinkSchema],
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  gallery: [galleryImageSchema],
  contact: contactSchema,
  theme: { type: String, default: 'dark' },
}, {
  timestamps: true,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

export default Portfolio;