"use client";
import React from "react";
import { User, Bell, Shield, Moon } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-3xl mx-auto p-6 lg:p-8 space-y-8">
                <div>
                    <h1 className="text-lg font-semibold text-gray-200">Settings</h1>
                    <p className="text-xs text-gray-600 mt-0.5 font-mono">Account preferences & configuration</p>
                </div>

                {/* Profile */}
                <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><User className="w-3 h-3" /> Profile</h3>
                    <div className="space-y-3">
                        {[
                            { label: "Name", value: "Kwame Asante" },
                            { label: "Email", value: "kwame@ug.edu.gh" },
                            { label: "University", value: "University of Ghana" },
                        ].map((f, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.02]">
                                <span className="text-[11px] text-gray-600">{f.label}</span>
                                <span className="text-[12px] text-gray-300 font-mono">{f.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Preferences */}
                <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Moon className="w-3 h-3" /> Preferences</h3>
                    <div className="space-y-3">
                        {[
                            { label: "Default Mode", value: "Student" },
                            { label: "LaTeX Rendering", value: "Enabled" },
                            { label: "Auto-verify Solutions", value: "On" },
                        ].map((f, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.02]">
                                <span className="text-[11px] text-gray-600">{f.label}</span>
                                <span className="text-[12px] text-indigo-400 font-mono">{f.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Security */}
                <div className="bg-[#0d0d14] border border-white/[0.04] rounded-xl p-5">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2"><Shield className="w-3 h-3" /> Security</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between py-2 border-b border-white/[0.02]">
                            <span className="text-[11px] text-gray-600">Password</span>
                            <button className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors">Change</button>
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <span className="text-[11px] text-gray-600">Two-Factor Auth</span>
                            <span className="text-[10px] text-gray-700">Not enabled</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
