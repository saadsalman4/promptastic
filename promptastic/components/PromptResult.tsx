'use client';

import React from 'react';
import './styles.css'; // Import the CSS file

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
    <div className="result-container">
      <div className="result-header">
        <h2 className="result-title">Your Generated Prompt</h2>
        <button
          onClick={copyToClipboard}
          className="copy-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="copy-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
          Copy
        </button>
      </div>
      <div className="prompt-content">
        {prompt}
      </div>
    </div>
  );
}