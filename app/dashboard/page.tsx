"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowRight, FileText, History, Upload, BookOpen, Clock } from "lucide-react"

export default function DashboardPage() {
  const [username, setUsername] = useState("User")
  const [recentSubmissions, setRecentSubmissions] = useState([])

  // In a real app, you would fetch the user's name and recent submissions from an API
  useEffect(() => {
    // Simulate fetching user data
    setUsername("Norrawich chansiri")

    // For demo purposes, we'll leave the submissions empty
    // This will show the empty state UI
  }, [])

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {username}!</h1>
        <p className="text-muted-foreground">Manage and grade your IELTS writing tasks with AI assistance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Start Grading Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <Upload className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Start Grading</CardTitle>
            <CardDescription>Upload writing tasks and grade them with AI</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Upload your IELTS writing task images and select the task type to start the AI-powered grading process.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/upload" className="w-full">
              <Button className="w-full justify-between">
                Start Grading
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Grading History Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <History className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Grading History</CardTitle>
            <CardDescription>View your past grading sessions</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Access your previous grading sessions, review results, and download reports.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/results" className="w-full">
              <Button variant="outline" className="w-full justify-between">
                View History
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Manage Rubrics Card */}
        <Card className="flex flex-col">
          <CardHeader>
            <BookOpen className="h-6 w-6 text-primary mb-2" />
            <CardTitle>IELTS Rubrics</CardTitle>
            <CardDescription>Learn about IELTS grading criteria</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Understand the official IELTS writing assessment criteria for Task 1 and Task 2.
            </p>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/rubrics" className="w-full">
              <Button variant="outline" className="w-full justify-between">
                View Rubrics
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      {/* Recent Grading Sessions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Grading Sessions</CardTitle>
          <CardDescription>Your most recent IELTS writing submissions</CardDescription>
        </CardHeader>
        <CardContent>
          {recentSubmissions && recentSubmissions.length > 0 ? (
            <div className="space-y-4">
              {recentSubmissions.map((submission, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">IELTS Writing Task {submission.taskType}</div>
                      <div className="text-sm text-muted-foreground">Submitted on {submission.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold">Band {submission.score}</div>
                    <Link href={`/dashboard/results/${submission.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No recent grading sessions</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                You haven't graded any exams yet. Start by creating a new grading session.
              </p>
              <Link href="/dashboard/upload">
                <Button className="gap-2">
                  Start Grading
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
        {recentSubmissions && recentSubmissions.length > 0 && (
          <CardFooter className="flex justify-end">
            <Link href="/dashboard/results">
              <Button variant="ghost" size="sm" className="gap-2">
                View all
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
