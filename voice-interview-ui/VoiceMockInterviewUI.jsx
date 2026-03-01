"use client";

import { useState } from "react";
import { Mic, MicOff, Loader2, Sparkles, BrainCircuit, Radio } from "lucide-react";

/**
 * VoiceMockInterviewUI
 *
 * Pure UI component — no API / backend logic.
 * Replace `handleToggle` with your real Vapi start/stop calls.
 *
 * call states:
 *   "inactive"  → ready to start
 *   "loading"   → connecting / handshake
 *   "active"    → live session
 */
export default function VoiceMockInterviewUI() {
    const [callState, setCallState] = useState("inactive");

    // Dummy toggle — cycles states for UI preview
    const handleToggle = () => {
        setCallState((prev) => {
            if (prev === "inactive") return "loading";
            if (prev === "loading") return "active";
            return "inactive";
        });
    };

    const isInactive = callState === "inactive";
    const isLoading = callState === "loading";
    const isActive = callState === "active";

    return (
        /* Page wrapper — matches dashboard gradient bg */
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8 flex flex-col items-center justify-center">

            {/* ── Page header — identical to Settings page header ── */}
            <div className="w-full max-w-xl mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-purple-200 backdrop-blur-sm mb-4">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm font-medium text-purple-700">AI Feature</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 bg-clip-text text-transparent">
                    AI Voice Interviewer
                </h1>
                <p className="text-gray-600 text-lg mt-2">
                    Practice real interview scenarios with voice-powered AI feedback.
                </p>
            </div>

            {/* ── Main card — matches dashboard card style ── */}
            <div className="w-full max-w-xl bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl p-6 md:p-10 flex flex-col items-center gap-8">

                {/* Icon header row */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-md shadow-purple-500/20">
                        <BrainCircuit className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Voice Session</h2>
                        <p className="text-sm text-gray-500">Speak naturally — AI will guide you</p>
                    </div>
                </div>

                {/* Status badge */}
                <div
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium transition-all duration-300 ${isActive
                            ? "bg-red-50 border-red-200 text-red-700"
                            : isLoading
                                ? "bg-yellow-50 border-yellow-200 text-yellow-700"
                                : "bg-blue-50 border-blue-200 text-[#1c398e]"
                        }`}
                >
                    {isActive && (
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                        </span>
                    )}
                    {isLoading && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                    {isInactive && <Radio className="h-3.5 w-3.5" />}
                    <span>
                        {isActive ? "Session Live" : isLoading ? "Establishing connection…" : "Ready to Start"}
                    </span>
                </div>

                {/* ── Central Mic button ── */}
                <div className="relative flex items-center justify-center py-4">
                    {/* Ping rings when active */}
                    {isActive && (
                        <>
                            <span className="absolute h-44 w-44 rounded-full bg-red-400/20 animate-ping" />
                            <span
                                className="absolute h-36 w-36 rounded-full bg-red-400/25 animate-ping"
                                style={{ animationDelay: "0.3s" }}
                            />
                        </>
                    )}

                    {/* Soft glow when inactive */}
                    {isInactive && (
                        <span className="absolute h-36 w-36 rounded-full bg-purple-400/15 animate-pulse" />
                    )}

                    <button
                        onClick={handleToggle}
                        disabled={isLoading}
                        aria-label={
                            isInactive ? "Start Interview" : isActive ? "End Interview" : "Connecting"
                        }
                        className={`relative z-10 h-28 w-28 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 focus:outline-none disabled:cursor-not-allowed ${isActive
                                ? "bg-gradient-to-br from-red-500 to-pink-600 shadow-red-500/30 hover:shadow-red-500/50"
                                : isLoading
                                    ? "bg-gradient-to-br from-gray-300 to-gray-400 shadow-gray-300/30"
                                    : "bg-gradient-to-br from-purple-500 to-blue-500 shadow-purple-500/30 hover:shadow-purple-500/50 cursor-pointer"
                            }`}
                        style={{
                            boxShadow: isActive
                                ? "0 0 32px rgba(239,68,68,0.35), 0 8px 20px rgba(0,0,0,0.15)"
                                : isLoading
                                    ? "0 8px 20px rgba(0,0,0,0.1)"
                                    : "0 0 28px rgba(168,85,247,0.3), 0 8px 20px rgba(0,0,0,0.12)",
                        }}
                    >
                        {isLoading ? (
                            <Loader2 className="w-10 h-10 text-white animate-spin" />
                        ) : isActive ? (
                            <MicOff className="w-10 h-10 text-white" />
                        ) : (
                            <Mic className="w-10 h-10 text-white" />
                        )}
                    </button>
                </div>

                {/* CTA text */}
                <div className="text-center -mt-2">
                    <p
                        className={`text-lg font-semibold transition-colors duration-300 ${isActive ? "text-red-600" : isLoading ? "text-gray-500" : "text-gray-900"
                            }`}
                    >
                        {isActive
                            ? "Interview in Progress"
                            : isLoading
                                ? "Connecting..."
                                : "Start Interview"}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        {isActive
                            ? "Click the mic to end the session"
                            : isLoading
                                ? "Please wait a moment"
                                : "Click the mic to begin speaking"}
                    </p>
                </div>

                {/* Live waveform — shown only during active */}
                {isActive && (
                    <div className="flex items-end gap-1 h-8">
                        {[4, 7, 11, 8, 14, 6, 10, 5, 13, 7, 9, 5].map((h, i) => (
                            <span
                                key={i}
                                className="w-1.5 rounded-full bg-gradient-to-t from-purple-500 to-blue-400 animate-pulse"
                                style={{
                                    height: `${h * 2}px`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: `${0.6 + (i % 3) * 0.2}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Feature chips — matches notification items style */}
                <div className="w-full grid grid-cols-3 gap-3">
                    {[
                        { emoji: "🎙️", label: "Real-time Voice" },
                        { emoji: "🧠", label: "AI Feedback" },
                        { emoji: "📊", label: "Skill Analysis" },
                    ].map(({ emoji, label }) => (
                        <div
                            key={label}
                            className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/80 border border-gray-200 hover:border-purple-300 transition-all text-center"
                        >
                            <span className="text-xl">{emoji}</span>
                            <span className="text-xs font-medium text-gray-700">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-gray-400 leading-relaxed max-w-sm">
                    Your session may be used to improve AI accuracy. Review our{" "}
                    <span className="underline cursor-pointer hover:text-purple-500 transition-colors">
                        Privacy Policy
                    </span>{" "}
                    before proceeding.
                </p>
            </div>
        </div>
    );
}
