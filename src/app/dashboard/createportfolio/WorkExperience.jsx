import React, { useState } from 'react'
import { EmptyWork } from "@/components/ui/EmptyWork";
import WorkExperienceCard from './WorkExperienceCard';
import { Plus } from 'lucide-react';
const WorkExperience = () => {
  const [work, setWork] = useState([]);

  const handleClick = () => {
    setWork(prev => [
      ...prev,
      {
        id: Date.now(),
        jobTitle: "",
        company: "",
        location: "",
        startDate: null,
        endDate: null,
        current: false,
        description: "",
        achievements: [""],
      }
    ]);
  };
  return (
    <div className="p-6 b border border-gray-200 rounded-sm">
      <div className='flex flex-col items-center justify-center  h-[150px]'>
        <h1 className="text-black text-center font-bold text-xl lg:text-2xl">
          Work Experience
        </h1>
        <p className="text-gray-500 text-center text-md mb-6">
          Add your professional work experience and key achievements
        </p>
        <button onClick={handleClick} className='flex flex-row gap-2  h-[25%] p-1 bg-gray-200 rounded-sm items-center cursor-pointer'><Plus />Add Work Experience</button>
      </div>
      <div>
        {work.length === 0 && (
          <EmptyWork onAdd={handleClick} />
        )}
        {work.length > 0 &&
          work.map((item, index) => (
            <WorkExperienceCard
              key={item.id}
              index={index + 1}
              data={item}
              onChange={(updated)=>
                setWork(prev=>
                  prev.map(w=>
                    w.id==item.id?updated:w
                  )
                )
              }
              onRemove={() =>
                setWork(prev =>
                  prev.filter(w => w.id !== item.id)
                )
              }
            />
          ))
        }
      </div>

    </div>
  )
}

export default WorkExperience