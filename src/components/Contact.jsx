import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { 
  Mail, MapPin, Clock, Phone, Github, Linkedin, 
  Twitter, Facebook, Send, CheckCircle2, 
  Loader2, MessageSquare, ArrowUpRight
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { setVisitorName, getVisitorId } from '../utils/visitor';
import { visitorsAPI } from '../utils/api';

const Contact = () => {
  const { data, addMessage } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    setErrorMessage('');
    
    try {
      await addMessage(formData);
      // Save visitor name so future visits show their real name
      setVisitorName(formData.name);
      // Update past visitor records with the real name
      try {
        await visitorsAPI.updateName(getVisitorId(), formData.name);
      } catch (err) {
        console.error('Failed to update visitor name:', err);
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success state after 3 seconds
      setTimeout(() => setIsSuccess(false), 3000);
    } catch (error) {
      setIsSubmitting(false);
      setIsError(true);
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
      setTimeout(() => setIsError(false), 3000);
    }
  };
 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const adminContactInfo = data.about?.contactInfo || [];
  const adminEmail = adminContactInfo.find((item) => item.label?.toLowerCase().includes('email'));
  const adminLocation = adminContactInfo.find((item) => item.label?.toLowerCase().includes('location'));
  const phoneContact = adminContactInfo.find((item) => /phone|mobile|tel/i.test(item.label || '')) || {
    label: 'Phone',
    value: data.profile?.phone || '+251-912-345-678',
    href: ''
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: adminEmail?.value || data.profile?.email || 'tesfayekelbesa912@gmail.com',
      href: adminEmail?.href || `mailto:${data.profile?.email || 'tesfayekelbesa912@gmail.com'}`
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: adminLocation?.value || data.profile?.location || 'Addis Ababa, Ethiopia',
      href: adminLocation?.href || null
    },
    {
      icon: <Clock size={20} />,
      label: 'Availability',
      value: 'Open to opportunities',
      href: null,
      highlight: true
    },
    {
      icon: <Phone size={20} />,
      label: phoneContact.label,
      value: phoneContact.value,
      href: phoneContact.href || `tel:${phoneContact.value.replace(/[^\d+]/g, '')}`
    }
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Tesfaye-kel', icon: <Github size={20} /> },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: <Linkedin size={20} /> },
    { name: 'Twitter', url: 'https://x.com/tesftesfish', icon: <Twitter size={20} /> },
    { name: 'Facebook', url: 'https://web.facebook.com/profile.php?id=61558584585875', icon: <Facebook size={20} /> }
  ];

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/40 to-white/60 max-w-[80px]" />
            <h2 className="text-white font-mono text-base tracking-widest uppercase">Get In Touch</h2>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/40 to-white/60 max-w-[80px]" />
          </div>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Have a project in mind? Let's build something meaningful together.
            I'm currently looking for new opportunities and my inbox is always open.
          </p>
        </motion.div>

        <div className="grid min-w-0 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="min-w-0 w-full max-w-full"
          >
            <div className="min-w-0 w-full max-w-full overflow-hidden p-6 rounded-2xl bg-[#112240]/40 border border-[#233554]/50 mb-10">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="min-w-0 max-w-full flex items-center gap-4 p-4 rounded-xl border border-[#233554]/50 bg-[#112240]/40 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {info.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-slate-500 text-sm">{info.label}</p>
                    <p className="break-words text-sm text-slate-200">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8"
              >
                <h4 className="text-slate-500 text-sm font-mono mb-6">FIND ME ON</h4>
                <div className="flex max-w-full gap-4 overflow-hidden">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 rounded-xl bg-[#112240]/50 border border-[#233554]/50 text-slate-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

          </motion.div>

          {/* Right Column - Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="min-w-0"
          >
            <div className="p-8 rounded-2xl bg-[#112240]/40 border border-[#233554]/50 backdrop-blur-md">
              <h3 className="text-2xl font-bold text-slate-100 mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="name" className="block text-slate-400 text-sm font-mono mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="email" className="block text-slate-400 text-sm font-mono mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="message" className="block text-slate-400 text-sm font-mono mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-8 rounded-lg text-lg font-mono font-semibold transition-all duration-300 ${
                    isSubmitting 
                      ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                      : 'bg-primary text-[#0a192f] hover:bg-primary/90'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={20} />
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send size={20} />
                      Send Message
                    </span>
                  )}
                </motion.button>

                {/* Success/Error Messages */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400"
                    >
                      <CheckCircle2 size={20} />
                      <span>Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}
                  {isError && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400"
                    >
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>

            {/* Quick message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 p-6 rounded-xl bg-gradient-to-br from-[#112240]/60 to-[#0a192f]/60 border border-[#233554]/50"
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare size={20} className="text-primary" />
                <h4 className="font-semibold text-slate-100">Prefer a quick chat?</h4>
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Feel free to reach out directly via email. I typically respond within 24 hours.
              </p>
              <a
                href={contactInfo.find((info) => info.label === 'Email')?.href}
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-mono text-sm transition-colors"
              >
                Say Hello
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;