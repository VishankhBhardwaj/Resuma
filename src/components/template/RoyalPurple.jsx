import React from 'react';
import { Github, ExternalLink, Mail, Phone, MapPin, User, Briefcase, Zap } from 'lucide-react';

const RoyalPurple = ({ data }) => {
  // 1. Structural Safety Check: If data is missing entirely, show a loader or null
  if (!data) return <div className="p-20 text-center font-mono">Loading System Data...</div>;

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-12 font-mono selection:bg-yellow-300">
      <div className="max-w-6xl mx-auto border-[4px] border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate__animated animate__zoomIn overflow-hidden">
        
        {/* HEADER SECTION */}
        <header className={`p-8 md:p-12 border-b-[4px] border-black bg-gradient-to-r ${data.gradient || 'from-purple-600 to-blue-600'} text-white flex flex-col md:flex-row items-center gap-8`}>
          <div className="relative">
            <div className="absolute -inset-2 bg-yellow-400 border-[3px] border-black rounded-full rotate-6 animate__animated animate__pulse animate__infinite"></div>
            <img 
              src={data.profilePhoto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fit=crop&w=300&h=300"} 
              className="relative w-32 h-32 md:w-44 md:h-44 rounded-full border-[4px] border-black object-cover z-10 shadow-xl"
              alt={data.fullName || 'User'}
            />
          </div>
          <div className="text-center md:text-left z-10">
            <h1 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              {data.fullName || "Name Not Set"}
            </h1>
            <p className="inline-block mt-4 bg-yellow-300 text-black px-4 py-2 text-xl font-black border-[3px] border-black rotate-[-2deg]">
              {data.professionalTitle || "Professional"}
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-4 border-b-[4px] lg:border-b-0 lg:border-r-[4px] border-black p-8 space-y-12">
            <section>
              <h2 className="flex items-center gap-2 text-2xl font-black uppercase mb-6 underline decoration-yellow-400">
                <User size={24} /> The Profile
              </h2>
              <p className="text-lg font-bold leading-snug">{data.bio || "No biography provided."}</p>
            </section>

            <section>
              <h2 className="flex items-center gap-2 text-2xl font-black uppercase mb-6 underline decoration-purple-400">
                <Zap size={24} /> Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {/* 2. Fix for the 'map' error: Optional chaining + fallback array */}
                {(data.skills || []).map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-purple-100 border-2 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                    {skill?.name || "Skill"}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-yellow-50 border-2 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
               <h3 className="font-black text-sm uppercase mb-4 tracking-widest text-black">Connect</h3>
               <div className="space-y-3 font-bold text-sm text-black">
                 {data.email && <div className="flex items-center gap-2 truncate"><Mail size={16}/> {data.email}</div>}
                 {data.phone && <div className="flex items-center gap-2"><Phone size={16}/> {data.phone}</div>}
                 {data.location && <div className="flex items-center gap-2"><MapPin size={16}/> {data.location}</div>}
               </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-8 p-8 md:p-12 space-y-16">
            <section>
              <h2 className="text-3xl font-black uppercase mb-8 flex items-center gap-3">
                <Briefcase size={32} /> Experience
              </h2>
              <div className="space-y-10">
                {/* 3. Safety Check for Work Array */}
                {(data.work || []).map((job, index) => (
                  <div key={index} className="group relative border-2 border-black p-6 bg-white hover:bg-purple-50 transition-colors shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-black">{job.jobTitle}</h3>
                      <span className="bg-black text-white px-2 py-1 text-xs font-bold">
                        {job.startDate?.split('T')[0] || "Date"} - {job.current ? 'NOW' : job.endDate?.split('T')[0] || "End"}
                      </span>
                    </div>
                    <p className="text-purple-600 font-black mb-4">{job.company}</p>
                    <ul className="space-y-2">
                      {(job.achievements || []).map((ach, i) => (
                        <li key={i} className="flex items-start gap-2 font-bold text-sm">
                          <span className="text-xl leading-none">→</span> {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black uppercase mb-8">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 4. Safety Check for Projects Array */}
                {(data.projects || []).map((proj, i) => (
                  <div key={i} className="border-[3px] border-black rounded-lg overflow-hidden group hover:scale-[1.02] transition-transform shadow-[8px_8px_0px_0px_rgba(168,85,247,1)]">
                    <div className={`h-40 bg-gradient-to-br ${data.gradient || 'from-purple-500 to-pink-500'} border-b-[3px] border-black flex items-center justify-center p-6 text-white text-center`}>
                      <h4 className="text-2xl font-black uppercase rotate-[-5deg]">{proj.title}</h4>
                    </div>
                    <div className="p-4 bg-white">
                      <p className="font-bold text-xs mb-4 line-clamp-3 text-black">{proj.description}</p>
                      <div className="flex justify-between items-center">
                         <a href={proj.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 bg-black text-white px-3 py-1 text-xs font-black hover:bg-purple-600 transition">
                           LIVE <ExternalLink size={12}/>
                         </a>
                         <div className="flex gap-1">
                           {(proj.technologiesUsed || []).slice(0, 3).map((t, idx) => (
                             <span key={idx} className="text-[10px] font-black uppercase text-purple-600">{t}</span>
                           ))}
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* FOOTER BAR */}
        <footer className="bg-black text-white p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-black italic text-lg uppercase">DESIGNED BY {data.fullName || "User"}</p>
          <div className="flex gap-4">
            {(data.links || []).map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors uppercase font-black text-sm border-b-2 border-white">
                {link.platform}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default RoyalPurple;