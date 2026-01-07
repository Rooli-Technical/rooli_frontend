"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Calendar,
  BarChart3,
  Users,
  Zap,
  CheckCircle,
  Star,
  Play,
  Linkedin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import authService from "@/services/auth.service";

export default function RooliLandingPage() {
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const response = await authService.getUserProfile();

      return response.data;
    },
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-xl text-foreground">
                <Image src="/logo.png" alt="Rooli" width={68} height={68} />
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              {/* <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </a> */}
              <a
                href="#testimonials"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Integrations
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
            <Badge
              variant="secondary"
              className="mb-8 px-4 py-2 text-sm font-medium"
            >
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
              Streamline your social media presence with AI-powered content
              generation, multi-platform scheduling, and advanced analytics that
              drive real results.
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
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Platform Marquee Section */}

      {/* Features Section */}
      <section id="features" className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="font-serif font-bold text-4xl lg:text-5xl text-foreground mb-6">
              Everything you need to dominate social media
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              From AI content creation to advanced analytics, Rooli provides all
              the tools your team needs to succeed across every platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">
                  AI Content Generation
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Create engaging posts instantly with our advanced AI that
                  understands your brand voice and audience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Calendar className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">
                  Multi-Platform Scheduling
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Schedule posts across Facebook, Instagram, Twitter, LinkedIn,
                  and TikTok from one unified dashboard.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-accent/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <BarChart3 className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">
                  Advanced Analytics
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Track performance, measure ROI, and optimize your strategy
                  with comprehensive cross-platform analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-7 w-7 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">
                  Team Collaboration
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Streamline workflows with role-based permissions, approval
                  processes, and real-time collaboration tools.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-secondary/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <CheckCircle className="h-7 w-7 text-secondary" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">
                  Content Approval
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Ensure brand consistency with customizable approval workflows
                  and content review processes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:border-accent/20 transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Star className="h-7 w-7 text-accent" />
                </div>
                <CardTitle className="font-serif text-xl mb-3">
                  Brand Management
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Maintain consistent brand voice and visual identity across all
                  platforms with smart templates and guidelines.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center ">
            <h2 className="font-serif font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Quality integrations across major social platforms
            </h2>
            <p className="text-xl text-muted-foreground">
              Rooli gets your connected across your favorite social platforms.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30 border-y border-border overflow-hidden">
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap">
            <div className="flex items-center space-x-16 px-8">
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/instagram.png"
                  alt="Instagram"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/threads.png"
                  alt="Threads"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/x.png"
                  alt="X"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Linkedin className="w-10 h-10 text-foreground" />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/youtube.svg.png"
                  alt="YouTube"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/tiktok.svg"
                  alt="TikTok"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
            {/* Duplicate for seamless loop */}
            <div className="flex items-center space-x-16 px-8">
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/instagram.png"
                  alt="Instagram"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/threads.png"
                  alt="Threads"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/x.png"
                  alt="X"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Linkedin className="w-10 h-10 text-foreground" />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/youtube.svg.png"
                  alt="YouTube"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div className="flex items-center justify-center min-w-[120px]">
                <Image
                  src="/icons/tiktok.svg"
                  alt="TikTok"
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
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
            Join thousands of businesses already using Rooli to grow their
            social media presence with AI-powered tools.
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
                <span className="font-serif font-bold text-xl text-sidebar-foreground">
                  <Image src="/logo.png" alt="Rooli" width={68} height={68} />
                </span>
              </div>
              <p className="text-muted-foreground">
                AI-powered social media management for modern businesses.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">
                Product
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/contact-us"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sidebar-foreground mb-4">
                Legal
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link
                    href="/terms-conditions"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/data-policy"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Data Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-sidebar-foreground transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2025, Rooli - A Cresthub Media Limited Company. All Right
              Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
