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
        <div className="flex flex-col gap-2 h-screen overflow-hidden ">
            <div className="border-b border-gray-300 h-[7%] p-3 flex justify-between items-center shadow-sm">
                <h1 className="font-semibold md:text-2xl">Interview Prep</h1>
                <div className="flex gap-6 flex-row  md:w-[15%] justify-around">
                    <button onClick={handleReset}>
                        <div className="flex flex-row gap-2">
                            <RotateCcw className="text-gray-400 h-5 w-5 cursor-pointer" />
                            <h1 className="text-gray-400 h-5 w-5 cursor-pointer hidden md:block">Restart</h1>
                        </div>
                    </button>
                    <button onClick={handleEnd}>
                        <div className="flex flex-row gap-2">
                            <LogOut className="text-gray-400 h-5 w-5 cursor-pointer" />
                            <h1 className="text-gray-400 h-5 w-5 cursor-pointer hidden md:block">End</h1>
                        </div>
                    </button>
                </div>
            </div>
            <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-[#f6f7f9]">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`max-w-[70%] md:max-w-[50%] p-3 rounded-lg text-sm mb-2 font-semibold  shadow-lg animate__animated animate__fadeIn
              ${msg.role === "assistant"
                                ? "bg-[#DBEAFE] text-gray-900 self-start border border-gray-200"
                                : "bg-[#334155] text-white self-end ml-auto rounded-tr-none"}
            `}
                    >
                        {msg.role === "assistant" ? <BotMessageSquare /> : <User />}
                        {msg.content.split("\n").map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </div>
                ))}
                <div ref={bottomRef}></div>
            </div>
            <div className={`border-t border-gray-300 p-3 flex flex-row gap-2 mt-auto ${!file ? "h-[18%] md:h-[16%]" : "h-[8%] md:h-[8%]"
                }`}
            >
                {!fileUploaded ? (
                    <div className="w-full flex flex-row gap-2">
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
                            className="p-2 hover:bg-gray-200 rounded relative"
                        >
                            <SendHorizontal />
                        </button>
                    </div>
                ) : (<div className="w-full flex flex-row gap-2 ">
                    <Input placeholder="Type your answer here…"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleClick();
                                setQuery("");
                            }
                        }} />
                    <button
                        onClick={() => { handleClick(); setQuery(""); }}
                        className="p-2 hover:bg-gray-200 rounded relative"
                    >
                        <SendHorizontal />
                    </button>
                </div>)}

            </div>
        </div>
    );
}
