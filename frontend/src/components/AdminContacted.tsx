import React, { useEffect, useState } from 'react';
import { RefreshCcw, Search } from 'lucide-react';
import { API_BASE_URL } from '../config';

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

const AdminContacted: React.FC = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchEnquiries = async () => {
        setLoading(true);
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${API_BASE_URL}/admin/enquiries`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                setEnquiries(data.data.filter((e: Enquiry) => e.status === 'contacted'));
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

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure?')) return;
        const token = localStorage.getItem('adminToken');
        try {
            const response = await fetch(`${API_BASE_URL}/admin/enquiries/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                fetchEnquiries();
            } else {
                const data = await response.json();
                alert(data.message || 'Error deleting');
            }
        } catch (err) {
            alert('Server error: Could not delete enquiry.');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-2xl">Contacted Enquiries</h2>
                <button 
                    onClick={fetchEnquiries}
                    className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-lg text-[11px] font-medium tracking-wider uppercase text-white/50 hover:text-white transition-all"
                >
                    <RefreshCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                </button>
            </div>

            <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                {loading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-white/30">
                        <div className="w-8 h-8 border-2 border-[#c8a55a]/20 border-t-[#c8a55a] rounded-full animate-spin"></div>
                        <p className="text-sm">Loading...</p>
                    </div>
                ) : enquiries.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-white/20">
                        <Search className="w-12 h-12 stroke-[1.5]" />
                        <p className="text-sm font-medium">No contacted enquiries</p>
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
                                {enquiries.map(enquiry => (
                                    <tr key={enquiry._id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                                        <td className="px-6 py-4 text-sm font-medium text-white">{enquiry.name}</td>
                                        <td className="px-6 py-4 text-sm text-[#c8a55a]"><a href={`tel:${enquiry.phone}`} className="hover:underline">{enquiry.phone}</a></td>
                                        <td className="px-6 py-4 text-sm text-white/50">{enquiry.email}</td>
                                        <td className="px-6 py-4 text-sm text-white/70">{enquiry.city}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-white/50 uppercase">
                                                {enquiry.enquiryType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-green-400">Contacted</span>
                                        </td>
                                        <td className="px-6 py-4 text-[12px] text-white/30 whitespace-nowrap">
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button 
                                                onClick={() => handleDelete(enquiry._id)}
                                                className="opacity-0 group-hover:opacity-100 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider hover:bg-red-500/20 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminContacted;
