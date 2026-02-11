import ResumeCard from "@/components/ui/ResumeCard"
import { Search,Plus } from 'lucide-react';
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase/server";
export default async function Page() {
  const { userId } = await auth();
  if (!userId) return null;
  const { data: portfolios, error } = await supabase
    .from("Portfolios")
    .select("*")
    .eq("clerk_user_id", userId);
  if (error) console.log(error);
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
            {/* <input
              type="search"
              placeholder="Search portfolios..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              onChange={(e) => setQuery(e.target.value)}
            /> */}
          </div>

          <button className="
      flex items-center gap-2
      px-5 py-2.5 
      rounded-md 
      font-medium 
      text-white
      bg-gray-900 
      hover:bg-gray-800
      transition-all duration-200
      whitespace-nowrap
    ">
            <Plus className="h-5 w-5" />
            Create New
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
        {portfolios.length === 0 && (
          <p className="text-gray-500 text-lg">No resumes found</p>
        )}

        {portfolios.map((portfolio) => (
          <ResumeCard
            id={portfolio.id}
            title={portfolio.form_data.professionalTitle}
            lastEdited={portfolio.updated_at}
          />
        ))}
      </div>

    </div>
  );
}