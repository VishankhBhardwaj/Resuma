"use client";

import React from 'react';
import { usePortfolioStore } from "@/store/portfolioStore";
import { 
  User, Mail, Phone, Globe, MapPin, Briefcase, 
  Award, FolderGit2, CheckCircle2, ExternalLink, 
  Github, Link as LinkIcon 
} from 'lucide-react';

const ReviewPublish = () => {
  const data = usePortfolioStore((state) => state.data);

  // Fallback default values in case data is empty or steps were skipped
  const {
    fullName = "",
    professionalTitle = "",
    location = "",
    email = "",
    phone = "",
    website = "",
    bio = "",
    links = [],
    skills = [],
    certi = [],
    work = [],
    projects = [],
    title: templateTitle = "",
    gradient = "from-purple-500 via-fuchsia-500 to-pink-500"
  } = data || {};

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    } catch (e) {
      return "";
    }
  };

  return (
    <div className="w-full min-h-screen py-4 px-2 md:px-6 bg-slate-50/50 rounded-xl border border-slate-100">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Review & Publish
        </h1>
        <p className="text-slate-500 mt-1">
          Double-check all your information before generating your live portfolio.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT COLUMN: Profile Summary & Template */}
        <div className="space-y-6">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            {/* Header Gradient Panel */}
            <div className={`h-24 bg-gradient-to-r ${gradient || "from-purple-500 to-pink-500"}`} />
            
            {/* Avatar / Profile Details */}
            <div className="px-6 pb-6 relative">
              <div className="flex justify-center -mt-12 mb-4">
                <div className={`w-24 h-24 rounded-full border-4 border-white flex items-center justify-center text-white text-2xl font-bold bg-gradient-to-br ${gradient || "from-purple-500 to-pink-500"} shadow-md`}>
                  {getInitials(fullName)}
                </div>
              </div>

              <div className="text-center space-y-1">
                <h2 className="text-xl font-bold text-slate-800">{fullName || "Your Name"}</h2>
                <p className="text-sm font-semibold text-purple-600 tracking-wide uppercase">{professionalTitle || "Professional Title"}</p>
                {location && (
                  <div className="flex items-center justify-center gap-1 text-xs text-slate-400 mt-1">
                    <MapPin size={12} />
                    <span>{location}</span>
                  </div>
                )}
              </div>

              {bio && (
                <>
                  <div className="border-t border-slate-100 my-4" />
                  {/* Bio */}
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">About Me</h4>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal italic">
                      "{bio}"
                    </p>
                  </div>
                </>
              )}

              {(email || phone || website) && (
                <>
                  <div className="border-t border-slate-100 my-4" />
                  {/* Contact Info */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact Info</h4>
                    
                    {email && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                          <Mail size={16} />
                        </div>
                        <span className="truncate">{email}</span>
                      </div>
                    )}

                    {phone && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                          <Phone size={16} />
                        </div>
                        <span>{phone}</span>
                      </div>
                    )}

                    {website && (
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                          <Globe size={16} />
                        </div>
                        <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors truncate">
                          {website}
                        </a>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Social Links */}
              {links && links.length > 0 && links.some(l => l.platform && l.url) && (
                <>
                  <div className="border-t border-slate-100 my-4" />
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Social Links</h4>
                    <div className="flex flex-wrap gap-2">
                      {links.map((link, idx) => (
                        link.platform && link.url && (
                          <a 
                            key={idx} 
                            href={link.url.startsWith('http') ? link.url : `https://${link.url}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-purple-600 transition-all"
                          >
                            <LinkIcon size={12} />
                            <span>{link.platform}</span>
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* TEMPLATE SELECTION CARD */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Selected Style</h3>
            <div className={`p-4 rounded-xl bg-gradient-to-r ${gradient || "from-purple-500 to-pink-500"} text-white relative shadow-inner group overflow-hidden`}>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <p className="text-xs font-medium tracking-widest uppercase opacity-75">Active Theme</p>
                <h4 className="text-xl font-black mt-0.5 tracking-tight">{templateTitle || "Default Gradient"}</h4>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (2/3 width): Main Content Sections */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* WORK EXPERIENCE */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Briefcase className="text-purple-500" size={20} />
              <h3 className="text-lg font-bold text-slate-800">Work Experience</h3>
            </div>
            
            {!work || work.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No work experience added yet.</p>
            ) : (
              <div className="relative border-l border-slate-150 ml-3 pl-6 space-y-6">
                {work.map((w) => {
                  const startStr = formatDate(w.startDate);
                  const endStr = w.current ? 'Present' : formatDate(w.endDate);
                  
                  return (
                    <div key={w.id} className="relative">
                      {/* Circle Bullet */}
                      <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full border-4 border-white bg-purple-500 shadow-sm" />
                      
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div>
                            <h4 className="text-md font-bold text-slate-800">{w.jobTitle || 'Job Title'}</h4>
                            <p className="text-sm font-medium text-slate-500">{w.company || 'Company Name'} &bull; {w.location}</p>
                          </div>
                          {(startStr || endStr) && (
                            <span className="inline-flex px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold self-start sm:self-center">
                              {startStr} {startStr && endStr ? ' - ' : ''} {endStr}
                            </span>
                          )}
                        </div>
                        
                        {w.description && (
                          <p className="text-sm text-slate-600 leading-relaxed font-normal">{w.description}</p>
                        )}
                        
                        {w.achievements && w.achievements.length > 0 && w.achievements.some(ach => ach) && (
                          <ul className="list-disc list-inside text-xs text-slate-500 space-y-1 mt-2">
                            {w.achievements.map((ach, index) => (
                              ach && <li key={index}>{ach}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* PROJECTS */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FolderGit2 className="text-purple-500" size={20} />
              <h3 className="text-lg font-bold text-slate-800">Projects</h3>
            </div>

            {!projects || projects.length === 0 ? (
              <p className="text-sm text-slate-400 italic">No projects added yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-purple-300 hover:shadow-sm transition-all bg-white">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-md font-bold text-slate-800">{proj.title || 'Untitled Project'}</h4>
                        <div className="flex gap-2">
                          {proj.gitHubLink && (
                            <a href={proj.gitHubLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors">
                              <Github size={16} />
                            </a>
                          )}
                          {proj.demoLink && (
                            <a href={proj.demoLink} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-purple-600 transition-colors">
                              <ExternalLink size={16} />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {proj.description || 'No description provided.'}
                      </p>
                    </div>

                    {proj.technologiesUsed && proj.technologiesUsed.length > 0 && proj.technologiesUsed.some(tech => tech) && (
                      <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-slate-50">
                        {proj.technologiesUsed.map((tech, tIdx) => (
                          tech && (
                            <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                              {tech}
                            </span>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SKILLS & CERTIFICATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SKILLS */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="text-purple-500" size={20} />
                <h3 className="text-lg font-bold text-slate-800">Skills</h3>
              </div>

              {!skills || skills.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No skills added yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <span 
                      key={s.id} 
                      className="inline-flex flex-col px-3 py-1.5 rounded-xl border border-slate-250 bg-white shadow-sm"
                    >
                      <span className="text-sm font-bold text-slate-800 leading-tight">{s.name}</span>
                      {s.level && (
                        <span className="text-[10px] text-purple-600 font-semibold uppercase tracking-wider mt-0.5">{s.level}</span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* CERTIFICATIONS */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Award className="text-purple-500" size={20} />
                <h3 className="text-lg font-bold text-slate-800">Certifications</h3>
              </div>

              {!certi || certi.length === 0 ? (
                <p className="text-sm text-slate-400 italic">No certifications added yet.</p>
              ) : (
                <div className="space-y-3">
                  {certi.map((c) => {
                    const certDate = formatDate(c.date);
                    
                    return (
                      <div key={c.id} className="flex gap-3 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 flex-shrink-0">
                          <Award size={16} />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 leading-snug">{c.name}</h4>
                          <p className="text-xs text-slate-500 font-medium">
                            {c.organization} {c.organization && certDate ? ' • ' : ''} {certDate}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ReviewPublish;