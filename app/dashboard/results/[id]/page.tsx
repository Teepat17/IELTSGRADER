"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText } from "lucide-react"

// Mock data for the result
const mockResults = {
  task1: {
    id: "new",
    type: "Task 1",
    date: "April 29, 2025",
    overallScore: 6.5,
    criteria: {
      taskAchievement: {
        score: 6,
        feedback:
          "You have covered the main features of the chart, but some key trends are not fully developed. The overview is present but could be more comprehensive.",
      },
      coherenceAndCohesion: {
        score: 7,
        feedback:
          "Your essay has a clear structure with good use of cohesive devices. Paragraphing is logical, though some transitions between ideas could be smoother.",
      },
      lexicalResource: {
        score: 6,
        feedback:
          "You use a sufficient range of vocabulary with some less common items. There are occasional errors in word choice and spelling that do not impede communication.",
      },
      grammaticalRangeAndAccuracy: {
        score: 7,
        feedback:
          "You use a variety of complex structures with good control. There are some errors in grammar and punctuation, but they rarely reduce communication.",
      },
    },
    strengths: [
      "Clear overview of the main trends",
      "Good use of data to support descriptions",
      "Appropriate use of comparison language",
    ],
    areasForImprovement: [
      "Include more specific data points from the chart",
      "Expand your vocabulary for describing trends",
      "Pay attention to article usage",
    ],
    sampleImage: "/placeholder.svg?height=400&width=600",
  },
  task2: {
    id: "new",
    type: "Task 2",
    date: "April 29, 2025",
    overallScore: 7.0,
    criteria: {
      taskResponse: {
        score: 7,
        feedback:
          "You address all parts of the task and present a clear position throughout. Your ideas are relevant but some supporting ideas could be more fully extended.",
      },
      coherenceAndCohesion: {
        score: 7,
        feedback:
          "Your essay is well-organized with clear progression throughout. You use a range of cohesive devices appropriately, though there is occasional overuse.",
      },
      lexicalResource: {
        score: 7,
        feedback:
          "You use a sufficient range of vocabulary for the task. There are some errors in word choice and spelling, but they do not impede communication.",
      },
      grammaticalRangeAndAccuracy: {
        score: 7,
        feedback:
          "You use a variety of complex structures. There are some errors in grammar and punctuation, but they rarely reduce communication.",
      },
    },
    strengths: [
      "Clear position that is consistently maintained",
      "Well-developed main ideas with relevant examples",
      "Good paragraph structure with clear topic sentences",
    ],
    areasForImprovement: [
      "Develop supporting ideas more fully",
      "Vary your sentence structures more",
      "Pay attention to article usage and prepositions",
    ],
    sampleImage: "/placeholder.svg?height=400&width=600",
  },
}

