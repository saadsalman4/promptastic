import { NextResponse } from 'next/server';
import { generatePrompt, PromptFormData } from '@/lib/gemini';

// Define the same character limits used on the frontend
const CHARACTER_LIMITS = {
  orgName: 100,
  botName: 50,
  audience: 200,
  topicExpertise: 200,
  specificInstructions: 500,
  exampleScenarios: 800,
  avoidTopics: 300
};

// Validate form data against character limits
function validateFormData(data: PromptFormData): { valid: boolean; error?: string } {
  // Check required fields
  if (!data.purpose) return { valid: false, error: 'Purpose is required' };
  if (!data.orgName) return { valid: false, error: 'Organization name is required' };
  if (!data.tone) return { valid: false, error: 'Tone is required' };
  if (!data.audience) return { valid: false, error: 'Target audience is required' };

  // Check character limits
  if (data.orgName && data.orgName.length > CHARACTER_LIMITS.orgName) {
    return { valid: false, error: `Organization name exceeds maximum length of ${CHARACTER_LIMITS.orgName} characters` };
  }
  if (data.botName && data.botName.length > CHARACTER_LIMITS.botName) {
    return { valid: false, error: `Bot name exceeds maximum length of ${CHARACTER_LIMITS.botName} characters` };
  }
  if (data.audience && data.audience.length > CHARACTER_LIMITS.audience) {
    return { valid: false, error: `Audience exceeds maximum length of ${CHARACTER_LIMITS.audience} characters` };
  }
  if (data.topicExpertise && data.topicExpertise.length > CHARACTER_LIMITS.topicExpertise) {
    return { valid: false, error: `Topic expertise exceeds maximum length of ${CHARACTER_LIMITS.topicExpertise} characters` };
  }
  if (data.specificInstructions && data.specificInstructions.length > CHARACTER_LIMITS.specificInstructions) {
    return { valid: false, error: `Specific instructions exceed maximum length of ${CHARACTER_LIMITS.specificInstructions} characters` };
  }
  if (data.exampleScenarios && data.exampleScenarios.length > CHARACTER_LIMITS.exampleScenarios) {
    return { valid: false, error: `Example scenarios exceed maximum length of ${CHARACTER_LIMITS.exampleScenarios} characters` };
  }
  if (data.avoidTopics && data.avoidTopics.length > CHARACTER_LIMITS.avoidTopics) {
    return { valid: false, error: `Topics to avoid exceed maximum length of ${CHARACTER_LIMITS.avoidTopics} characters` };
  }

  return { valid: true };
}

export async function POST(request: Request) {
  try {
    const formData: PromptFormData = await request.json();
    
    // Validate the data
    const validation = validateFormData(formData);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation error', message: validation.error },
        { status: 400 }
      );
    }
    
    const prompt = await generatePrompt(formData);
    
    return NextResponse.json({ prompt });
  } catch (error) {
    console.error('Error in API handler:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate prompt', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}