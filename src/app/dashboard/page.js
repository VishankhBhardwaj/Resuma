"use client";

import Card from "@/components/ui/Card";
import { FileText, Palette, Eye, TrendingUp, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STAT_META = [
  {
    key: "resumes",
    label: "Total Resumes",
    icon: FileText,
    accent: "from-cyan-500 to-blue-500",
  },
  {
    key: "portfolios",
    label: "Total Portfolios",
    icon: Palette,
    accent: "from-purple-500 to-pink-500",
  },
  {
    key: "views",
    label: "Profile Views",
    icon: Eye,
    accent: "from-pink-500 to-rose-500",
  },
  {
    key: "month",
    label: "This Month",
    icon: TrendingUp,
    accent: "from-emerald-500 to-cyan-500",
  },
];

export default function Page() {
  const router = useRouter();
  const [stats, setStats] = useState({
    resumes: "—",
    portfolios: "—",
    views: "—",
    month: "—",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user");
      if (res.status === 401) {
        router.push("/sign-in");
      }
    };

    const fetchStats = async () => {
      const res = await fetch("/api/dashboard-stats");
      if (res.status === 401) {
        router.push("/sign-in");
        return;
      }
      const data = await res.json();
      setStats({
        resumes: data.resumeAnalyzeCount ?? "—",
        portfolios: data.portfolioCount ?? 0,
        views: data.totalViews ?? "—",
        month: data.monthlyGrowth ?? "—",
      });
    };

    fetchStats();
    fetchUser();
  }, [router]);

  return (
    <div className="relative w-full flex flex-col gap-8 p-4 md:p-6 lg:p-8">
      <section className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-md md:p-8">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-3xl"
        />
        <div className="relative">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50/80 px-3 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-cyan-600" />
            <span className="text-sm text-cyan-700">Your command center</span>
          </div>
          <h1
            className="bg-gradient-to-r from-slate-900 via-cyan-700 to-purple-700 bg-clip-text text-3xl font-bold text-transparent md:text-5xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Welcome To Your Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-500 md:text-lg">
            Start building your perfect resume and portfolio with AI-powered tools.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAT_META.map(({ key, label, icon: Icon, accent }) => (
          <div
            key={key}
            className="group relative overflow-hidden rounded-xl border border-slate-200/80 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-cyan-200 hover:shadow-[0_8px_30px_rgba(6,182,212,0.12)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-1 text-3xl font-bold text-slate-900 tabular-nums">
                  {stats[key]}
                </p>
              </div>
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${accent} p-0.5 transition-transform duration-300 group-hover:scale-110`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white">
                  <Icon className="h-5 w-5 text-slate-700" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <div>
          <h2
            className="text-xl font-bold text-slate-900 md:text-2xl"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Quick Actions
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Jump into the tools that move your career forward.
          </p>
        </div>
        <Card />
      </section>
    </div>
  );
}
