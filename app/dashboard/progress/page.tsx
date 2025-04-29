"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart } from "lucide-react"

// Mock data for the charts
const mockScoreData = [
  { date: "Jan 15", task1: 5.5, task2: 6.0, overall: 5.5 },
  { date: "Feb 2", task1: 6.0, task2: 6.0, overall: 6.0 },
  { date: "Feb 20", task1: 6.0, task2: 6.5, overall: 6.5 },
  { date: "Mar 10", task1: 6.5, task2: 6.5, overall: 6.5 },
  { date: "Mar 28", task1: 6.5, task2: 7.0, overall: 7.0 },
  { date: "Apr 15", task1: 7.0, task2: 7.0, overall: 7.0 },
]

const mockCriteriaData = [
  { name: "Task Achievement", score: 6.5 },
  { name: "Coherence & Cohesion", score: 7.0 },
  { name: "Lexical Resource", score: 6.5 },
  { name: "Grammatical Range", score: 7.0 },
]

export default function ProgressPage() {
  const [period, setPeriod] = useState("6m")
  const [chartType, setChartType] = useState("line")

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Your Progress</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center border rounded-md">
            <Button
              variant={chartType === "line" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setChartType("line")}
              className="rounded-r-none"
            >
              <LineChart className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "bar" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setChartType("bar")}
              className="rounded-none border-l border-r"
            >
              <BarChart className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "pie" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setChartType("pie")}
              className="rounded-l-none"
            >
              <PieChart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="task1">Task 1</TabsTrigger>
          <TabsTrigger value="task2">Task 2</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Overall Band Score Progress</CardTitle>
              <CardDescription>Track your IELTS writing score improvement over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {mockScoreData.length > 0 ? (
                  <div className="w-full h-full">
                    {/* This is a placeholder for the chart */}
                    <div className="w-full h-full bg-muted/20 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Chart visualization would appear here</p>
                      </div>
                      {/* Simulate a line chart */}
                      <div className="absolute bottom-0 left-0 right-0 h-[200px] flex items-end px-4">
                        {mockScoreData.map((data, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-2 bg-primary rounded-t"
                              style={{ height: `${(data.overall / 9) * 180}px` }}
                            ></div>
                            <span className="text-xs mt-2 text-muted-foreground">{data.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Not enough data to display progress. Submit at least 2 essays to see your progress.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Latest Assessment Breakdown</CardTitle>
                <CardDescription>Your most recent IELTS writing assessment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCriteriaData.map((criteria, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{criteria.name}</span>
                        <span className="text-sm font-bold">Band {criteria.score}</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(criteria.score / 9) * 100}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Improvement Areas</CardTitle>
                <CardDescription>Focus on these areas to improve your score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h3 className="font-medium text-amber-800 mb-2">Task Achievement</h3>
                    <p className="text-sm text-amber-700">
                      Work on developing a clearer overview of main trends and highlighting key features more
                      effectively.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">Lexical Resource</h3>
                    <p className="text-sm text-blue-700">
                      Expand your vocabulary for describing trends and data. Use more precise and varied vocabulary.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-medium text-green-800 mb-2">Your Strengths</h3>
                    <p className="text-sm text-green-700">
                      You're doing well with coherence and cohesion. Your paragraphing and organization are effective.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="task1" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task 1 Progress</CardTitle>
              <CardDescription>Your progress on IELTS Writing Task 1</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {mockScoreData.length > 0 ? (
                  <div className="w-full h-full">
                    {/* This is a placeholder for the chart */}
                    <div className="w-full h-full bg-muted/20 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Task 1 progress chart would appear here</p>
                      </div>
                      {/* Simulate a line chart */}
                      <div className="absolute bottom-0 left-0 right-0 h-[200px] flex items-end px-4">
                        {mockScoreData.map((data, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-2 bg-blue-500 rounded-t"
                              style={{ height: `${(data.task1 / 9) * 180}px` }}
                            ></div>
                            <span className="text-xs mt-2 text-muted-foreground">{data.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Not enough data to display progress. Submit at least 2 Task 1 essays to see your progress.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task 1 Tips</CardTitle>
              <CardDescription>Improve your Task 1 score with these tips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Provide a Clear Overview</h3>
                  <p className="text-sm text-muted-foreground">
                    Always include a clear overview paragraph that summarizes the main trends or features of the chart
                    or graph. This is essential for a high Task Achievement score.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Use Appropriate Language for Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Use specific language for describing trends (increase, decrease, fluctuate) and comparisons (higher
                    than, lower than, similar to).
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Select Key Features</h3>
                  <p className="text-sm text-muted-foreground">
                    Don't try to describe every detail. Select the most important features and trends to highlight in
                    your response.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="task2" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task 2 Progress</CardTitle>
              <CardDescription>Your progress on IELTS Writing Task 2</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                {mockScoreData.length > 0 ? (
                  <div className="w-full h-full">
                    {/* This is a placeholder for the chart */}
                    <div className="w-full h-full bg-muted/20 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Task 2 progress chart would appear here</p>
                      </div>
                      {/* Simulate a line chart */}
                      <div className="absolute bottom-0 left-0 right-0 h-[200px] flex items-end px-4">
                        {mockScoreData.map((data, index) => (
                          <div key={index} className="flex-1 flex flex-col items-center">
                            <div
                              className="w-2 bg-green-500 rounded-t"
                              style={{ height: `${(data.task2 / 9) * 180}px` }}
                            ></div>
                            <span className="text-xs mt-2 text-muted-foreground">{data.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Not enough data to display progress. Submit at least 2 Task 2 essays to see your progress.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task 2 Tips</CardTitle>
              <CardDescription>Improve your Task 2 score with these tips</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Address All Parts of the Question</h3>
                  <p className="text-sm text-muted-foreground">
                    Make sure you fully address all parts of the question. Many Task 2 questions have multiple parts
                    that need to be discussed.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Develop Your Ideas</h3>
                  <p className="text-sm text-muted-foreground">
                    Support your main points with examples, explanations, and evidence. Fully developed ideas are
                    essential for a high Task Response score.
                  </p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">Use a Clear Structure</h3>
                  <p className="text-sm text-muted-foreground">
                    Use a clear introduction, body paragraphs, and conclusion. Each paragraph should have a clear topic
                    sentence and supporting details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
