"use client";

import { Input } from "@/components/ui/input";
import { LogOut, RotateCcw, BotMessageSquare, User, SendHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

export default function Page() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                role: "assistant",
                content:
                    "Welcome to your interview session. I've reviewed your resume and the job description for the Frontend Developer position.Let's begin with a technical question based on your experience.Can you walk me through a challenging project you worked on using React? I'd like to understand your role, the technical decisions you made, and how you handled any obstacles."
            }
        ]);
    }, []);

    return (
        <div className="flex flex-col gap-2 h-full overflow-hidden">
            <div className="border-b border-gray-300 h-[7%] p-3 flex justify-between items-center shadow-sm">
                <h1 className="font-semibold md:text-2xl">Interview Prep</h1>
                <div className="flex gap-6 flex-row  md:w-[15%] justify-around">
                    <div className="flex flex-row gap-2">
                        <RotateCcw className="text-gray-400 h-5 w-5 cursor-pointer" />
                        <h1 className="text-gray-400 h-5 w-5 cursor-pointer hidden md:block">Restart</h1>
                    </div>
                    <div className="flex flex-row gap-2">
                        <LogOut className="text-gray-400 h-5 w-5 cursor-pointer" />
                        <h1 className="text-gray-400 h-5 w-5 cursor-pointer hidden md:block">End</h1>
                    </div>
                </div>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#f6f7f9]">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`max-w-[70%] p-3 rounded-lg text-sm
              ${msg.role === "assistant"
                                ? "bg-gray-100 text-gray-900 self-start"
                                : "bg-blue-600 text-white self-end"}
            `}
                    >
                        {msg.role === "assistant" ? <BotMessageSquare /> : <User />}
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-300 p-3 h-[14%] md:h-[16%] flex flex-row gap-2">
                <Input placeholder="Type your answer here…" />
                <SendHorizontal className="relative mt-2" />
            </div>
        </div>
    );
}
