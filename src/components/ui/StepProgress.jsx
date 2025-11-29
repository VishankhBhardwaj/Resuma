import React, { useState } from 'react'

const StepProgress = ({step}) => {
    const steps = [
        { id: 1, title: "Choose Template" },
        { id: 2, title: "Profile Information" },
        { id: 3, title: "Skills & Certifications" },
        { id: 4, title: "Work Experience" },
        { id: 5, title: "Projects" },
        { id: 6, title: "Review & Publish" },
    ];
    const progress = (step / steps.length) * 100;
    return (
        <div className='bg-white border rounded-xl p-6 shadow-sm'>
            <div className='flex justify-between mb:4'>
                <div>
                    <h1 className="text-2xl font-semibold">Create New Portfolio</h1>
                    <p className="text-gray-500 text-sm">
                        Step {step} of {steps.length}: {steps[step - 1].title}
                    </p>
                </div>
                <p className="text-gray-600 font-medium">{Math.round(progress)}% Complete</p>
            </div>
            <div className="relative w-full h-2 bg-gray-200 rounded-full mb-6 mt-4">
                <div
                    className="absolute h-2 bg-[#0A122A] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="grid grid-cols-3 gap-2 md:flex md:justify-between md:items-start w-full">
                {steps.map((s) => (
                    <div key={s.id} className="flex flex-col items-center cursor-pointer"
                        onClick={() => setStep(s.id)}
                    >
                        {/* Number circle */}
                        <div
                            className={`
                w-10 h-10 flex items-center justify-center rounded-full border 
                text-sm font-bold
                ${step === s.id
                                    ? "bg-[#0A122A] text-white border-[#0A122A]"
                                    : "bg-gray-100 text-gray-700 border-gray-300"}
              `}
                        >
                            {s.id}
                        </div>

                        {/* Label */}
                        <p
                            className={`mt-2 text-center text-sm ${step === s.id ? "text-gray-900" : "text-gray-500"
                                }`}
                        >
                            {s.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StepProgress