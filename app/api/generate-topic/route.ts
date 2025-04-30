import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: NextRequest) {
  try {
    const { taskType } = await req.json()
    
    const prompt = `
Generate a unique IELTS Writing ${taskType === "task1" ? "Task 1" : "Task 2"} topic.

${
  taskType === "task1"
    ? `For Task 1, generate a data visualization topic with the following format:
    - A clear title describing the data type (e.g., "The chart below shows...")
    - A brief description of what the data represents
    - The data visualization type (bar chart, line graph, pie chart, table, etc.)
    - A clear time period or context
    
    Example format:
    "The chart below shows the percentage of households with internet access in three different countries from 2000 to 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant."`
    : `For Task 2, generate an essay topic with the following format:
    - A clear question or statement
    - A specific context or situation
    - A clear instruction on what to discuss
    
    Example format:
    "Some people believe that the government should provide free housing for everyone who cannot afford their own home. To what extent do you agree or disagree with this statement? Give reasons for your answer and include any relevant examples from your own knowledge or experience."`
}

Generate a unique topic that:
1. Is clear and specific
2. Is appropriate for IELTS level
3. Has not been used in recent official IELTS exams
4. Is culturally neutral and accessible to all test takers

Format your response as JSON with the following structure:
{
  "topic": "string",
  "type": "string",
  "instructions": "string"
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
        return NextResponse.json(result)
      } catch (e) {
        console.error("Error parsing AI response:", e, "Raw response:", text)
        return NextResponse.json({ error: "Failed to parse topic generation result." }, { status: 500 })
      }
    } catch (error) {
      console.error("Error generating topic with Gemini:", error)
      return NextResponse.json({ error: "Failed to generate topic with Gemini API." }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 })
  }
} 