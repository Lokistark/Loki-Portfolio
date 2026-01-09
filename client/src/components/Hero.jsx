import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, FileText } from 'lucide-react';
import { Link } from 'react-scroll';
import useMousePosition from '../hooks/useMousePosition';
import axios from 'axios';

const Hero = () => {
    const { x, y } = useMousePosition();

    // calculating horizontal and vertical movement for the blobs
    // I use window check here so it doesn't crash if server-rendered
    let centerX = 0;
    let centerY = 0;

    if (typeof window !== 'undefined') {
        centerX = window.innerWidth / 2;
        centerY = window.innerHeight / 2;
    }

    const moveX = (x - centerX) / 40;
    const moveY = (y - centerY) / 40;

    const [resumeUrl, setResumeUrl] = React.useState('');

    React.useEffect(() => {
        // fetching my resume URL to show the download button
        const fetchResume = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/resume`);
                if (data) setResumeUrl(data.resumeUrl);
            } catch (err) {
                console.log('resume not found');
            }
        };
        fetchResume();
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

    const ResumeButton = () => {
        if (!resumeUrl) return null;
        return (
            <a
                href={getFormattedUrl(resumeUrl)}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300 flex items-center gap-2 border border-white/10"
            >
                <FileText size={18} className="text-indigo-400" />
                Download CV
                <Download size={16} className="text-gray-400" />
            </a>
        );
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
            {/* 
                These are the colored circles in the background
            */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                <motion.div
                    style={{ x: moveX, y: moveY }}
                    className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-[120px]"
                />
                <motion.div
                    style={{ x: -moveX, y: -moveY }}
                    className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-400 uppercase glass rounded-full">
                        Available for New Opportunities
                    </span>

                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tight">
                        I build <span className="gradient-text">scalable</span> <br />
                        web experiences
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 leading-relaxed font-light text-balance">
                        Full-stack developer specializing in building exceptional digital experiences
                        that combine clean code with high-performance design.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 md:mb-0">
                        <Link
                            to="projects"
                            smooth={true}
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                        >
                            View My Work
                        </Link>
                        <Link
                            to="contact"
                            smooth={true}
                            className="px-8 py-4 glass hover:bg-white/10 text-white font-bold rounded-xl transition-all duration-300"
                        >
                            Let's Talk
                        </Link>
                        <ResumeButton />
                    </div>
                </motion.div>

                {/* this is the down arrow button for scrolling */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 text-gray-400 cursor-pointer p-2 z-10"
                    >
                        <Link to="about" smooth={true}>
                            <ArrowDown size={30} className="hover:text-indigo-400 transition-colors" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
