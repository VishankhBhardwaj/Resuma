import React from 'react';
import { Github, ExternalLink, Mail, Phone, MapPin, Terminal, Cpu, Box, Layout, Circle } from 'lucide-react';
import Image from 'next/image';
const MidnightBlue = ({ data }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans selection:bg-blue-500/30">
      
      {/* --- TOP STATUS BAR --- */}
      <div className="bg-slate-900/50 border-b border-slate-800 px-6 py-2 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Circle size={8} className="fill-emerald-500 text-emerald-500 animate__animated animate__flash animate__infinite animate__slow" /> 
            System Online
          </span>
          <span className="hidden md:inline">Last Sync: {new Date().toLocaleTimeString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>{data.location}</span>
          <span className="text-blue-500">v3.0.4</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* --- LEFT SIDEBAR (Profile Card) --- */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center animate__animated animate__fadeIn">
            <div className="relative inline-block mb-6">
              <div className={`absolute inset-0 bg-gradient-to-tr ${data.gradient} rounded-2xl blur-2xl opacity-20 animate-pulse`}></div>
              <Image 
                src={data.profilePhoto || "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?fit=crop&w=300&h=300"} 
                className="relative w-32 h-32 mx-auto rounded-2xl border border-slate-700 object-cover shadow-2xl"
                alt={data.fullName}
                width={40}
                height={40}
              />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{data.fullName}</h1>
            <p className="text-blue-400 font-mono text-xs mt-2 uppercase tracking-tighter">{data.professionalTitle}</p>
            
            <div className="mt-8 space-y-3 text-left">
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/50 flex items-center gap-3">
                <Mail size={14} className="text-slate-500" />
                <span className="text-xs truncate">{data.email}</span>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800/50 flex items-center gap-3">
                <Phone size={14} className="text-slate-500" />
                <span className="text-xs">{data.phone}</span>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2">
              {data.links.map((link, i) => (
                <a key={i} href={link.url} className="p-3 bg-slate-800/50 hover:bg-blue-600/20 hover:text-blue-400 transition-all rounded-xl border border-slate-700 flex justify-center">
                  {link.platform.includes('github') ? <Github size={18}/> : <ExternalLink size={18}/>}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Cpu size={14} /> Core_Stack
            </h3>
            <div className="space-y-4">
              {data.skills.map((skill, i) => (
                <div key={i} className="group">
                  <div className="flex justify-between text-[11px] mb-1.5 font-mono">
                    <span className="text-slate-400 group-hover:text-blue-400 transition-colors">{skill.name}</span>
                    <span className="text-slate-600 italic">[{skill.level}]</span>
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${data.gradient} transition-all duration-1000`} 
                      style={{ width: `${(skill.score / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* --- MAIN CONTENT (Activity Feed) --- */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Bio / About */}
          <section className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 animate__animated animate__fadeIn">
             <div className="flex items-center gap-3 mb-4 text-blue-400">
               <Terminal size={20} />
               <span className="font-mono text-sm tracking-tighter">root@portfolio:~$ cat bio.txt</span>
             </div>
             <p className="text-lg text-slate-400 leading-relaxed font-light">
               {data.bio}
             </p>
          </section>

          {/* Work History */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
               <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Box size={14} /> Experience_Logs
              </h3>
            </div>
            {data.work.map((job) => (
              <div key={job.id} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Layout size={20} className="text-blue-500" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-600 bg-slate-950 px-2 py-1 rounded">
                    {job.startDate.split('T')[0]}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{job.jobTitle}</h4>
                <p className="text-xs font-mono text-slate-500 mt-1 mb-4">@ {job.company}</p>
                <div className="space-y-2">
                  {job.achievements.slice(0, 2).map((ach, i) => (
                    <p key={i} className="text-xs text-slate-400 flex gap-2">
                      <span className="text-blue-500 tracking-tighter">0{i+1}</span> {ach}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Projects */}
          <section>
            <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Terminal size={14} /> Deployments
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {data.projects.map((project, i) => (
                <div key={i} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:bg-slate-900/50 transition-all group">
                  {project.imageUrl && (
                    <div className="w-full md:w-32 h-20 rounded-xl overflow-hidden relative shrink-0 border border-slate-800">
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="space-y-2 flex-grow">
                    <h4 className="text-xl font-bold text-white">{project.title}</h4>
                    <p className="text-sm text-slate-500 max-w-xl">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologiesUsed.filter(t => t !== "").map((tech, idx) => (
                        <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 rounded text-slate-400 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4 shrink-0">
                    <a href={project.gitHubLink} className="p-3 bg-slate-800 rounded-full hover:bg-white hover:text-black transition-all">
                      <Github size={20} />
                    </a>
                    <a href={project.demoLink} className={`p-3 bg-gradient-to-r ${data.gradient} rounded-full hover:scale-110 transition-all`}>
                      <ExternalLink size={20} className="text-white" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
      
      {/* --- TERMINAL FOOTER --- */}
      <footer className="mt-12 border-t border-slate-800 bg-slate-950/80 p-6">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-mono text-slate-600 tracking-[0.2em]">
          <p>BUILD: RESUMA_STABLE_VERSION_01</p>
          <p className="mt-4 md:mt-0 uppercase">© {new Date().getFullYear()} {data.fullName} // ALL_SYSTEMS_OPERATIONAL</p>
        </div>
      </footer>
    </div>
  );
};

export default MidnightBlue;