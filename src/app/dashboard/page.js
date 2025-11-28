"use client"
import Card from "@/components/ui/Card";
export default function Page() {
  return (
    <div className="parent min-h-screen w-screen flex flex-col p-3 gap-2">
      <div className="flex flex-col">
        <h1 className="font-bold text-black text-xl lg:text-5xl">Welcome To Your Dashboard</h1>
        <p className="text-gray-600 text-md lg:text-xl mt-2">Start building your perfect resume and portfolio</p>
      </div>
      {/* Card Start */}
      <Card />
    </div>
  );
}