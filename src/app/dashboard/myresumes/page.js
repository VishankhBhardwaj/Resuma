"use client"
import ResumeCard from "@/components/ui/ResumeCard"
import { Search } from 'lucide-react';
import { useState } from "react";


export default function Page() {
  
  return (
    <></>
    // <div className="parent p-2 px-2 flex flex-col gap-2 md:gap-5">
    //   <div className="flex flex-col md:flex-row justify-between">
    //     <div className="flex flex-col ">
    //       <h1 className="text-3xl font-bold bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent md:text-6xl">My Resumes</h1>
    //       <p className="ml-0.8 md:text-lg">Manage your resume collection</p>
    //     </div>
    //     <div className="relative inline-block">
    //       <div className="
    //       absolute inset-0 
    //       rounded-full 
    //       blur-xl 
    //       bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
    //       opacity-40
    //       "></div>

    //       <button className="
    //           relative 
    //           px-7 py-1 
    //           rounded-full 
    //           font-semibold 
    //           text-white 
    //           bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
    //           shadow-lg mt-2 cursor-pointer hover:shadow-2xl hover:scale-100 transition-all duration-150
    //         ">
    //         Create New Resume
    //       </button>
    //     </div>
    //   </div>
    //   <div className="relative w-full">
    //     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />

    //     <input
    //       type="search"
    //       placeholder="Search Resumes..."
    //       className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-4xl md:rounded-sm  focus:outline-none  focus:ring-1 focus:ring-purple-500"
    //       onChange={(e) => setQuery(e.target.value)}
    //     />
    //   </div>
    //   <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
    //     {filteredResumes.length > 0 ? (filteredResumes.map((resume) => (
    //       <ResumeCard
    //         key={resume.id}
    //         title={resume.title}
    //         lastEdited={resume.lastEdited}
    //       />
    //     ))) : (
    //       <p className="text-gray-500 text-lg">No resumes found</p>
    //     )}
    //   </div>

    // </div>
  );
}