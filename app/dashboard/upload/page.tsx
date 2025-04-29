"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { BandScoreExplanation } from "@/components/band-score-explanation"

export default function UploadPage() {
  const router = useRouter()
  const [taskType, setTaskType] = useState<string>("task1")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      // Check if file is an image
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }

      // Check file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      // Check if file is an image
      if (!droppedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }

      // Check file size (max 5MB)
      if (droppedFile.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      setFile(droppedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
  }

  const handleSubmit = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload an image of your IELTS writing task",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false)
      setIsProcessing(true)

      // Simulate AI processing
      setTimeout(() => {
        setIsProcessing(false)
        toast({
          title: "Grading complete!",
          description: "Your IELTS writing task has been graded successfully.",
        })
        router.push("/dashboard/results/new")
      }, 3000)
    }, 2000)
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Upload IELTS Writing Task</h1>

      <Card>
        <CardHeader>
          <CardTitle>Upload Your Answer</CardTitle>
          <CardDescription>Upload a JPG image of your handwritten or typed IELTS writing task</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Select Task Type</Label>
            <RadioGroup
              value={taskType}
              onValueChange={setTaskType}
              className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="task1" id="task1" />
                <Label htmlFor="task1" className="font-normal">
                  Task 1 (Graph/Chart Description)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="task2" id="task2" />
                <Label htmlFor="task2" className="font-normal">
                  Task 2 (Essay)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {!preview ? (
            <div
              className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-1">Upload your file</h3>
              <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to browse</p>
              <p className="text-xs text-muted-foreground">JPG or PNG (max. 5MB)</p>
              <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>
          ) : (
            <div className="relative border rounded-lg overflow-hidden">
              <Button variant="destructive" size="icon" className="absolute top-2 right-2 z-10" onClick={removeFile}>
                <X className="h-4 w-4" />
              </Button>
              <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full object-contain max-h-[400px]" />
            </div>
          )}

          {taskType === "task1" && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Task 1 Grading Criteria:</h4>
              <div className="text-sm space-y-4 text-muted-foreground">
                <div>
                  <p className="font-medium">Task Achievement:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>How well you address all parts of the task</li>
                    <li>Presentation of a clear overview of main trends/features</li>
                    <li>Highlighting and coverage of key features with appropriate detail</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Coherence and Cohesion:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Logical organization of information and ideas</li>
                    <li>Clear progression throughout</li>
                    <li>Effective use of cohesive devices and paragraphing</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Lexical Resource:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Range of vocabulary used and its precision</li>
                    <li>Use of less common vocabulary items</li>
                    <li>Accuracy in word choice, spelling and word formation</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Grammatical Range and Accuracy:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>Range of sentence structures</li>
                    <li>Accuracy in grammar and punctuation</li>
                    <li>Frequency of errors and their impact on communication</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {taskType === "task2" && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Task 2 Grading Criteria:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Task Response: How well you address all parts of the question</li>
                <li>• Coherence and Cohesion: Organization and paragraph structure</li>
                <li>• Lexical Resource: Vocabulary range and accuracy</li>
                <li>• Grammatical Range and Accuracy: Sentence structure and grammar</li>
              </ul>
            </div>
          )}

          {taskType === "task1" && (
            <div className="mt-4">
              <BandScoreExplanation taskType="task1" />
            </div>
          )}

          {taskType === "task2" && (
            <div className="mt-4">
              <BandScoreExplanation taskType="task2" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={!file || isUploading || isProcessing} className="w-full gap-2">
            {isUploading && <Loader2 className="h-4 w-4 animate-spin" />}
            {isProcessing && <Loader2 className="h-4 w-4 animate-spin" />}
            {isUploading ? "Uploading..." : isProcessing ? "Processing with AI..." : "Grade My Writing"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
