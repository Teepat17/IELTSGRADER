import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: NextRequest) {
  try {
    const prompt = `
You are an expert IELTS examiner. Generate 5 different IELTS Writing Task 2 essay topics.
Each topic should be:
1. Current and relevant
2. Suitable for academic discussion
3. Clear and specific
4. Challenging enough for IELTS candidates

Format your response as JSON with the following structure:
{
  "topics": [
    {
      "topic": "string",
      "type": "string (discuss both views, agree/disagree, advantages/disadvantages, problem/solution)",
      "instructions": "string (specific instructions for the essay)"
    }
  ]
}
`

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
    try {
      const { text } = await generateText({
        model: google("gemini-2.0-flash", { apiKey }),
        prompt: prompt,
      })
      
      // Extract JSON from the response
      let jsonStart = text.indexOf('{')
      let jsonEnd = text.lastIndexOf('}')
      let jsonString = (jsonStart !== -1 && jsonEnd !== -1) ? text.substring(jsonStart, jsonEnd + 1) : text
      
      try {
        const result = JSON.parse(jsonString)
        // Select a random topic from the generated ones
        const randomTopic = result.topics[Math.floor(Math.random() * result.topics.length)]
        return NextResponse.json(randomTopic)
      } catch (e) {
        console.error("Error parsing AI response:", e, "Raw response:", text)
        return NextResponse.json({ error: "Failed to parse topic generation result from Gemini.", raw: text }, { status: 500 })
      }
    } catch (error) {
      console.error("Error generating text with Gemini:", error)
      return NextResponse.json({ error: "Failed to generate topics with Gemini API." }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 })
  }
} 