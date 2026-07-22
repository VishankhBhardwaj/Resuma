import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, Github, Instagram, Linkedin, Award } from 'lucide-react';
import Image from 'next/image';
const OceanBreeze = ({ data }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white text-slate-800 font-light selection:bg-teal-100">
      
      {/* --- SIDEBAR --- */}
      <aside className={`md:w-1/3 lg:w-1/4 w-full bg-gradient-to-b ${data.gradient} p-8 md:p-12 md:fixed h-full flex flex-col justify-between text-white animate__animated animate__fadeInLeft z-20`}>
        <div className="space-y-8">
          {/* Profile Photo Section */}
          <div className="relative group w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0">
            <div className="absolute inset-0 bg-white/20 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500"></div>
            <Image
              src={data.profilePhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=300&h=300"} 
              alt={data.fullName}
              className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl border-2 border-white/50"
              width={40}
                height={40}
            />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
              {data.fullName}
            </h1>
            <p className="text-teal-50 font-medium tracking-wide uppercase text-xs opacity-80">
              {data.professionalTitle}
            </p>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/20">
            <div className="flex items-center gap-3 text-sm">
              <Mail size={16} className="opacity-70" />
              <span>{data.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone size={16} className="opacity-70" />
              <span>{data.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={16} className="opacity-70" />
              <span>{data.location}</span>
            </div>
          </div>
        </div>

        {/* Social Links at Bottom */}
        <div className="flex gap-4 mt-12 md:mt-0">
          {data.links.map((link, i) => (
            <a 
              key={i} 
              href={link.url} 
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:-translate-y-1"
            >
              {link.platform.includes('instagram') && <Instagram size={20} />}
              {link.platform.includes('github') && <Github size={20} />}
              {link.platform.includes('linkedin') && <Linkedin size={20} />}
            </a>
          ))}
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="md:ml-[33.333%] lg:ml-[25%] p-6 md:p-20 w-full animate__animated animate__fadeIn">
        
        {/* About / Bio */}
        <section className="max-w-3xl mb-24 animate__animated animate__fadeInUp animate__delay-1s">
          <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400 mb-6 font-bold">Biography</h2>
          <p className="text-2xl md:text-3xl text-slate-600 leading-relaxed font-serif italic">
            "{data.bio}"
          </p>
        </section>

        {/* Skills - Pill Layout */}
        <section className="mb-24">
          <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400 mb-8 font-bold">Competencies</h2>
          <div className="flex flex-wrap gap-4">
            {data.skills.map((skill, i) => (
              <div key={i} className="flex items-center gap-3 px-6 py-3 bg-slate-50 border border-slate-100 rounded-full group hover:border-teal-400 transition-colors animate__animated animate__fadeInUp">
                <span className="w-2 h-2 rounded-full bg-teal-400 group-hover:scale-150 transition-transform"></span>
                <span className="font-medium text-slate-700">{skill.name}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-tighter">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience - Minimalist List */}
        <section className="mb-24">
          <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400 mb-10 font-bold">Experience</h2>
          <div className="space-y-16">
            {data.work.map((job) => (
              <div key={job.id} className="group relative animate__animated animate__fadeInUp">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-teal-600 transition-colors">{job.jobTitle}</h3>
                  <span className="text-sm font-mono text-slate-400">
                    {job.startDate.split('T')[0]} — {job.current ? 'Present' : job.endDate?.split('T')[0]}
                  </span>
                </div>
                <p className="text-lg text-teal-600 mb-4 font-medium">{job.company}</p>
                <div className="max-w-2xl text-slate-500 leading-relaxed">
                   {job.description}
                   <ul className="mt-4 space-y-2">
                     {job.achievements.map((a, i) => (
                       <li key={i} className="flex gap-2 items-start text-sm">
                         <span className="text-teal-400 mt-1">▹</span> {a}
                       </li>
                     ))}
                   </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects - Clean Grid */}
        <section id="projects" className="mb-24">
          <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400 mb-10 font-bold">Selected Works</h2>
          <div className="grid grid-cols-1 gap-12">
            {data.projects.map((project, i) => (
              <div key={i} className="group flex flex-col md:flex-row gap-8 items-center border-b border-slate-100 pb-12 animate__animated animate__fadeInUp">
                <div className="w-full md:w-1/2 aspect-video rounded-2xl relative overflow-hidden flex items-center justify-center bg-slate-50 border border-slate-100 shadow-sm">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  )}
                  <ExternalLink size={40} className="text-slate-400 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="w-full md:w-1/2 space-y-4">
                  <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologiesUsed.filter(t => t !== "").map((tech, idx) => (
                      <span key={idx} className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">{tech}</span>
                    ))}
                  </div>
                  <div className="pt-4 flex gap-6">
                    <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-sm font-black border-b-2 border-teal-400 pb-1 hover:text-teal-600 transition">View Project</a>
                    <a href={project.gitHubLink} target="_blank" rel="noreferrer" className="text-sm font-black border-b-2 border-slate-200 pb-1 hover:border-black transition">Source Code</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer info */}
        <footer className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-slate-400 text-xs gap-4">
          <p>© {new Date().getFullYear()} {data.fullName}</p>
          <div className="flex flex-wrap justify-center gap-4">
             {data.certi.map(c => (
               <span key={c.id} className="flex items-center gap-1 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                 <Award size={12}/> {c.name}
               </span>
             ))}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default OceanBreeze;