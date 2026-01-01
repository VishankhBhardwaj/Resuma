"use client";

import React from "react";

const CertificationCard = ({ cert, onRemove }) => {
  return (
    <div className="border rounded-xl p-4 flex justify-between items-center">

      <div>
        <h3 className="font-semibold text-lg">{cert.name}</h3>
        <p className="text-sm text-gray-600">
          {cert.organization}
        </p>
        <p className="text-sm text-gray-500">
          Obtained: {new Date(cert.date).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={() => onRemove(cert.id)}
        className="w-8 h-8 border rounded-md hover:bg-gray-100"
      >
        ✕
      </button>

    </div>
  );
};

export default CertificationCard;
