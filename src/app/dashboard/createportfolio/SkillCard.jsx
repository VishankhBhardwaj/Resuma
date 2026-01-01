"use client";

import React from "react";

const SkillCard = ({ skill, onRemove }) => {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center">

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{skill.name}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Proficiency:</span>

          <div className="flex gap-1">
            {[1, 2, 3, 4].map((i) => (
              <span
                key={i}
                className={`w-3 h-3 rounded-full border ${
                  i <= skill.score ? "bg-black" : ""
                }`}
              />
            ))}
          </div>

          <span>{skill.score}/4</span>
        </div>

        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-black rounded-full"
            style={{ width: `${(skill.score / 4) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => onRemove(skill.id)}
        className="ml-4 w-8 h-8 border rounded-md hover:bg-gray-100"
      >
        ✕
      </button>
    </div>
  );
};

export default SkillCard;
