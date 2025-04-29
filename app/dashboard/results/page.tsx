"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, FileEdit, Download, Trash2, Search, FileText } from "lucide-react"
import Link from "next/link"

// Mock data for grading history
const mockGradingSessions = [
  {
    id: "1",
    name: "IELTS Writing Task 1 - Bar Chart",
    taskType: "Task 1",
    date: "2025-04-25",
    score: 6.5,
  },
  {
    id: "2",
    name: "IELTS Writing Task 2 - Education Essay",
    taskType: "Task 2",
    date: "2025-04-22",
    score: 7.0,
  },
  {
    id: "3",
    name: "IELTS Writing Task 1 - Line Graph",
    taskType: "Task 1",
    date: "2025-04-18",
    score: 6.0,
  },
  {
    id: "4",
    name: "IELTS Writing Task 2 - Technology Essay",
    taskType: "Task 2",
    date: "2025-04-15",
    score: 6.5,
  },
  {
    id: "5",
    name: "IELTS Writing Task 1 - Process Diagram",
    taskType: "Task 1",
    date: "2025-04-10",
    score: 5.5,
  },
]

export default function ResultsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [taskTypeFilter, setTaskTypeFilter] = useState("all")

  // Filter sessions based on search query and task type
  const filteredSessions = mockGradingSessions.filter((session) => {
    const matchesSearch = session.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTaskType = taskTypeFilter === "all" || session.taskType === taskTypeFilter
    return matchesSearch && matchesTaskType
  })

  return (
    <div className="max-w-6xl mx-auto">
      <div className="space-y-1 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Grading History</h1>
        <p className="text-muted-foreground">View and manage your past grading sessions</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-1 mb-6">
            <h2 className="text-xl font-semibold">Past Grading Sessions</h2>
            <p className="text-muted-foreground">Access and manage your previous grading sessions</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search sessions..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={taskTypeFilter} onValueChange={setTaskTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Task Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Task Types</SelectItem>
                <SelectItem value="Task 1">Task 1</SelectItem>
                <SelectItem value="Task 2">Task 2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session Name</TableHead>
                  <TableHead>Task Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Band Score</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.length > 0 ? (
                  filteredSessions.map((session) => (
                    <TableRow key={session.id}>
                      <TableCell className="font-medium">{session.name}</TableCell>
                      <TableCell>{session.taskType}</TableCell>
                      <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">{session.score.toFixed(1)}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-2">
                          <Link href={`/dashboard/results/${session.id}`}>
                            <Button variant="ghost" size="icon" title="View">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="icon" title="Edit">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Download">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center text-center">
                        <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                        <p className="text-lg font-medium">No grading sessions found</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {searchQuery || taskTypeFilter !== "all"
                            ? "Try adjusting your search or filters"
                            : "Upload your first IELTS writing task to get started"}
                        </p>
                        {!searchQuery && taskTypeFilter === "all" && (
                          <Link href="/dashboard/upload" className="mt-4">
                            <Button>Upload Essay</Button>
                          </Link>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
