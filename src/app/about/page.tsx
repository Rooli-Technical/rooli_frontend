"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Sparkles, Zap, Target, Users, Shield, Rocket, Heart, Building2, MapPin, Calendar, Award } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function AboutPage() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsVisible(true)
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in")
                    }
                })
            },
            { threshold: 0.1 }
        )

        const sections = document.querySelectorAll(".animate-on-scroll")
        sections.forEach((section) => observer.observe(section))

        return () => {
            sections.forEach((section) => observer.unobserve(section))
        }
    }, [])

    return (
        <div className="min-h-screen bg-background overflow-hidden">
            {/* Header */}
            <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 animate-slide-down">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <span className="font-serif font-bold text-xl text-foreground">
                                <Image src="/logo.png" alt="Rooli" width={68} height={68} />
                            </span>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10 animate-gradient"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-primary/5 to-transparent"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 mb-6 animate-bounce">
                            <span className="text-4xl">👋</span>
                            <Badge variant="secondary" className="px-4 py-2 text-lg">
                                <Sparkles className="w-4 h-4 mr-2" />
                                Our Story
                            </Badge>
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
                            The Power of AI,{" "}
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient-text">
                                Simplified
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
                            We founded Rooli to transform chaos into community, one post at a time.
                        </p>
                    </div>
                </div>
            </section>

            {/* The Problem Section */}
            <section className="py-16 lg:py-24 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto animate-on-scroll">
                        <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
                            <CardHeader>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                                        <Zap className="h-6 w-6 text-destructive" />
                                    </div>
                                    <CardTitle className="text-3xl">The Problem We Solved</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    In the dynamic world of business, your social media presence is crucial but managing LinkedIn, X, Facebook, and Instagram requires constant logging in, platform-specific content tweaking, and countless wasted hours. For small to medium-sized business teams, agencies, and solo founders, this scattered effort creates <span className="font-semibold text-foreground">chaos, not community</span>.
                                </p>
                                <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                                    <p className="text-foreground font-semibold text-lg">
                                        We founded Rooli to end that chaos. ✨
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Solution Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 animate-on-scroll">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="text-3xl">💡</span>
                                <Badge variant="secondary" className="px-4 py-2">
                                    Our Solution
                                </Badge>
                            </div>
                            <h2 className="text-4xl font-bold text-foreground mb-4">The Rooli Difference</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Rooli is the AI-powered social media scheduling tool built by Cresthub Media to bring simplicity and intelligence back to your digital strategy.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 animate-on-scroll">
                            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-primary/20">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle>Save Time</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Schedule weeks of content across all major networks in minutes.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-primary/20">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle>Boost Compliance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Maintain strict adherence to LinkedIn, X, and other platform rules, safeguarding your accounts.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-primary/20">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Rocket className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle>Focus on Growth</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Shift your energy from administrative tasks to audience engagement and strategy.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 animate-on-scroll">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="text-3xl">🚀</span>
                                <Badge variant="secondary" className="px-4 py-2">
                                    Our Mission & Vision
                                </Badge>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 animate-on-scroll">
                            <Card className="relative overflow-hidden group hover:scale-105 transition-all duration-300 border-primary/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                        <Target className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl">Mission</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        To empower business teams globally by providing the most intelligent, efficient, and secure single-platform solution for social media management, turning wasted time into meaningful engagement.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="relative overflow-hidden group hover:scale-105 transition-all duration-300 border-secondary/20">
                                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                                        <Rocket className="h-6 w-6 text-secondary" />
                                    </div>
                                    <CardTitle className="text-2xl">Vision</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground leading-relaxed">
                                        To be the global standard for social media scheduling, recognized for bridging the gap between innovative AI technology and real-world business needs.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who We Are Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 animate-on-scroll">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="text-3xl">🤝</span>
                                <Badge variant="secondary" className="px-4 py-2">
                                    Who We Are
                                </Badge>
                            </div>
                            <h2 className="text-4xl font-bold text-foreground mb-4">Built by Cresthub Media</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Rooli is a product of Cresthub Media, a technology and media company committed to providing digital services and covering the African technology and startup ecosystem since 2015.
                            </p>
                        </div>

                        <Card className="mb-8 animate-on-scroll border-2 border-primary/20">
                            <CardContent className="pt-6">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="text-left p-4 font-semibold text-foreground">Detail</th>
                                                <th className="text-left p-4 font-semibold text-foreground">Information</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium text-foreground">Parent Company</td>
                                                <td className="p-4 text-muted-foreground">Cresthub Media</td>
                                            </tr>
                                            <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium text-foreground">Focus</td>
                                                <td className="p-4 text-muted-foreground">Technology, Media, and Digital Services</td>
                                            </tr>
                                            <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium text-foreground">Heritage</td>
                                                <td className="p-4 text-muted-foreground">Sharing Africa's business and tech stories since 2015.</td>
                                            </tr>
                                            <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium text-foreground">Registration</td>
                                                <td className="p-4 text-muted-foreground">1913610</td>
                                            </tr>
                                            <tr className="hover:bg-muted/50 transition-colors">
                                                <td className="p-4 font-medium text-foreground">Headquarters</td>
                                                <td className="p-4 text-muted-foreground">RAYFIELD, JOS, PLATEAU STATE, NIGERIA</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="animate-on-scroll bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
                            <CardContent className="pt-6">
                                <p className="text-foreground leading-relaxed text-lg">
                                    Our roots in media and technology give us a unique understanding of how powerful content, driven by data, can transform a business. We built Rooli with this foundation—a tool that understands the content and compliance rules of the digital age.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Why Choose Rooli Section */}
            <section className="py-16 lg:py-24 bg-muted/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 animate-on-scroll">
                            <div className="inline-flex items-center gap-2 mb-4">
                                <span className="text-3xl">🔑</span>
                                <Badge variant="secondary" className="px-4 py-2">
                                    Why Choose Rooli?
                                </Badge>
                            </div>
                            <h2 className="text-4xl font-bold text-foreground mb-4">What Makes Us Different</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-12 animate-on-scroll">
                            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-primary/20">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle>AI-Powered Efficiency</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        We use smart algorithms to recommend optimal posting times and content adjustments for platforms like LinkedIn, maximizing your visibility.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-primary/20">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle>Team-Focused</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Designed for collaboration, Rooli lets small-to-medium business teams and agencies manage multiple clients and users from one secure dashboard.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-primary/20">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <CardTitle>Commitment to Compliance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Our service is engineered with strict attention to third-party platform regulations, helping you maintain a professional and safe online presence.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        <Card className="animate-on-scroll bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-2 border-primary/30 p-8 text-center">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Heart className="h-6 w-6 text-primary animate-pulse" />
                                    <p className="text-2xl font-bold text-foreground italic">
                                        "Rooli is where time-saving automation meets intelligent social media strategy"
                                    </p>
                                    <Heart className="h-6 w-6 text-secondary animate-pulse" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center animate-on-scroll">
                        <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30">
                            <CardContent className="pt-12 pb-12">
                                <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Transform Your Social Media?</h2>
                                <p className="text-xl text-muted-foreground mb-8">
                                    Join thousands of teams already using Rooli to save time and grow their presence.
                                </p>
                                <div className="flex gap-4 justify-center">
                                    <Button size="lg" asChild className="animate-pulse">
                                        <Link href="/auth/signup">Start Free Trial</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href="/">Learn More</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Footer Navigation */}
            <div className="py-8 border-t border-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center">
                        <Button variant="outline" asChild>
                            <Link href="/">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-slide-down {
          animation: slideDown 0.5s ease-out;
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 1s ease-out;
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        .animate-on-scroll.animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
        </div>
    )
}