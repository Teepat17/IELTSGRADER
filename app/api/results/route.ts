import { type NextRequest, NextResponse } from "next/server"

// In a real application, this would be stored in a database
let results: Record<string, any> = {}

export async function POST(req: NextRequest) {
  try {
    const result = await req.json()
    const id = 'new' // In a real app, this would be a unique ID
    results[id] = {
      ...result,
      id,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
    return NextResponse.json({ id })
  } catch (error) {
    return NextResponse.json({ error: "Failed to store result" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: "Missing result ID" }, { status: 400 })
    }
    const result = results[id]
    if (!result) {
      return NextResponse.json({ error: "Result not found" }, { status: 404 })
    }
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve result" }, { status: 500 })
  }
} 