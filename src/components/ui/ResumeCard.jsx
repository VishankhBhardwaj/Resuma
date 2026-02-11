"use client"
import React from "react";
import { useState } from "react";
import { Pencil, Download, Trash, Eye, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const ResumeCard = ({ id, title, lastEdited, status = "Active" }) => {
  const [deleted, setDeleted] = useState(false);
  
  const formattedDate = new Date(lastEdited).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  
  const router = useRouter();
  
  const handleClick = () => {
    router.push(`/p/${id}/portfolio`);
  }
  
  const handleDelete = async () => {
    try {
      const reply = await axios.post("/api/portfolios/Delete", { id });
      toast.success(reply.data.msg);
      setDeleted(true);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };
  
  if (deleted) return null;
  
  return (
    <div className="
      flex flex-col w-full max-w-[420px] h-[230px]
      bg-white
      rounded-xl
      border border-gray-200
      shadow-sm hover:shadow-md
      transition-all duration-200
      overflow-hidden
    ">

      <div className="h-2 bg-gradient-to-r from-gray-600 to-gray-800"></div>
      
      <div className="flex flex-col p-5 gap-4 flex-1">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-gray-900 text-lg">
            {title}
          </h2>
          <span className={`
            inline-flex items-center self-start
            px-2.5 py-0.5
            rounded-md
            text-xs font-medium
            ${status === "Active" 
              ? "bg-green-100 text-green-800" 
              : status === "Draft"
              ? "bg-gray-100 text-gray-800"
              : "bg-orange-100 text-orange-800"
            }
          `}>
            {status}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Calendar className="h-4 w-4" />
          <span>Last edited: {formattedDate}</span>
        </div>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleClick}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="Edit"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button 
              onClick={handleClick}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="View"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button 
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              title="Download"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
          
          <button
            onClick={handleDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeCard;