import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BandScoreExplanation } from "@/components/band-score-explanation"

export default function RubricsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-6">IELTS Writing Assessment Criteria</h1>

      <Tabs defaultValue="task1" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="task1">Task 1 Criteria</TabsTrigger>
          <TabsTrigger value="task2">Task 2 Criteria</TabsTrigger>
        </TabsList>

        <TabsContent value="task1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task 1 Overview</CardTitle>
              <CardDescription>
                IELTS Writing Task 1 requires you to describe information presented in a graph, table, chart, or
                diagram.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                You should spend about 20 minutes on this task. You need to write at least 150 words, and you will be
                assessed on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Task Achievement: How well you address all parts of the task with relevant, fully extended ideas
                </li>
                <li>
                  Coherence and Cohesion: How well you organize information logically with appropriate paragraphing
                </li>
                <li>Lexical Resource: Your range of vocabulary and accuracy in word choice</li>
                <li>Grammatical Range and Accuracy: Your range of sentence structures and grammatical accuracy</li>
              </ul>
            </CardContent>
          </Card>

          <BandScoreExplanation taskType="task1" />
        </TabsContent>

        <TabsContent value="task2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task 2 Overview</CardTitle>
              <CardDescription>
                IELTS Writing Task 2 requires you to write an essay in response to a point of view, argument, or
                problem.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                You should spend about 40 minutes on this task. You need to write at least 250 words, and you will be
                assessed on:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Task Response: How well you address all parts of the task with a clear position throughout</li>
                <li>
                  Coherence and Cohesion: How well you organize information with clear progression and appropriate
                  paragraphing
                </li>
                <li>Lexical Resource: Your range of vocabulary and accuracy in word choice</li>
                <li>Grammatical Range and Accuracy: Your range of sentence structures and grammatical accuracy</li>
              </ul>
            </CardContent>
          </Card>

          <BandScoreExplanation taskType="task2" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
