import Link from "next/link";
import { FileScan, BriefcaseBusiness, Plus, Palette } from "lucide-react";

const actions = [
  {
    title: "Analyze Resume",
    description: "Analyze a professional resume with AI assistance.",
    href: "/dashboard/analyzeresumes",
    icon: FileScan,
    accent: "from-cyan-500 to-blue-500",
    hoverGlow: "hover:border-cyan-300 hover:shadow-[0_8px_30px_rgba(6,182,212,0.18)]",
  },
  {
    title: "Interview Prep",
    description: "Practice answers and sharpen your interview skills.",
    href: "/dashboard/interviewprep",
    icon: BriefcaseBusiness,
    accent: "from-purple-500 to-violet-600",
    hoverGlow: "hover:border-purple-300 hover:shadow-[0_8px_30px_rgba(168,85,247,0.18)]",
  },
  {
    title: "Create Portfolio",
    description: "Showcase your work with an amazing portfolio.",
    href: "/dashboard/createportfolio",
    icon: Plus,
    accent: "from-cyan-400 to-teal-500",
    hoverGlow: "hover:border-teal-300 hover:shadow-[0_8px_30px_rgba(45,212,191,0.18)]",
  },
  {
    title: "My Portfolios",
    description: "View and manage your portfolios.",
    href: "/dashboard/myportfolios",
    icon: Palette,
    accent: "from-pink-500 to-rose-500",
    hoverGlow: "hover:border-pink-300 hover:shadow-[0_8px_30px_rgba(244,114,182,0.18)]",
  },
];

const Card = () => {
  return (
    <div className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {actions.map(({ title, description, href, icon: Icon, accent, hoverGlow }) => (
        <Link key={title} href={href} className="group block h-full">
          <div
            className={`relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${hoverGlow}`}
          >
            <div
              aria-hidden
              className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${accent} opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-30`}
            />
            <div className="relative">
              <div
                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${accent} p-0.5 transition-transform duration-300 group-hover:scale-110`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <Icon className="h-5 w-5 text-slate-700" />
                </div>
              </div>
              <h3
                className="mb-2 text-xl font-bold text-slate-900"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">{description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Card;
