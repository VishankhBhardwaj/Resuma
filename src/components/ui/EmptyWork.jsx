"use client";

import { BriefcaseIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyWork() {
  return (
    <Empty className="py-14">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BriefcaseIcon size={48} className="text-gray-400" />
        </EmptyMedia>

        <EmptyTitle className="text-lg font-semibold">
          No work experience added
        </EmptyTitle>

        <EmptyDescription className="text-gray-500 text-sm">
          Add your professional experience to showcase your career journey
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button className="bg-[#0D1B2A] hover:bg-[#0D1B2Acc] text-white px-5 py-5 rounded-lg">
          <Plus size={16} className="mr-2" />
          Add Your First Experience
        </Button>
      </EmptyContent>
    </Empty>
  );
}
