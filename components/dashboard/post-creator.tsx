"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Sparkles, ImageIcon, Video, Hash, AtSign, Upload, Loader2 } from "lucide-react"
import { format } from "date-fns"

interface PostCreatorProps {
  onClose: () => void
}

const platforms = [
  { id: "instagram", name: "Instagram", color: "bg-pink-500", enabled: true, charLimit: 2200 },
  { id: "twitter", name: "Twitter", color: "bg-blue-500", enabled: true, charLimit: 280 },
  { id: "facebook", name: "Facebook", color: "bg-blue-600", enabled: true, charLimit: 63206 },
  { id: "linkedin", name: "LinkedIn", color: "bg-blue-700", enabled: true, charLimit: 3000 },
  { id: "tiktok", name: "TikTok", color: "bg-black", enabled: false, charLimit: 150 },
]

export function PostCreator({ onClose }: PostCreatorProps) {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "twitter"])
  const [content, setContent] = useState("")
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState("09:00")
  const [postType, setPostType] = useState<"now" | "schedule" | "draft">("schedule")
  const [aiTopic, setAiTopic] = useState("")
  const [aiTone, setAiTone] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedMedia, setUploadedMedia] = useState<string[]>([])

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platformId) ? prev.filter((id) => id !== platformId) : [...prev, platformId],
    )
  }

  const getCharacterLimit = () => {
    if (selectedPlatforms.length === 0) return 280
    const limits = selectedPlatforms.map((id) => platforms.find((p) => p.id === id)?.charLimit || 280)
    return Math.min(...limits)
  }

  const handleGenerateContent = async () => {
    if (!aiTopic.trim()) return

    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const generatedContent = `🚀 Exciting news about ${aiTopic}! We're thrilled to share this ${aiTone} update with our community. Stay tuned for more amazing content coming your way! #${aiTopic.replace(/\s+/g, "")} #SocialMedia`
      setContent(generatedContent)
      setIsGenerating(false)
    }, 2000)
  }

  const handleMediaUpload = (type: "image" | "video") => {
    const mockFile = type === "image" ? "image-placeholder.jpg" : "video-placeholder.mp4"
    setUploadedMedia((prev) => [...prev, mockFile])
  }

  const characterLimit = getCharacterLimit()
  const isOverLimit = content.length > characterLimit

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Create New Post</DialogTitle>
          <DialogDescription>Create and schedule content across your social media platforms</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Creation */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="ai-assist">
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Assist
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compose" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="content">Post Content</Label>
                  <Textarea
                    id="content"
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${isOverLimit ? "text-destructive" : "text-muted-foreground"}`}>
                      {content.length}/{characterLimit} characters
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="Add hashtag">
                        <Hash className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Mention user">
                        <AtSign className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleMediaUpload("image")}>
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Add Image
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleMediaUpload("video")}>
                      <Video className="mr-2 h-4 w-4" />
                      Add Video
                    </Button>
                  </div>

                  {uploadedMedia.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {uploadedMedia.map((media, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          <Upload className="h-3 w-3" />
                          {media}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="ai-assist" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">AI Content Generator</CardTitle>
                    <CardDescription>Let AI help you create engaging content</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic">Topic or Theme</Label>
                      <Input
                        id="topic"
                        placeholder="e.g., Product launch, Monday motivation, Industry news"
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tone</Label>
                      <Select value={aiTone} onValueChange={setAiTone}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="humorous">Humorous</SelectItem>
                          <SelectItem value="inspirational">Inspirational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="w-full"
                      onClick={handleGenerateContent}
                      disabled={!aiTopic.trim() || isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Content
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Platform Selection */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Platforms</CardTitle>
                <CardDescription>Select where to publish</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {platforms.map((platform) => (
                  <div key={platform.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={platform.id}
                      checked={selectedPlatforms.includes(platform.id)}
                      onCheckedChange={() => handlePlatformToggle(platform.id)}
                      disabled={!platform.enabled}
                    />
                    <div className="flex items-center space-x-2 flex-1">
                      <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                      <Label htmlFor={platform.id} className="text-sm flex-1">
                        {platform.name}
                      </Label>
                      <span className="text-xs text-muted-foreground">{platform.charLimit} chars</span>
                      {!platform.enabled && (
                        <Badge variant="outline" className="text-xs">
                          Connect
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Scheduling */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Schedule</CardTitle>
                <CardDescription>When to publish</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup value={postType} onValueChange={(value) => setPostType(value as any)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="now" id="now" />
                    <Label htmlFor="now">Publish now</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="schedule" id="schedule" />
                    <Label htmlFor="schedule">Schedule for later</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="draft" id="draft" />
                    <Label htmlFor="draft">Save as draft</Label>
                  </div>
                </RadioGroup>

                {postType === "schedule" && (
                  <div className="space-y-3 pt-2">
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal bg-transparent"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex items-center space-x-2">
            {postType === "draft" && (
              <Button variant="outline" disabled={!content.trim()}>
                Save Draft
              </Button>
            )}
            {postType === "schedule" && (
              <Button disabled={!content.trim() || !date || isOverLimit}>Schedule Post</Button>
            )}
            {postType === "now" && <Button disabled={!content.trim() || isOverLimit}>Publish Now</Button>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
