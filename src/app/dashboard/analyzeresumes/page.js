"use client"

import { useState } from "react";
import { UploadCloud, Plus, X, MoveRight, CircleCheckBig, Check, CircleCheck, Mic, ChartNoAxesCombined, Zap, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import pdfToText from 'react-pdftotext'




export default function Page() {
  const [resumeUpload, setResumeUpload] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [analysis, setAnalysis] = useState(false);
  const [text, setText] = useState('');
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(false);
  const [aiReply, setAiReply] = useState({
    overallScore: null,
    strengths: [],
    missingKeywords: [],
    atsCompatibility: "",
  });
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess(numPages) {
    setNumPages(numPages);
  }

  const handleTech = () => {
    const value = techInput.trim();

    if (!value) return;
    if (technologies.includes(value)) return;

    setTechnologies((prev) => [...prev, value]);
    setTechInput("");
  };

  const removeTech = (id) => {
    setTechnologies((prev) => prev.filter((_, i) => i !== id));
  };

  const analyzeResume = async () => {
    if (resumeUpload && !file) {
      toast.error("Please upload a resume first.");
      return;
    }
    if (!resumeUpload && !text.trim()) {
      toast.error("Please paste your resume text first.");
      return;
    }
    if (!jobTitle.trim()) {
      toast.error("Please enter a job title.");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Analyzing and optimizing your resume...");

    try {
      let extractedText = text;
      if (resumeUpload) {
        extractedText = await pdfToText(file);
        setText(extractedText);
      }
      
      const payload = {
        text: extractedText,
        jobTitle: jobTitle,
        jobDesc: jobDesc,
        requiredSkills: technologies
      };
      
      const reply = await axios.post('/api/resume', payload);
      if (reply && reply.data?.result?.analysis) {
        setAnalysis(true);
        setAiReply(reply.data.result.analysis);
        updateResumeAnalyzeCount();
        toast.success("Resume analyzed successfully", { id: toastId });
      } else {
        toast.error("Failed to parse the analysis response", { id: toastId });
      }
    } catch (error) {
      console.error("Failed to analyze resume", error);
      const errorMessage = error?.response?.data?.error || error?.message || "Failed to analyze resume";
      toast.error(error, { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  const updateResumeAnalyzeCount = async () => {
    try{
      const res = await axios.post('/api/analyze-count');
    } catch (error) {
      console.error("Error updating resume analyze count:", error);
    }
  };
  return (
    <div className="flex flex-col gap-2 p-2 h-full">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-purple-200 backdrop-blur-sm mb-4 md:w-[15%] w-[50%]">
          <Zap className="h-4 w-4 text-purple-500" />
          <h3 className="text-sm font-medium text-purple-700">Analyze Portfolio</h3>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold md:text-3xl">AI Resume Analyzer</h1>
          <p className="text-sm text-gray-600 font-semibold">Optimize your resume for specific job roles using AI</p>
        </div>
        <div className="flex items-center justify-around w-full md:w-[30%] md:h-[80%] shadow-md gap-2 text-xs sm:text-sm font-medium text-gray-500 bg-white px-3 sm:px-4 py-2 rounded-lg   self-start lg:self-auto">
          <div className="flex rounded-full text-blue-500 text-md gap-2">
            <div className="bg-[#dbeafe] border rounded-full w-5 h-5 text-center">1</div>
            Upload
          </div>
          <div className=" flex w-8 sm:w-8 h-px bg-gray-300 text-lg"></div>
          <div className="flex rounded-full text-blue-500 text-md gap-2">
            <div className="bg-[#dbeafe] border rounded-full w-5 h-5 text-center">2</div>
            Target
          </div>
          <div className="flex w-8 sm:w-8 h-px bg-gray-300"></div>
          <div className="flex rounded-full text-blue-500 text-md gap-2">
            <div className="bg-[#dbeafe] border rounded-full w-5 h-5 text-center">3</div>
            Results
          </div>
        </div>
      </div>
      {!analysis ? <div className="flex flex-col gap-4 md:flex-row  h-full">
        <div className="flex flex-col md:w-[50%] md:h-[80%] gap-3 md:gap-1">
          <div className="border border-gray-300 rounded-lg flex flex-col gap-1 p-4 md:w-full md:h-[68%]">
            <h1 className="text-lg font-bold">1. Upload Your resume</h1>
            <div className="border border-gray-300 rounded-lg flex flex-col gap-2">
              <div className="flex flex-row h-[40%] border-b border-gray-300">
                <button onClick={() => setResumeUpload(true)} className={`w-1/2 py-3 transition-all duration-300  font-semibold ${resumeUpload ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}>
                  Upload Resume
                </button>
                <button onClick={() => setResumeUpload(false)} className={`w-1/2 py-3 transition-all duration-300  font-semibold ${!resumeUpload ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}>
                  Paste Text
                </button>
              </div>
              <div className="p-5">
                {resumeUpload ? (

                  <label className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed py-10 text-center transition-all duration-300 ${file ? "border-blue-500 bg-blue-50/20" : "border-gray-300 hover:bg-gray-50 hover:border-blue-500"}`}>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      className="hidden"
                      onChange={(e) => {
                        const currFile = e.target.files[0];
                        if (!currFile) toast.error("Can't find the file");
                        else {
                          setFile(currFile);
                        }
                      }
                      }
                    />

                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${file ? "bg-green-100" : "bg-blue-100"}`}>
                      {file ? (
                        <CircleCheck className="h-6 w-6 text-green-600" />
                      ) : (
                        <UploadCloud className="h-6 w-6 text-blue-600" />
                      )}
                    </div>

                    <p className="text-sm font-semibold text-gray-800 px-4 truncate max-w-[90%]">
                      {file ? file.name : "Click to upload or drag and drop"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {file ? "Click to choose a different file" : "PDF, DOCX, or TXT (Max 5MB)"}
                    </p>
                  </label>

                ) : (
                  <textarea
                    placeholder="Paste your resume text here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-45 w-full resize-none rounded-lg border border-gray-300 p-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="border border-blue-300 bg-[#eff6ff] rounded-lg flex-1 p-4">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              Why use AI Analysis?
            </h3>

            <ul className="list-disc list-inside text-sm text-blue-500 space-y-1 font-semibold">
              <li>Increase ATS pass rate by up to 80%</li>
              <li>Identify missing keywords for the role</li>
              <li>Get instant feedback on formatting</li>
            </ul>
          </div>

        </div>
        <div className="border border-gray-300 rounded-lg flex flex-col  p-4 gap-2 md:w-[50%] md:h-[80%]">
          <h1 className="text-lg font-bold">2. Targeting Job Role</h1>
          <Label>Job Title</Label>
          <Input
            placeholder="eg.Senior Frontend Engineer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="border border-gray-300"
          />
          <Label>Job Description</Label>
          <Textarea
            placeholder="Place the job title here for better targeting..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className="border border-gray-300"
          />
          <Label>Required Skills</Label>

          <div className="flex gap-2">
            <Input
              placeholder="React, Node.js, Supabase"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="border border-gray-300"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleTech();
                }
              }}
            />

            <Button variant="ghost" size="icon" onClick={handleTech}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, id) => (
              <div
                key={id}
                className="flex items-center gap-2 rounded-full border bg-gray-100 px-3 py-1 text-sm"
              >
                <span>{tech}</span>
                <X
                  className="h-4 w-4 cursor-pointer text-gray-500 hover:text-red-500"
                  onClick={() => removeTech(id)}
                />
              </div>
            ))}
          </div>
          <Button
            onClick={analyzeResume}
            disabled={loading}
            className="bg-black text-white mt-auto cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing & Optimizing...
              </>
            ) : (
              <>
                Analyze & Optimize Resume
                <MoveRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div> :
        <div className="flex flex-col h-full p-2 gap-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="border border-gray-300 rounded-lg flex-1 p-4 space-y-4 shadow-xl">

              {/* Header */}
              <div>
                <h1 className="text-lg font-bold flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  AI Analysis Report
                </h1>
                <p className="text-gray-400 text-sm">
                  Based on job description match
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center text-lg font-semibold">
                  72%
                </div>
              </div>
              <div>
                <h2 className="font-semibold flex items-center gap-2 text-green-600">
                  <CircleCheckBig /> Strengths
                </h2>
                <ul className="mt-2 space-y-1 text-sm">
                  {aiReply?.strengths?.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CircleCheck className="text-[#bbebdb]"/>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold flex items-center gap-2 text-yellow-600">
                  ⚠️ Areas for Improvement
                </h2>
                <ul className="mt-2 space-y-1 text-sm">
                  {/* {aiReply?.weaknesses?.map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  {item}
                </li>
              ))} */}
                </ul>
              </div>
              <div>
                <h2 className="font-semibold flex items-center gap-2 text-red-500">
                  🏷️ Missing Keywords
                </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {aiReply?.missingKeywords?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm border border-red-300 text-red-500 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
            <div className="border border-gray-300 rounded-xl p-5 space-y-5 bg-white shadow-xl">
              {/* Header */}
              <div className="flex items-center gap-2 font-semibold text-lg">
                <span className="text-yellow-500 text-xl">💡</span>
                Career Insights
              </div>

              {/* Score Card */}
              <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full border-4 border-blue-500 flex items-center justify-center text-xl font-bold text-blue-600">
                  {aiReply.overallScore}%
                </div>
                <p className="font-semibold">Role Readiness</p>
                <p className="text-sm text-gray-500 text-center">
                  {aiReply.atsCompatibility} match for Senior Frontend roles
                </p>
              </div>

              {/* Progress Bars */}
              <div className="space-y-4">
                {/* Technical */}
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Technical Skills Match</span>
                    <span>92%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div className="h-2 bg-[#10b981] rounded-full w-[92%]"></div>
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <div className="flex justify-between text-sm font-medium">
                    <span>Soft Skills Match</span>
                    <span>78%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div className="h-2 bg-[#3b82f6] rounded-full w-[78%]"></div>
                  </div>
                </div>
              </div>

              <hr />

              {/* Interview Prep Tips */}
              <div className="space-y-3">
                <h3 className="font-semibold">Interview Prep Tips</h3>

                <div className="flex gap-3 items-start text-sm text-gray-600">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg"><Mic/></span>
                  <p>
                    Prepare to discuss your experience with large-scale React applications
                    and state management.
                  </p>
                </div>

                <div className="flex gap-3 items-start text-sm text-gray-600">
                  <span className="bg-purple-100 text-purple-600 p-2 rounded-lg"><ChartNoAxesCombined /></span>
                  <p>
                    Highlight your leadership in the recent e-commerce project mentioned in
                    your resume.
                  </p>
                </div>
              </div>

            </div>
          </div>
          {file && (
            <iframe
              src={URL.createObjectURL(file)}
              className="w-full h-[600px] rounded-lg border"
              title="Resume Preview"
            />
          )}
        </div>

      }
    </div>
  );
}