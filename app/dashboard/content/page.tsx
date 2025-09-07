"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Upload,
  Filter,
  Grid3X3,
  List,
  ImageIcon,
  Video,
  FileText,
  MoreHorizontal,
  Download,
  Trash2,
  Edit,
  Copy,
  Eye,
  Plus,
  Folder,
  FolderOpen,
} from "lucide-react"

const mockMedia = [
  {
    id: 1,
    name: "product-launch-hero.jpg",
    type: "image",
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadDate: "Dec 10, 2024",
    tags: ["product", "launch", "hero"],
    url: "/product-launch-hero.png",
  },
  {
    id: 2,
    name: "team-collaboration.mp4",
    type: "video",
    size: "15.2 MB",
    duration: "0:45",
    uploadDate: "Dec 8, 2024",
    tags: ["team", "collaboration", "behind-scenes"],
    url: "/team-collaboration-video-thumbnail.png",
  },
  {
    id: 3,
    name: "brand-colors-palette.png",
    type: "image",
    size: "856 KB",
    dimensions: "800x600",
    uploadDate: "Dec 5, 2024",
    tags: ["brand", "colors", "design"],
    url: "/brand-color-palette.png",
  },
  {
    id: 4,
    name: "customer-testimonial.jpg",
    type: "image",
    size: "1.8 MB",
    dimensions: "1200x800",
    uploadDate: "Dec 3, 2024",
    tags: ["customer", "testimonial", "review"],
    url: "/customer-testimonial-photo.png",
  },
]

const mockTemplates = [
  {
    id: 1,
    name: "Product Announcement",
    description: "Template for announcing new products",
    content:
      "🚀 Exciting news! We're thrilled to introduce [PRODUCT NAME] - [BRIEF DESCRIPTION]. Get ready to [BENEFIT/ACTION]. #NewProduct #Innovation",
    category: "Product",
    usageCount: 12,
  },
  {
    id: 2,
    name: "Monday Motivation",
    description: "Weekly motivational post template",
    content:
      "💪 Monday Motivation: [INSPIRATIONAL QUOTE OR MESSAGE]. Remember, every expert was once a beginner. What's your goal this week? #MondayMotivation #Goals",
    category: "Motivation",
    usageCount: 8,
  },
  {
    id: 3,
    name: "Behind the Scenes",
    description: "Show your team and process",
    content:
      "Behind the scenes at [COMPANY NAME]! Here's how we [PROCESS/ACTIVITY]. Our team is passionate about [VALUE/MISSION]. #BehindTheScenes #TeamWork",
    category: "Culture",
    usageCount: 15,
  },
]

const folders = [
  { id: 1, name: "Product Images", count: 24, icon: FolderOpen },
  { id: 2, name: "Team Photos", count: 18, icon: Folder },
  { id: 3, name: "Brand Assets", count: 12, icon: Folder },
  { id: 4, name: "Video Content", count: 8, icon: Folder },
]

export default function ContentLibraryPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">Content Library</h1>
          <p className="text-muted-foreground">Organize and manage your media files and content templates</p>
        </div>
        <div className="flex items-center space-x-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Upload className="mr-2 h-4 w-4" />
                Upload Media
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Media</DialogTitle>
                <DialogDescription>Upload images, videos, or other media files to your library</DialogDescription>
              </DialogHeader>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium mb-2">Drop files here or click to browse</p>
                <p className="text-sm text-muted-foreground mb-4">Supports JPG, PNG, GIF, MP4, MOV up to 50MB</p>
                <Button>Choose Files</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">156</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ImageIcon className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Storage Used</p>
                <p className="text-2xl font-bold">2.4 GB</p>
              </div>
              <Badge variant="secondary">of 10 GB</Badge>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Templates</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Folders</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Folder className="h-5 w-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="media" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="media">Media Files</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="folders">Folders</TabsTrigger>
        </TabsList>

        <TabsContent value="media" className="space-y-4">
          {/* Filters and Search */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search media files..."
                  className="pl-10 w-64 bg-background border-border"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant={view === "grid" ? "default" : "outline"} size="sm" onClick={() => setView("grid")}>
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Media Grid */}
          {view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {mockMedia.map((item) => (
                <Card key={item.id} className="border-border hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={item.url || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="absolute top-2 left-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.type === "image" ? (
                            <ImageIcon className="mr-1 h-3 w-3" />
                          ) : (
                            <Video className="mr-1 h-3 w-3" />
                          )}
                          {item.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm truncate mb-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.size} • {item.type === "image" ? item.dimensions : item.duration}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {mockMedia.map((item) => (
                <Card key={item.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.url || "/placeholder.jpg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {item.size} • {item.type === "image" ? item.dimensions : item.duration} • {item.uploadDate}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search templates..." className="pl-10 w-64 bg-background border-border" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTemplates.map((template) => (
              <Card key={template.id} className="border-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Use Template
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Copy className="mr-2 h-4 w-4" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-3">{template.content}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{template.category}</Badge>
                      <span className="text-xs text-muted-foreground">Used {template.usageCount} times</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="folders" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input placeholder="Search folders..." className="pl-10 w-64 bg-background border-border" />
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Folder
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {folders.map((folder) => (
              <Card
                key={folder.id}
                className="border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedFolder(folder.id)}
              >
                <CardContent className="p-6 text-center">
                  <folder.icon className="mx-auto h-12 w-12 text-primary mb-3" />
                  <h3 className="font-medium mb-1">{folder.name}</h3>
                  <p className="text-sm text-muted-foreground">{folder.count} files</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
