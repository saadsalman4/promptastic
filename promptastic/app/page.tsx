'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import type { PromptFormData } from '@/lib/gemini';

// Use dynamic imports with ssr: false to prevent hydration mismatches
const PromptForm = dynamic(() => import('@/components/PromptForm'), { ssr: false });
const PromptResult = dynamic(() => import('@/components/PromptResult'), { ssr: false });
const Modal = dynamic(() => import('@/components/Modal'), { ssr: false });

export default function Home() {
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true); // Open modal when prompt is generated
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error submitting form:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <PromptForm onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
      
      {/* Modal to display generated prompt */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Generated AI Prompt">
        <PromptResult 
          prompt={generatedPrompt} 
          isOpen={isModalOpen} 
          onClose={closeModal} 
        />
      </Modal>
      
      {/* Add a small indicator that a prompt has been generated */}
      {generatedPrompt && !isModalOpen && (
        <div className="mt-4">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-md transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            View Generated Prompt
          </button>
        </div>
      )}
    </div>
  );
}