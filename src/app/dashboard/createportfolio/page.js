"use client";
import StepProgress from "@/components/ui/StepProgress";
import { ChevronLeft, ChevronRight, Zap, Crown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import pdfToText from 'react-pdftotext';
import ChooseTemplate from "./ChooseTemplate";
import ProfileInformation from "./ProfileInformation";
import SkillsCertifications from "./SkillsCertifications";
import WorkExperience from "./WorkExperience";
import ReviewPublish from "./ReviewPublish";
import Projects from "./Projects";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
import { usePortfolioStore } from "@/store/portfolioStore";
export default function Page() {
  const router = useRouter();
  const [currStep, setCurrStep] = useState(1);
  const [ai, setAi] = useState(false);
  const data = usePortfolioStore((state) => state.data);
  const setData = usePortfolioStore((state) => state.setData);
  const [stepValid, setStepValid] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const checkPremiumStatus = async () => {
      try {
        const response = await axios.get("/api/user");
        if (response.data) {
          setIsPremium(response.data.isPremium || false);
        }
      } catch (error) {
        console.error("Error checking premium status in creator page:", error);
      }
    };
    checkPremiumStatus();
  }, []);

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setParsing(true);
    const toastId = toast.loading("Extracting resume text...");

    try {
      const text = await pdfToText(file);
      toast.loading("AI parsing resume & structuring data...", { id: toastId });

      const response = await axios.post("/api/ai/parse-resume", { text });
      if (response.data && response.data.result) {
        setData(response.data.result);
        setStepValid(true);
        toast.success("Resume parsed successfully! Auto-filled all steps.", { id: toastId });
        setCurrStep(2); // Jump to Profile Information to let them verify
      } else {
        toast.error("Failed to parse resume.", { id: toastId });
      }
    } catch (err) {
      console.error("Resume parsing error:", err);
      toast.error(err?.response?.data?.error || "Error parsing resume. Please try again.", { id: toastId });
    } finally {
      setParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const handleSubmit = (newData, isValid) => {
    if (!isValid) {
      setStepValid(false);
      return;
    }

    setStepValid(true);
    setData(newData);
  };
  const renderStepComponent = () => {
    switch (currStep) {
      case 1:
        return <ChooseTemplate onSubmit={handleSubmit} data={data} isPremium={isPremium} />;
      case 2:
        return <ProfileInformation onSubmit={handleSubmit} data={data} />;
      case 3:
        return <SkillsCertifications onSubmit={handleSubmit} data={data} />;
      case 4:
        return <WorkExperience onSubmit={handleSubmit} data={data} />;
      case 5:
        return <Projects onSubmit={handleSubmit} data={data} />;
      case 6:
        return <ReviewPublish onSubmit={handleSubmit} data={data} />;
      default:
        return <ChooseTemplate onSubmit={handleSubmit} data={data} isPremium={isPremium} />;
    }
  };

  const fetchData = async () => {
    setAi(true);

    try {
      const portfolioId = crypto.randomUUID();
      const payload = {
        portfolioId: portfolioId,
        template: data.gradient,
        desc: data.desc,
        data: data,
      };

      const reply = await axios.post("/api/ai/portfolio", payload);
      if (reply) {
        router.push(`/p/${portfolioId}/portfolio`);
      }
    } catch (err) {
      toast.error(
        "AI generation failed due to High demand please try again later",
      );
    } finally {
      setAi(false);
    }
  };

  const handleNext = () => {
    if (currStep !== 6 && !stepValid && !data.fullName) {
      const messages = {
        1: "Select a Template",
        2: "Complete Profile Information",
        3: "Add Skills and Certifications",
        4: "Add Work Experience",
        5: "Add Projects",
      };
      toast.error(messages[currStep]);
      return;
    }

    setStepValid(false);
    if (currStep == 6) {
      fetchData();
    } else {
      setCurrStep((prev) => prev + 1);
    }
  };
  if (ai) {
    return <Loader />;
  }
  return (
    <div className="h-full w-full  p-2 flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center mb-4 gap-4 flex-wrap">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-purple-200 backdrop-blur-sm md:w-[15%] w-[50%]">
          <Zap className="h-4 w-4 text-purple-500" />
          <h3 className="text-sm font-medium text-purple-700">
            Create Portfolio
          </h3>
        </div>

        <input
          type="file"
          accept=".pdf"
          ref={fileInputRef}
          onChange={handleResumeUpload}
          className="hidden"
        />

        <button
          onClick={() => {
            if (!isPremium) {
              toast.error("Autofill from Resume (AI) is a Premium feature. Please upgrade to unlock.");
              router.push("/dashboard/upgrade");
              return;
            }
            fileInputRef.current?.click();
          }}
          disabled={parsing}
          className={`flex items-center gap-2 border border-purple-300 px-4 py-2 rounded-full text-xs font-semibold text-purple-700 bg-purple-50/50 hover:bg-purple-100 hover:shadow-md transition-all duration-200 ${parsing ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          {isPremium ? (
            <Zap size={14} className={parsing ? "animate-spin text-purple-500" : "text-purple-500"} />
          ) : (
            <Crown size={14} className="text-amber-500 fill-amber-500" />
          )}
          {parsing ? "Autofilling with AI..." : "Autofill from Resume (AI)"}
        </button>
      </div>
      <StepProgress step={currStep} />
      <div className="flex flex-row justify-between">
        <button
          onClick={() => setCurrStep(currStep - 1)}
          disabled={currStep === 1}
          className={`border border-gray-200 rounded-sm shadow-sm flex flex-row p-2 hover:shadow-lg transition-all duration-200 ${currStep === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          <ChevronLeft />
          Previous
        </button>
        <div className="flex gap-2">
          {data.fullName && currStep !== 6 && (
            <button
              onClick={() => setCurrStep(6)}
              className="border border-purple-300 text-purple-700 px-4 py-2 rounded-sm shadow-sm hover:bg-purple-50 transition-all duration-200 cursor-pointer text-sm font-semibold"
            >
              Skip to Review (Step 6)
            </button>
          )}
          <button
            onClick={handleNext}
            className={`border border-gray-200 rounded-sm shadow-sm flex flex-row justify-center p-2  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          shadow-[0_0_25px_rgba(172,70,255,0.4)]
          hover:shadow-[0_0_35px_rgba(172,70,255,0.6)] transition-all duration-200 w-26 ${currStep === 6 ? "hidden" : "cursor-pointer"}`}
          >
            Next
            <ChevronRight />
          </button>
          <button
            onClick={handleNext}
            className={`border border-gray-200 rounded-sm shadow-sm flex flex-row justify-center p-2  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          shadow-[0_0_25px_rgba(172,70,255,0.4)]
          hover:shadow-[0_0_35px_rgba(172,70,255,0.6)] transition-all duration-200 w-26 cursor-pointer} ${currStep !== 6 ? "hidden" : "cursor-pointer"}`}
          >
            Generate
            <ChevronRight />
          </button>
        </div>
      </div>
      {renderStepComponent(currStep)}
    </div>
  );
}
