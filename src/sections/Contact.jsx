import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MessageSquare, Send, MapPin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the data. In a real app, this would send an email.
    console.log('Form Submitted:', formData);
    alert('Thank you for reaching out! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
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
              Want to collaborate on a cool experiment or just talk tech? I'm always down for interesting conversations and new ideas.
            </motion.p>

            <div className="space-y-8">
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
                  <p className="text-white font-medium">mayank.singh@example.com</p>
                </div>
              </motion.div>

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
                  <div className="flex gap-4 mt-1">
                    <a href="https://github.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
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
              <div className="space-y-2">
                <label className="text-zinc-500 text-xs uppercase tracking-widest font-bold ml-1">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-pink-500/50 transition-colors"
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
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-pink-500/50 transition-colors"
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
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-pink-500/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors group"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
