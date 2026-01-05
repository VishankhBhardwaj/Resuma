import { supabase } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { template } from "@/components/template";
export default async function Page({params}) {
  const {id} = await params;
  const {data:portfolio,error} = await supabase.from("Portfolios").select("*").eq('id',id).single();
  if (!portfolio) {
    notFound();
  }
  const Template = template[portfolio.template];
  if(!Template) {
    notFound();
  }
  return (
    <>
    <Template data = {JSON.parse(portfolio.ai_data)}/>
    </>
  );
}