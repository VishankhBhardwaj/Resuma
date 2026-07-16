"use client";

import { Input } from "@/components/ui/input";
import { LogOut, RotateCcw, BotMessageSquare, User, SendHorizontal } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import axios from "axios";
import { toast } from "sonner";
import "animate.css"
export default function Page() {
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState();
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState();
    const [fileUploaded, setFileUploaded] = useState(false);
    const bottomRef = useRef(null);
    useEffect(() => {
        setMessages([
            {
                role: "assistant",
                content:
                    "Welcome to your interview session. I've reviewed your resume and the job description for the Frontend Developer position.Let's begin with a technical question based on your experience.Can you walk me through a challenging project you worked on using React? I'd like to understand your role, the technical decisions you made, and how you handled any obstacles."
            },
        ]);
    }, []);

    const handleClick = async () => {
        if (query === "") {
            toast.success("Please provide an input");
            return;
        }
        setMessages((prev) => [
            ...prev, { role: "user", content: query }
        ])
        const formData = new FormData()
        formData.append("query", query)
        try {
            const response = await axios.post("http://127.0.0.1:8000/ai_agent", formData)
            if (response) {
                const result = response.data.answer
                setAnswer(result)
            }
        } catch (error) {
            toast.error("Something went wrong,Please try again later");
            console.log(error)
        }
    }

    const handleFileUpload = async () => {
        try {
            toast.success("Please wait while we upload the document")
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post("http://127.0.0.1:8000/file_upload", formData)
            if (response.data.message === "Embeddings created") {
                setFileUploaded(true);
                toast.success("Resume Uploaded Successfully")
            }
        } catch (error) {
            toast.error("Some Error occured,Please Try Again Later", error);
        }
    }
    const handleReset = () => {
        setMessages([messages[0]]);
    }
    const handleEnd = async () => {
        try {
            console.log("End hora hai ji")
            const result = await axios.post("http://127.0.0.1:8000/delete_vectors")
            if (result.data.answer === "Deleted Successfully") {
                toast.success("Chat session ended. You can upload a new resume now.")
                setFile(null);
                setFileUploaded(false);
            }
        } catch (error) {
            toast.error("Failed to end session. Please try again.");
        }
    }
    useEffect(() => {
        console.log(answer)
        if (answer) {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: answer }
            ]);
        }
    }, [answer]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    return (
        <div className="flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden">
            <div className="flex shrink-0 items-center justify-between border-b border-gray-300 p-3 shadow-sm">
                <h1 className="font-semibold md:text-2xl">Interview Prep</h1>
                <div className="flex flex-row gap-6 justify-around md:w-[15%]">
                    <button onClick={handleReset}>
                        <div className="flex flex-row gap-2">
                            <RotateCcw className="h-5 w-5 cursor-pointer text-gray-400" />
                            <h1 className="hidden h-5 w-5 cursor-pointer text-gray-400 md:block">Reset</h1>
                        </div>
                    </button>
                    <button onClick={handleEnd}>
                        <div className="flex flex-row gap-2">
                            <LogOut className="h-5 w-5 cursor-pointer text-gray-400" />
                            <h1 className="hidden h-5 w-5 cursor-pointer text-gray-400 md:block">End</h1>
                        </div>
                    </button>
                </div>
            </div>
            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#f8fafc] p-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {messages.map((msg, i) =>
                    msg.role === "assistant" ? (
                        <div
                            key={i}
                            className="group relative max-w-[85%] md:max-w-[65%] animate__animated animate__fadeIn"
                        >
                            <div
                                aria-hidden
                                className="absolute -inset-px rounded-2xl bg-gradient-to-br from-cyan-400/40 via-purple-400/30 to-pink-400/40 opacity-70 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
                            />
                            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-sm backdrop-blur-md md:p-5">
                                <div
                                    aria-hidden
                                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-400/15 to-pink-400/20 blur-2xl"
                                />
                                <div className="relative flex gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-0.5 shadow-sm">
                                        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                                            <BotMessageSquare className="h-5 w-5 text-cyan-600" />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span
                                                className="text-sm font-semibold text-slate-800"
                                                style={{ fontFamily: "Orbitron, sans-serif" }}
                                            >
                                                AI Interviewer
                                            </span>
                                            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cyan-700">
                                                Coach
                                            </span>
                                        </div>
                                        <div className="text-sm font-normal leading-relaxed text-slate-600">
                                            {msg.content.split("\n").map((line, index, lines) => (
                                                <span key={index}>
                                                    {line}
                                                    {index < lines.length - 1 && <br />}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            key={i}
                            className="group relative ml-auto max-w-[85%] md:max-w-[65%] animate__animated animate__fadeIn"
                        >
                            <div
                                aria-hidden
                                className="absolute -inset-px rounded-2xl bg-gradient-to-br from-slate-400/35 via-indigo-400/30 to-cyan-400/35 opacity-70 blur-[1px] transition-opacity duration-300 group-hover:opacity-100"
                            />
                            <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-indigo-50/60 p-4 shadow-sm backdrop-blur-md md:p-5">
                                <div
                                    aria-hidden
                                    className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-gradient-to-br from-indigo-400/15 via-slate-400/10 to-cyan-400/15 blur-2xl"
                                />
                                <div className="relative flex gap-3">
                                    <div className="min-w-0 flex-1 text-right">
                                        <div className="mb-2 flex items-center justify-end gap-2">
                                            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-700">
                                                You
                                            </span>
                                            <span
                                                className="text-sm font-semibold text-slate-800"
                                                style={{ fontFamily: "Orbitron, sans-serif" }}
                                            >
                                                Candidate
                                            </span>
                                        </div>
                                        <div className="text-left text-sm font-normal leading-relaxed text-slate-700">
                                            {msg.content.split("\n").map((line, index, lines) => (
                                                <span key={index}>
                                                    {line}
                                                    {index < lines.length - 1 && <br />}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 via-indigo-500 to-cyan-500 p-0.5 shadow-sm">
                                        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                                            <User className="h-5 w-5 text-indigo-600" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
                <div ref={bottomRef}></div>
            </div>
            <div className="flex shrink-0 flex-row gap-2 border-t border-gray-300 p-3">
                {!fileUploaded ? (
                    <div className="flex w-full flex-row gap-2">
                        <Field>
                            <FieldLabel htmlFor="resume">Resume</FieldLabel>
                            <Input id="resume" type="file" onChange={(e) => {
                                const currFile = e.target.files?.[0]
                                setFile(currFile)
                            }} className="cursor-pointer" />
                            <FieldDescription>Select a Resume to upload.</FieldDescription>
                        </Field>
                        <button
                            onClick={() => { handleFileUpload(); }}
                            className="relative rounded p-2 hover:bg-gray-200"
                        >
                            <SendHorizontal />
                        </button>
                    </div>
                ) : (
                    <div className="flex w-full flex-row gap-2">
                        <Input
                            placeholder="Type your answer here…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleClick();
                                    setQuery("");
                                }
                            }}
                        />
                        <button
                            onClick={() => { handleClick(); setQuery(""); }}
                            className="relative rounded p-2 hover:bg-gray-200"
                        >
                            <SendHorizontal />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
