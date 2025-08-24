"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Send,
  Sparkles,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Lightbulb,
  TrendingUp,
  Hash,
  Calendar,
  Loader2,
  Bot,
  User,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  type?: "text" | "suggestion" | "analysis"
}

const aiFeatures = [
  {
    title: "Content Generation",
    description: "Generate engaging posts for any platform",
    icon: Sparkles,
    color: "text-purple-500",
  },
  {
    title: "Hashtag Suggestions",
    description: "Get trending and relevant hashtags",
    icon: Hash,
    color: "text-blue-500",
  },
  {
    title: "Performance Analysis",
    description: "AI-powered insights on your content",
    icon: TrendingUp,
    color: "text-green-500",
  },
  {
    title: "Content Planning",
    description: "Strategic content calendar suggestions",
    icon: Calendar,
    color: "text-orange-500",
  },
]

const quickPrompts = [
  "Generate a product launch announcement",
  "Create a motivational Monday post",
  "Write a behind-the-scenes caption",
  "Suggest hashtags for a tech startup",
  "Analyze my recent post performance",
  "Plan content for next week",
]

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI assistant for social media content. I can help you generate posts, suggest hashtags, analyze performance, and plan your content strategy. What would you like to work on today?",
      timestamp: new Date(),
      type: "text",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [contentToOptimize, setContentToOptimize] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("instagram")
  const [contentTone, setContentTone] = useState("professional")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(message),
        timestamp: new Date(),
        type: message.toLowerCase().includes("hashtag") ? "suggestion" : "text",
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("hashtag")) {
      return "Here are some trending hashtags for your content:\n\n#SocialMediaMarketing #ContentCreator #DigitalMarketing #BrandAwareness #Engagement #SocialMediaTips #OnlinePresence #MarketingStrategy #ContentStrategy #SocialMediaGrowth\n\nThese hashtags have high engagement rates and are relevant to your industry. Would you like me to suggest more specific hashtags for a particular topic?"
    }

    if (lowerMessage.includes("product launch")) {
      return "🚀 Exciting news! We're thrilled to introduce [Product Name] - the game-changing solution you've been waiting for!\n\n✨ Key features:\n• [Feature 1]\n• [Feature 2]\n• [Feature 3]\n\nReady to transform your [industry/workflow]? Get early access now!\n\n#ProductLaunch #Innovation #NewProduct #TechNews #Startup"
    }

    if (lowerMessage.includes("motivational") || lowerMessage.includes("monday")) {
      return "💪 Monday Motivation: Success isn't just about what you accomplish in your life, it's about what you inspire others to do.\n\nThis week, let's focus on:\n🎯 Setting clear goals\n🚀 Taking consistent action\n🤝 Supporting our community\n\nWhat's your biggest goal this week? Share it below! 👇\n\n#MondayMotivation #Goals #Success #Mindset #Productivity"
    }

    if (lowerMessage.includes("analyze") || lowerMessage.includes("performance")) {
      return "Based on your recent posts, here's what I've observed:\n\n📈 Top performing content:\n• Behind-the-scenes posts (+45% engagement)\n• Educational content (+32% reach)\n• User-generated content (+28% saves)\n\n💡 Recommendations:\n• Post more video content (trending format)\n• Use 5-10 hashtags for optimal reach\n• Post between 10-11 AM for best engagement\n\nWould you like me to analyze a specific post or time period?"
    }

    return "I'd be happy to help you with that! Could you provide more specific details about what you're looking for? I can assist with content creation, hashtag suggestions, performance analysis, or content planning."
  }

  const handleQuickPrompt = (prompt: string) => {
    handleSendMessage(prompt)
  }

  const optimizeContent = () => {
    if (!contentToOptimize.trim()) return

    const optimizedContent = `Here's your optimized content for ${selectedPlatform}:\n\n${contentToOptimize}\n\n✨ Optimizations applied:\n• Added engaging hook\n• Included call-to-action\n• Optimized for ${selectedPlatform} algorithm\n• ${contentTone} tone maintained\n\nSuggested hashtags: #ContentOptimization #SocialMedia #Engagement`

    const aiMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: optimizedContent,
      timestamp: new Date(),
      type: "suggestion",
    }

    setMessages((prev) => [...prev, aiMessage])
    setContentToOptimize("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground">Your intelligent companion for social media content creation</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {aiFeatures.map((feature, index) => (
          <Card key={index} className="border-border hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <feature.icon className={`h-5 w-5 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="optimize">Content Optimizer</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Chat Interface */}
            <div className="lg:col-span-3">
              <Card className="border-border h-[600px] flex flex-col">
                <CardHeader className="border-b border-border">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-primary" />
                    AI Assistant
                  </CardTitle>
                  <CardDescription>Ask me anything about social media content and strategy</CardDescription>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <Avatar className="w-8 h-8">
                        {message.role === "user" ? (
                          <>
                            <AvatarImage src="/diverse-user-avatars.png" />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className={`flex-1 max-w-[80%] ${message.role === "user" ? "text-right" : ""}`}>
                        <div
                          className={`rounded-lg p-3 ${
                            message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                          {message.role === "assistant" && (
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Copy className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsUp className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <ThumbsDown className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input */}
                <div className="border-t border-border p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Ask me anything about social media content..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputMessage)}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => handleSendMessage(inputMessage)}
                      disabled={!inputMessage.trim() || isLoading}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Prompts</CardTitle>
                  <CardDescription>Try these popular requests</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto p-3 bg-transparent"
                      onClick={() => handleQuickPrompt(prompt)}
                    >
                      <Lightbulb className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-xs">{prompt}</span>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="text-lg">AI Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Content Generated</span>
                    <span className="font-medium">247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Hashtags Suggested</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Optimizations</span>
                    <span className="font-medium">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Time Saved</span>
                    <span className="font-medium">24h</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="optimize" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Content Optimizer</CardTitle>
              <CardDescription>Enhance your content with AI-powered suggestions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform</Label>
                  <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tone">Content Tone</Label>
                  <Select value={contentTone} onValueChange={setContentTone}>
                    <SelectTrigger>
                      <SelectValue />
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Your Content</Label>
                <Textarea
                  id="content"
                  placeholder="Paste your content here to optimize it..."
                  value={contentToOptimize}
                  onChange={(e) => setContentToOptimize(e.target.value)}
                  className="min-h-32"
                />
              </div>

              <Button onClick={optimizeContent} disabled={!contentToOptimize.trim()} className="w-full">
                <Sparkles className="mr-2 h-4 w-4" />
                Optimize Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
