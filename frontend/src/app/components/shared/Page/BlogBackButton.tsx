"use client";
import React from "react";

export default function BlogBackButton() {
  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleBack}
        className="inline-flex items-center text-teal-400 hover:text-teal-300 font-semibold text-lg"
      >
        <span className="mr-2">
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </span>
        Back
      </button>
    </div>
  );
}
