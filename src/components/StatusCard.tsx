"use client";

import { motion } from "framer-motion";

export function StatusCard({ title, value, icon: Icon, color }: any) {
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
