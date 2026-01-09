import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { motion, useScroll, useSpring } from 'framer-motion';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// This is the footer at the bottom of the website
const Footer = () => (
  <footer className="py-10 pb-40 md:pb-10 border-t border-white/5 text-center text-gray-400 text-sm">
    <div className="flex justify-center space-x-6 mb-4">
      <a href="https://github.com/Lokistark" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
      <a href="https://www.linkedin.com/in/loki-merndev" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
      <a href="/admin/login" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">Admin</a>
    </div>
    <p>© {new Date().getFullYear()} Logeshwaran. Built with MERN & Tailwind CSS.</p>
  </footer>
);

// This is where my main portfolio pages are
const MainPortfolio = () => {
  // to show the progress bar at the top
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#050505] min-h-screen text-white selection:bg-indigo-500/30 overflow-x-hidden w-full relative">
      <div className="max-w-[100vw] overflow-x-hidden">
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[60]"
          style={{ scaleX }}
        />

        <Navbar />

        <main className="relative">
          <Hero />

          {/* About Section */}
          <section id="about" className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-block mb-10"
                >
                  <div className="glass p-6 rounded-2xl animate-pulse">
                    <p className="text-3xl font-bold gradient-text uppercase tracking-widest">Fresher</p>
                    <p className="text-xs uppercase tracking-widest text-gray-400">Ready to Build</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6">Hello, I'm <span className="gradient-text">Logeshwaran</span></h2>
                  <h3 className="text-xl md:text-2xl font-bold mb-6 text-indigo-400">Passionate MERN Stack Developer</h3>
                  <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                    I am a dedicated MERN Stack Developer with a strong foundation in building modern, responsive web applications.
                    I focus on creating seamless user experiences and robust backend systems using the latest industry standards.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
                    {[
                      { label: "Languages", value: "HTML5, CSS3, JavaScript" },
                      { label: "Frontend", value: "React, TailwindCSS" },
                      { label: "Backend", value: "Node.js, Express.js" },
                      { label: "Database", value: "MongoDB" },
                      { label: "Tools", value: "Git & GitHub" },
                      { label: "Deployment", value: "Vercel" }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 glass rounded-xl border-t-4 border-indigo-500">
                        <p className="text-xs text-gray-500 uppercase font-bold mb-1">{item.label}</p>
                        <p className="font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Education Timeline */}
              <div className="max-w-3xl mx-auto mt-20">
                <h4 className="text-xl font-bold mb-20 text-center text-gray-300">My Educational <span className="text-indigo-500 italic">Journey</span></h4>
                <div className="space-y-16">
                  {[
                    {
                      year: "2022 - 2025",
                      role: "Bcs. Internet of Things",
                      company: "Rathinevel Subramanium Arts & Science College, Coimbatore",
                      location: "Coimbatore, Tamilnadu"
                    },
                    {
                      year: "Sep 2025 - Jan 2026",
                      role: "MERN Stack Course",
                      company: "Error Makes Clever",
                      location: "Online / Certification"
                    },
                    {
                      year: "2020 - 2022",
                      role: "Higher Secondary",
                      company: "Dheva Matric Higher Secondary School, Tiruppur",
                      location: "Tiruppur, Tamilnadu"
                    }
                  ].map((exp, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="relative flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-12"
                    >
                      <div className="md:w-32 text-indigo-500 font-bold shrink-0 text-sm md:text-right">{exp.year}</div>

                      {/* Timeline Dot & Line for Desktop */}
                      <div className="hidden md:flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-indigo-500 ring-4 ring-indigo-500/20" />
                        <div className="w-0.5 grow bg-white/10 mt-2 min-h-[60px]" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-1">{exp.role}</h3>
                        <p className="text-gray-400 font-medium mb-2">{exp.company}</p>
                        <p className="text-gray-500 text-xs flex items-center justify-center md:justify-start gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {exp.location}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <Projects />

          <Contact />
        </main>

        <Footer />
      </div>
    </div>
  );
};

// Routing for all the pages
function App() {
  return (
    <Router>
      <Routes>
        {/* main website */}
        <Route path="/" element={<MainPortfolio />} />
        {/* admin panel pages */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
