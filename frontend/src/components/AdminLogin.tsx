import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch("http://localhost:5000/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("adminToken", data.token);
                navigate("/admin/dashboard");
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error(error);
            setError("Server error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden font-sans">
            {/* Ambient background effects */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_30%_40%,rgba(200,165,90,0.06)_0%,transparent_50%),radial-gradient(circle_at_70%_60%,rgba(200,165,90,0.04)_0%,transparent_50%)]"></div>
            </div>

            <div className="relative z-10 w-full max-w-[420px] px-6">
                <div className="text-center mb-12">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#c8a55a] to-[#b8943f] flex items-center justify-center mx-auto mb-5 shadow-[0_8px_32px_rgba(200,165,90,0.2)]">
                        <span className="font-display text-2xl font-bold text-[#0a0a0a]">L</span>
                    </div>
                    <div className="font-display text-[13px] tracking-[0.3em] text-white/50 uppercase">
                        Luxe Men Salon
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[20px] p-10 backdrop-blur-xl">
                    <h1 className="font-display text-[28px] font-semibold text-white mb-2">Admin Panel</h1>
                    <p className="text-sm text-white/40 mb-8">Sign in to manage your salon enquiries</p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm mb-5 animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="block text-[10px] tracking-widest uppercase text-white/40">Username</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3.5 text-sm text-white focus:border-[#c8a55a] transition-all outline-none"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] tracking-widest uppercase text-white/40">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3.5 text-sm text-white focus:border-[#c8a55a] transition-all outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#c8a55a] to-[#b8943f] text-[#0a0a0a] font-semibold py-4 rounded-lg tracking-widest uppercase text-xs hover:shadow-[0_8px_32px_rgba(200,165,90,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                    Signing In...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <a href="/" className="block text-center mt-6 text-sm text-white/30 hover:text-[#c8a55a] transition-colors">
                        ← Back to website
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
