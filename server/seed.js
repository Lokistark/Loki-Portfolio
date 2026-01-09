const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');
const Resume = require('./models/Resume');
const dotenv = require('dotenv');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // 1. Seed Admin
        const username = 'loki';
        const password = 'loki04';

        let admin = await User.findOne({ username });
        if (!admin) {
            // Check if old admin exists and delete it to keep clean
            await User.deleteMany({ username: 'stark_admin' });

            admin = new User({
                username,
                password
            });
            await admin.save();
            console.log(`✅ Admin user '${username}' created successfully!`);
        } else {
            admin.password = password;
            await admin.save();
            console.log(`✅ Admin user '${username}' password updated!`);
        }

        // 2. Seed Projects
        await Project.deleteMany({}); // Clear existing projects

        const projects = [
            {
                title: "MERN E-Commerce App",
                description: "A premium, full-featured e-commerce ecosystem. High-end design with robust backend architecture.",
                tools: ["MongoDB", "Express", "React", "Node.js"],
                image: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2664&auto=format&fit=crop",
                isComingSoon: true,
                liveLink: "#",
                githubLink: "#",
                order: 1
            },
            {
                title: "Loki's Portfolio",
                description: "My personal high-end portfolio featuring glassmorphism, smooth animations, and a MERN back-office.",
                tools: ["MongoDB", "Express", "React", "Node.js", "Tailwind"],
                image: "/projects/portfolio.png",
                liveLink: "http://localhost:5173",
                githubLink: "https://github.com/Lokistark",
                order: 2
            },
            {
                title: "Bulk Mail App",
                description: "TargetMail is a powerful full-stack web application designed for high-efficiency bulk email campaigns.",
                tools: ["React", "Node.js", "MongoDB", "Express"],
                image: "/projects/bulkmail.png",
                liveLink: "https://bulk-mail-app-black.vercel.app/",
                githubLink: "https://github.com/Lokistark",
                order: 3
            },
            {
                title: "Weather Dashboard",
                description: "Instant weather updates with a clean minimalist interface powered by OpenWeatherMap API.",
                tools: ["React", "TailwindCSS", "API"],
                image: "/projects/weather.png",
                liveLink: "https://weather-app-neon-one-41.vercel.app/",
                githubLink: "https://github.com/Lokistark",
                order: 4
            },
            {
                title: "NOSTRA E-Commerce",
                description: "A pixel-perfect, responsive product showcase crafted for modern high-end e-commerce experiences.",
                tools: ["HTML", "CSS", "JavaScript"],
                image: "/projects/nostra.png",
                liveLink: "https://lokistark.github.io/NOSTRA-Website/",
                githubLink: "https://github.com/Lokistark",
                order: 5
            },
            {
                title: "Movie Discovery App",
                description: "A modern, dynamic discovery platform integrated with TMDB API for real-time cinematic data.",
                tools: ["React", "TailwindCSS", "TMDB API"],
                image: "/projects/movieapp.png",
                liveLink: "https://movie-app-black-rho-51.vercel.app/",
                githubLink: "https://github.com/Lokistark",
                order: 6
            },
            {
                title: "Netflix Clone UI",
                description: "A pixel-perfect, responsive replica of the Netflix streaming platform interface.",
                tools: ["React", "CSS3", "Node.js"],
                image: "/projects/netflix.png",
                liveLink: "https://github.com/Lokistark/Netflicx-LoginPage",
                githubLink: "https://github.com/Lokistark/Netflicx-LoginPage",
                order: 7
            },
            {
                title: "Task Management App",
                description: "A modern, beginner-friendly task management web application for organized workflows.",
                tools: ["React", "TailwindCSS", "Vite"],
                image: "/projects/taskmanagement.png",
                liveLink: "https://task-manage-app-seven.vercel.app/",
                githubLink: "https://github.com/Lokistark",
                order: 8
            },
            {
                title: "Live Message Counter",
                description: "Sleek textarea component with real-time character tracking and responsive design.",
                tools: ["HTML", "CSS", "JavaScript"],
                image: "/projects/messagecounter.png",
                liveLink: "https://lokistark.github.io/Live-Message-Counter/",
                githubLink: "https://github.com/Lokistark",
                order: 9
            }
        ];

        await Project.insertMany(projects);
        console.log('✅ 9 Projects seeded successfully!');

        // 3. Seed Resume
        const existingResume = await Resume.findOne();
        if (!existingResume) {
            await Resume.create({
                resumeUrl: "https://example.com/your-resume.pdf"
            });
            console.log('✅ Default resume seeded!');
        }

        process.exit();
    } catch (err) {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
