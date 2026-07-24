"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, LogOut, User as UserIcon } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const isLanding = pathname === '/';

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Non-landing pages keep the original dark nav
    if (!isLanding) {
        return (
            <nav className="fixed top-0 left-0 w-full h-14 border-b border-white/[0.04] bg-[#08080c]/80 backdrop-blur-xl flex items-center justify-between px-8 z-50">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center">
                        <Shield className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="font-bold text-sm tracking-tight text-gray-200">Kokademia</span>
                </Link>
                <div className="flex items-center gap-8 text-[13px] font-medium text-gray-500">
                    {session && session.user ? (
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
                        <>
                            <a href="#how-it-works" className="hover:text-gray-300 transition-colors">Product</a>
                            <a href="#pricing" className="hover:text-gray-300 transition-colors">Pricing</a>
                            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Log In</Link>
                        </>
                    )}
                </div>
            </nav>
        );
    }

    // Landing page premium nav
    const navLinks = [
        { label: 'Features', href: '#features' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Documentation', href: '#' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-4 left-0 w-full z-50 px-4 md:px-8 transition-all duration-300`}
            >
                <div className={`max-w-7xl mx-auto px-6 h-16 rounded-full flex items-center justify-between transition-all duration-300 ${
                    scrolled
                        ? 'bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_25px_rgba(15,23,42,0.08)]'
                        : 'bg-white/70 backdrop-blur-md border border-slate-200/50 shadow-sm'
                }`}>
                    {/* Logo / Wordmark */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-200">
                            K
                        </div>
                        <span className="text-[20px] font-bold tracking-tight text-slate-900">
                            Kokademia
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-[13px] font-semibold text-slate-600 hover:text-indigo-600 px-4 py-1.5 rounded-full transition-all duration-200 hover:bg-white"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Desktop CTAs */}
                    <div className="hidden md:flex items-center gap-3">
                        <Link
                            href="/login"
                            className="text-[14px] font-semibold text-slate-700 hover:text-indigo-600 px-4 py-2 transition-colors duration-200"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/login"
                            className="inline-flex items-center px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[14px] font-semibold rounded-full transition-all duration-200 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5"
                        >
                            Start Learning Free
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-slate-800"
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div className="absolute inset-0 bg-rich-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute right-0 top-0 h-full w-72 bg-ivory shadow-2xl p-8 pt-20"
                        >
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-[16px] font-medium text-rich-black"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <hr className="border-border-subtle" />
                                <Link href="/login" className="text-[16px] font-medium text-muted-text">
                                    Log In
                                </Link>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center px-5 py-3 bg-gold text-white text-[15px] font-semibold rounded-xl"
                                >
                                    Start Learning Free
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
