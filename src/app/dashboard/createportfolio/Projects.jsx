import React, { useState, useEffect } from 'react'
import { EmptyDemo } from "@/components/ui/EmptyDemo";
import ProjectsCard from './ProjectsCard';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
const Projects = ({ onSubmit, data }) => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    if (!data) return;
    setProjects(data.projects || []);
  }, [data]);
  const handleClick = () => {
    setProjects(prev => [
      ...prev,
      {
        id: Date.now(),
        projectTitle: "",
        demoURL: "",
        gitHubURL: "",
        featured: false,
        description: "",
        technologiesUsed: [""],
        file:null
      }
    ])
  }
  const handleSubmit = () => {
    if (projects.length === 0) return;
    const payload = {
      projects: projects
    }
    onSubmit(payload, true);
    toast.success("Data Saved Successfully");
  }
  return (
    <div className="p-2 md:p-6">
      {projects.length === 0 && (<EmptyDemo onAdd={handleClick} />)}
      {projects.length > 0 &&
        projects.map((item, index) => (
          <ProjectsCard
            key={item.id}
            index={index + 1}
            data={item}
            onChange={(updatedProject) =>
              setProjects(prev =>
                prev.map(p =>
                  p.id === item.id ? updatedProject : p
                )
              )
            }
            onRemove={() =>
              setProjects(prev =>
                prev.filter(p => p.id !== item.id)
              )
            }
          />

        ))
      }
      <div>
        <Button onClick={handleSubmit} className='w-full rounded-sm'>Save & Continue</Button>
      </div>
    </div>
  )
}

export default Projects