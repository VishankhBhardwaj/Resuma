"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDate(date) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function DatePicker({ label = "", value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(value);
  const [month, setMonth] = React.useState(value);
  const [inputValue, setInputValue] = React.useState(formatDate(value));

  return (
    <div className="flex flex-col gap-2">
      <Label>{label}</Label>

      <div className="relative">
        <Input
          value={inputValue}
          placeholder="Select date"
          onChange={(e) => setInputValue(e.target.value)}
        />

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setInputValue(formatDate(d));
                onChange?.(d);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
