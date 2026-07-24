"use client";
import React from "react";
import { User, Bell, Shield, Moon } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Account &amp; Platform Settings</h1>
                <p className="text-xs font-semibold text-slate-500 mt-1">Manage your profile, preferences, and security settings</p>
            </div>

            {/* Profile */}
            <div className="card-owlearn p-6">
                <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-600" /> User Profile
                </h3>
                <div className="space-y-3">
                    {[
                        { label: "Full Name", value: "Kingsford Oheneba" },
                        { label: "Email Address", value: "kingsford@kokademia.com" },
                        { label: "Institution / Program", value: "Actuarial Science & Mathematical Finance" },
                    ].map((f, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <span className="text-xs font-bold text-slate-600">{f.label}</span>
                            <span className="text-xs font-bold text-slate-900">{f.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Preferences */}
            <div className="card-owlearn p-6">
                <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-indigo-600" /> Platform Preferences
                </h3>
                <div className="space-y-3">
                    {[
                        { label: "Default AI Mode", value: "Student (Step-by-step)" },
                        { label: "LaTeX Math Rendering", value: "KaTeX Enabled" },
                        { label: "SymPy Code Verification", value: "Auto-verify Active" },
                    ].map((f, i) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                            <span className="text-xs font-bold text-slate-600">{f.label}</span>
                            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">{f.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Security */}
            <div className="card-owlearn p-6">
                <h3 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-indigo-600" /> Security &amp; Credentials
                </h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between py-3 border-b border-slate-100">
                        <span className="text-xs font-bold text-slate-600">Password</span>
                        <button className="text-xs font-bold text-indigo-600 hover:underline">Change Password</button>
                    </div>
                    <div className="flex items-center justify-between py-3">
                        <span className="text-xs font-bold text-slate-600">Two-Factor Authentication (2FA)</span>
                        <span className="text-xs font-bold text-slate-400">Disabled</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
