"use client"

import type React from "react"
import { useState, useEffect } from "react"
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
  const [inputType, setInputType] = useState<"text" | "image">("text")
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [essayText, setEssayText] = useState<string>("")
  const [isGeneratingTopic, setIsGeneratingTopic] = useState<boolean>(false)
  const [useCustomTopic, setUseCustomTopic] = useState<boolean>(false)
  const [topics, setTopics] = useState<Array<{ topic: string; instructions: string }>>([])
  const [selectedTopic, setSelectedTopic] = useState<{ topic: string; instructions: string } | null>(null)
  const [topic, setTopic] = useState<string>("")
  const [instructions, setInstructions] = useState<string>("")

  useEffect(() => {
    const generateInitialTopics = async () => {
      setIsGeneratingTopic(true)
      try {
        const topicsPromises = Array(3).fill(null).map(() => 
          fetch("/api/generate-topic", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }).then(res => res.json())
        )
        
        const results = await Promise.all(topicsPromises)
        setTopics(results)
        setSelectedTopic(results[0])
        toast({
          title: "Topics generated!",
          description: "Please select a topic to write about.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to generate topics. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsGeneratingTopic(false)
      }
    }

    generateInitialTopics()
  }, [])

  const generateMoreTopics = async () => {
    setIsGeneratingTopic(true)
    try {
      const response = await fetch("/api/generate-topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to generate topic")
      }

      const result = await response.json()
      setTopics(prev => [...prev, result])
      toast({
        title: "New topic generated!",
        description: "A new topic has been added to the list.",
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

  const removeTopic = (index: number) => {
    setTopics(prev => prev.filter((_, i) => i !== index))
    if (selectedTopic === topics[index]) {
      setSelectedTopic(topics[0] || null)
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
    if (!selectedTopic && !useCustomTopic) {
      toast({
        title: "No topic selected",
        description: "Please select or enter a topic first",
        variant: "destructive",
      })
      return
    }

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
      formData.append("taskType", "task2")
      formData.append("inputType", inputType)
      formData.append("topic", useCustomTopic ? topic : selectedTopic!.topic)
      formData.append("instructions", useCustomTopic ? instructions : selectedTopic!.instructions)

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
      <Card>
        <CardHeader>
          <CardTitle>Upload IELTS Writing Task 2</CardTitle>
          <CardDescription>Submit your essay for AI grading</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Input Type</h3>
                <RadioGroup
                  defaultValue="text"
                  onValueChange={(value) => setInputType(value as "text" | "image")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="text" id="text" />
                    <Label htmlFor="text">Text</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="image" id="image" />
                    <Label htmlFor="image">Image</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Topic Selection</h3>
                  <RadioGroup
                    defaultValue="generate"
                    onValueChange={(value) => setUseCustomTopic(value === "custom")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="generate" id="generate" />
                      <Label htmlFor="generate">Select from Generated Topics</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom">Custom Topic</Label>
                    </div>
                  </RadioGroup>
                </div>

                {!useCustomTopic ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium">Generated Topics</h4>
                      <Button
                        onClick={generateMoreTopics}
                        disabled={isGeneratingTopic}
                        variant="outline"
                        size="sm"
                      >
                        {isGeneratingTopic ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Text className="mr-2 h-4 w-4" />
                            Generate More
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {topics.map((topic, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg border ${
                            selectedTopic === topic
                              ? "border-primary bg-primary/5"
                              : "border-border"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div
                              className="flex-1 cursor-pointer"
                              onClick={() => setSelectedTopic(topic)}
                            >
                              <p className="font-medium">{topic.topic}</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {topic.instructions}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeTopic(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Textarea
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Enter your topic here..."
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="Enter task instructions here..."
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                )}

                {selectedTopic && !useCustomTopic && (
                  <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-medium">Selected Topic:</h4>
                    <p className="text-sm text-muted-foreground">{selectedTopic.topic}</p>
                    <h4 className="font-medium mt-2">Instructions:</h4>
                    <p className="text-sm text-muted-foreground">{selectedTopic.instructions}</p>
                  </div>
                )}
              </div>

              {inputType === "image" ? (
                <div
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {preview ? (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={removeFile}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your IELTS writing task image here, or click to
                        select
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="text-sm text-primary cursor-pointer hover:underline"
                      >
                        Select file
                      </label>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="essay">Your Essay</Label>
                  <Textarea
                    id="essay"
                    value={essayText}
                    onChange={(e) => setEssayText(e.target.value)}
                    placeholder="Type or paste your IELTS Writing Task 2 essay here..."
                    className="min-h-[300px]"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isUploading || isProcessing}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Grading...
              </>
            ) : (
              "Submit for Grading"
            )}
          </Button>
        </CardFooter>
      </Card>
      <BandScoreExplanation />
    </div>
  )
}
