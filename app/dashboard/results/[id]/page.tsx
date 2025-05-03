"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, FileText } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface GradingResult {
  is_off_topic?: boolean;
  overallScore: number;
    criteria: {
    taskResponse: { score: number; feedback: string };
    coherenceAndCohesion: { score: number; feedback: string };
    lexicalResource: { score: number; feedback: string };
    grammaticalRangeAndAccuracy: { score: number; feedback: string };
  };
  strengths: string[];
  areasForImprovement: string[];
}

const getBandDescriptor = (criterion: string, score: number) => {
  const descriptors: Record<string, Record<number, string>> = {
    taskResponse: {
      9: "Fully addresses all parts of the task; presents a fully developed position in answer to the question with relevant, fully extended and well supported ideas",
      8: "Sufficiently addresses all parts of the task; presents a well-developed response to the question with relevant, extended and supported ideas",
      7: "Addresses all parts of the task; presents a clear position throughout the response; presents, extends and supports main ideas, but there may be a tendency to over-generalize and/or supporting ideas may lack focus",
      6: "Addresses all parts of the task although some parts may be more fully covered than others; presents a relevant position although the conclusions may become unclear or repetitive; presents relevant main ideas but some may be inadequately developed/unclear",
      5: "Addresses the task only partially; expresses a position but the development is not always clear and there may be no conclusions drawn; presents some main ideas but these are limited and not sufficiently developed; there may be irrelevant detail",
      4: "Responds to the task only in a minimal way or the answer is tangential; the position may be unclear; presents few ideas, which are largely undeveloped or irrelevant",
      3: "Does not adequately address any part of the task; does not express a clear position; presents few ideas, which are largely undeveloped or irrelevant",
      2: "Barely responds to the task; does not express a position; may attempt to present one or two ideas but there is no development",
      1: "Answer is completely unrelated to the task",
      0: "Does not attend; does not attempt the task; writes a totally memorized response"
      },
      coherenceAndCohesion: {
      9: "Uses cohesion in such a way that it attracts no attention; skillfully manages paragraphing",
      8: "Sequences information and ideas logically; manages all aspects of cohesion well; uses paragraphing sufficiently and appropriately",
      7: "Logically organizes information and ideas with clear progression; uses a range of cohesive devices appropriately although there may be some under/over-use",
      6: "Arranges information and ideas coherently with clear overall progression; uses cohesive devices effectively, but cohesion within/between sentences may be faulty or mechanical; may not always use referencing clearly or appropriately",
      5: "Presents information with some organization but may lack overall progression; makes inadequate, inaccurate or over-use of cohesive devices; may be repetitive due to lack of referencing and substitution",
      4: "Presents information and ideas but these are not arranged coherently and there is no clear progression; uses some basic cohesive devices but these may be inaccurate or repetitive",
      3: "Does not organize ideas logically; may use a very limited range of cohesive devices, and those used may not indicate a logical relationship between ideas",
      2: "Has very little control of organizational features",
      1: "Fails to communicate any message",
      0: "Does not attend"
      },
      lexicalResource: {
      9: "Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'",
      8: "Uses a wide range of vocabulary fluently and flexibly to convey precise meanings; skillfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation; produces rare errors in spelling and/or word formation",
      7: "Uses a sufficient range of vocabulary to allow some flexibility and precision; uses less common lexical items with some awareness of style and collocation; may produce occasional errors in word choice, spelling and/or word formation",
      6: "Uses an adequate range of vocabulary for the task; attempts to use less common vocabulary but with some inaccuracy; makes some errors in spelling and/or word formation, but they do not impede communication",
      5: "Uses a limited range of vocabulary, but this is minimally adequate for the task; may make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader",
      4: "Uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task; has limited control of word formation and/or spelling; errors may cause strain for the reader",
      3: "Uses only a very limited range of words and expressions with very limited control of word formation and/or spelling; errors may severely distort the message",
      2: "Uses an extremely limited range of vocabulary; essentially no control of word formation and/or spelling",
      1: "Can only use a few isolated words",
      0: "Does not attend"
      },
      grammaticalRangeAndAccuracy: {
      9: "Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'",
      8: "Uses a wide range of structures; the majority of sentences are error-free; makes only very occasional errors or inappropriacies",
      7: "Uses a variety of complex structures; produces frequent error-free sentences; has good control of grammar and punctuation but may make a few errors",
      6: "Uses a mix of simple and complex sentence forms; makes some errors in grammar and punctuation but they rarely reduce communication",
      5: "Uses only a limited range of structures; attempts complex sentences but these tend to be less accurate than simple sentences; may make frequent grammatical errors and punctuation may be faulty; errors can cause some difficulty for the reader",
      4: "Uses only a very limited range of structures with only rare use of subordinate clauses; some structures are accurate but errors predominate, and punctuation is often faulty",
      3: "Attempts sentence forms but errors in grammar and punctuation predominate and distort the meaning",
      2: "Cannot use sentence forms except in memorized phrases",
      1: "Cannot use sentence forms at all",
      0: "Does not attend"
    }
  }

  return descriptors[criterion][score] || "No descriptor available"
}

export default function ResultPage() {
  const params = useParams()
  const [result, setResult] = useState<GradingResult | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/results?id=${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch result')
        }
        const data = await response.json()
        setResult(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load the grading result.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchResult()
  }, [params.id])

  const renderCriterionCard = (title: string, description: string, criterion: string, data: { score: number, feedback: string }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium">Band Score: {data.score}</h4>
          <div className="text-sm bg-muted p-3 rounded-lg">
            <p className="font-medium mb-1">Band {data.score} Descriptor:</p>
            <p>{getBandDescriptor(criterion, data.score)}</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Feedback:</h4>
          <p>{data.feedback}</p>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading || !result) {
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

      {result.is_off_topic && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Warning: Off-Topic Essay</p>
          <p>Your essay appears to be unrelated to the given topic. The scores below reflect this issue.</p>
        </div>
      )}

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

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Task Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{result.criteria.taskResponse.score}</div>
              </CardContent>
            </Card>

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
            <div className="text-3xl font-bold">{result.criteria.lexicalResource.score}</div>
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
          {renderCriterionCard(
            "Task Response",
            "How well you addressed the task",
            "taskResponse",
            result.criteria.taskResponse
          )}

          {renderCriterionCard(
            "Coherence & Cohesion",
            "How well your ideas are organized and connected",
            "coherenceAndCohesion",
            result.criteria.coherenceAndCohesion
          )}

          {renderCriterionCard(
            "Lexical Resource",
            "Your use of vocabulary",
            "lexicalResource",
            result.criteria.lexicalResource
          )}

          {renderCriterionCard(
            "Grammatical Range & Accuracy",
            "Your use of grammar",
            "grammaticalRangeAndAccuracy",
            result.criteria.grammaticalRangeAndAccuracy
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Strengths</CardTitle>
                <CardDescription>What you did well</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  {result.strengths.map((strength: string, index: number) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
                <CardDescription>What you can work on</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  {result.areasForImprovement.map((area: string, index: number) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="submission">
          <Card>
            <CardHeader>
              <CardTitle>Your Essay</CardTitle>
              <CardDescription>The essay that was graded</CardDescription>
            </CardHeader>
            <CardContent className="prose max-w-none space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Topic:</h4>
                <p>{result.topic}</p>
                <h4 className="font-medium mb-2 mt-4">Instructions:</h4>
                <p>{result.instructions}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Your Response:</h4>
                <p className="whitespace-pre-wrap">{result.essayText}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
