import { NextResponse } from 'next/server';
import { generatePrompt, PromptFormData } from '@/lib/gemini';

export async function POST(request: Request) {
  try {
    const formData: PromptFormData = await request.json();
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