import React from 'react';
import { Navbar } from '@/components/Navbar';
import { motion } from 'framer-motion';
import { BookOpen, ShieldCheck, Activity, Brain } from 'lucide-react';

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <main className="pt-24 px-6 md:px-12 max-w-7xl mx-auto space-y-12 pb-20">
                <div className="flex justify-between items-end border-b border-indigo-500/30 pb-8">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-indigo-400" />
                            Admin Console
                        </h1>
                        <p className="text-gray-400 mt-2 text-sm">System oversight, usage telemetry, and access control.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <StatusCard title="Active Users" value="2,401" icon={Activity} color="text-green-400" />
                    <StatusCard title="Lectures Active" value="142" icon={BookOpen} color="text-blue-400" />
                    <StatusCard title="Queries Logged" value="15.2k" icon={Brain} color="text-purple-400" />
                    <StatusCard title="Avg Match Trust" value="94%" icon={ShieldCheck} color="text-yellow-400" />
                </div>
            </main>
        </div>
    );
}

function StatusCard({ title, value, icon: Icon, color }: any) {
    return (
        <motion.div whileHover={{ y: -5 }} className="bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className={`p-3 rounded-lg bg-white/5 w-fit ${color} mb-4`}>
                <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-3xl font-bold">{value}</h3>
            <p className="text-sm text-gray-500 mt-1 uppercase tracking-wider">{title}</p>
        </motion.div>
    );
}
