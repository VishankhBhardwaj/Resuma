import React from "react";
import { Pencil, Download, Trash } from "lucide-react";

const ResumeCard = () => {
  return (
    <div className="
      flex flex-col w-full max-w-[420px] h-[190px] 
      rounded-2xl p-5 
      shadow-[0_0_25px_rgba(180,100,255,0.25)] gap-2 glowing-card
    ">

      <div>
        <h1 className="font-bold text-white text-xl">Software Engineer Resume</h1>
        <p className="text-[#c3c4cc] mt-1">Last edited: 2 days ago</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 md:justify-around">

        {/* Edit Button */}
        <button className="
          flex items-center gap-2 px-2 py-0 
          rounded-full border border-[#b46dff] 
          text-[#d9b3ff] bg-[#643dc1]
          shadow-[0_0_12px_rgba(174,82,255,0.6)]
           hover:shadow-[0_0_20px_rgba(174,82,255,0.8)]
          transition-all h-[40px] w-[80px] hover:bg-transparent
        ">
          <Pencil className="h-5 w-5" />
          <span className="font-medium">Edit</span>
        </button>

        {/* Download Button */}
        <button className="
          flex items-center gap-2 px-5 py-2.5 
          rounded-full border border-[#b46dff] 
          text-[#d9b3ff] bg-[#643dc1]
          shadow-[0_0_12px_rgba(174,82,255,0.6)]
           hover:shadow-[0_0_20px_rgba(174,82,255,0.8)]
          transition-all h-[40px] w-[150px] hover:bg-transparent
        ">
          <Download className="h-5 w-5" />
          <span className="font-medium">Download</span>
        </button>

        {/* Delete Button */}
        <button className="
          flex items-center justify-center px-5 py-2.5 
          rounded-full border border-[#b46dff] 
          bg-[#643dc1]
          shadow-[0_0_12px_rgba(174,82,255,0.6)]
           hover:shadow-[0_0_20px_rgba(174,82,255,0.8)]
          transition-all h-[40px] w-[80px] hover:bg-transparent hover:border-red-400
        ">
          <Trash className="h-5 w-5 text-[#ff6b6b]" />
        </button>

      </div>

    </div>
  );
};

export default ResumeCard;
