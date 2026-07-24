"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, User, Check, Zap, Shield, Crown, RefreshCw, Tag, X, AlertCircle, CheckCircle } from 'lucide-react';

// Valid discount codes (in production, validate server-side)
const validCodes: Record<string, { type: "percentage" | "fixed"; value: number; appliesTo: string }> = {
    "WELCOME25": { type: "percentage", value: 25, appliesTo: "All Plans" },
    "KNUST2026": { type: "percentage", value: 15, appliesTo: "Semester Pro" },
    "FIRSTMONTH": { type: "fixed", value: 20, appliesTo: "Analyst" },
    "STUDYGROUP10": { type: "percentage", value: 10, appliesTo: "All Plans" },
};

const planPrices: Record<string, { price: number; label: string; period: string }> = {
    analyst: { price: 49, label: "Analyst", period: "/mo" },
    semester: { price: 159, label: "Semester Pro", period: "/semester" },
};

export default function LoginPage() {
    const [step, setStep] = useState<'auth' | 'pricing' | 'discount'>('auth');
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Discount code state
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
    const [discountCode, setDiscountCode] = useState('');
    const [discountStatus, setDiscountStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const [appliedDiscount, setAppliedDiscount] = useState<{ type: "percentage" | "fixed"; value: number } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const adminEmails = [
            'admin@kokademia.com',
            'academic@kokademia.com',
            'support@kokademia.com',
            'finance@kokademia.com',
            'admin@actuary.com'
        ];

        if (adminEmails.includes(email.toLowerCase()) && (password === 'admin' || password === 'admin123' || password === `${email.split('@')[0]}123`)) {
            window.location.href = '/admin';
        } else if (email && password) {
            window.location.href = '/dashboard';
        } else if (isSignUp) {
            setStep('pricing');
        } else {
            setError('Invalid credentials');
            setIsLoading(false);
        }
    };

    const handlePlanSelect = (plan: string) => {
        if (plan === 'free') {
            // Free tier — no discount prompt needed
            window.location.href = '/dashboard';
            return;
        }
        // Paid plan — show discount code prompt
        setSelectedPlan(plan);
        setDiscountCode('');
        setDiscountStatus('idle');
        setAppliedDiscount(null);
        setStep('discount');
    };

    const handleApplyCode = () => {
        const code = discountCode.trim().toUpperCase();
        const discount = validCodes[code];

        if (!discount) {
            setDiscountStatus('invalid');
            setAppliedDiscount(null);
            return;
        }

        // Check if code applies to the selected plan
        const plan = planPrices[selectedPlan!];
        if (discount.appliesTo !== "All Plans" && discount.appliesTo !== plan.label) {
            setDiscountStatus('invalid');
            setAppliedDiscount(null);
            return;
        }

        setDiscountStatus('valid');
        setAppliedDiscount({ type: discount.type, value: discount.value });
    };

    const getDiscountedPrice = () => {
        if (!selectedPlan || !appliedDiscount) return null;
        const original = planPrices[selectedPlan].price;
        if (appliedDiscount.type === "percentage") {
            return Math.round(original * (1 - appliedDiscount.value / 100));
        }
        return Math.max(0, original - appliedDiscount.value);
    };

    const handleConfirmPlan = () => {
        console.log(`Selected plan: ${selectedPlan}, discount: ${appliedDiscount ? JSON.stringify(appliedDiscount) : 'none'}`);
        window.location.href = '/dashboard';
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFC] text-slate-900 p-4 relative overflow-hidden font-sans">
            {/* Background Radial Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-100/60 via-purple-50/40 to-transparent blur-3xl pointer-events-none z-0" />

            <AnimatePresence mode="wait">
                {step === 'auth' && (
                    /* --- AUTHENTICATION VIEW --- */
                    <motion.div
                        key="auth-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 z-10 relative"
                    >
                        {/* Logo Badge */}
                        <div className="flex justify-center mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                K
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                                {isSignUp ? "Create Your Account" : "Welcome Back"}
                            </h1>
                            <p className="text-xs font-semibold text-slate-500 mt-2">
                                {isSignUp ? "Join the elite actuarial & math AI platform." : "Sign in to continue your actuarial learning."}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <AnimatePresence>
                                {isSignUp && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-1.5 overflow-hidden"
                                    >
                                        <label className="text-xs text-slate-700 font-bold ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-slate-400"
                                                placeholder="John Doe"
                                                required={isSignUp}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-700 font-bold ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-slate-400"
                                        placeholder="student@university.edu"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs text-slate-700 font-bold ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all placeholder:text-slate-400"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs font-bold text-rose-600">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 group text-xs"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>{isSignUp ? "Continue to Plans" : "Sign In"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>
                        </form>

                        {/* Quick Admin Test Login Pills */}
                        <div className="mt-6 pt-6 border-t border-slate-100">
                            <span className="text-[11px] font-bold text-slate-400 block text-center mb-2.5 uppercase tracking-wider">Quick Fill Test Logins</span>
                            <div className="flex flex-wrap gap-1.5 justify-center">
                                {[
                                    { label: "Super Admin", email: "admin@kokademia.com", pass: "admin123" },
                                    { label: "Academic", email: "academic@kokademia.com", pass: "academic123" },
                                    { label: "Support", email: "support@kokademia.com", pass: "support123" },
                                    { label: "Finance", email: "finance@kokademia.com", pass: "finance123" },
                                    { label: "Student", email: "student@university.edu", pass: "pass123" },
                                ].map((acc) => (
                                    <button
                                        key={acc.label}
                                        type="button"
                                        onClick={() => {
                                            setEmail(acc.email);
                                            setPassword(acc.pass);
                                        }}
                                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 transition-colors border border-slate-200/60"
                                    >
                                        {acc.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-xs text-slate-500 font-semibold">
                                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                                <button
                                    onClick={() => setIsSignUp(!isSignUp)}
                                    className="text-indigo-600 hover:underline transition-colors ml-1 font-bold"
                                >
                                    {isSignUp ? "Log in" : "Sign up for free"}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                )}

                {step === 'pricing' && (
                    /* --- PRICING VIEW --- */
                    <motion.div
                        key="pricing-grid"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="w-full max-w-5xl z-10 flex flex-col items-center"
                    >
                        <div className="text-center mb-10 w-full">
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Choose Your Path</h2>
                            <p className="text-xs font-semibold text-slate-500">Select a plan to unlock full actuarial potential.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-8">
                            <PricingCard
                                title="Free Tier"
                                price="GH₵ 0"
                                icon={<Shield className="w-6 h-6 text-slate-400" />}
                                features={["5 Documents", "10 AI Queries / Day", "1 Exam Generation", "Standard Speed"]}
                                onSelect={() => handlePlanSelect('free')}
                            />
                            <PricingCard
                                title="Analyst"
                                price="GH₵ 49"
                                period="/mo"
                                icon={<User className="w-6 h-6 text-indigo-600" />}
                                features={["50 Documents", "150 AI Queries / Month", "Notebook Mode", "Basic Mock Exams", "Faster Speed"]}
                                onSelect={() => handlePlanSelect('analyst')}
                            />
                            <PricingCard
                                title="Semester Pro"
                                price="GH₵ 159"
                                period="/semester"
                                badge="🏆 BEST VALUE"
                                highlighted
                                icon={<Crown className="w-6 h-6 text-amber-500" />}
                                features={["150 Documents", "600 Queries / Semester", "15 Verified Solutions", "Full Mock Exams", "Offline Mode + Priority Queue"]}
                                onSelect={() => handlePlanSelect('semester')}
                            />
                        </div>

                        {/* Institutional Plan Banner */}
                        <div className="w-full max-w-4xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 text-white rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl mb-8">
                            <div className="flex-1">
                                <h3 className="text-2xl font-extrabold text-white flex items-center gap-2 mb-2">
                                    <Zap className="w-6 h-6 text-amber-300" />
                                    Institutional Plan
                                </h3>
                                <p className="text-indigo-100 text-xs font-medium mb-3">
                                    Dedicated section for UPSA, University of Ghana, KNUST, and UCC.
                                </p>
                                <div className="flex flex-wrap gap-4 text-xs font-semibold text-indigo-200">
                                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-amber-300" /> Admin dashboard</span>
                                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-amber-300" /> Centralized billing</span>
                                    <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-amber-300" /> 500+ student minimum</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-center md:items-end">
                                <a
                                    href="mailto:kingsfordohenebakorang@gmail.com?subject=Kokademia Institutional Plan Inquiry"
                                    className="px-8 py-3 bg-white text-indigo-700 font-bold rounded-full hover:bg-slate-100 transition-colors whitespace-nowrap text-xs shadow-md"
                                >
                                    Contact Sales
                                </a>
                                <div className="text-xs text-indigo-100 font-medium text-center md:text-right">
                                    <p>Tell: <a href="tel:0242789520" className="underline">024 278 9520</a></p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'discount' && selectedPlan && (
                    /* --- DISCOUNT CODE VIEW --- */
                    <motion.div
                        key="discount-step"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -100 }}
                        className="w-full max-w-md z-10"
                    >
                        <div className="card-owlearn p-8 shadow-xl bg-white">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                                    <Tag className="w-5 h-5 text-indigo-600" /> Discount Code
                                </h2>
                                <button
                                    onClick={() => { setStep('pricing'); setSelectedPlan(null); }}
                                    className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Selected Plan Summary */}
                            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">{planPrices[selectedPlan].label}</div>
                                        <div className="text-xs font-semibold text-slate-500 mt-0.5">Selected plan</div>
                                    </div>
                                    <div className="text-right">
                                        {appliedDiscount && discountStatus === 'valid' ? (
                                            <>
                                                <div className="text-lg font-extrabold text-indigo-600">
                                                    GH₵ {getDiscountedPrice()}<span className="text-xs text-slate-500">{planPrices[selectedPlan].period}</span>
                                                </div>
                                                <div className="text-xs text-slate-400 line-through">GH₵ {planPrices[selectedPlan].price}</div>
                                            </>
                                        ) : (
                                            <div className="text-lg font-extrabold text-slate-900">
                                                GH₵ {planPrices[selectedPlan].price}<span className="text-xs text-slate-500">{planPrices[selectedPlan].period}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Discount Input */}
                            <div className="mb-4">
                                <label className="text-xs text-slate-700 font-bold mb-2 block">
                                    Have a discount code? <span className="text-slate-400 font-normal">(optional)</span>
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        value={discountCode}
                                        onChange={e => {
                                            setDiscountCode(e.target.value.toUpperCase());
                                            if (discountStatus !== 'idle') {
                                                setDiscountStatus('idle');
                                                setAppliedDiscount(null);
                                            }
                                        }}
                                        onKeyDown={e => { if (e.key === 'Enter') handleApplyCode(); }}
                                        placeholder="e.g. WELCOME25"
                                        className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none focus:border-indigo-600"
                                    />
                                    <button
                                        onClick={handleApplyCode}
                                        disabled={!discountCode.trim()}
                                        className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-bold rounded-2xl transition-all shadow-md"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Feedback */}
                            {discountStatus === 'valid' && appliedDiscount && (
                                <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-50 border border-emerald-100 mb-4">
                                    <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                                    <span className="text-xs text-emerald-800 font-medium">
                                        Code applied! You save{' '}
                                        <strong>
                                            {appliedDiscount.type === 'percentage'
                                                ? `${appliedDiscount.value}%`
                                                : `GH₵ ${appliedDiscount.value}`}
                                        </strong>{' '}
                                        — new price is <strong>GH₵ {getDiscountedPrice()}{planPrices[selectedPlan].period}</strong>.
                                    </span>
                                </div>
                            )}

                            {discountStatus === 'invalid' && (
                                <div className="flex items-center gap-2 p-3 rounded-2xl bg-rose-50 border border-rose-100 mb-4">
                                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                                    <span className="text-xs text-rose-700 font-medium">
                                        Invalid code or not applicable to {planPrices[selectedPlan].label}.
                                    </span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="space-y-3 mt-6">
                                <button
                                    onClick={handleConfirmPlan}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-full transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2 text-xs"
                                >
                                    {discountStatus === 'valid' ? (
                                        <>Continue with Discount <ArrowRight className="w-4 h-4" /></>
                                    ) : (
                                        <>Continue — GH₵ {planPrices[selectedPlan].price}{planPrices[selectedPlan].period} <ArrowRight className="w-4 h-4" /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute bottom-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Secure Actuarial Network • 256-Bit Encryption
            </div>
        </div>
    );
}

/* --- HELPER COMPONENT: PRICING CARD --- */
function PricingCard({ title, price, period, badge, features, highlighted = false, icon, onSelect }: any) {
    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={`p-8 rounded-3xl border transition-all flex flex-col ${
                highlighted
                    ? 'bg-gradient-to-b from-indigo-600 to-purple-800 text-white border-indigo-500 shadow-xl shadow-indigo-200'
                    : 'bg-white text-slate-900 border-slate-200 shadow-sm'
            }`}
        >
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="text-xl font-bold">{title}</h3>
                {badge && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-slate-900 px-2.5 py-1 rounded-full">
                        {badge}
                    </span>
                )}
            </div>
            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{price}</span>
                {period && <span className={highlighted ? "text-indigo-200 text-sm font-medium" : "text-slate-500 text-sm font-medium"}>{period}</span>}
            </div>
            <ul className="space-y-3.5 mb-8 flex-1">
                {features.map((f: string, i: number) => (
                    <li key={i} className={`flex items-center gap-3 text-xs font-semibold ${highlighted ? "text-indigo-100" : "text-slate-600"}`}>
                        <Check className={`w-4 h-4 ${highlighted ? "text-amber-300" : "text-indigo-600"}`} /> {f}
                    </li>
                ))}
            </ul>
            <button
                onClick={onSelect}
                className={`w-full py-3.5 rounded-full font-bold text-xs transition-all shadow-md ${
                    highlighted
                        ? 'bg-white hover:bg-slate-100 text-indigo-700'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-100'
                }`}
            >
                Get Started
            </button>
        </motion.div>
    );
}
