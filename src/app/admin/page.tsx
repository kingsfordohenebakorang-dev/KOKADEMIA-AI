import React from 'react';
import { Navbar } from '@/components/Navbar';
import { BookOpen, ShieldCheck, Activity, Brain } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { requireRole } from '@/lib/rbac';
import { StatusCard } from '@/components/StatusCard';
import { Role } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const session = await getServerSession();

    // Explicit RBAC protection: bounce unauthenticated or non-admin users
    if (!session || !session.user) {
        redirect('/');
    }
    try {
        requireRole((session.user as any).role as Role, ["ADMIN"]);
    } catch {
        redirect('/dashboard'); // Bounces Student roles back to their dashboard
    }

    // Pull live metrics from PostgreSQL
    const totalUsers = await prisma.user.count();
    const adminCount = await prisma.user.count({ where: { role: 'ADMIN' } });
    const studentCount = await prisma.user.count({ where: { role: 'STUDENT' } });

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
                    <StatusCard title="Total Users" value={totalUsers} icon={Activity} color="text-green-400" />
                    <StatusCard title="Active Students" value={studentCount} icon={BookOpen} color="text-blue-400" />
                    <StatusCard title="Platform Admins" value={adminCount} icon={ShieldCheck} color="text-purple-400" />
                    <StatusCard title="Avg Match Trust" value="94%" icon={Brain} color="text-yellow-400" />
                </div>
            </main>
        </div>
    );
}
