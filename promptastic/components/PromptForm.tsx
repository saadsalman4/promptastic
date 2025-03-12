'use client';

import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import type { PromptFormData } from '../lib/gemini';
import lottie from 'lottie-web';

interface PromptFormProps {
  onSubmit: (data: PromptFormData) => void;
  isLoading: boolean;
}

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PromptFormData>();
  const lottieContainer = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This will be used when you add your lottie JSON file
    // For now, we'll just prepare the container
    if (isLoading && lottieContainer.current) {
      // You'll replace this with your actual lottie animation
      // Example usage when you have your file:
      const animation = lottie.loadAnimation({
        container: lottieContainer.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/animations/loading.json', 
      });
      
      return () => animation.destroy();
    }
  }, [isLoading]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Generate Your AI Prompt</h2>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div ref={lottieContainer} className="w-64 h-64"></div>
          <p className="mt-4 text-gray-600 font-medium">Generating your AI prompt...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-4 md:mb-0">
              <label htmlFor="purpose" className="block mb-2 font-medium">
                What is this AI prompt for? <span className="text-red-600">*</span>
              </label>
              <select
                id="purpose"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("purpose", { required: "This field is required" })}
              >
                <option value="">Select a purpose</option>
                <option value="chatbot">Chatbot / Conversational AI</option>
                <option value="content">Content Generation</option>
                <option value="customer-support">Customer Support</option>
                <option value="creative-writing">Creative Writing</option>
                <option value="data-analysis">Data Analysis</option>
                <option value="code-assistant">Coding Assistant</option>
                <option value="education">Educational Tool</option>
                <option value="other">Other</option>
              </select>
              {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>}
            </div>

            <div className="mb-4 md:mb-0">
              <label htmlFor="orgName" className="block mb-2 font-medium">
                Organization Name <span className="text-red-600">*</span>
              </label>
              <input
                id="orgName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Acme Inc."
                {...register("orgName", { required: "Organization name is required" })}
              />
              {errors.orgName && <p className="mt-1 text-sm text-red-600">{errors.orgName.message}</p>}
            </div>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-4 md:mb-0">
              <label htmlFor="botName" className="block mb-2 font-medium">
                AI Assistant Name (optional)
              </label>
              <input
                id="botName"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., AcmeBot"
                {...register("botName")}
              />
            </div>

            <div className="mb-4 md:mb-0">
              <label htmlFor="tone" className="block mb-2 font-medium">
                Desired Tone <span className="text-red-600">*</span>
              </label>
              <select
                id="tone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("tone", { required: "Tone is required" })}
              >
                <option value="">Select a tone</option>
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
                <option value="technical">Technical</option>
                <option value="formal">Formal</option>
                <option value="empathetic">Empathetic</option>
                <option value="authoritative">Authoritative</option>
                <option value="humorous">Humorous</option>
              </select>
              {errors.tone && <p className="mt-1 text-sm text-red-600">{errors.tone.message}</p>}
            </div>
          </div>

          <div className="md:grid md:grid-cols-2 md:gap-6">
            <div className="mb-4 md:mb-0">
              <label htmlFor="audience" className="block mb-2 font-medium">
                Target Audience <span className="text-red-600">*</span>
              </label>
              <input
                id="audience"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Technical professionals, Students, General public"
                {...register("audience", { required: "Target audience is required" })}
              />
              {errors.audience && <p className="mt-1 text-sm text-red-600">{errors.audience.message}</p>}
            </div>

            <div className="mb-4 md:mb-0">
              <label htmlFor="topicExpertise" className="block mb-2 font-medium">
                Topic Expertise (optional)
              </label>
              <input
                id="topicExpertise"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Marketing, Software Development, Healthcare"
                {...register("topicExpertise")}
              />
            </div>
          </div>

          <div className="md:grid md:grid-cols-1 md:gap-6">
            <div className="mb-4 md:mb-0">
              <label htmlFor="responseLength" className="block mb-2 font-medium">
                Preferred Response Length (optional)
              </label>
              <select
                id="responseLength"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("responseLength")}
              >
                <option value="">Select preferred length</option>
                <option value="concise">Concise (1-2 sentences)</option>
                <option value="brief">Brief (1-2 paragraphs)</option>
                <option value="detailed">Detailed (Multiple paragraphs)</option>
                <option value="comprehensive">Comprehensive (In-depth analysis)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="specificInstructions" className="block mb-2 font-medium">
              Specific Instructions (optional)
            </label>
            <textarea
              id="specificInstructions"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Always provide 3 examples, Include references, Follow step-by-step format"
              {...register("specificInstructions")}
            ></textarea>
          </div>

          <div>
            <label htmlFor="exampleScenarios" className="block mb-2 font-medium">
              Example Scenarios (optional)
            </label>
            <textarea
              id="exampleScenarios"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe example scenarios or questions your AI might encounter"
              {...register("exampleScenarios")}
            ></textarea>
          </div>

          <div>
            <label htmlFor="avoidTopics" className="block mb-2 font-medium">
              Topics to Avoid (optional)
            </label>
            <textarea
              id="avoidTopics"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Political opinions, Medical advice, Competitor products"
              {...register("avoidTopics")}
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
              disabled={isLoading}
            >
              Generate AI Prompt
            </button>
          </div>
        </form>
      )}
    </div>
  );
}