"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2, Text, Image } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { BandScoreExplanation } from "@/components/band-score-explanation"
import { Textarea } from "@/components/ui/textarea"

export default function UploadPage() {
  const router = useRouter()
  const [taskType, setTaskType] = useState<string>("task1")
  const [inputType, setInputType] = useState<"text" | "image">("text")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [essayText, setEssayText] = useState<string>("")
  const [generatedTopic, setGeneratedTopic] = useState<{ topic: string; type: string; instructions: string } | null>(null)
  const [isGeneratingTopic, setIsGeneratingTopic] = useState<boolean>(false)

  const generateTopic = async () => {
    setIsGeneratingTopic(true)
    try {
      const response = await fetch("/api/generate-topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskType }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate topic")
      }

      const result = await response.json()
      setGeneratedTopic(result)
      toast({
        title: "Topic generated!",
        description: "A new topic has been generated for you to write about.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate topic. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingTopic(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }

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
      if (!droppedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG, etc.)",
          variant: "destructive",
        })
        return
      }

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
    if (inputType === "image" && !file) {
      toast({
        title: "No file selected",
        description: "Please upload an image of your IELTS writing task",
        variant: "destructive",
      })
      return
    }

    if (inputType === "text" && !essayText.trim()) {
      toast({
        title: "No text entered",
        description: "Please enter your IELTS writing task",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setIsProcessing(false)

    try {
      const formData = new FormData()
      if (inputType === "image") {
        formData.append("image", file!)
      } else {
        formData.append("text", essayText)
      }
      formData.append("taskType", taskType)
      formData.append("inputType", inputType)

      const response = await fetch("/api/grade", {
        method: "POST",
        body: formData,
      })

      setIsUploading(false)
      setIsProcessing(true)

      if (!response.ok) {
        const errorData = await response.json()
        setIsProcessing(false)
        toast({
          title: "Grading failed",
          description: errorData.error || "An error occurred while grading your essay.",
          variant: "destructive",
        })
        return
      }

      const result = await response.json()
      setIsProcessing(false)
      toast({
        title: "Grading complete!",
        description: "Your IELTS writing task has been graded successfully.",
      })
      router.push("/dashboard/results/new")
    } catch (error) {
      setIsUploading(false)
      setIsProcessing(false)
      toast({
        title: "Network error",
        description: "Failed to connect to the grading service.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold tracking-tight mb-6">IELTS Writing Task</h1>

      <Card>
        <CardHeader>
          <CardTitle>Write Your Answer</CardTitle>
          <CardDescription>Choose how you want to submit your IELTS writing task</CardDescription>
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

          <div className="space-y-2">
            <Label>Select Input Method</Label>
            <RadioGroup
              value={inputType}
              onValueChange={(value: "text" | "image") => {
                setInputType(value)
                setFile(null)
                setPreview(null)
                setEssayText("")
              }}
              className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text" id="text" />
                <Label htmlFor="text" className="font-normal">
                  Type Directly
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image" className="font-normal">
                  Upload Image
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Topic</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={generateTopic}
                disabled={isGeneratingTopic}
              >
                {isGeneratingTopic ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Topic"
                )}
              </Button>
            </div>
            {generatedTopic && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">{generatedTopic.topic}</h4>
                <p className="text-sm text-muted-foreground">{generatedTopic.instructions}</p>
              </div>
            )}
          </div>

          {inputType === "text" ? (
            <div className="space-y-2">
              <Label>Your Answer</Label>
              <Textarea
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[300px]"
              />
            </div>
          ) : (
            <>
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
            </>
          )}

          {taskType === "task1" && <BandScoreExplanation taskType="task1" />}
          {taskType === "task2" && <BandScoreExplanation taskType="task2" />}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isUploading || isProcessing || (!file && !essayText.trim())}
          >
            {isUploading || isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isUploading ? "Uploading..." : "Processing..."}
              </>
            ) : (
              "Submit for Grading"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
