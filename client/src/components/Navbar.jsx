import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Menu, X, Github, Linkedin, Twitter, FileText, Home, User, Briefcase, MessageSquare } from 'lucide-react';
import axios from 'axios';

const Navbar = () => {
    // to open and close the menu on mobile
    const [isOpen, setIsOpen] = useState(false);
    // to change navbar style when scrolling
    const [scrolled, setScrolled] = useState(false);
    // storing the resume link we get from the database
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        // this function runs when we scroll
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        // getting my resume link from the backend
        const fetchResume = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/resume`);
                if (data) setResumeUrl(data.resumeUrl);
            } catch (err) {
                console.log('could not get resume', err);
            }
        };
        fetchResume();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to make sure the URL is absolute and direct if possible
    const getFormattedUrl = (url) => {
        if (!url) return '';
        let formattedUrl = url.trim();
        if (!formattedUrl.startsWith('http')) {
            formattedUrl = `https://${formattedUrl}`;
        }
        // Optional: Convert Google Drive links to direct download links
        if (formattedUrl.includes('drive.google.com/file/d/')) {
            const match = formattedUrl.match(/\/d\/(.+?)\//);
            if (match && match[1]) {
                return `https://drive.google.com/uc?export=download&id=${match[1]}`;
            }
        }
        return formattedUrl;
    };

    // links for the navigation
    const navLinks = [
        { name: 'Home', to: 'home', icon: Home },
        { name: 'About', to: 'about', icon: User },
        { name: 'Projects', to: 'projects', icon: Briefcase },
        { name: 'Contact', to: 'contact', icon: MessageSquare },
    ];

    return (
        <>
            <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between relative min-h-[40px] md:grid md:grid-cols-3">
                        {/* Desktop Left: Greeting */}
                        <div className="hidden md:flex justify-start">
                            <h1 className="text-xl md:text-2xl font-bold gradient-text cursor-pointer italic whitespace-nowrap">Welcome, I am Loki</h1>
                        </div>

                        {/* Center Column: Mobile Greeting & Desktop Menu */}
                        <div className="flex-1 flex justify-center items-center">
                            {/* Mobile: Center Greeting (Perfectly Centered) */}
                            <div className="md:hidden absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
                                <h1 className="text-lg font-bold gradient-text italic text-center whitespace-nowrap pointer-events-auto">Welcome, I am Loki</h1>
                            </div>

                            {/* Desktop Menu */}
                            <div className="hidden md:flex items-baseline space-x-8">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.to}
                                        smooth={true}
                                        duration={500}
                                        className="nav-link text-sm font-medium opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Social (Desktop) / CV Icon (Mobile) */}
                        <div className="flex justify-end items-center">
                            {/* Desktop Icons */}
                            <div className="hidden md:flex items-center space-x-4">
                                <a href="https://github.com/Lokistark" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Github size={20} />
                                </a>
                                <a href="https://www.linkedin.com/in/loki-merndev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin size={20} />
                                </a>
                                {resumeUrl && (
                                    <a
                                        href={getFormattedUrl(resumeUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="px-3 py-1.5 glass text-xs font-bold rounded-lg hover:bg-white/10 transition flex items-center gap-2 border border-white/10"
                                    >
                                        <FileText size={14} className="text-indigo-400" />
                                        CV
                                    </a>
                                )}
                            </div>

                            {/* Mobile CV Icon - Top Right */}
                            <div className="md:hidden flex items-center">
                                {resumeUrl && (
                                    <a
                                        href={getFormattedUrl(resumeUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="p-2.5 glass rounded-xl text-indigo-400 border border-white/10 shadow-lg"
                                    >
                                        <FileText size={20} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 
              This is the bottom navigation for mobile view.
              I added this to make it look like a mobile app.
            */}
            <div className="md:hidden fixed bottom-8 left-0 right-0 px-4 z-50">
                <div className="max-w-md mx-auto glass rounded-2xl border border-white/10 p-2 flex items-center shadow-2xl">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.name}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                spy={true}
                                activeClass="bg-indigo-600/20 text-indigo-400"
                                className="flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-300 group cursor-pointer"
                            >
                                <Icon size={20} className="group-hover:scale-110 transition-transform mb-1" />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Navbar;
