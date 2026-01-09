import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Plus, Trash2, Edit2, LogOut, Package, Mail, User, Calendar, FileText, Save, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    // checking which tab is open (Projects, Messages, or Resume)
    const [activeTab, setActiveTab] = useState('projects');

    // storing my projects and messages
    const [projects, setProjects] = useState([]);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    // to add or edit projects
    const [newProject, setNewProject] = useState({
        title: '', description: '', image: '', tools: '', liveLink: '', githubLink: '', isComingSoon: false
    });
    const [editingProject, setEditingProject] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // resume settings
    const [resumeUrl, setResumeUrl] = useState('');
    const [savingResume, setSavingResume] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        // if no token, go back to login page
        if (!token || token === null) {
            navigate('/admin/login');
        } else {
            fetchData();
        }
    }, [token, activeTab]);

    // getting my data from the server
    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'projects') {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
                setProjects(data);
            } else if (activeTab === 'messages') {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/messages`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(data);
            } else if (activeTab === 'resume') {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/resume`);
                if (data) setResumeUrl(data.resumeUrl);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle the form submission for projects
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // first step: prepare the data
            // if tools is a string, we split it by comma and trim spaces
            let toolsArray = [];
            if (typeof newProject.tools === 'string') {
                toolsArray = newProject.tools.split(',').map(t => t.trim());
            } else {
                toolsArray = newProject.tools;
            }

            const projectToSave = {
                title: newProject.title,
                description: newProject.description,
                image: newProject.image.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/'),
                tools: toolsArray,
                liveLink: newProject.liveLink,
                githubLink: newProject.githubLink,
                isComingSoon: newProject.isComingSoon
            };

            // next step: send to API
            if (isEditing == true) {
                // update existing project
                await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${editingProject._id}`, projectToSave, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('Project updated!');
            } else {
                // create new project
                await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, projectToSave, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert('New project added!');
            }

            // reset form after success
            setNewProject({ title: '', description: '', image: '', tools: '', liveLink: '', githubLink: '', isComingSoon: false });
            setIsEditing(false);
            setEditingProject(null);

            // refresh the list
            fetchData();

        } catch (err) {
            console.log(err);
            alert('Something went wrong with the project save');
        }
    };

    const startEdit = (project) => {
        setIsEditing(true);
        setEditingProject(project);
        setNewProject({
            title: project.title,
            description: project.description,
            image: project.image,
            tools: project.tools.join(', '),
            liveLink: project.liveLink || '',
            githubLink: project.githubLink || '',
            isComingSoon: project.isComingSoon || false
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setEditingProject(null);
        setEditingProject(null);
        setNewProject({ title: '', description: '', image: '', tools: '', liveLink: '', githubLink: '', isComingSoon: false });
    };

    const deleteProject = async (id) => {
        if (window.confirm('Delete this project?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchData();
            } catch (err) {
                console.error("Delete error:", err);
                alert('Error deleting project: ' + (err.response?.data?.message || "Server Error"));
            }
        }
    };

    const deleteMessage = async (id) => {
        if (window.confirm('Delete this message?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/messages/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchData();
            } catch (err) {
                console.error("Delete message error:", err);
                alert('Error deleting message: ' + (err.response?.data?.message || err.message || "Server Error"));
            }
        }
    };

    const deleteResume = async () => {
        if (window.confirm('Are you sure you want to remove your resume? The download button will be hidden from the portfolio.')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/resume`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setResumeUrl('');
                alert('Resume removed successfully!');
            } catch (err) {
                alert('Error removing resume');
            }
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 glass z-50 px-4 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                    <LayoutDashboard className="text-indigo-500" size={20} />
                    <span className="font-bold uppercase tracking-tight">Admin</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 bg-white/5 rounded-lg text-gray-400 hover:text-white"
                >
                    {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </header>

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 w-64 glass border-r border-white/10 p-6 flex flex-col justify-between z-50 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <LayoutDashboard className="text-indigo-500" />
                        <span className="font-bold text-xl tracking-tight uppercase">Admin Panel</span>
                    </div>

                    <nav className="space-y-2">
                        <button
                            onClick={() => { setActiveTab('projects'); cancelEdit(); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'projects' ? 'bg-indigo-600' : 'hover:bg-white/5'}`}
                        >
                            <Package size={18} /> Projects
                        </button>
                        <button
                            onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'messages' ? 'bg-indigo-600' : 'hover:bg-white/5'}`}
                        >
                            <Mail size={18} /> Messages
                        </button>
                        <button
                            onClick={() => { setActiveTab('resume'); setSidebarOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition ${activeTab === 'resume' ? 'bg-indigo-600' : 'hover:bg-white/5'}`}
                        >
                            <FileText size={18} /> Resume
                        </button>
                    </nav>
                </div>

                <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition">
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 w-full overflow-x-hidden">
                <header className="flex justify-between items-center mb-10">
                    <h1 className="text-2xl md:text-3xl font-bold">Manage <span className="gradient-text uppercase">{activeTab}</span></h1>
                </header>

                {activeTab === 'projects' ? (
                    <div className="flex flex-col xl:flex-row gap-8">
                        {/* Add/Edit Project Form */}
                        <div className="glass p-6 md:p-8 rounded-3xl h-fit w-full xl:w-1/2 lg:sticky lg:top-8">
                            <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
                                <span className="flex items-center gap-2">
                                    {isEditing ? <Edit2 className="text-indigo-500" /> : <Plus className="text-indigo-500" />}
                                    {isEditing ? 'Edit Project' : 'Add New Project'}
                                </span>
                                {isEditing && (
                                    <button onClick={cancelEdit} className="text-xs text-gray-400 hover:text-white underline">Cancel</button>
                                )}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text" placeholder="Title"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Description"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 h-24 focus:outline-none focus:border-indigo-500"
                                    value={newProject.description}
                                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                    required
                                />
                                <input
                                    type="text" placeholder="Image URL (Unsplash or /projects/name.png)"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                                    value={newProject.image}
                                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                    required
                                />
                                <input
                                    type="text" placeholder="Tools (comma separated: React, Node, etc.)"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                                    value={newProject.tools}
                                    onChange={(e) => setNewProject({ ...newProject, tools: e.target.value })}
                                    required
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text" placeholder="Live Link"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                                        value={newProject.liveLink}
                                        onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
                                    />
                                    <input
                                        type="text" placeholder="GitHub Link"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                                        value={newProject.githubLink}
                                        onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                                    />
                                </div>

                                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                                    <input
                                        type="checkbox"
                                        id="isComingSoon"
                                        checked={newProject.isComingSoon}
                                        onChange={(e) => setNewProject({ ...newProject, isComingSoon: e.target.checked })}
                                        className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 bg-gray-700 border-gray-600"
                                    />
                                    <label htmlFor="isComingSoon" className="text-sm font-medium text-gray-300">
                                        Mark as "Coming Soon" (Blurs image & disables links)
                                    </label>
                                </div>
                                <button type="submit" className={`w-full py-3 rounded-xl font-bold mt-4 shadow-lg transition ${isEditing ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'}`}>
                                    {isEditing ? 'Update Project' : 'Add Project'}
                                </button>
                            </form>
                        </div>

                        {/* List Projects */}
                        <div className="space-y-4 w-full xl:w-1/2">
                            <h2 className="text-xl font-bold mb-2">Existing Projects ({projects.length})</h2>
                            {loading ? <p>Loading projects...</p> : projects.map(project => (
                                <div key={project._id} className="glass p-4 rounded-2xl flex items-center justify-between group hover:border-white/20 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden bg-white/5 shrink-0">
                                            <img src={project.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-sm">{project.title}</h3>
                                            <p className="text-[10px] text-gray-500">{project.tools.join(', ')}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => startEdit(project)} className="p-2 bg-white/5 hover:bg-indigo-500/20 rounded-lg text-gray-400 hover:text-indigo-400 transition">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => deleteProject(project._id)} className="p-2 bg-red-400/10 hover:bg-red-400/20 rounded-lg text-red-500 transition">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'messages' ? (
                    <div className="space-y-6">
                        {loading ? <p>Loading messages...</p> : messages.length === 0 ? <p className="text-gray-500">No messages yet.</p> : messages.map(msg => (
                            <div key={msg._id} className="glass p-4 md:p-6 rounded-3xl relative group">
                                <div className="mb-4 pr-12">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-indigo-400 break-words">{msg.subject}</h3>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                                            <span className="flex items-center gap-1"><User size={14} /> {msg.name}</span>
                                            <span className="flex items-center gap-1 break-all"><Mail size={14} /> {msg.email}</span>
                                            <span className="flex items-center gap-1"><Calendar size={14} /> {new Date(msg.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteMessage(msg._id)}
                                    className="absolute top-4 right-4 p-2 bg-red-400/10 hover:bg-red-400/20 rounded-lg text-red-500 transition z-10"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <p className="text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 text-sm md:text-base whitespace-pre-wrap break-words">
                                    {msg.message}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-2xl w-full">
                        <div className="glass p-6 md:p-8 rounded-3xl">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <FileText className="text-indigo-500" />
                                Update Resume CV
                            </h2>
                            <p className="text-gray-400 mb-6 text-sm">
                                Enter the URL of your resume (Google Drive, Dropbox, or any public link).
                                Users will be able to download this from your portfolio.
                            </p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-400">Resume Link</label>
                                    <input
                                        type="url"
                                        placeholder="https://example.com/my-resume.pdf"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-indigo-500"
                                        value={resumeUrl}
                                        onChange={(e) => setResumeUrl(e.target.value)}
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        onClick={async () => {
                                            if (!resumeUrl.trim()) return alert('Please enter a valid URL');
                                            setSavingResume(true);
                                            try {
                                                await axios.post(`${import.meta.env.VITE_API_URL}/api/resume`, { resumeUrl }, {
                                                    headers: { Authorization: `Bearer ${token}` }
                                                });
                                                alert('Resume updated successfully!');
                                            } catch (err) {
                                                alert('Error updating resume');
                                            } finally {
                                                setSavingResume(false);
                                            }
                                        }}
                                        disabled={savingResume}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-3 rounded-xl font-bold mt-4 shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2"
                                    >
                                        <Save size={18} />
                                        {savingResume ? 'Saving...' : 'Save Resume'}
                                    </button>

                                    {resumeUrl && (
                                        <button
                                            onClick={deleteResume}
                                            className="mt-4 p-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition flex items-center justify-center"
                                            title="Remove Resume"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    )}
                                </div>

                                {resumeUrl && (
                                    <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-xl">
                                        <p className="text-xs text-gray-500 uppercase font-bold mb-2 tracking-widest">Currently Active Link</p>
                                        <a
                                            href={(url => {
                                                if (!url) return '';
                                                let fu = url.trim();
                                                if (!fu.startsWith('http')) fu = `https://${fu}`;
                                                if (fu.includes('drive.google.com/file/d/')) {
                                                    const m = fu.match(/\/d\/(.+?)\//);
                                                    if (m && m[1]) return `https://drive.google.com/uc?export=download&id=${m[1]}`;
                                                }
                                                return fu;
                                            })(resumeUrl)}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-indigo-400 hover:underline text-sm break-all"
                                        >
                                            {resumeUrl}
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
