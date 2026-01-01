"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/DatePicker";
import { X } from "lucide-react";

const WorkExperienceCard = ({ index, data, onChange, onRemove }) => {
  return (
    <div className="rounded-xl border p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h2 className="font-bold text-lg">Experience #{index}</h2>
          {data.current && (
            <span className="px-3 py-1 text-xs rounded-full bg-black text-white">
              Current Position
            </span>
          )}
        </div>

        <Button variant="ghost" size="icon" onClick={onRemove}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Job Title + Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          value={data.jobTitle}
          onChange={(e) =>
            onChange({ ...data, jobTitle: e.target.value })
          }
          placeholder="Senior Software Engineer"
        />

        <Input
          value={data.company}
          onChange={(e) =>
            onChange({ ...data, company: e.target.value })
          }
          placeholder="Tech Company Inc."
        />
      </div>

      {/* Location */}
      <Input
        value={data.location}
        onChange={(e) =>
          onChange({ ...data, location: e.target.value })
        }
        placeholder="New York, NY"
      />

      {/* Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          label="Start Date"
          value={data.startDate}
          onChange={(d) =>
            onChange({ ...data, startDate: d })
          }
        />

        {!data.current && (
          <DatePicker
            label="End Date"
            value={data.endDate}
            onChange={(d) =>
              onChange({ ...data, endDate: d })
            }
          />
        )}
      </div>

      {/* Current Position */}
      <div className="flex items-center gap-2">
        <Checkbox
          checked={data.current}
          onCheckedChange={(v) =>
            onChange({
              ...data,
              current: v,
              endDate: v ? null : data.endDate,
            })
          }
        />
        <span>This is my current position</span>
      </div>

      {/* Description */}
      <Textarea
        value={data.description}
        onChange={(e) =>
          onChange({ ...data, description: e.target.value })
        }
        placeholder="Describe your role..."
      />

      {/* Achievements */}
      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onChange({
              ...data,
              achievements: [...data.achievements, ""],
            })
          }
        >
          + Add Achievement
        </Button>

        {data.achievements.map((ach, i) => (
          <Input
            key={i}
            value={ach}
            onChange={(e) => {
              const copy = [...data.achievements];
              copy[i] = e.target.value;
              onChange({ ...data, achievements: copy });
            }}
            placeholder="Key achievement..."
          />
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceCard;
