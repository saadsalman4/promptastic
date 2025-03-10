'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import type { PromptFormData } from '../lib/gemini';
import './styles.css'; // Import the CSS file

interface PromptFormProps {
  onSubmit: (data: PromptFormData) => void;
  isLoading: boolean;
}

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PromptFormData>();

  return (
    <div className="form-container">
      <h2 className="form-title">Generate Your AI Prompt</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="purpose" className="form-label">
            What is this AI prompt for? <span className="required">*</span>
          </label>
          <select
            id="purpose"
            className="form-input"
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
          {errors.purpose && <p className="error-message">{errors.purpose.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="orgName" className="form-label">
            Organization Name <span className="required">*</span>
          </label>
          <input
            id="orgName"
            type="text"
            className="form-input"
            placeholder="e.g., Acme Inc."
            {...register("orgName", { required: "Organization name is required" })}
          />
          {errors.orgName && <p className="error-message">{errors.orgName.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="botName" className="form-label">
            AI Assistant Name (optional)
          </label>
          <input
            id="botName"
            type="text"
            className="form-input"
            placeholder="e.g., AcmeBot"
            {...register("botName")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tone" className="form-label">
            Desired Tone <span className="required">*</span>
          </label>
          <select
            id="tone"
            className="form-input"
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
          {errors.tone && <p className="error-message">{errors.tone.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="audience" className="form-label">
            Target Audience <span className="required">*</span>
          </label>
          <input
            id="audience"
            type="text"
            className="form-input"
            placeholder="e.g., Technical professionals, Students, General public"
            {...register("audience", { required: "Target audience is required" })}
          />
          {errors.audience && <p className="error-message">{errors.audience.message}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="topicExpertise" className="form-label">
            Topic Expertise (optional)
          </label>
          <input
            id="topicExpertise"
            type="text"
            className="form-input"
            placeholder="e.g., Marketing, Software Development, Healthcare"
            {...register("topicExpertise")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="responseLength" className="form-label">
            Preferred Response Length (optional)
          </label>
          <select
            id="responseLength"
            className="form-input"
            {...register("responseLength")}
          >
            <option value="">Select preferred length</option>
            <option value="concise">Concise (1-2 sentences)</option>
            <option value="brief">Brief (1-2 paragraphs)</option>
            <option value="detailed">Detailed (Multiple paragraphs)</option>
            <option value="comprehensive">Comprehensive (In-depth analysis)</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="specificInstructions" className="form-label">
            Specific Instructions (optional)
          </label>
          <textarea
            id="specificInstructions"
            rows={3}
            className="form-input"
            placeholder="e.g., Always provide 3 examples, Include references, Follow step-by-step format"
            {...register("specificInstructions")}
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="exampleScenarios" className="form-label">
            Example Scenarios (optional)
          </label>
          <textarea
            id="exampleScenarios"
            rows={3}
            className="form-input"
            placeholder="Describe example scenarios or questions your AI might encounter"
            {...register("exampleScenarios")}
          ></textarea>
        </div>

        <div className="form-group full-width">
          <label htmlFor="avoidTopics" className="form-label">
            Topics to Avoid (optional)
          </label>
          <textarea
            id="avoidTopics"
            rows={2}
            className="form-input"
            placeholder="e.g., Political opinions, Medical advice, Competitor products"
            {...register("avoidTopics")}
          ></textarea>
        </div>

        <div className="form-group full-width">
          <button
            type="submit"
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Generate AI Prompt"}
          </button>
        </div>
      </form>
    </div>
  );
}