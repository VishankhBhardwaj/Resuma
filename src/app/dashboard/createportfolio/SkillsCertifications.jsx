import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SkillCard from './SkillCard'
import CertificationsSection from './CertificationSection';
const SkillsCertifications = () => {
  const options = ['Beginner', 'Intermediate', 'Proficient', 'Expert']

  const [activeTab, setActiveTab] = useState(1)
  const [skillName, setSkillName] = useState("")
  const [proficiency, setProficiency] = useState(null)
  const [skills, setSkills] = useState([])

  const LEVEL_MAP = {
    Beginner: 1,
    Intermediate: 2,
    Proficient: 3,
    Expert: 4,
  }

  const handleAddSkill = () => {
    if (!skillName || !proficiency) return

    setSkills(prev => [
      ...prev,
      {
        id: Date.now(),
        name: skillName,
        level: proficiency,
        score: LEVEL_MAP[proficiency],
      }
    ])

    setSkillName("")
    setProficiency(null)
  }

  const removeSkill = (id) => {
    setSkills(prev => prev.filter(skill => skill.id !== id))
  }
  return (
    <div className="min-h-screen p-3 flex flex-col border border-gray-200-200 rounded-md shadow-3xl gap-2">
      <div className="flex flex-col gap-2  h-[20%] items-center justify-center">
        <h1 className="text-black text-center font-bold text-xl lg:text-2xl">
          Skills & Certifications
        </h1>
        <p className="text-gray-500 text-center text-md mb-6">
          Showcase your technical skills and professional certifications
        </p>
      </div>
      <div className="flex flex-row gap-2 border  h-[5%] items-center justify-center rounded-sm bg-[#f1f5f9]">
        <button onClick={() => setActiveTab(1)} className={`w-[50%] h-full rounded-sm transition-all duration-200 ${activeTab === 1 ? "bg-white shadow-md" : ""}`}>
          <h1 className='text-center font-medium'>Technical Skills</h1>
        </button>
        <button onClick={() => setActiveTab(2)} className={`w-[50%] h-full rounded-sm transition-all duration-200 ${activeTab === 2 ? "bg-white shadow-md" : ""}`}>
          <h1 className='text-center font-medium'>Certifications</h1>
        </button>
      </div>
      {activeTab == 1 ? (<div className='border border-gray-200 rounded-sm shadow-xl'>
        <div className='flex flex-col p-4 gap-3'>
          <div className='mb-[10px]'>
            <h1 className='font-bold text-xl'>Add Technical Skill</h1>
          </div>
          <div className="max-w-4xl border border-gray-300 p-6 rounded-lg">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div>
                <p className="mb-2 font-semibold">Skill Name</p>
                <Input value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g. React, Python, Project Management" />
              </div>

              <div>
                <p className="mb-2 font-semibold">Proficiency Level</p>
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setProficiency(option)}
                      className={`px-4 py-2 rounded-sm border text-sm transition-all duration-300
              ${proficiency === option
                          ? "bg-green-50 border-green-500 text-green-600"
                          : "border-gray-300 text-gray-700"
                        }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
          <Button onClick={handleAddSkill} variant="outline" className='w-[30%] cursor-pointer bg-black text-white  transition-all duration-300'>Add Skill</Button>
        </div>
        <div className="flex-1  p-4 space-y-3">

          {skills.length === 0 && (
            <p className="text-gray-400 text-sm">
              No skills added yet
            </p>
          )}

          {skills.map(skill => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onRemove={removeSkill}
            />
          ))}

        </div>
      </div>) : (<CertificationsSection/>)}
    </div>
  )
}

export default SkillsCertifications