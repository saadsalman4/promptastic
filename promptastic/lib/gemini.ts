import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// Get the model (Gemini 1.5 Flash 8B)
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

export interface PromptFormData {
  purpose: string; // chatbot, content generation, etc.
  orgName: string;
  botName?: string;
  tone: string;
  audience: string;
  specificInstructions?: string;
  topicExpertise?: string;
  responseLength?: string;
  exampleScenarios?: string;
  avoidTopics?: string;
}

export async function generatePrompt(data: PromptFormData): Promise<string> {
  const prompt = `
You are a professional prompt engineer. Create a well-structured, detailed prompt for an AI assistant based on the following requirements:

PURPOSE: ${data.purpose}
ORGANIZATION: ${data.orgName}
${data.botName ? `BOT NAME: ${data.botName}` : ''}
TONE: ${data.tone}
TARGET AUDIENCE: ${data.audience}
${data.topicExpertise ? `TOPIC EXPERTISE: ${data.topicExpertise}` : ''}
${data.responseLength ? `PREFERRED RESPONSE LENGTH: ${data.responseLength}` : ''}
${data.specificInstructions ? `SPECIFIC INSTRUCTIONS: ${data.specificInstructions}` : ''}
${data.exampleScenarios ? `EXAMPLE SCENARIOS: ${data.exampleScenarios}` : ''}
${data.avoidTopics ? `TOPICS TO AVOID: ${data.avoidTopics}` : ''}

The prompt should include:
1. A clear introduction defining the AI's role and identity
2. Detailed instructions on how to respond to users
3. Tone and style guidelines
4. Topic boundaries (what to discuss and what to avoid)
5. Any specific formatting requirements
6. Example exchanges if applicable

Format the prompt in a clean, professional style that can be directly copied and used with an AI system.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedPrompt = response.text();
    return generatedPrompt;
  } catch (error) {
    console.error("Error generating prompt with Gemini:", error);
    throw new Error("Failed to generate prompt. Please try again later.");
  }
}