'use client';

import React from 'react';

interface PromptResultProps {
  prompt: string;
}

export default function PromptResult({ prompt }: PromptResultProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt);
    alert('Prompt copied to clipboard!');
  };

  if (!prompt) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Generated Prompt</h2>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy
        </button>
      </div>
      <div className="bg-gray-50 rounded-md p-4 text-gray-700 whitespace-pre-wrap">
        {prompt}
      </div>
    </div>
  );
}