import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ project }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`group relative glass rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-colors ${project.isComingSoon ? 'border-indigo-500/30' : ''}`}
        >
            <div className="aspect-video overflow-hidden relative">
                <img
                    src={project.image || 'https://via.placeholder.com/600x400'}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${!project.isComingSoon ? 'group-hover:scale-110' : 'opacity-40 grayscale'}`}
                />

                {project.isComingSoon ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="px-4 py-2 glass rounded-full border-indigo-500/50 flex items-center gap-2 animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"></div>
                            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Under Construction</span>
                        </div>
                    </div>
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="flex gap-4">
                            <a href={project.liveLink} target="_blank" rel="noreferrer" className="p-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition" title="Live Preview">
                                <ExternalLink size={20} />
                            </a>
                            <a href={project.githubLink} target="_blank" rel="noreferrer" className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition" title="View Code">
                                <Github size={20} />
                            </a>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className={`text-xl font-bold transition-colors ${!project.isComingSoon ? 'group-hover:text-indigo-400' : 'text-gray-500'}`}>
                        {project.title}
                    </h3>
                    {project.isComingSoon && (
                        <span className="text-[10px] font-bold text-indigo-500 uppercase px-2 py-0.5 border border-indigo-500/30 rounded">Soon</span>
                    )}
                </div>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tools?.map((tool, idx) => (
                        <span key={idx} className="px-2 py-1 text-[10px] uppercase tracking-wide font-bold bg-white/5 border border-white/10 rounded-md text-gray-300">
                            {tool}
                        </span>
                    ))}
                </div>

                {/* showing buttons for mobile because they can't hover on card images */}
                {!project.isComingSoon && (
                    <div className="flex md:hidden gap-3 mt-6 pt-4 border-t border-white/5">
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-indigo-600/20 text-indigo-400 rounded-lg text-xs font-bold">
                            <ExternalLink size={14} /> Live Page
                        </a>
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/5 text-gray-400 rounded-lg text-xs font-bold border border-white/10">
                            <Github size={14} /> GitHub
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default ProjectCard;
