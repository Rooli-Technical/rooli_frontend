import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, BarChart3, Users, Zap, CheckCircle, Star, Play } from "lucide-react"
import Link from "next/link"

export default function RooliLandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </div>
              <span className="font-serif font-bold text-xl text-foreground">Rooli</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Testimonials
              </a>
              <Button variant="outline" size="sm" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/signup">Start Free Trial</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-primary/5 to-transparent"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-8 px-4 py-2 text-sm font-medium">
              <Zap className="w-4 h-4 mr-2" />
              AI-Powered Social Media Management
            </Badge>
            <h1 className="font-serif font-bold text-5xl sm:text-6xl lg:text-7xl text-foreground mb-8 leading-tight tracking-tight">
              Schedule Smarter, <br />
              <span className="text-primary bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Grow Faster
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Streamline your social media presence with AI-powered content generation, multi-platform scheduling, and
              advanced analytics that drive real results.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button
                size="lg"
                className="text-lg px-10 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/auth/signup">
                  Start Free Trial
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-10 py-4 h-auto bg-transparent border-2 hover:bg-muted/50 transition-all duration-300"
              >
                <Play className="mr-3 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Everything you need to dominate social media
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From AI content creation to advanced analytics, Rooli provides all the tools your team needs to succeed
              across every platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">AI Content Generation</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Create engaging posts instantly with our advanced AI that understands your brand voice and audience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Calendar className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">Multi-Platform Scheduling</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Schedule posts across Facebook, Instagram, Twitter, LinkedIn, and TikTok from one unified dashboard.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-accent/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <BarChart3 className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">Advanced Analytics</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Track performance, measure ROI, and optimize your strategy with comprehensive cross-platform
                  analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">Team Collaboration</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Streamline workflows with role-based permissions, approval processes, and real-time collaboration
                  tools.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <CheckCircle className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">Content Approval</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Ensure brand consistency with customizable approval workflows and content review processes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-accent/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Star className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">Brand Management</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Maintain consistent brand voice and visual identity across all platforms with smart templates and
                  guidelines.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Trusted by thousands of businesses
            </h2>
            <p className="text-xl text-muted-foreground">
              See how Rooli is helping teams grow their social media presence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Rooli's AI content generation has saved us 10+ hours per week. Our engagement rates have increased by
                  150% since we started using it."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="text-primary font-semibold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Marketing Director, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The multi-platform scheduling is a game-changer. We can now maintain consistent presence across all
                  channels effortlessly."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mr-3">
                    <span className="text-secondary font-semibold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Mike Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Social Media Manager, CreativeAgency</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The analytics dashboard gives us insights we never had before. We can finally prove ROI on our social
                  media efforts."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center mr-3">
                    <span className="text-accent font-semibold">EL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Emily Liu</p>
                    <p className="text-sm text-muted-foreground">CMO, GrowthStartup</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/90 via-primary to-primary/95"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="font-serif font-bold text-4xl lg:text-5xl mb-6">
            Ready to transform your social media strategy?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of businesses already using Rooli to grow their social media presence with AI-powered tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-10 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/auth/signup">
                Start Free Trial
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 h-auto border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent transition-all duration-300"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sidebar border-t border-sidebar-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                  <span className="text-sidebar-primary-foreground font-bold text-lg">R</span>
                </div>
                <span className="font-serif font-bold text-xl text-sidebar-foreground">Rooli</span>
              </div>
              <p className="text-muted-foreground">AI-powered social media management for modern businesses.</p>
            </div>
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-sidebar-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-sidebar-foreground transition-colors">
                    Status
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-sidebar-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Rooli. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
