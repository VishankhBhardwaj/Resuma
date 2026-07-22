import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin, Award, ShieldCheck, Briefcase, Globe } from 'lucide-react';
import Image from 'next/image';
const EmeraldShine = ({ data,id }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100">
      
      {/* --- TOP HEADER / HERO --- */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Profile Photo with Emerald Ring */}
            <div className="relative animate__animated animate__fadeIn">
              <div className={`absolute inset-0 bg-gradient-to-tr ${data.gradient} rounded-full blur-md opacity-20`}></div>
              <Image
                src={data.profilePhoto || "https://images.unsplash.com/photo-1560250097-0b93528c311a?fit=crop&w=300&h=300"} 
                className={`relative w-40 h-40 md:w-52 md:h-52 rounded-full border-4 border-white shadow-2xl object-cover`}
                alt={data.fullName}
                
              />
              <div className={`absolute bottom-2 right-2 p-3 bg-gradient-to-tr ${data.gradient} rounded-full text-white shadow-lg`}>
                <ShieldCheck size={24} />
              </div>
            </div>

            <div className="text-center md:text-left space-y-4 flex-1 animate__animated animate__fadeInRight">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
                {data.fullName}
              </h1>
              <p className={`text-xl md:text-2xl font-semibold bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent`}>
                {data.professionalTitle}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-medium text-slate-500 pt-2">
                <span className="flex items-center gap-2"><MapPin size={16}/> {data.location}</span>
                <span className="flex items-center gap-2"><Mail size={16}/> {data.email}</span>
                <span className="flex items-center gap-2"><Globe size={16}/> {data.website}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: ABOUT & SKILLS */}
          <div className="space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate__animated animate__fadeInUp">
              <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-4">Executive Summary</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                {data.bio}
              </p>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate__animated animate__fadeInUp">
              <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-6">Expertise</h2>
              <div className="space-y-4">
                {data.skills.map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm font-bold">
                      <span>{skill.name}</span>
                      <span className="text-emerald-600">{skill.level}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${data.gradient}`} 
                        style={{ width: `${(skill.score / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: EXPERIENCE & PROJECTS */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Experience Card */}
            <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm animate__animated animate__fadeInUp">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-emerald-500" />
                <h2 className="text-xl font-bold">Professional Experience</h2>
              </div>
              <div className="space-y-10">
                {data.work.map((job) => (
                  <div key={job.id} className="relative pl-8 border-l border-slate-200 group">
                    <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-emerald-500 transition-colors`}></div>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                      <h3 className="text-lg font-bold">{job.jobTitle}</h3>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 px-2 py-1 rounded">
                        {job.startDate.split('T')[0]} - {job.current ? 'Present' : job.endDate?.split('T')[0]}
                      </span>
                    </div>
                    <p className="text-emerald-600 font-bold text-sm mb-3 uppercase tracking-wide">{job.company}</p>
                    <ul className="space-y-2">
                      {job.achievements.map((ach, i) => (
                        <li key={i} className="text-sm text-slate-500 flex gap-2">
                          <span className="text-emerald-500 font-bold">/</span> {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Grid in Right Column */}
            <section>
              <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-6 px-2">Key Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.projects.map((project, i) => (
                  <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group animate__animated animate__zoomIn overflow-hidden flex flex-col justify-between">
                    <div>
                      {project.imageUrl ? (
                        <div className="h-40 w-full relative overflow-hidden border-b border-slate-100">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title} 
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 right-4 flex gap-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg border border-slate-200 shadow-sm">
                            <a href={project.gitHubLink} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-slate-900 transition"><Github size={16}/></a>
                            <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-slate-600 hover:text-emerald-600 transition"><ExternalLink size={16}/></a>
                          </div>
                        </div>
                      ) : (
                        <div className="p-6 pb-0 flex justify-between items-start">
                          <div className={`p-3 rounded-2xl bg-gradient-to-tr ${data.gradient} text-white`}>
                            <Globe size={20} />
                          </div>
                          <div className="flex gap-3">
                            <a href={project.gitHubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 transition"><Github size={18}/></a>
                            <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-600 transition"><ExternalLink size={18}/></a>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6 pt-4">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-emerald-600 transition-colors">{project.title}</h3>
                        <p className="text-xs text-slate-500 mb-4 line-clamp-2 leading-relaxed font-medium">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="flex flex-wrap gap-2">
                        {project.technologiesUsed.filter(t => t !== "").map((tech, idx) => (
                          <span key={idx} className="text-[10px] font-bold px-2 py-1 bg-slate-50 text-slate-400 rounded-md border border-slate-100 uppercase">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h4 className="text-white font-bold text-lg">{data.fullName}</h4>
            <p className="text-sm">{data.professionalTitle}</p>
          </div>
          <div className="flex gap-6">
            {data.links.map((link, i) => (
              <a key={i} href={link.url} className="hover:text-white transition uppercase text-xs font-bold tracking-widest border-b border-slate-700 hover:border-emerald-500 pb-1">
                {link.platform}
              </a>
            ))}
          </div>
          <div className="text-xs uppercase tracking-tighter">
             © {new Date().getFullYear()} All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmeraldShine;