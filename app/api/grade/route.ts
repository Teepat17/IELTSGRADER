import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { google } from "@ai-sdk/google"
import Tesseract from "tesseract.js"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const taskType = formData.get("taskType") as string
    const inputType = formData.get("inputType") as "text" | "image"
    let essayText = ""

    if (inputType === "image") {
      const imageFile = formData.get("image") as File
      if (!imageFile) {
        return NextResponse.json({ error: "Missing image file" }, { status: 400 })
      }

      // Extract essay text from image using OCR
      try {
        const arrayBuffer = await imageFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const { data: { text } } = await Tesseract.recognize(buffer, "eng")
        essayText = text.trim()
      } catch (ocrError) {
        console.error("OCR extraction failed:", ocrError)
        return NextResponse.json({ error: "Failed to extract text from image." }, { status: 500 })
      }
    } else {
      essayText = formData.get("text") as string
      if (!essayText) {
        return NextResponse.json({ error: "Missing essay text" }, { status: 400 })
      }
    }

    if (!essayText) {
      return NextResponse.json({ error: "No text to grade." }, { status: 400 })
    }

    const prompt = `
You are an expert IELTS examiner. Grade the following IELTS Writing ${
  taskType === "task1" ? "Task 1" : "Task 2"
} essay.

Essay:
"""
${essayText}
"""

${
  taskType === "task1"
    ? `This is a Task 1 response describing a chart or graph.
    
    Please grade according to the official IELTS Writing Task 1 Band Descriptors:
    
    Task Achievement (Band 9-0):
    - Band 9: Fully satisfies all requirements; clearly presents a fully developed response
    - Band 8: Covers all requirements sufficiently; presents, highlights and illustrates key features/bullet points clearly and appropriately
    - Band 7: Covers the requirements; presents a clear overview of main trends/differences/stages; presents a clear purpose with consistent tone; clearly presents and highlights key features but could be more fully extended
    - Band 6: Addresses the requirements; presents an overview with information appropriately selected; presents a purpose that is generally clear but may have inconsistencies in tone; presents and adequately highlights key features but details may be irrelevant, inaccurate
    - Band 5: Generally addresses the task but format may be inappropriate; recounts detail mechanically with no clear overview; may present a purpose but it's unclear at times with variable tone; presents but inadequately covers key features with tendency to focus on details
    - Band 4: Attempts to address the task but doesn't cover key required points; may be inappropriate; fails to clearly explain the purpose of the letter; may confuse key features/bullet points with detail
    - Band 3: Fails to address the task; presents limited ideas which may be largely irrelevant/repetitive
    - Band 2: Answer is barely related to the task
    - Band 1: Answer is completely unrelated to the task
    - Band 0: Does not attend; does not attempt the task; writes a totally memorized response
    
    Coherence and Cohesion (Band 9-0):
    - Band 9: Uses cohesion in such a way that it attracts no attention; skillfully manages paragraphing
    - Band 8: Sequences information and ideas logically; manages all aspects of cohesion well; uses paragraphing sufficiently and appropriately
    - Band 7: Logically organizes information and ideas with clear progression; uses a range of cohesive devices appropriately although there may be some under/over-use
    - Band 6: Arranges information and ideas coherently with clear overall progression; uses cohesive devices effectively, but cohesion within/between sentences may be faulty or mechanical; may not always use referencing clearly or appropriately
    - Band 5: Presents information with some organization but may lack overall progression; makes inadequate, inaccurate or over-use of cohesive devices; may be repetitive due to lack of referencing and substitution
    - Band 4: Presents information and ideas but these are not arranged coherently and there is no clear progression; uses some basic cohesive devices but these may be inaccurate or repetitive
    - Band 3: Does not organize ideas logically; may use a very limited range of cohesive devices, and those used may not indicate a logical relationship between ideas
    - Band 2: Has very little control of organizational features
    - Band 1: Fails to communicate any message
    - Band 0: Does not attend
    
    Lexical Resource (Band 9-0):
    - Band 9: Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'
    - Band 8: Uses a wide range of vocabulary fluently and flexibly to convey precise meanings; skillfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation; produces rare errors in spelling and/or word formation
    - Band 7: Uses a sufficient range of vocabulary to allow some flexibility and precision; uses less common lexical items with some awareness of style and collocation; may produce occasional errors in word choice, spelling and/or word formation
    - Band 6: Uses an adequate range of vocabulary for the task; attempts to use less common vocabulary but with some inaccuracy; makes some errors in spelling and/or word formation, but they do not impede communication
    - Band 5: Uses a limited range of vocabulary, but this is minimally adequate for the task; may make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader
    - Band 4: Uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task; has limited control of word formation and/or spelling; errors may cause strain for the reader
    - Band 3: Uses only a very limited range of words and expressions with very limited control of word formation and/or spelling; errors may severely distort the message
    - Band 2: Uses an extremely limited range of vocabulary; essentially no control of word formation and/or spelling
    - Band 1: Can only use a few isolated words
    - Band 0: Does not attend
    
    Grammatical Range and Accuracy (Band 9-0):
    - Band 9: Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'
    - Band 8: Uses a wide range of structures; the majority of sentences are error-free; makes only very occasional errors or inappropriacies
    - Band 7: Uses a variety of complex structures; produces frequent error-free sentences; has good control of grammar and punctuation but may make a few errors
    - Band 6: Uses a mix of simple and complex sentence forms; makes some errors in grammar and punctuation but they rarely reduce communication
    - Band 5: Uses only a limited range of structures; attempts complex sentences but these tend to be less accurate than simple sentences; may make frequent grammatical errors and punctuation may be faulty; errors can cause some difficulty for the reader
    - Band 4: Uses only a very limited range of structures with only rare use of subordinate clauses; some structures are accurate but errors predominate, and punctuation is often faulty
    - Band 3: Attempts sentence forms but errors in grammar and punctuation predominate and distort the meaning
    - Band 2: Cannot use sentence forms except in memorized phrases
    - Band 1: Cannot use sentence forms at all
    - Band 0: Does not attend`
    : "This is a Task 2 essay response to a given topic."
}

Provide a detailed assessment based on the official IELTS marking criteria:
${
  taskType === "task1"
    ? "- Task Achievement\n- Coherence and Cohesion\n- Lexical Resource\n- Grammatical Range and Accuracy"
    : "- Task Response\n- Coherence and Cohesion\n- Lexical Resource\n- Grammatical Range and Accuracy"
}

For each criterion, provide a band score (0-9) and detailed feedback.
Also include an overall band score, strengths, and areas for improvement.

Format your response as JSON with the following structure:
{
  "overallScore": number,
  "criteria": {
    ${
      taskType === "task1"
        ? '"taskAchievement": { "score": number, "feedback": "string" },'
        : '"taskResponse": { "score": number, "feedback": "string" },'
    }
    "coherenceAndCohesion": { "score": number, "feedback": "string" },
    "lexicalResource": { "score": number, "feedback": "string" },
    "grammaticalRangeAndAccuracy": { "score": number, "feedback": "string" }
  },
  "strengths": ["string", "string", "string"],
  "areasForImprovement": ["string", "string", "string"]
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
        return NextResponse.json({ error: "Failed to parse grading result from Gemini.", raw: text }, { status: 500 })
      }
    } catch (error) {
      console.error("Error generating text with Gemini:", error)
      return NextResponse.json({ error: "Failed to grade essay with Gemini API." }, { status: 500 })
    }
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "Failed to process the request" }, { status: 500 })
  }
}