export default function ResultPage() {
  const params = useParams()
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    // In a real app, you would fetch the result from an API
    // For this demo, we'll use mock data
    const id = params.id
    if (id === "new") {
      // For demo purposes, randomly choose task1 or task2
      const taskType = Math.random() > 0.5 ? "task1" : "task2"
      setResult(mockResults[taskType as keyof typeof mockResults])
    } else {
      // For existing results, we would fetch from an API
      // For now, just use task1 as a fallback
      setResult(mockResults.task1)
    }
  }, [params.id])

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Loading result...</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">IELTS Writing {result.type} Result</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Band Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{result.overallScore}</div>
            <p className="text-xs text-muted-foreground">Graded on {result.date}</p>
          </CardContent>
        </Card>

        {result.type === "Task 1" ? (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Task Achievement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{result.criteria.taskAchievement.score}</div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Task Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{result.criteria.taskResponse.score}</div>
              </CardContent>
            </Card>
          </>
        )}

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Coherence & Cohesion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{result.criteria.coherenceAndCohesion.score}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Lexical Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {result.type === "Task 1" ? result.criteria.lexicalResource.score : result.criteria.lexicalResource.score}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Grammatical Range & Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{result.criteria.grammaticalRangeAndAccuracy.score}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feedback" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feedback">Detailed Feedback</TabsTrigger>
          <TabsTrigger value="submission">Your Submission</TabsTrigger>
        </TabsList>
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Assessment</CardTitle>
              <CardDescription>Breakdown of your performance in each criterion</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.type === "Task 1" ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">
                      Task Achievement (Band {result.criteria.taskAchievement.score})
                    </h3>
                    <div className="mb-2 text-xs bg-muted p-2 rounded">
                      <p className="font-medium">Band {result.criteria.taskAchievement.score} Descriptor:</p>
                      {result.criteria.taskAchievement.score === 9 && (
                        <p>
                          Fully satisfies all the requirements of the task; clearly presents a fully developed response
                        </p>
                      )}
                      {result.criteria.taskAchievement.score === 8 && (
                        <p>
                          Covers all requirements of the task sufficiently; presents, highlights and illustrates key
                          features/bullet points clearly and appropriately
                        </p>
                      )}
                      {result.criteria.taskAchievement.score === 7 && (
                        <p>
                          Covers the requirements of the task; presents a clear overview of main trends, differences or
                          stages; presents a clear purpose, with the tone consistent and appropriate; clearly presents
                          and highlights key features/bullet points but could be more fully extended
                        </p>
                      )}
                      {result.criteria.taskAchievement.score === 6 && (
                        <p>
                          Addresses the requirements of the task; presents an overview with information appropriately
                          selected; presents a purpose that is generally clear; there may be inconsistencies in tone;
                          presents and adequately highlights key features/bullet points but details may be irrelevant,
                          inaccurate
                        </p>
                      )}
                      {result.criteria.taskAchievement.score === 5 && (
                        <p>
                          Generally addresses the task; the format may be inappropriate in places; recounts detail
                          mechanically with no clear overview; there may be no data to support the description; may
                          present a purpose for the letter that is unclear at times; the tone may be variable and
                          sometimes inappropriate; presents, but inadequately covers, key features/bullet points; there
                          may be a tendency to focus on details
                        </p>
                      )}
                      {result.criteria.taskAchievement.score <= 4 && (
                        <p>
                          Attempts to address the task but does not cover all key features/bullet points; the format may
                          be inappropriate; fails to clearly explain the purpose of the letter; the tone may be
                          inappropriate; may confuse key features/bullet points with detail; parts may be unclear,
                          irrelevant, repetitive or inaccurate
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{result.criteria.taskAchievement.feedback}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">
                      Coherence and Cohesion (Band {result.criteria.coherenceAndCohesion.score})
                    </h3>
                    <div className="mb-2 text-xs bg-muted p-2 rounded">
                      <p className="font-medium">Band {result.criteria.coherenceAndCohesion.score} Descriptor:</p>
                      {result.criteria.coherenceAndCohesion.score === 9 && (
                        <p>
                          Uses cohesion in such a way that it attracts no attention; skillfully manages paragraphing
                        </p>
                      )}
                      {result.criteria.coherenceAndCohesion.score === 8 && (
                        <p>
                          Sequences information and ideas logically; manages all aspects of cohesion well; uses
                          paragraphing sufficiently and appropriately
                        </p>
                      )}
                      {result.criteria.coherenceAndCohesion.score === 7 && (
                        <p>
                          Logically organises information and ideas; there is clear progression throughout; uses a range
                          of cohesive devices appropriately although there may be some under-/over-use
                        </p>
                      )}
                      {result.criteria.coherenceAndCohesion.score === 6 && (
                        <p>
                          Arranges information and ideas coherently and there is a clear overall progression; uses
                          cohesive devices effectively, but cohesion within and/or between sentences may be faulty or
                          mechanical; may not always use referencing clearly or appropriately
                        </p>
                      )}
                      {result.criteria.coherenceAndCohesion.score === 5 && (
                        <p>
                          Presents information with some organisation but there may be a lack of overall progression;
                          makes inadequate, inaccurate or over-use of cohesive devices; may be repetitive because of
                          lack of referencing and substitution
                        </p>
                      )}
                      {result.criteria.coherenceAndCohesion.score <= 4 && (
                        <p>
                          Presents information and ideas but these are not arranged coherently and there is no clear
                          progression in the response; uses some basic cohesive devices but these may be inaccurate or
                          repetitive
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{result.criteria.coherenceAndCohesion.feedback}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">
                      Lexical Resource (Band {result.criteria.lexicalResource.score})
                    </h3>
                    <div className="mb-2 text-xs bg-muted p-2 rounded">
                      <p className="font-medium">Band {result.criteria.lexicalResource.score} Descriptor:</p>
                      {result.criteria.lexicalResource.score === 9 && (
                        <p>
                          Uses a wide range of vocabulary with very natural and sophisticated control of lexical
                          features; rare minor errors occur only as 'slips'
                        </p>
                      )}
                      {result.criteria.lexicalResource.score === 8 && (
                        <p>
                          Uses a wide range of vocabulary fluently and flexibly to convey precise meanings; skillfully
                          uses uncommon lexical items but there may be occasional inaccuracies in word choice and
                          collocation; produces rare errors in spelling and/or word formation
                        </p>
                      )}
                      {result.criteria.lexicalResource.score === 7 && (
                        <p>
                          Uses a sufficient range of vocabulary to allow some flexibility and precision; uses less
                          common lexical items with some awareness of style and collocation; may produce occasional
                          errors in word choice, spelling and/or word formation
                        </p>
                      )}
                      {result.criteria.lexicalResource.score === 6 && (
                        <p>
                          Uses an adequate range of vocabulary for the task; attempts to use less common vocabulary but
                          with some inaccuracy; makes some errors in spelling and/or word formation, but they do not
                          impede communication
                        </p>
                      )}
                      {result.criteria.lexicalResource.score === 5 && (
                        <p>
                          Uses a limited range of vocabulary, but this is minimally adequate for the task; may make
                          noticeable errors in spelling and/or word formation that may cause some difficulty for the
                          reader
                        </p>
                      )}
                      {result.criteria.lexicalResource.score <= 4 && (
                        <p>
                          Uses only basic vocabulary which may be used repetitively or which may be inappropriate for
                          the task; has limited control of word formation and/or spelling; errors may cause strain for
                          the reader
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{result.criteria.lexicalResource.feedback}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">
                      Grammatical Range and Accuracy (Band {result.criteria.grammaticalRangeAndAccuracy.score})
                    </h3>
                    <div className="mb-2 text-xs bg-muted p-2 rounded">
                      <p className="font-medium">
                        Band {result.criteria.grammaticalRangeAndAccuracy.score} Descriptor:
                      </p>
                      {result.criteria.grammaticalRangeAndAccuracy.score === 9 && (
                        <p>
                          Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur
                          only as 'slips'
                        </p>
                      )}
                      {result.criteria.grammaticalRangeAndAccuracy.score === 8 && (
                        <p>
                          Uses a wide range of structures; the majority of sentences are error-free; makes only very
                          occasional errors or inappropriacies
                        </p>
                      )}
                      {result.criteria.grammaticalRangeAndAccuracy.score === 7 && (
                        <p>
                          Uses a variety of complex structures; produces frequent error-free sentences; has good control
                          of grammar and punctuation but may make a few errors
                        </p>
                      )}
                      {result.criteria.grammaticalRangeAndAccuracy.score === 6 && (
                        <p>
                          Uses a mix of simple and complex sentence forms; makes some errors in grammar and punctuation
                          but they rarely reduce communication
                        </p>
                      )}
                      {result.criteria.grammaticalRangeAndAccuracy.score === 5 && (
                        <p>
                          Uses only a limited range of structures; attempts complex sentences but these tend to be less
                          accurate than simple sentences; may make frequent grammatical errors and punctuation may be
                          faulty; errors can cause some difficulty for the reader
                        </p>
                      )}
                      {result.criteria.grammaticalRangeAndAccuracy.score <= 4 && (
                        <p>
                          Uses only a very limited range of structures with only rare use of subordinate clauses; some
                          structures are accurate but errors predominate, and punctuation is often faulty
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {result.criteria.grammaticalRangeAndAccuracy.feedback}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Task Response (Band {result.criteria.taskResponse.score})</h3>
                    <p className="text-sm text-muted-foreground">{result.criteria.taskResponse.feedback}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">
                      Coherence and Cohesion (Band {result.criteria.coherenceAndCohesion.score})
                    </h3>
                    <p className="text-sm text-muted-foreground">{result.criteria.coherenceAndCohesion.feedback}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">
                      Lexical Resource (Band {result.criteria.lexicalResource.score})
                    </h3>
                    <p className="text-sm text-muted-foreground">{result.criteria.lexicalResource.feedback}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">
                      Grammatical Range and Accuracy (Band {result.criteria.grammaticalRangeAndAccuracy.score})
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {result.criteria.grammaticalRangeAndAccuracy.feedback}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.areasForImprovement.map((area: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mt-0.5">
                        !
                      </div>
                      <span className="text-sm">{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="submission">
          <Card>
            <CardHeader>
              <CardTitle>Your Submission</CardTitle>
              <CardDescription>The image of your IELTS Writing {result.type} that was graded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <img
                  src={result.sampleImage || "/placeholder.svg"}
                  alt={`IELTS Writing ${result.type} Submission`}
                  className="w-full object-contain"
                />
              </div>
              <div className="flex justify-center mt-4">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Image
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
