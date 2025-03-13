'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { PromptFormData } from '../lib/gemini';
import lottie from 'lottie-web';

interface PromptFormProps {
  onSubmit: (data: PromptFormData) => void;
  isLoading: boolean;
}

// Define character limits for text fields
const CHARACTER_LIMITS = {
  orgName: 100,
  botName: 50,
  audience: 200,
  topicExpertise: 200,
  specificInstructions: 500,
  exampleScenarios: 800,
  avoidTopics: 300
};

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<PromptFormData>();
  const lottieContainer = useRef<HTMLDivElement>(null);
  
  // Track character counts for textarea fields
  const specificInstructionsValue = watch("specificInstructions") || "";
  const exampleScenariosValue = watch("exampleScenarios") || "";
  const avoidTopicsValue = watch("avoidTopics") || "";
  
  useEffect(() => {
    if (isLoading && lottieContainer.current) {
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
      <h2 className="text-xl font-semibold mb-4">Generate Your AI System Prompt</h2>
      
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
                maxLength={CHARACTER_LIMITS.orgName}
                {...register("orgName", { 
                  required: "Organization name is required",
                  maxLength: {
                    value: CHARACTER_LIMITS.orgName,
                    message: `Maximum ${CHARACTER_LIMITS.orgName} characters allowed`
                  }
                })}
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
                maxLength={CHARACTER_LIMITS.botName}
                {...register("botName", {
                  maxLength: {
                    value: CHARACTER_LIMITS.botName,
                    message: `Maximum ${CHARACTER_LIMITS.botName} characters allowed`
                  }
                })}
              />
              {errors.botName && <p className="mt-1 text-sm text-red-600">{errors.botName.message}</p>}
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
                maxLength={CHARACTER_LIMITS.audience}
                {...register("audience", { 
                  required: "Target audience is required",
                  maxLength: {
                    value: CHARACTER_LIMITS.audience,
                    message: `Maximum ${CHARACTER_LIMITS.audience} characters allowed`
                  }
                })}
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
                maxLength={CHARACTER_LIMITS.topicExpertise}
                {...register("topicExpertise", {
                  maxLength: {
                    value: CHARACTER_LIMITS.topicExpertise,
                    message: `Maximum ${CHARACTER_LIMITS.topicExpertise} characters allowed`
                  }
                })}
              />
              {errors.topicExpertise && <p className="mt-1 text-sm text-red-600">{errors.topicExpertise.message}</p>}
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
              maxLength={CHARACTER_LIMITS.specificInstructions}
              {...register("specificInstructions", {
                maxLength: {
                  value: CHARACTER_LIMITS.specificInstructions,
                  message: `Maximum ${CHARACTER_LIMITS.specificInstructions} characters allowed`
                }
              })}
            ></textarea>
            <div className="mt-1 text-sm text-gray-500 flex justify-end">
              {specificInstructionsValue.length}/{CHARACTER_LIMITS.specificInstructions}
            </div>
            {errors.specificInstructions && (
              <p className="mt-1 text-sm text-red-600">{errors.specificInstructions.message}</p>
            )}
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
              maxLength={CHARACTER_LIMITS.exampleScenarios}
              {...register("exampleScenarios", {
                maxLength: {
                  value: CHARACTER_LIMITS.exampleScenarios,
                  message: `Maximum ${CHARACTER_LIMITS.exampleScenarios} characters allowed`
                }
              })}
            ></textarea>
            <div className="mt-1 text-sm text-gray-500 flex justify-end">
              {exampleScenariosValue.length}/{CHARACTER_LIMITS.exampleScenarios}
            </div>
            {errors.exampleScenarios && (
              <p className="mt-1 text-sm text-red-600">{errors.exampleScenarios.message}</p>
            )}
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
              maxLength={CHARACTER_LIMITS.avoidTopics}
              {...register("avoidTopics", {
                maxLength: {
                  value: CHARACTER_LIMITS.avoidTopics,
                  message: `Maximum ${CHARACTER_LIMITS.avoidTopics} characters allowed`
                }
              })}
            ></textarea>
            <div className="mt-1 text-sm text-gray-500 flex justify-end">
              {avoidTopicsValue.length}/{CHARACTER_LIMITS.avoidTopics}
            </div>
            {errors.avoidTopics && (
              <p className="mt-1 text-sm text-red-600">{errors.avoidTopics.message}</p>
            )}
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