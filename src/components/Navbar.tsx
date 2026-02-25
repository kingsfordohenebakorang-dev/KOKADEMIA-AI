"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, LogOut, User as UserIcon } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <nav className="fixed top-0 left-0 w-full h-14 border-b border-white/[0.04] bg-[#08080c]/80 backdrop-blur-xl flex items-center justify-between px-8 z-50">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="font-bold text-sm tracking-tight text-gray-200">
                    KOK<span className="text-indigo-400">TRUST</span>AI
                </span>
            </Link>

            {/* Right side */}
            <div className="flex items-center gap-8 text-[13px] font-medium text-gray-500">
                {session && session.user ? (
                    /* Authenticated state */
                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                        <div className="h-3.5 w-px bg-white/[0.06]" />
                        <div className="flex items-center gap-2 text-gray-400">
                            <UserIcon className="w-3.5 h-3.5" />
                            <span className="text-[12px]">{session.user.email?.split('@')[0]}</span>
                        </div>
                        <button onClick={() => signOut()} className="text-gray-600 hover:text-red-400 transition-colors" title="Logout">
                            <LogOut className="w-3.5 h-3.5" />
                        </button>
                    </div>
                ) : (
                    /* Pre-login state — minimal, curated */
                    <>
                        <a href="#how-it-works" className="hover:text-gray-300 transition-colors">Product</a>
                        <a href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</a>
                        <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Log In</Link>
                    </>
                )}
            </div>
        </nav>
    )
}
