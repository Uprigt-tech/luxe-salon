import React from 'react';
import { MessageSquare } from 'lucide-react';

const AdminTickets: React.FC = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-20 text-center animate-in fade-in duration-700">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <MessageSquare className="w-10 h-10 text-white/20" />
            </div>
            <h2 className="font-display font-bold text-2xl mb-2">Tickets & Issues</h2>
            <p className="text-white/40 max-w-sm mx-auto">
                The tickets and issues portal is currently under development. You will soon be able to manage client queries here.
            </p>
        </div>
    );
};

export default AdminTickets;
