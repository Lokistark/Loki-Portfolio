import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import { motion } from 'framer-motion';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Default projects for Loki's portfolio
    const defaultProjects = [
        {
            title: "MERN E-Commerce App",
            description: "A premium, full-featured e-commerce ecosystem. High-end design with robust backend architecture.",
            tools: ["MongoDB", "Express", "React", "Node.js"],
            image: "https://raw.githubusercontent.com/Lokistark/BreadHouse/main/Screenshot%202026-01-05%20123727.png",
            liveLink: "https://bread-house1.vercel.app/",
            githubLink: "https://github.com/Lokistark/BreadHouse"
        },
        {
            title: "Loki's Portfolio",
            description: "My personal high-end portfolio featuring glassmorphism, smooth animations, and a MERN back-office.",
            tools: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
            image: "/projects/portfolio.png",
            liveLink: "http://localhost:5173",
            githubLink: "https://github.com/Lokistark"
        },
        {
            title: "Bulk Mail App",
            description: "TargetMail is a powerful full-stack web application designed for high-efficiency bulk email campaigns.",
            tools: ["React", "Node.js", "MongoDB", "Express"],
            image: "/projects/bulkmail.png",
            liveLink: "https://bulk-mail-app-black.vercel.app/",
            githubLink: "https://github.com/Lokistark"
        },
        {
            title: "Weather Dashboard",
            description: "Instant weather updates with a clean minimalist interface powered by OpenWeatherMap API.",
            tools: ["React", "TailwindCSS", "API"],
            image: "/projects/weather.png",
            liveLink: "https://weather-app-neon-one-41.vercel.app/",
            githubLink: "https://github.com/Lokistark"
        },
        {
            title: "NOSTRA E-Commerce",
            description: "A pixel-perfect, responsive product showcase crafted for modern high-end e-commerce experiences.",
            tools: ["HTML", "CSS", "JavaScript"],
            image: "/projects/nostra.png",
            liveLink: "https://lokistark.github.io/NOSTRA-Website/",
            githubLink: "https://github.com/Lokistark"
        },
        {
            title: "Movie Discovery App",
            description: "A modern, dynamic discovery platform integrated with TMDB API for real-time cinematic data.",
            tools: ["React", "TailwindCSS", "TMDB API"],
            image: "/projects/movieapp.png",
            liveLink: "https://movie-app-black-rho-51.vercel.app/",
            githubLink: "https://github.com/Lokistark"
        },
        {
            title: "Netflix Clone UI",
            description: "A pixel-perfect, responsive replica of the Netflix streaming platform interface.",
            tools: ["React", "CSS3", "Node.js"],
            image: "/projects/netflix.png",
            liveLink: "https://github.com/Lokistark/Netflicx-LoginPage",
            githubLink: "https://github.com/Lokistark/Netflicx-LoginPage"
        },
        {
            title: "Task Management App",
            description: "A modern, beginner-friendly task management web application for organized workflows.",
            tools: ["React", "TailwindCSS", "Vite"],
            image: "/projects/taskmanagement.png",
            liveLink: "https://task-manage-app-seven.vercel.app/",
            githubLink: "https://github.com/Lokistark"
        },
        {
            title: "Live Message Counter",
            description: "Sleek textarea component with real-time character tracking and responsive design.",
            tools: ["HTML", "CSS", "JavaScript"],
            image: "/projects/messagecounter.png",
            liveLink: "https://lokistark.github.io/Live-Message-Counter/",
            githubLink: "https://github.com/Lokistark"
        }
    ];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, { timeout: 5000 });
                if (res.data.length > 0) {
                    // Sort by order manually if the API doesn't do it
                    const sortedProjects = [...res.data].sort((a, b) => (a.order || 0) - (b.order || 0));
                    setProjects(sortedProjects);
                } else {
                    setProjects(defaultProjects);
                }
            } catch (err) {
                console.error("Using default projects due to API error:", err);
                setProjects(defaultProjects);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="pt-6 pb-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="gradient-text">Projects</span></h2>
                    <p className="text-gray-400 max-w-xl mx-auto">A selection of my recent works where I focus on performance, accessibility and user experience.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
