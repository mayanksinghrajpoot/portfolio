import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, Send, MapPin, CheckCircle2, AlertCircle, Loader2, Check, X } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative py-32 px-6 md:px-12 bg-[#050505] overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Contact Info */}
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-white text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8"
            >
              Let's <span className="text-pink-500">Connect</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg mb-12 max-w-md"
            >
              Want to collaborate on a cool project or just talk tech? I'm always open to interesting conversations and new opportunities.
            </motion.p>

            <div className="space-y-8">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-pink-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Email</p>
                  <a href="mailto:mayanksinghrajpoot01@gmail.com" className="text-white font-medium hover:text-pink-400 transition-colors">
                    mayanksinghrajpoot01@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-pink-500/50 transition-colors">
                  <MapPin className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Location</p>
                  <p className="text-white font-medium">Punjab, India <span className="text-zinc-500 text-sm">(Open to Remote)</span></p>
                </div>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:border-pink-500/50 transition-colors">
                  <MessageSquare className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Socials</p>
                  <div className="flex gap-4 mt-2">
                    <a
                      href="https://github.com/mayanksinghrajpoot"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      <Github className="w-5 h-5" /> GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/mayanksinghrajpoot/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-medium"
                    >
                      <Linkedin className="w-5 h-5" /> LinkedIn
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-zinc-900/50 p-8 md:p-12 rounded-[2rem] border border-zinc-800 backdrop-blur-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Status banners */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      Message sent! I'll get back to you within 24 hours.
                    </div>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-2 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      Failed to send. Email me directly at mayanksinghrajpoot01@gmail.com
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="text-zinc-500 text-xs uppercase tracking-widest font-bold ml-1">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  disabled={status === 'sending'}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-pink-500/50 transition-colors disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-zinc-500 text-xs uppercase tracking-widest font-bold ml-1">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  disabled={status === 'sending'}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-pink-500/50 transition-colors disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-zinc-500 text-xs uppercase tracking-widest font-bold ml-1">Message</label>
                <textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share your thoughts or ideas..."
                  rows="4"
                  disabled={status === 'sending'}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-pink-500/50 transition-colors resize-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 group"
              >
                {status === 'idle' && (
                  <><span>Send Message</span><Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                )}
                {status === 'sending' && (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
                )}
                {status === 'success' && (
                  <><Check className="w-4 h-4" /><span>Message Sent!</span></>
                )}
                {status === 'error' && (
                  <><X className="w-4 h-4" /><span>Failed — Try Again</span></>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
