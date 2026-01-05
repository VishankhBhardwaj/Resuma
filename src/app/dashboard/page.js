"use client"

import Card from "@/components/ui/Card";
import { FileText, Palette, Eye, TrendingUp } from 'lucide-react';
import { redirect } from "next/dist/server/api-utils";
import { useEffect } from "react";
import { useRouter } from "next/navigation"
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/user')
      if (res.status === 401) {
        router.push("/sign-in")
        return
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="parent w-full h-full flex flex-col p-3 gap-2">
      <div className="flex flex-col">
        <h1 className="font-bold text-black text-xl lg:text-5xl">Welcome To Your Dashboard</h1>
        <p className="text-gray-600 text-md lg:text-xl mt-2">Start building your perfect resume and portfolio</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

          <div className="p-4 flex justify-between shadow-md border border-gray-200 rounded-lg bg-white">
            <div>
              <h1 className="text-gray-400 text-sm">Total Resumes</h1>
              <p className="font-bold text-xl">3</p>
            </div>
            <FileText className="text-gray-700 w-6 h-6" />
          </div>

          <div className="p-4 flex justify-between shadow-md border border-gray-200 rounded-lg bg-white">
            <div>
              <h1 className="text-gray-400 text-sm">Total Portfolios</h1>
              <p className="font-bold text-xl">3</p>
            </div>
            <Palette className="text-gray-700 w-6 h-6" />
          </div>

          <div className="p-4 flex justify-between shadow-md border border-gray-200 rounded-lg bg-white">
            <div>
              <h1 className="text-gray-400 text-sm">Profile Views</h1>
              <p className="font-bold text-xl">3</p>
            </div>
            <Eye className="text-gray-700 w-6 h-6" />
          </div>

          <div className="p-4 flex justify-between shadow-md border border-gray-200 rounded-lg bg-white">
            <div>
              <h1 className="text-gray-400 text-sm">This Month</h1>
              <p className="font-bold text-xl">3</p>
            </div>
            <TrendingUp className="text-gray-700 w-6 h-6" />
          </div>

        </div>

      </div>
      {/* Card Start */}
      <Card />
    </div>
  );
}