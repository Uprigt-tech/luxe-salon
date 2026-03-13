import React, { useEffect, useState } from 'react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { RefreshCcw, Search } from 'lucide-react';
import { API_BASE_URL } from '../config';

const COLORS = ['#c8a55a', '#b8943f', '#4a4a4a', '#2a2a2a'];

interface Enquiry {
    _id: string;
    name: string;
    phone: string;
    email: string;
    city?: string;
    enquiryType: string;
    message?: string;
    status: string;
    createdAt: string;
}

const AdminDashboard: React.FC = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [timeView, setTimeView] = useState<'day' | 'week' | 'month'>('month');

    const fetchEnquiries = async () => {
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${API_BASE_URL}/admin/enquiries`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setEnquiries(data.data);
            }
        } catch (err) {
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleAction = async (id: string, action: 'contacted' | 'delete') => {
        const token = localStorage.getItem('adminToken');
        const method = action === 'contacted' ? 'PUT' : 'DELETE';
        const url = `${API_BASE_URL}/admin/enquiries/${id}${action === 'contacted' ? '/contacted' : ''}`;

        if (action === 'delete' && !confirm('Are you sure you want to delete this?')) return;

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchEnquiries();
            } else {
                const data = await response.json();
                alert(data.message || `Failed to ${action}`);
            }
        } catch (err) {
            alert('Server error: Could not complete the request.');
        }
    };

    const pendingEnquiries = enquiries.filter(e => e.status !== 'contacted');

    // Chart Data Processing
    const getBarData = () => {
        const now = new Date();
        const grouped: Record<string, number> = {};
        
        let labels: string[] = [];
        if (timeView === 'month') {
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        } else if (timeView === 'week') {
            labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        } else {
            labels = Array.from({length: 24}, (_, i) => `${i}:00`);
        }

        enquiries.forEach(e => {
            const date = new Date(e.createdAt);
            let key = '';
            if (timeView === 'month' && date.getFullYear() === now.getFullYear()) {
                key = date.toLocaleString('default', { month: 'short' });
            } else if (timeView === 'week') {
                const diff = now.getTime() - date.getTime();
                if (diff <= 7 * 24 * 60 * 60 * 1000) {
                    key = date.toLocaleString('default', { weekday: 'short' });
                }
            } else if (timeView === 'day' && date.toDateString() === now.toDateString()) {
                key = `${date.getHours()}:00`;
            }
            if (key) grouped[key] = (grouped[key] || 0) + 1;
        });

        return labels.map(label => ({ name: label, value: grouped[label] || 0 }));
    };

    const getPieData = () => {
        const types: Record<string, number> = { franchise: 0, booking: 0, partnership: 0, other: 0 };
        enquiries.forEach(e => {
            const t = (e.enquiryType || 'other').toLowerCase();
            if (types[t] !== undefined) types[t]++; else types.other++;
        });
        return [
            { name: 'Franchise', value: types.franchise },
            { name: 'Booking', value: types.booking },
            { name: 'Partnership', value: types.partnership },
            { name: 'Other', value: types.other }
        ];
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Charts Section */}
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white/5 border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-display font-semibold text-lg">Enquiries Over Time</h3>
                        <div className="flex bg-black/40 p-1 rounded-lg">
                            {(['day', 'week', 'month'] as const).map(v => (
                                <button 
                                    key={v}
                                    onClick={() => setTimeView(v)}
                                    className={`px-4 py-1.5 text-[11px] font-medium rounded-md transition-all uppercase tracking-wider ${timeView === v ? 'bg-white/10 text-white shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getBarData()}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 10}} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}
                                    itemStyle={{color: '#c8a55a'}}
                                />
                                <Bar dataKey="value" fill="#c8a55a" radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl p-6">
                    <h3 className="font-display font-semibold text-lg mb-8">Service Breakdown</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={getPieData()}
                                    innerRadius={70}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {getPieData().map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                    ))}
                                </Pie>
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px'}}
                                />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: 'Total Pending', value: pendingEnquiries.length },
                    { label: 'Franchise', value: pendingEnquiries.filter(e => e.enquiryType === 'franchise').length },
                    { label: 'Booking', value: pendingEnquiries.filter(e => e.enquiryType === 'booking').length },
                    { label: 'Partnership', value: pendingEnquiries.filter(e => e.enquiryType === 'partnership').length }
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:border-[#c8a55a]/20 transition-all group">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 group-hover:text-[#c8a55a]/60 transition-colors">{stat.label}</p>
                        <p className="text-3xl font-display font-bold text-[#c8a55a]">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-display font-bold text-2xl">Pending Enquiries</h2>
                    <button 
                        onClick={fetchEnquiries}
                        className="flex items-center gap-2 px-6 py-2.5 bg-[#c8a55a]/10 border border-[#c8a55a]/20 rounded-lg text-[11px] font-medium tracking-wider uppercase text-[#c8a55a] hover:bg-[#c8a55a]/20 transition-all"
                    >
                        <RefreshCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4 text-white/30">
                            <div className="w-8 h-8 border-2 border-[#c8a55a]/20 border-t-[#c8a55a] rounded-full animate-spin"></div>
                            <p className="text-sm">Loading Enquiries...</p>
                        </div>
                    ) : pendingEnquiries.length === 0 ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4 text-white/20">
                            <Search className="w-12 h-12 stroke-[1.5]" />
                            <p className="text-sm font-medium">No pending enquiries found</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse min-w-[1000px]">
                                <thead>
                                    <tr className="bg-white/[0.02]">
                                        {['Name', 'Contact', 'Email', 'City', 'Type', 'Status', 'Date', 'Actions'].map(th => (
                                            <th key={th} className="px-6 py-4 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30 border-b border-white/5">{th}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingEnquiries.map(enquiry => (
                                        <tr key={enquiry._id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                                            <td className="px-6 py-4 text-sm font-medium text-white">{enquiry.name}</td>
                                            <td className="px-6 py-4 text-sm text-[#c8a55a]"><a href={`tel:${enquiry.phone}`} className="hover:underline">{enquiry.phone}</a></td>
                                            <td className="px-6 py-4 text-sm text-white/50">{enquiry.email}</td>
                                            <td className="px-6 py-4 text-sm text-white/70">{enquiry.city || '—'}</td>
                                            <td className="px-6 py-4">
                                                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-wide bg-[#c8a55a]/10 border border-[#c8a55a]/20 text-[#c8a55a] uppercase">
                                                    {enquiry.enquiryType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">Pending</span>
                                            </td>
                                            <td className="px-6 py-4 text-[12px] text-white/30 whitespace-nowrap">
                                                {new Date(enquiry.createdAt).toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button 
                                                        onClick={() => handleAction(enquiry._id, 'contacted')}
                                                        className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-wider hover:bg-green-500/20 transition-all"
                                                    >
                                                        Contacted
                                                    </button>
                                                    <button 
                                                        onClick={() => handleAction(enquiry._id, 'delete')}
                                                        className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider hover:bg-red-500/20 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
