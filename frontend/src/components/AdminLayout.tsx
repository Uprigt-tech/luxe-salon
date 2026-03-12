import React from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c8a55a]/30">
            {/* Top Bar */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-black/85 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c8a55a] to-[#b8943f] flex items-center justify-center">
                        <span className="font-display text-base font-bold text-[#0a0a0a]">L</span>
                    </div>
                    <span className="font-display text-sm font-medium text-white/70 tracking-wider">
                        <strong className="text-white font-semibold">Luxe Men</strong> · Admin Dashboard
                    </span>
                </div>
                <button 
                    onClick={handleLogout}
                    className="px-5 py-2.5 bg-transparent border border-white/10 rounded-lg font-display text-[11px] font-medium tracking-[0.15em] uppercase text-white/50 hover:border-red-500/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
                >
                    Logout
                </button>
            </header>

            <div className="flex min-h-[calc(100vh-68px)]">
                {/* Sidebar */}
                <aside className="w-[250px] bg-black/95 border-r border-white/5 py-8 flex flex-col gap-2 shrink-0">
                    <NavLink 
                        to="/admin/dashboard" 
                        className={({ isActive }) => 
                            `flex items-center px-8 py-3.5 text-sm font-medium transition-all ${isActive ? 'text-[#c8a55a] bg-[#c8a55a]/10 border-r-3 border-[#c8a55a]' : 'text-white/60 hover:text-white hover:bg-white/5'}`
                        }
                    >
                        Dashboard
                    </NavLink>
                    <NavLink 
                        to="/admin/contacted" 
                        className={({ isActive }) => 
                            `flex items-center px-8 py-3.5 text-sm font-medium transition-all ${isActive ? 'text-[#c8a55a] bg-[#c8a55a]/10 border-r-3 border-[#c8a55a]' : 'text-white/60 hover:text-white hover:bg-white/5'}`
                        }
                    >
                        Contacted
                    </NavLink>
                    <NavLink 
                        to="/admin/tickets" 
                        className={({ isActive }) => 
                            `flex items-center px-8 py-3.5 text-sm font-medium transition-all ${isActive ? 'text-[#c8a55a] bg-[#c8a55a]/10 border-r-3 border-[#c8a55a]' : 'text-white/60 hover:text-white hover:bg-white/5'}`
                        }
                    >
                        Tickets / Issues
                    </NavLink>
                </aside>

                {/* Main Content */}
                <main className="flex-grow p-10 max-w-[1400px] mx-auto w-[calc(100%-250px)] relative z-10">
                    <Outlet />
                </main>
            </div>

            {/* Grain effect */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('data:image/svg+xml,%3Csvg_viewBox=%220_0_256_256%22_xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter_id=%22noise%22%3E%3CfeTurbulence_type=%22fractalNoise%22_baseFrequency=%220.9%22_numOctaves=%224%22_stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect_width=%22100%25%22_height=%22100%25%22_filter=%22url(%23noise)%22/%3E%3C/svg%3E')]"></div>
        </div>
    );
};

export default AdminLayout;
