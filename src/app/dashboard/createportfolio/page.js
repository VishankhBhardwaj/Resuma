"use client"
import StepProgress from "@/components/ui/StepProgress";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from "react";
import ChooseTemplate from "./ChooseTemplate";
import ProfileInformation from "./ProfileInformation";
import SkillsCertifications from "./SkillsCertifications";
import WorkExperience from "./WorkExperience";
import ReviewPublish from "./ReviewPublish";
import Projects from "./Projects";
export default function Page() {
  const [currStep, setCurrStep] = useState(1);
  const renderStepComponent = () => {
    switch (currStep) {
      case 1:
        return <ChooseTemplate />;
      case 2:
        return <ProfileInformation />;
      case 3:
        return <SkillsCertifications />;
      case 4:
        return <WorkExperience />;
      case 5:
        return <Projects />;
      case 6:
        return <ReviewPublish />;
      default:
        return <ChooseTemplate />;
    }
  };

  return (
    <div className="h-full w-full  p-2 flex flex-col gap-2">
      <StepProgress step={currStep} />
      <div className="flex flex-row justify-between">
        <button onClick={() => setCurrStep(currStep - 1)} disabled={currStep === 1} className={`border border-gray-200 rounded-sm shadow-sm flex flex-row p-2 hover:shadow-lg transition-all duration-200 ${currStep === 1 ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <ChevronLeft />
          Previous
        </button>
        <button onClick={() => setCurrStep(currStep + 1)} disabled={currStep === 6} className={`border border-gray-200 rounded-sm shadow-sm flex flex-row justify-center p-2  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
        shadow-[0_0_25px_rgba(172,70,255,0.4)]
        hover:shadow-[0_0_35px_rgba(172,70,255,0.6)] transition-all duration-200 w-26 ${currStep === 6 ? "cursor-not-allowed" : "cursor-pointer"}`}>
          Next
          <ChevronRight />
        </button>
      </div>
      {renderStepComponent(currStep)}
    </div>
  );
}