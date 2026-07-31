"use client";
import ResumeCard from "@/components/ui/ResumeCard";
import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const filterPortfolios = portfolios?.filter((portfolio) =>
    portfolio.form_data.professionalTitle
      .toLowerCase()
      .includes(query.toLowerCase()),
  ) || [];
  useEffect(() => {
    const fetchPortfolios = async () => {
      const res = await fetch("/api/portfolios/Data");
      if (res.status === 401) {
        router.push("/sign-in");
        return;
      }
      const data = await res.json();
      setPortfolios(data.portfolios);
      setLoading(false);
    };
    fetchPortfolios();
  }, []);
  return (
    <div className="parent p-2 px-2 flex flex-col gap-2 md:gap-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="flex flex-col mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            My Portfolios
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Manage your portfolio collection
          </p>
        </div>

        <div className="flex flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-initial md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              placeholder="Search portfolios..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button
            onClick={() => router.push("/dashboard/createportfolio")}
            className="
      flex items-center gap-2
      px-5 py-2.5 
      rounded-md 
      font-medium 
      text-white
      bg-gray-900 
      hover:bg-gray-800
      transition-all duration-200
      whitespace-nowrap
    "
          >
            <Plus className="h-5 w-5" />
            Create New
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {loading ? (
          <p className="text-gray-500 text-lg">Loading portfolios...</p>
        ) : filterPortfolios.length === 0 ? (
          <p className="text-gray-500 text-lg">No portfolios found</p>
        ) : (
          filterPortfolios.map((portfolio) => (
            <ResumeCard
              key={portfolio.id}
              id={portfolio.id}
              title={portfolio.form_data.professionalTitle}
              lastEdited={portfolio.updated_at}
            />
          ))
        )}
      </div>
    </div>
  );
}
