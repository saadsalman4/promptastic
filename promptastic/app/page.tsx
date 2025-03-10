'use client';

import { useState } from 'react';
import PromptForm from '@/components/PromptForm';
import PromptResult from '@/components/PromptResult';
import type { PromptFormData } from '@/lib/gemini';
import './styles.css'; // Import the CSS file

export default function Home() {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data: PromptFormData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate prompt');
      }
      
      const result = await response.json();
      setGeneratedPrompt(result.prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      {error && (
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon-container">
              <svg className="error-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="error-message-container">
              <p className="error-text">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="form-section">
        <PromptForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
      
      {generatedPrompt && (
        <div className="result-section">
          <PromptResult prompt={generatedPrompt} />
        </div>
      )}
    </div>
  );
}