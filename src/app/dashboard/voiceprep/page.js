"use client";

import {
    Phone,
    PhoneOff,
    Mic,
    MicOff,
    Sparkles,
    Volume2,
    User,
    BotMessageSquare,
    Award,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    X,
    Star
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import "animate.css";
import axios from "axios";
import Loader from "@/components/ui/Loader";

export default function VoicePrepPage() {
    // Vapi states
    const [vapi, setVapi] = useState(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(0);
    const [voiceMessages, setVoiceMessages] = useState([]);
    const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const voiceBottomRef = useRef(null);
    const voiceMessagesRef = useRef([]);

    useEffect(() => {
        voiceMessagesRef.current = voiceMessages;
    }, [voiceMessages]);


    useEffect(() => {
        try {
            const VapiClient = require("@vapi-ai/web").default;
            const vapiInstance = new VapiClient(
                process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
            );
            setVapi(vapiInstance);

            return () => {
                vapiInstance.stop();
            };
        } catch (error) {
            console.error("Vapi initialization error:", error);
        }
    }, []);

    // Set up Vapi event listeners
    useEffect(() => {
        if (!vapi) return;

        const handleCallStart = () => {
            setIsCallActive(true);
            setIsConnecting(false);
            toast.success("Voice session started! Speak clearly into your mic.");
        };

        const handleCallEnd = async () => {
            setIsCallActive(false);
            setIsConnecting(false);
            setVolume(0);
            toast.info("Voice session ended. Analyzing performance...");

            const currentMessages = voiceMessagesRef.current;
            if (!currentMessages || currentMessages.length === 0) {
                toast.error("No transcript collected. Please start a session and speak.");
                return;
            }

            setIsLoadingFeedback(true);
            try {
                const response = await axios.post("/api/voiceprep/getFeedback", { messages: currentMessages });
                if (response.data && response.data.feedback) {
                    toast.success("Feedback analysis complete!");
                    setFeedback(response.data.feedback);
                } else {
                    toast.error("No feedback details were received. Please try again.");
                }
            } catch (err) {
                console.error("Feedback error:", err);
                toast.error(err?.response?.data?.error || "Error generating feedback. Please try again.");
            } finally {
                setIsLoadingFeedback(false);
            }
        };

        const handleMessage = (message) => {
            if (message.type === "transcript") {
                const { role, transcript, transcriptType } = message;
                if (transcriptType === "final") {
                    setVoiceMessages((prev) => [
                        ...prev,
                        { role: role === "user" ? "user" : "assistant", content: transcript }
                    ]);
                }
            }
        };

        const handleVolumeLevel = (vol) => {
            setVolume(vol);
        };

        const handleError = (error) => {
            console.error("Vapi Error:", error);
            setIsConnecting(false);
            setIsCallActive(false);
            toast.error(error.message || "Could not connect to the voice assistant.");
        };

        vapi.on("call-start", handleCallStart);
        vapi.on("call-end", handleCallEnd);
        vapi.on("message", handleMessage);
        vapi.on("volume-level", handleVolumeLevel);
        vapi.on("error", handleError);

        return () => {
            vapi.off("call-start", handleCallStart);
            vapi.off("call-end", handleCallEnd);
            vapi.off("message", handleMessage);
            vapi.off("volume-level", handleVolumeLevel);
            vapi.off("error", handleError);
        };
    }, [vapi]);

    useEffect(() => {
        voiceBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [voiceMessages]);

    // Call functions
    const startVoiceCall = () => {
        if (!vapi) {
            toast.error("Voice assistant is initializing, please wait a moment.");
            return;
        }
        setIsConnecting(true);
        vapi.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID);
    };

    const stopVoiceCall = () => {
        if (!vapi) return;
        vapi.stop();
    };

    const toggleMute = () => {
        if (!vapi) return;
        const nextMuted = !isMuted;
        vapi.setMuted(nextMuted);
        setIsMuted(nextMuted);
        toast.info(nextMuted ? "Microphone muted" : "Microphone active");
    };

    return (
        <div className="flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden bg-slate-50/50">
            {/* Header Control Board */}
            <div className="flex shrink-0 flex-col gap-3 border-b border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-0.5 shadow-md">
                        <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-white">
                            <Volume2 className="h-5 w-5 text-cyan-600" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-850" style={{ fontFamily: "Orbitron, sans-serif" }}>
                            AI Voice Interview
                        </h1>
                        <p className="text-xs text-slate-400">Speak and learn with our real-time voice agent</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="rounded-full border border-cyan-150 bg-cyan-50/80 px-3 py-1 text-xs font-semibold text-cyan-700 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-cyan-650" />
                        Powered by Vapi AI
                    </span>
                </div>
            </div>

            {/* Main Interactive Panels */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Left Panel: Call Controller */}
                <div className="w-full md:w-[40%] border-r border-slate-200 bg-white p-6 flex flex-col items-center justify-between shrink-0 overflow-y-auto">
                    <div className="w-full text-center space-y-4">
                        <h2 className="text-lg font-bold text-slate-800" style={{ fontFamily: "Orbitron, sans-serif" }}>
                            Voice Coach Terminal
                        </h2>
                        <p className="text-xs text-slate-400 max-w-xs mx-auto">
                            Connect with our real-time simulated AI interviewer. Put on your headphones for the best practice experience.
                        </p>
                    </div>

                    {/* Interactive Loop/Radar Visualizer Card */}
                    <div className="relative w-64 h-64 my-6 rounded-3xl border border-slate-100 bg-slate-95/50 shadow-inner flex items-center justify-center overflow-hidden">
                        <div className={`absolute w-48 h-48 rounded-full bg-cyan-500/10 blur-xl transition-all duration-500 ${isCallActive ? "scale-110 opacity-70 animate-pulse" : "scale-75 opacity-0"}`} />
                        <div className={`absolute w-48 h-48 rounded-full bg-purple-500/10 blur-xl transition-all duration-500 ${isCallActive ? "scale-125 opacity-55 animate-pulse" : "scale-75 opacity-0"}`} style={{ animationDelay: "0.5s" }} />

                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="flex items-center gap-1.5 justify-center h-16 w-full">
                                {[...Array(9)].map((_, i) => {
                                    const scale = isCallActive ? (volume * 100) : 0;
                                    const baseHeight = 12;
                                    const offset = Math.sin((i / 8) * Math.PI) * (scale + 5);
                                    const height = Math.max(baseHeight, isCallActive ? baseHeight + offset : baseHeight);
                                    return (
                                        <div
                                            key={i}
                                            className="w-2 bg-gradient-to-t from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-75"
                                            style={{
                                                height: `${height}px`,
                                                opacity: isCallActive ? 0.5 + (volume * 0.5) : 0.2
                                            }}
                                        />
                                    );
                                })}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isCallActive ? "text-green-500 animate-pulse" : "text-slate-400"}`}>
                                {isCallActive ? "Active Call" : "Mic Idle"}
                            </span>
                        </div>
                    </div>

                    <div className="w-full space-y-4">
                        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                            <div className="flex items-center justify-between text-xs mb-2">
                                <span className="text-slate-400">Status:</span>
                                {isCallActive ? (
                                    <span className="flex items-center gap-1 font-bold text-green-600">
                                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping" />
                                        CONNECTED
                                    </span>
                                ) : isConnecting ? (
                                    <span className="flex items-center gap-1 font-bold text-amber-500 animate-pulse">
                                        CONNECTING...
                                    </span>
                                ) : (
                                    <span className="font-bold text-slate-400">DISCONNECTED</span>
                                )}
                            </div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Interviewer Character:</span>
                                <span className="font-semibold text-slate-700">AI Coach (Voice Call)</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {isCallActive ? (
                                <>
                                    <button
                                        onClick={toggleMute}
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-200 ${isMuted
                                                ? "bg-red-50 border-red-200 text-red-600"
                                                : "bg-slate-100 border-slate-200 text-slate-655 hover:bg-slate-200"
                                            }`}
                                        title={isMuted ? "Unmute Mic" : "Mute Mic"}
                                    >
                                        {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
                                    </button>
                                    <button
                                        onClick={stopVoiceCall}
                                        className="flex-1 flex h-12 items-center justify-center gap-2 rounded-xl bg-red-600 hover:bg-red-700 font-bold text-white shadow-md active:scale-98 transition-all"
                                    >
                                        <PhoneOff size={16} />
                                        End Interview
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={startVoiceCall}
                                    disabled={isConnecting}
                                    className="w-full flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-500 font-bold text-white shadow-md hover:shadow-lg active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    {isConnecting ? (
                                        <>
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                            Establishing Call...
                                        </>
                                    ) : (
                                        <>
                                            <Phone size={16} />
                                            Start Voice Call
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Panel: Speech Transcription Log */}
                <div className="flex-1 bg-slate-50/30 p-6 flex flex-col min-h-0">
                    <div className="mb-4 shrink-0 flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Live Speech Transcript
                        </span>
                        <span className="text-[10px] text-slate-450 italic">
                            Streaming transcription logs
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-1 [scrollbar-width:thin] [-ms-overflow-style:auto]">
                        {voiceMessages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-4">
                                <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                    <Volume2 size={24} />
                                </div>
                                <p className="text-sm text-slate-400 max-w-xs">
                                    Start a voice call session to begin. Your vocal interaction transcription logs will display here.
                                </p>
                            </div>
                        ) : (
                            voiceMessages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                                        } animate__animated animate__fadeInUp`}
                                >
                                    {/* Avatar */}
                                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-0.5 text-white ${msg.role === "user"
                                            ? "bg-slate-800"
                                            : "bg-gradient-to-br from-cyan-500 to-purple-500"
                                        }`}>
                                        {msg.role === "user" ? <User size={14} /> : <BotMessageSquare size={14} />}
                                    </div>

                                    {/* Bubble */}
                                    <div className={`rounded-xl px-4 py-2.5 text-sm shadow-sm ${msg.role === "user"
                                            ? "bg-slate-900 text-white"
                                            : "bg-white text-slate-700 border border-slate-100"
                                        }`}>
                                        <p className="leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={voiceBottomRef} />
                    </div>
                </div>
            </div>
            {isLoadingFeedback && <Loader />}
            {feedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 animate__animated animate__fadeIn">
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-y-auto p-6 md:p-8 animate__animated animate__zoomIn">

                        {/* Close Button */}
                        <button
                            onClick={() => setFeedback(null)}
                            className="absolute top-4 right-4 p-2 text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {/* Modal Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6 mb-6 gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-0.5 shadow-md">
                                    <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-white dark:bg-slate-900">
                                        <Award className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-950 dark:text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>
                                        Interview Performance Review
                                    </h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Gemini AI evaluation and performance analysis</p>
                                </div>
                            </div>

                            {/* Score Widget */}
                            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 border border-purple-100 dark:border-purple-900/50 rounded-2xl px-5 py-3 self-start sm:self-auto">
                                <Star className="fill-yellow-400 text-yellow-400 h-6 w-6" />
                                <div>
                                    <div className="text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
                                        {feedback.overallRating || feedback.overallScore || "8"}/10
                                    </div>
                                    <div className="text-[10px] uppercase font-bold text-purple-650 dark:text-purple-400 tracking-wider mt-1">
                                        Overall Score
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Left Column: Detailed evaluation sections */}
                            <div className="space-y-6">
                                {/* Communication feedback */}
                                <div className="bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-850 p-5 rounded-2xl">
                                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                                        Communication Skills
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-350">
                                        {feedback.communicationFeedback}
                                    </p>
                                </div>

                                {/* Technical feedback */}
                                <div className="bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-850 p-5 rounded-2xl">
                                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                                        Technical Knowledge
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-350">
                                        {feedback.technicalFeedback}
                                    </p>
                                </div>

                                {/* Project Explanation */}
                                <div className="bg-slate-50/50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-850 p-5 rounded-2xl">
                                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">
                                        Project Explanation
                                    </h3>
                                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-350">
                                        {feedback.projectExplanationFeedback}
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Strengths & Improvement sections */}
                            <div className="space-y-6">
                                {/* Strengths */}
                                <div className="border border-emerald-100 dark:border-emerald-950 bg-emerald-50/20 dark:bg-emerald-950/10 p-5 rounded-2xl">
                                    <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-450 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                        Strengths
                                    </h3>
                                    <ul className="space-y-2">
                                        {feedback.strengths && feedback.strengths.length > 0 ? (
                                            feedback.strengths.map((strength, index) => (
                                                <li key={index} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                    <span className="text-emerald-500 font-bold">•</span>
                                                    <span>{strength}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-slate-400 italic">No specific strengths listed.</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Areas of Improvement */}
                                <div className="border border-amber-105 dark:border-amber-950 bg-amber-50/20 dark:bg-amber-950/10 p-5 rounded-2xl">
                                    <h3 className="text-sm font-bold text-amber-805 dark:text-amber-450 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                        Areas of Improvement
                                    </h3>
                                    <ul className="space-y-2">
                                        {feedback.improvementAreas && feedback.improvementAreas.length > 0 ? (
                                            feedback.improvementAreas.map((area, index) => (
                                                <li key={index} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                    <span className="text-amber-500 font-bold">•</span>
                                                    <span>{area}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-slate-400 italic">No areas of improvement listed.</li>
                                        )}
                                    </ul>
                                </div>

                                {/* Action Plan */}
                                <div className="border border-purple-105 dark:border-purple-950 bg-purple-50/20 dark:bg-purple-950/10 p-5 rounded-2xl">
                                    <h3 className="text-sm font-bold text-purple-805 dark:text-purple-450 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        Action Plan
                                    </h3>
                                    <ul className="space-y-2">
                                        {feedback.actionPlan && feedback.actionPlan.length > 0 ? (
                                            feedback.actionPlan.map((plan, index) => (
                                                <li key={index} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2">
                                                    <span className="text-purple-500 font-bold">{index + 1}.</span>
                                                    <span>{plan}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <li className="text-sm text-slate-400 italic">No action items suggested.</li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                            <button
                                onClick={() => setFeedback(null)}
                                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white font-semibold transition-all shadow-md"
                            >
                                Done Reviewing
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
