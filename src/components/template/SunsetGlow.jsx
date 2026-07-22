import React from 'react';
import { Mail, MapPin, ExternalLink, Github, Star, Heart, Phone, Globe } from 'lucide-react';
import Image from 'next/image';
const SunsetGlow = ({ data }) => {
  // 1. Top-level Guard: Ensures the component doesn't run if data is null
  if (!data) return <div className="min-h-screen bg-[#fffcf9] flex items-center justify-center font-serif italic text-stone-400">Loading Journey...</div>;

  return (
    <div className="min-h-screen bg-[#fffcf9] text-stone-800 font-sans selection:bg-orange-100 overflow-x-hidden">
      
      {/* --- FLOATING NAV --- */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/70 backdrop-blur-lg border border-orange-100 px-6 py-3 rounded-full shadow-sm animate__animated animate__fadeInDown">
        <ul className="flex gap-8 text-xs font-bold uppercase tracking-widest text-stone-500">
          <li><a href="#about" className="hover:text-orange-500 transition">About</a></li>
          <li><a href="#projects" className="hover:text-orange-500 transition">Works</a></li>
          <li><a href="#experience" className="hover:text-orange-500 transition">Journey</a></li>
        </ul>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Safe Background Gradient */}
        <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-b ${data.gradient || 'from-orange-200 to-rose-200'} opacity-10 blur-[100px] rounded-full`}></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-10 animate__animated animate__zoomIn">
            <div className={`inline-block p-1 rounded-full bg-gradient-to-tr ${data.gradient || 'from-orange-400 to-rose-400'}`}>
              <Image
                src={data.profilePhoto || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=400&h=400"} 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-[#fffcf9] object-cover"
                alt={data.fullName || "Portfolio Owner"}
                width={40}
                height={40}
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif italic tracking-tight mb-6 animate__animated animate__fadeInUp">
            {data.fullName || "Professional Name"}
          </h1>
          <p className="text-xl md:text-2xl text-stone-500 font-light max-w-2xl mx-auto leading-relaxed animate__animated animate__fadeInUp animate__delay-1s">
            {data.professionalTitle} {data.bio ? `— ${data.bio}` : ''}
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-6 animate__animated animate__fadeInUp animate__delay-2s">
             {data.location && (
               <div className="flex items-center gap-2 text-sm font-medium text-stone-400">
                  <MapPin size={16} className="text-orange-400" /> {data.location}
               </div>
             )}
             {/* Safe Access to Skill index 0 */}
             {data.skills?.[0]?.name && (
               <div className="flex items-center gap-2 text-sm font-medium text-stone-400">
                  <Star size={16} className="text-orange-400" /> {data.skills[0].name} Expert
               </div>
             )}
          </div>
        </div>
      </section>

      {/* --- SKILLS GRID --- */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* 2. Safe Array Mapping for Skills */}
            {(data.skills || []).map((skill, i) => (
              <div key={i} className="text-center space-y-2 animate__animated animate__fadeInUp">
                <div className={`h-1 w-12 mx-auto bg-gradient-to-r ${data.gradient || 'from-orange-400 to-rose-400'} rounded-full`}></div>
                <h4 className="text-lg font-serif italic">{skill?.name || "Skill"}</h4>
                <p className="text-[10px] uppercase tracking-widest text-stone-400 font-bold">{skill?.level || "Expertise"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECTS GALLERY --- */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-serif italic">Selected <br/> Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* 3. Safe Array Mapping for Projects */}
            {(data.projects || []).map((project, i) => (
              <div key={i} className={`group space-y-6 animate__animated animate__fadeInUp ${i % 2 !== 0 ? 'md:mt-24' : ''}`}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl bg-stone-100">
                  {project?.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project?.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${data.gradient || 'from-orange-400 to-rose-400'} opacity-20 group-hover:opacity-40 transition-opacity duration-700`} />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center text-white bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ExternalLink size={48} className="scale-50 group-hover:scale-100 transition-all duration-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{project?.title || "Project Title"}</h3>
                  <p className="text-stone-500 leading-relaxed text-sm line-clamp-3">{project?.description || "No description provided."}</p>
                  <div className="flex gap-4 pt-4">
                    {project?.demoLink && (
                      <a href={project.demoLink} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest border-b border-orange-300 pb-1 hover:text-orange-500 transition">View Project</a>
                    )}
                    {project?.gitHubLink && (
                      <a href={project.gitHubLink} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest border-b border-stone-200 pb-1 hover:border-stone-800 transition">Source Code</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE TIMELINE --- */}
      <section id="experience" className="py-20 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-center text-3xl font-serif italic mb-20">The Journey</h2>
          <div className="space-y-20">
            {/* 4. Safe Array Mapping for Work History */}
            {(data.work || []).map((job, i) => (
              <div key={i} className="flex flex-col md:flex-row gap-8 md:gap-20 items-start animate__animated animate__fadeInUp">
                <div className="w-32 flex-shrink-0">
                  <span className="text-sm font-bold text-orange-400 font-mono tracking-tighter">
                    {job?.startDate ? job.startDate.split('T')[0] : 'Present'}
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">{job?.jobTitle || "Role"}</h3>
                  <p className="text-stone-400 font-serif italic text-lg">{job?.company || "Organization"}</p>
                  <p className="text-stone-500 leading-relaxed text-sm">{job?.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {(job?.achievements || []).map((ach, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-1 bg-white border border-stone-100 rounded text-stone-400 font-bold uppercase tracking-tighter">
                        {ach}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT & FOOTER --- */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8 animate__animated animate__fadeIn">
          <Heart className="mx-auto text-orange-400 animate-bounce" size={32} />
          <h2 className="text-4xl md:text-6xl font-serif italic tracking-tight">Let's create something <br/> beautiful.</h2>
          <div className="flex flex-col items-center gap-2 text-stone-500 font-medium">
            {data.email && <a href={`mailto:${data.email}`} className="hover:text-orange-500 transition">{data.email}</a>}
            {data.phone && <span>{data.phone}</span>}
          </div>
          
          <div className="pt-10 flex flex-wrap justify-center gap-8">
            {/* 5. Safe Array Mapping for Social Links */}
            {(data.links || []).map((link, i) => (
              <a 
                key={i} 
                href={link?.url} 
                target="_blank" 
                rel="noreferrer" 
                className="text-stone-400 hover:text-orange-500 transition capitalize font-bold text-xs tracking-widest border-b border-stone-100"
              >
                {link?.platform || "Link"}
              </a>
            ))}
          </div>
          
          <footer className="pt-20 text-[10px] uppercase tracking-[0.4em] text-stone-300">
            © {new Date().getFullYear()} {data.fullName || "User"} — Digital Portfolio
          </footer>
        </div>
      </section>
    </div>
  );
};

export default SunsetGlow;