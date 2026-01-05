"use client";
import React, { useEffect } from 'react';
import { Github, Instagram, ExternalLink, Mail, Phone, MapPin, Globe, Award, Code, Linkedin, Twitter } from 'lucide-react';

const NeonFusion = ({ data }) => {
  // Guard Clause for entire data object
  const getSocialIcon = (platform) => {
    switch (platform?.toLowerCase()) {
      case 'instagram': return <Instagram size={24} />;
      case 'github': return <Github size={24} />;
      case 'linkedin': return <Linkedin size={24} />;
      case 'twitter': return <Twitter size={24} />;
      default: return <Globe size={24} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className={`text-xl font-bold bg-gradient-to-r ${data.gradient || 'from-fuchsia-500 to-indigo-600'} bg-clip-text text-transparent`}>
            {(data.fullName || "User").split(' ')[0]}.
          </span>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-fuchsia-400 transition">About</a>
            <a href="#work" className="hover:text-fuchsia-400 transition">Experience</a>
            <a href="#projects" className="hover:text-fuchsia-400 transition">Projects</a>
            <a href="#contact" className="hover:text-fuchsia-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="pt-48 pb-24 px-6 relative">
        <div className={`absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r ${data.gradient || 'from-fuchsia-500 to-indigo-600'} blur-[120px] opacity-20 rounded-full animate-pulse`}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="animate__animated animate__fadeInUp">
            <div className="inline-block mb-4 px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm font-medium tracking-wide text-fuchsia-400">
              {data.location ? `Based in ${data.location}` : 'Available for opportunities'}
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              Hi, I'm <span className={`bg-gradient-to-r ${data.gradient || 'from-fuchsia-500 to-indigo-600'} bg-clip-text text-transparent`}>
                {data.fullName || "Professional"}
              </span>
            </h1>
          </div>
          
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto animate__animated animate__fadeInUp">
            {data.professionalTitle || "Developer"} • {data.bio}
          </p>
          
          <div className="flex justify-center gap-4 animate__animated animate__fadeInUp">
            <a href="#contact" className={`px-8 py-3 rounded-full bg-gradient-to-r ${data.gradient || 'from-fuchsia-500 to-indigo-600'} font-bold hover:scale-105 transition transform shadow-lg shadow-fuchsia-500/20`}>
              Hire Me
            </a>
            <a href={data.website || "#projects"} className="px-8 py-3 rounded-full bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition">
              Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* --- SKILLS & CERTIFICATIONS --- */}
      <section id="about" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Code className="text-fuchsia-500" /> Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {(data.skills || []).map((skill, index) => (
                <div key={index} className="bg-slate-800 border border-white/5 px-4 py-2 rounded-lg flex flex-col hover:border-fuchsia-500/50 transition">
                  <span className="font-bold">{skill?.name}</span>
                  <span className="text-xs text-slate-500">{skill?.level} ({skill?.score}/5)</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Award className="text-indigo-500" /> Certifications
            </h3>
            {(data.certi || []).map((c, i) => (
              <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-white/5 hover:bg-slate-800 transition mb-4">
                <p className="font-bold text-fuchsia-400">{c?.name}</p>
                <p className="text-sm text-slate-200 font-medium">{c?.organization}</p>
                <p className="text-xs text-slate-500 mt-1">{c?.date?.split('T')[0]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- WORK EXPERIENCE --- */}
      <section id="work" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Work Experience</h2>
          <div className="space-y-8">
            {(data.work || []).map((job, i) => (
              <div key={i} className="relative pl-8 border-l-2 border-slate-800">
                <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r ${data.gradient || 'from-fuchsia-500 to-indigo-600'} ring-4 ring-slate-950`} />
                <div className="mb-1 flex justify-between items-start flex-wrap">
                  <h3 className="text-xl font-bold text-white">{job?.jobTitle}</h3>
                  <span className="text-sm text-slate-500 font-mono">
                    {job?.startDate?.split('T')[0]} - {job?.current ? 'Present' : job?.endDate?.split('T')[0]}
                  </span>
                </div>
                <p className="text-fuchsia-400 font-medium mb-2 uppercase tracking-widest text-xs">{job?.company} • {job?.location}</p>
                <p className="text-slate-400 text-sm mb-4 italic">{job?.description}</p>
                <ul className="list-disc list-inside text-slate-400 space-y-2 text-sm">
                  {(job?.achievements || []).map((ach, idx) => (
                    <li key={idx} className="leading-relaxed">{ach}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(data.projects || []).map((project, index) => (
              <div key={index} className="group bg-slate-800 border border-white/5 rounded-2xl overflow-hidden hover:border-fuchsia-500/50 transition-all">
                <div className={`h-40 bg-gradient-to-br ${data.gradient || 'from-fuchsia-500 to-indigo-600'} opacity-10 group-hover:opacity-20 transition-all flex items-center justify-center`}>
                   <Globe size={40} className="text-fuchsia-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project?.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{project?.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project?.technologiesUsed || []).filter(t => t !== "").map((tech, i) => (
                      <span key={i} className="text-[10px] uppercase font-bold tracking-widest px-2 py-1 bg-fuchsia-500/10 rounded text-fuchsia-400 border border-fuchsia-500/20">{tech}</span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    <a href={project?.demoLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-bold text-white hover:text-fuchsia-400 transition">
                      Live <ExternalLink size={14} />
                    </a>
                    <a href={project?.gitHubLink} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-sm font-bold text-slate-400 hover:text-white transition">
                      Github <Github size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 border border-white/10 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's work together</h2>
          <p className="text-slate-400 mb-8">Ready to start your next project with me?</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center gap-2 text-fuchsia-500">
              <Mail size={24} />
              <span className="text-sm font-medium text-slate-300">{data.email}</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-purple-500">
              <Phone size={24} />
              <span className="text-sm font-medium text-slate-300">{data.phone}</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-indigo-500">
              <MapPin size={24} />
              <span className="text-sm font-medium text-slate-300 uppercase tracking-tighter">{data.location}</span>
            </div>
          </div>

          <div className="flex justify-center gap-6">
             {(data.links || []).map((link, i) => (
               <a key={i} href={link?.url.startsWith('http') ? link.url : `https://${link.url}`} target="_blank" rel="noreferrer" className="p-4 bg-white/5 rounded-full hover:bg-white/10 hover:scale-110 transition text-fuchsia-400">
                 {getSocialIcon(link?.platform)}
               </a>
             ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-600 text-xs border-t border-white/5">
        © {new Date().getFullYear()} {data.fullName}. All rights reserved.
      </footer>
    </div>
  );
};

export default NeonFusion;