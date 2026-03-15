"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Copy, 
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Prompt {
  id: string
  text: string
  title: string
  createdAt: string
}

interface AIPromptsData {
  chatgpt: Prompt[]
  gemini: Prompt[]
}

// ============================================
// YOUR PROMPTS - EDIT HERE TO ADD/REMOVE
// ============================================
const promptsData: AIPromptsData = {
  chatgpt: [
    {
      id: "cg1",
      title: "Sky Pic",
      text: "A low-angle, cinematic portrait of a young man with a focused, contemplative gaze looking toward the upper right. He has voluminous, messy dark hair with textured curls that catch the natural light. His expression is serene yet determined, captured in a "hero" perspective that emphasizes the vastness of the sky above him. Technical Details • Pose: A dramatic worm's-eye view looking up at the subject. The man is slightly turned, showcasing a sharp jawline and a thoughtful upward gaze. · Attire: He wears a charcoal black button-down linen shirt with a visible chest pocket. The fabric has a soft, organic texture, and the top button is left open for a relaxed, effortless look • Color Palette: A moody, muted aesthetic featuring desaturated blues, slate greys, and warm skin tones. The image has a subtle filmic grain and a vintage "indie-film" color grade • Background: A wide, expansive blue sky filled with soft, wispy white clouds. The lighting is diffused, suggesting an overcast day or the "blue hour,'casting soft shadows without harsh highlights. Style Note: Aim for a 35mm film photography style with slight noise and high dynamic range to maintain detail in both the dark shirt and the bright clouds.",
      createdAt: "2026-03-14"
    },
    {
      id: "cg2",
      title: "Debug Assistant",
      text: "You are a debugging expert. I will share my error and code. Help me identify the root cause and provide a step-by-step solution.",
      createdAt: "2026-03-13"
    },
    {
      id: "cg3",
      title: "API Designer",
      text: "Design a RESTful API for the following requirements. Include endpoints, request/response formats, authentication, and error handling.",
      createdAt: "2026-03-12"
    },
    {
      id: "cg4",
      title: "Explain Like I'm 5",
      text: "Explain the following concept in simple terms that a 5-year-old could understand. Use analogies and examples from everyday life.",
      createdAt: "2026-03-11"
    },
    {
      id: "cg5",
      title: "Code Optimizer",
      text: "Optimize the following code for better performance. Explain each optimization and its impact. Keep the code readable and maintainable.",
      createdAt: "2026-03-10"
    }
  ],
  gemini: [
    {
      id: "gm1",
      title: "Architecture Advisor",
      text: "Analyze my system architecture and suggest improvements for scalability, maintainability, and performance. Consider microservices, caching, and load balancing.",
      createdAt: "2026-03-14"
    },
    {
      id: "gm2",
      title: "Documentation Writer",
      text: "Generate comprehensive documentation for my code including setup instructions, API references, and usage examples in markdown format.",
      createdAt: "2026-03-13"
    },
    {
      id: "gm3",
      title: "Test Generator",
      text: "Create unit tests and integration tests for the following code. Include edge cases, error scenarios, and use appropriate testing frameworks.",
      createdAt: "2026-03-12"
    },
    {
      id: "gm4",
      title: "Security Auditor",
      text: "Perform a security audit on the following code. Identify vulnerabilities, potential attack vectors, and provide recommendations for fixing them.",
      createdAt: "2026-03-11"
    },
    {
      id: "gm5",
      title: "Refactoring Guide",
      text: "Refactor the following code following SOLID principles and clean code practices. Explain the changes and why they improve the code quality.",
      createdAt: "2026-03-10"
    }
  ]
}
// ============================================

// ChatGPT Logo SVG
function ChatGPTLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  )
}

// Gemini Logo SVG
function GeminiLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm0 2.4c5.302 0 9.6 4.298 9.6 9.6s-4.298 9.6-9.6 9.6S2.4 17.302 2.4 12 6.698 2.4 12 2.4zm0 1.8c-1.59 0-3.09.42-4.38 1.14L12 12l4.38-6.66A7.755 7.755 0 0 0 12 4.2zm-5.52 2.1A7.72 7.72 0 0 0 4.2 12c0 1.59.42 3.09 1.14 4.38L12 12 6.48 6.3zm11.04 0L12 12l6.66 4.38A7.755 7.755 0 0 0 19.8 12c0-1.59-.42-3.09-1.14-4.38l-.14-.22zM12 12l-6.66 4.38A7.755 7.755 0 0 0 12 19.8c1.59 0 3.09-.42 4.38-1.14L12 12z"/>
    </svg>
  )
}

