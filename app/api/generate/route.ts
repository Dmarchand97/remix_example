import { NextResponse } from 'next/server'
import { generateContent } from '@/lib/openai' // Ensure this path is correct

// Step 2: Ensure the POST function is exported correctly
export async function POST(request: Request) {
  const { content, platform } = await request.json()

  try {
    const generatedContent = await generateContent(content, platform)
    return NextResponse.json({ content: generatedContent })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 })
  }
}

// Step 4: Add a GET method to verify the route is working
export function GET() {
  const envVars = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY ? 'Set' : 'Not set',
    // Add any other relevant environment variables here
  }
  return NextResponse.json({ envVars })
}
