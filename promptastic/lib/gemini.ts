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
You are an AI assistant that generates system prompts for developers. Your goal is to create clear, structured, and optimized prompts based on the provided details. Responses must be direct and relevant to the prompt requirements. Do not include greetings, unnecessary introductions, or formatting such as "Hey" or "Bot:". Additionally, any prompt you generate should explicitly instruct the AI to avoid greetings, introductions, or adding labels like "Bot:" before responses. Ensure the generated prompt is clear, concise, and strictly follows the given details.
 
You should use the following information:
 
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
 
Your response should begin with 'You are a...' (only the system prompt, and nothing else), and should contain only plain-text (no special characters or bolding of headings etc).
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