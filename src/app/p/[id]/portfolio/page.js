import { supabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { template } from "@/components/template";
import { auth } from "@clerk/nextjs/server";

export default async function Page({params}) {
  const {id} = await params;
  const {userId} = await auth();
  
  const {data:portfolio,error} = await supabase.from("Portfolios").select("*").eq('id',id).single();
  if (!portfolio) {
    notFound();
  }
  if(portfolio && portfolio.clerk_user_id !== userId){
    const id  = portfolio.id;
    await supabase.from("Portfolios").update({views:portfolio.views+1}).eq("id",id);
  }
  const Template = template[portfolio.template];
  if(!Template) {
    notFound();
  }

  const aiData = JSON.parse(portfolio.ai_data);
  let updatedProjects = aiData.projects || [];

  try {
    const { data: files, error: listError } = await supabase.storage
      .from("project photos")
      .list(`${userId}/${id}`);

    if (files && !listError) {
      updatedProjects = (aiData.projects || []).map(project => {
        const matched = files.find(file =>
          file.name.startsWith(project.title)
        );

        if (!matched) return project;

        const { data: url } = supabase.storage
          .from("project photos")
          .getPublicUrl(`${userId}/${id}/${matched.name}`);

        return {
          ...project,
          imageUrl: url.publicUrl,
        };
      });
    }
  } catch (err) {
    console.error("Error listing files from Supabase storage:", err);
  }

  const updatedData = {
    ...aiData,
    projects: updatedProjects
  };

  return (
    <>
      <Template data={updatedData} id={id} userId={userId}/>
    </>
  );
}