"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { GitHubSection } from "@/components/github-section"
import { AIPromptsSection } from "@/components/ai-prompts-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { QuickContact } from "@/components/quick-contact"
import { SearchModal } from "@/components/search-modal"
import { FeaturedProject } from "@/components/featured-project"
import  ChatBot  from "@/components/ChatBot"

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false)

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation onSearchOpen={() => setSearchOpen(true)} />


      {/* Main Content */}
      <main>
        {/* Hero */}
        <HeroSection />

        {/* About */}
        <AboutSection />

        {/* Case Studies / Problem Solver */}
        <ProjectsSection />

        {/* GitHub Activity */}
        <GitHubSection />

        {/* AI Prompts - ChatGPT & Gemini */}
        <AIPromptsSection />

        {/* Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Quick Contact */}
      <QuickContact />

      {/* AI ChatBot */}
      <ChatBot />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
