"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Terminal, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  const [typedText, setTypedText] = useState("")
  const fullText = "Building the future through elegant solutions."

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(interval)
      }
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <Terminal className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Problem Solver & Code Architect
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="block">Hello, I&apos;m</span>
            <span className="block text-primary mt-2">ʜᴀʀʀʏ</span>
          </h1>
          
          {/* Personal Tagline */}
          <div className="inline-flex flex-col items-center gap-2 px-6 py-3 rounded-2xl bg-primary/10 border border-primary/30 mb-6 animate-fade-in glow-sm">
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-medium text-primary">
                ɪ&apos;ᴍ ᴀ ɢᴀᴍᴇʀ 🎮 ɪ ʙʀᴇᴀᴋ ᴇɢᴏ&apos;ꜱ 💥 ɴᴏᴛ ʜᴇᴀʀᴛꜱ ❤️
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-primary/70 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-primary/80">
                !! अंतः अस्ति प्रारंभः !!
              </span>
              <Sparkles className="h-3 w-3 text-primary/70 animate-pulse" />
            </div>
          </div>

          {/* Typed Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 h-8 font-mono">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Full-stack developer crafting polished software and web experiences. 
            Specializing in modern architectures and seamless user interfaces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="glow-sm hover:glow transition-all"
              asChild
            >
              <Link href="#projects">
                View My Work
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              asChild
            >
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub Profile
              </a>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <Link 
              href="#about" 
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border hover:border-primary transition-colors"
            >
              <ArrowDown className="h-4 w-4 text-muted-foreground" />
              <span className="sr-only">Scroll down</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/3 left-10 w-3 h-3 bg-primary rounded-full animate-float opacity-60" />
      <div className="absolute top-1/2 right-20 w-2 h-2 bg-accent rounded-full animate-float-delayed opacity-40" />
      <div className="absolute bottom-1/3 left-1/4 w-4 h-4 border border-primary/40 rounded-full animate-float" />
    </section>
  )
}
