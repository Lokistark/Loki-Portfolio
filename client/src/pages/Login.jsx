import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Terminal } from 'lucide-react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, { username, password });
            localStorage.setItem('adminToken', data.token);
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
            <div className="max-w-md w-full glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl"></div>

                <div className="text-center mb-10 relative">
                    <div className="inline-flex p-4 glass rounded-2xl mb-4 text-indigo-500">
                        <Terminal size={32} />
                    </div>
                    <h2 className="text-3xl font-bold">Admin <span className="gradient-text">Access</span></h2>
                    <p className="text-gray-400 mt-2">Log in to manage your portfolio</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6 relative">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
                                placeholder="stark_admin"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-11 py-3.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
