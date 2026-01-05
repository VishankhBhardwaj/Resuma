import { Crown } from "lucide-react";
import { useEffect, useState } from "react";

const templates = [
  {
    id: 1,
    title: "Ocean Breeze",
    desc: "A calm, minimal template for creative designers.",
    gradient: "from-blue-400 via-teal-400 to-cyan-500",
    isPremium: true
  },
  {
    id: 2,
    title: "Royal Purple",
    desc: "Perfect for developers who want a sleek modern look.",
    gradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    isPremium: true
  },
  {
    id: 3,
    title: "Sunset Glow",
    desc: "Warm gradient ideal for photographers and artists.",
    gradient: "from-orange-400 via-red-400 to-pink-500",
    isPremium: true
  },
  {
    id: 4,
    title: "Emerald Shine",
    desc: "A clean and elegant style for working professionals.",
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    isPremium: true
  },
  {
    id: 5,
    title: "Midnight Blue",
    desc: "Dark, bold theme for tech-savvy developers.",
    gradient: "from-slate-800 via-blue-700 to-indigo-800",
    isPremium: true
  },
  {
    id: 6,
    title: "Neon Fusion",
    desc: "Energetic neon gradient ideal for modern designers.",
    gradient: "from-fuchsia-500 via-purple-600 to-indigo-600",
    isPremium: false
  },
];


const ChooseTemplate = ({onSubmit,data}) => {
  const [active,setActive] = useState();
  const handleClick = (card)=>{
    onSubmit(card,true);
  }
  return (
    <div className="min-h-screen p-3 flex flex-col border border-gray-200 rounded-md shadow-3xl">
      <h1 className="text-black text-center font-bold text-xl">
        Choose Your Template
      </h1>
      <p className="text-gray-500 text-center text-md mb-6">
        Select a template that best represents your style and profession
      </p>

      {/* Grid of 4 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-5 px-3">
        {templates.map((card) => (
          <div
            onClick={()=>{setActive(card.id); handleClick(card)}}
            key={card.id}
            className={`rounded-2xl border border-gray-200 shadow-sm bg-white overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer md:h-[400px]  hover:border hover:border-black ${active==card.id || data.id == card.id?"border-2 border-pink-400":""}`}
          >
            {/* Top preview gradient */}
            <div
              className={`h-[150px] md:h-[260px] w-full rounded-t-2xl bg-gradient-to-br ${card.gradient} relative`}
            >
              {/* Premium badge */}
              {card.isPremium && (
                <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                  <Crown size={14} className="text-white" />
                  Premium
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 md:mt-auto">
              <h2 className="text-lg font-bold text-gray-900">{card.title}</h2>
              <p className="text-sm text-gray-500 mt-1">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseTemplate;