export function AIPromptsSection() {
  const [activeTab, setActiveTab] = useState<'chatgpt' | 'gemini'>('chatgpt')
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [glowingId, setGlowingId] = useState<string | null>(null)

  const currentPrompts = promptsData[activeTab]
  const visiblePrompts = isExpanded ? currentPrompts : currentPrompts.slice(0, 3)

  const handleCopy = async (prompt: Prompt) => {
    await navigator.clipboard.writeText(prompt.text)
    setCopiedId(prompt.id)
    setGlowingId(prompt.id)
    
    setTimeout(() => setCopiedId(null), 2000)
    setTimeout(() => setGlowingId(null), 600)
  }

  return (
    <section id="prompts" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              AI Prompts
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-balance">
              My Prompt Collection
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Curated prompts for ChatGPT and Gemini. Touch any prompt to copy it instantly.
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2 font-mono">
              Managed by ʜᴀʀʀʏ
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex justify-center gap-4 mb-10">
            <Button
              variant={activeTab === 'chatgpt' ? 'default' : 'outline'}
              size="lg"
              onClick={() => {
                setActiveTab('chatgpt')
                setIsExpanded(false)
              }}
              className={cn(
                "gap-2 transition-all",
                activeTab === 'chatgpt' && "glow-sm"
              )}
            >
              <ChatGPTLogo className="h-5 w-5" />
              ChatGPT
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-background/20">
                {promptsData.chatgpt.length}
              </span>
            </Button>
            <Button
              variant={activeTab === 'gemini' ? 'default' : 'outline'}
              size="lg"
              onClick={() => {
                setActiveTab('gemini')
                setIsExpanded(false)
              }}
              className={cn(
                "gap-2 transition-all",
                activeTab === 'gemini' && "glow-sm"
              )}
            >
              <GeminiLogo className="h-5 w-5" />
              Gemini
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-background/20">
                {promptsData.gemini.length}
              </span>
            </Button>
          </div>

          {/* Prompts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {visiblePrompts.map((prompt, index) => (
              <div
                key={prompt.id}
                onClick={() => handleCopy(prompt)}
                className={cn(
                  "group relative cursor-pointer rounded-2xl p-6 transition-all duration-300",
                  "bg-card border border-border hover:border-primary/50",
                  "hover:scale-[1.02] hover:shadow-lg",
                  "active:scale-[0.98]",
                  glowingId === prompt.id && "animate-pulse-glow border-primary",
                  copiedId === prompt.id && "border-primary bg-primary/5"
                )}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                      activeTab === 'chatgpt' 
                        ? "bg-emerald-500/10 text-emerald-500" 
                        : "bg-blue-500/10 text-blue-500"
                    )}>
                      {activeTab === 'chatgpt' ? (
                        <ChatGPTLogo className="h-5 w-5" />
                      ) : (
                        <GeminiLogo className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{prompt.title}</h4>
                      <p className="text-xs text-muted-foreground">{prompt.createdAt}</p>
                    </div>
                  </div>
                </div>

                {/* Prompt Text */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {prompt.text}
                </p>

                {/* Copy Button */}
                <div className={cn(
                  "flex items-center justify-center gap-2 py-3 rounded-xl transition-all",
                  "bg-secondary/50 group-hover:bg-primary group-hover:text-primary-foreground",
                  copiedId === prompt.id && "bg-primary text-primary-foreground"
                )}>
                  {copiedId === prompt.id ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span className="text-sm font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span className="text-sm font-medium">Touch to Copy</span>
                    </>
                  )}
                </div>

                {/* Glow Effect Overlay */}
                {glowingId === prompt.id && (
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 animate-ping pointer-events-none" />
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {currentPrompts.length === 0 && (
            <div className="text-center py-16">
              <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No prompts yet</h3>
              <p className="text-muted-foreground">
                Coming soon...
              </p>
            </div>
          )}

          {/* Expand/Collapse Button */}
          {currentPrompts.length > 3 && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                onClick={() => setIsExpanded(!isExpanded)}
                className="group"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="h-4 w-4 mr-2 group-hover:-translate-y-1 transition-transform" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4 mr-2 group-hover:translate-y-1 transition-transform" />
                    Show All {currentPrompts.length} Prompts
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8 pt-8 border-t border-border">
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <ChatGPTLogo className="h-4 w-4 text-emerald-500" />
                <span className="text-2xl font-bold">{promptsData.chatgpt.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">ChatGPT Prompts</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <GeminiLogo className="h-4 w-4 text-blue-500" />
                <span className="text-2xl font-bold">{promptsData.gemini.length}</span>
              </div>
              <p className="text-sm text-muted-foreground">Gemini Prompts</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================
// HOW TO ADD NEW PROMPTS:
// 1. Find the promptsData object above
// 2. Add new prompt to chatgpt or gemini array:
//    {
//      id: "unique-id",
//      title: "Prompt Title",
//      text: "Your prompt text here...",
//      createdAt: "2026-03-14"
//    }
// ============================================
