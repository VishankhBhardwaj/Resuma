"use client"
import StepProgress from "@/components/ui/StepProgress";
import { ChevronLeft, ChevronRight,Zap } from 'lucide-react';
import { useEffect, useState } from "react";
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
export default function Page() {
  const router = useRouter();
  const [currStep, setCurrStep] = useState(1);
  const [ai, setAi] = useState(false);
  const [data, setData] = useState({});
  const [stepValid, setStepValid] = useState(false);
  const handleSubmit = (newData, isValid) => {
    if (!isValid) {
      setStepValid(false);
      return;
    }

    setStepValid(true);
    setData(prev => ({
      ...prev,
      ...newData
    }))
  }
  const renderStepComponent = () => {
    switch (currStep) {
      case 1:
        return <ChooseTemplate onSubmit={handleSubmit} data={data} />;
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
        return <ChooseTemplate onSubmit={handleSubmit} data={data} />;
    }
  };

  const fetchData = async () => {
    setAi(true);

    try {
      const portfolioId = crypto.randomUUID();
      const payload = {
        portfolioId:portfolioId,
        template: data.gradient,
        desc: data.desc,
        data:data
      };

      const reply = await axios.post("/api/ai/portfolio", payload);
      if(reply){
        router.push(`/p/${portfolioId}/portfolio`)
      }
    } catch (err) {
      toast.error("AI generation failed");
    }finally{
      setAi(false);
    }
  };

  const handleNext = () => {
    if (currStep !== 6 && !stepValid) {
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
    }
    else { setCurrStep(prev => prev + 1); }
  }
  if (ai) {
    return <Loader />;
  }
  return (
    <div className="h-full w-full  p-2 flex flex-col gap-2">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-purple-200 backdrop-blur-sm mb-4 md:w-[15%] w-[50%]">
          <Zap className="h-4 w-4 text-purple-500" />
          <h3 className="text-sm font-medium text-purple-700">Create Portfolio</h3>
      </div>
      <StepProgress step={currStep} />
      <div className="flex flex-row justify-between">
        <button onClick={() => setCurrStep(currStep - 1)} disabled={currStep === 1} className={`border border-gray-200 rounded-sm shadow-sm flex flex-row p-2 hover:shadow-lg transition-all duration-200 ${currStep === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <ChevronLeft />
          Previous
        </button>
        <button onClick={handleNext} className={`border border-gray-200 rounded-sm shadow-sm flex flex-row justify-center p-2  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        shadow-[0_0_25px_rgba(172,70,255,0.4)]
        hover:shadow-[0_0_35px_rgba(172,70,255,0.6)] transition-all duration-200 w-26 ${currStep === 6 ? "hidden" : "cursor-pointer"}`}>
          Next
          <ChevronRight />
        </button>
        <button onClick={handleNext} className={`border border-gray-200 rounded-sm shadow-sm flex flex-row justify-center p-2  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        shadow-[0_0_25px_rgba(172,70,255,0.4)]
        hover:shadow-[0_0_35px_rgba(172,70,255,0.6)] transition-all duration-200 w-26 cursor-pointer} ${currStep !== 6 ? "hidden" : "cursor-pointer"}`}>
          Generate
          <ChevronRight />
        </button>
      </div>
      {renderStepComponent(currStep)}
    </div>
  );
}