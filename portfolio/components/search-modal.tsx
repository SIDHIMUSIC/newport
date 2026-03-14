"use client"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  X, 
  Star,
  GitFork,
  Code2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  User,
  Mail,
  FileText,
  Copy,
  Check
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchResult {
  id: string
  type: "project" | "case-study" | "prompt-chatgpt" | "prompt-gemini" | "section" | "social"
  title: string
  description: string
  url?: string
  stars?: number
  featured?: boolean
  copyText?: string
}

// All searchable content
const searchableItems: SearchResult[] = [
  // Projects
  {
    id: "p1",
    type: "project",
    title: "ai-code-assistant",
    description: "AI-powered code assistant that helps you write better code faster",
    url: "https://github.com",
    stars: 2134,
    featured: true
  },
  {
    id: "p2",
    type: "project",
    title: "next-auth-starter",
    description: "A production-ready authentication starter kit for Next.js",
    url: "https://github.com",
    stars: 1247,
    featured: true
  },
  {
    id: "p3",
    type: "project",
    title: "react-component-library",
    description: "Beautiful, accessible React components built with Tailwind CSS",
    url: "https://github.com",
    stars: 892
  },
  // Case Studies
  {
    id: "cs1",
    type: "case-study",
    title: "E-Commerce Platform Optimization",
    description: "Reduced cart abandonment by 45%, improved conversions by 32%"
  },
  {
    id: "cs2",
    type: "case-study",
    title: "Real-time Collaboration Engine",
    description: "Built a CRDT-based collaboration engine supporting 10,000+ concurrent users"
  },
  // ChatGPT Prompts
  {
    id: "cg1",
    type: "prompt-chatgpt",
    title: "Code Review Expert",
    description: "Act as a senior software engineer and review my code",
    copyText: "Act as a senior software engineer and review my code. Focus on performance, security, and best practices. Provide specific suggestions with code examples."
  },
  {
    id: "cg2",
    type: "prompt-chatgpt",
    title: "Debug Assistant",
    description: "You are a debugging expert. I will share my error and code",
    copyText: "You are a debugging expert. I will share my error and code. Help me identify the root cause and provide a step-by-step solution."
  },
  {
    id: "cg3",
    type: "prompt-chatgpt",
    title: "API Designer",
    description: "Design a RESTful API for the following requirements",
    copyText: "Design a RESTful API for the following requirements. Include endpoints, request/response formats, authentication, and error handling."
  },
  // Gemini Prompts
  {
    id: "gm1",
    type: "prompt-gemini",
    title: "Architecture Advisor",
    description: "Analyze my system architecture and suggest improvements",
    copyText: "Analyze my system architecture and suggest improvements for scalability, maintainability, and performance. Consider microservices, caching, and load balancing."
  },
  {
    id: "gm2",
    type: "prompt-gemini",
    title: "Documentation Writer",
    description: "Generate comprehensive documentation for my code",
    copyText: "Generate comprehensive documentation for my code including setup instructions, API references, and usage examples in markdown format."
  },
  {
    id: "gm3",
    type: "prompt-gemini",
    title: "Test Generator",
    description: "Create unit tests and integration tests for the code",
    copyText: "Create unit tests and integration tests for the following code. Include edge cases, error scenarios, and use appropriate testing frameworks."
  },
  // Sections
  {
    id: "s1",
    type: "section",
    title: "About Me",
    description: "Learn about ʜᴀʀʀʏ - problem solver and code architect",
    url: "#about"
  },
  {
    id: "s2",
    type: "section",
    title: "Projects",
    description: "View all projects and case studies",
    url: "#projects"
  },
  {
    id: "s3",
    type: "section",
    title: "GitHub Activity",
    description: "See GitHub repositories and contribution graph",
    url: "#github"
  },
  {
    id: "s4",
    type: "section",
    title: "AI Prompts",
    description: "ChatGPT and Gemini prompt collection",
    url: "#prompts"
  },
  {
    id: "s5",
    type: "section",
    title: "Contact",
    description: "Get in touch with me",
    url: "#contact"
  },
  // Social
  {
    id: "so1",
    type: "social",
    title: "GitHub Profile",
    description: "View my GitHub profile and repositories",
    url: "https://github.com"
  },
  {
    id: "so2",
    type: "social",
    title: "LinkedIn",
    description: "Connect with me on LinkedIn",
    url: "https://linkedin.com"
  },
  {
    id: "so3",
    type: "social",
    title: "Twitter",
    description: "Follow me on Twitter",
    url: "https://twitter.com"
  }
]

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

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

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const filters = [
    { id: "all", label: "All" },
    { id: "project", label: "Projects" },
    { id: "prompt", label: "Prompts" },
    { id: "section", label: "Sections" },
  ]

  // Filter results based on query and active filter
  useEffect(() => {
    let filtered = searchableItems

    // Apply type filter
    if (activeFilter !== "all") {
      if (activeFilter === "prompt") {
        filtered = filtered.filter(item => item.type.startsWith("prompt"))
      } else {
        filtered = filtered.filter(item => item.type === activeFilter)
      }
    }

    // Apply search query
    if (query.trim()) {
      filtered = filtered.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
      )
    } else {
      // Show featured items when no query
      filtered = filtered.filter(item => item.featured || item.type === "section").slice(0, 6)
    }

    setResults(filtered)
    setSelectedIndex(0)
  }, [query, activeFilter])

  // Handle copy
  const handleCopy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case "ArrowUp":
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case "Enter":
          e.preventDefault()
          const selected = results[selectedIndex]
          if (selected?.copyText) {
            handleCopy(selected.copyText, selected.id)
          } else if (selected?.url) {
            if (selected.url.startsWith("#")) {
              onClose()
              document.querySelector(selected.url)?.scrollIntoView({ behavior: "smooth" })
            } else {
              window.open(selected.url, "_blank")
            }
          }
          break
        case "Escape":
          onClose()
          break
      }
    },
    [isOpen, results, selectedIndex, onClose]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  // Close on backdrop click
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      setQuery("")
      setActiveFilter("all")
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "project":
        return <Code2 className="h-4 w-4" />
      case "case-study":
        return <FileText className="h-4 w-4" />
      case "prompt-chatgpt":
        return <ChatGPTLogo className="h-4 w-4" />
      case "prompt-gemini":
        return <GeminiLogo className="h-4 w-4" />
      case "section":
        return <Sparkles className="h-4 w-4" />
      case "social":
        return <User className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "project":
        return "Repository"
      case "case-study":
        return "Case Study"
      case "prompt-chatgpt":
        return "ChatGPT"
      case "prompt-gemini":
        return "Gemini"
      case "section":
        return "Section"
      case "social":
        return "Social"
      default:
        return "Item"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "project":
        return "bg-blue-500/10 text-blue-500"
      case "case-study":
        return "bg-amber-500/10 text-amber-500"
      case "prompt-chatgpt":
        return "bg-emerald-500/10 text-emerald-500"
      case "prompt-gemini":
        return "bg-indigo-500/10 text-indigo-500"
      case "section":
        return "bg-primary/10 text-primary"
      case "social":
        return "bg-pink-500/10 text-pink-500"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative mx-auto max-w-2xl mt-[10vh] px-4">
        <div className="glass rounded-2xl shadow-2xl overflow-hidden glow">
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <Search className="h-5 w-5 text-primary shrink-0" />
            <Input
              type="text"
              placeholder="Search everything... projects, prompts, sections"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0 text-lg"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-2 border-b border-border overflow-x-auto">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="shrink-0"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-y-auto p-2">
            {results.length === 0 && query.trim() && (
              <div className="text-center py-12 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No results found for &ldquo;{query}&rdquo;</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-1">
                {!query.trim() && activeFilter === "all" && (
                  <p className="px-3 py-2 text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Quick Access
                  </p>
                )}
                
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg transition-all cursor-pointer",
                      selectedIndex === index
                        ? "bg-primary/10"
                        : "hover:bg-secondary",
                      copiedId === result.id && "bg-primary/20"
                    )}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      if (result.copyText) {
                        handleCopy(result.copyText, result.id)
                      } else if (result.url) {
                        if (result.url.startsWith("#")) {
                          onClose()
                          document.querySelector(result.url)?.scrollIntoView({ behavior: "smooth" })
                        } else {
                          window.open(result.url, "_blank")
                        }
                      }
                    }}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                      getTypeColor(result.type)
                    )}>
                      {getTypeIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium truncate">{result.title}</span>
                        {result.featured && (
                          <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary shrink-0">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {result.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground">
                          {getTypeLabel(result.type)}
                        </span>
                        {result.stars && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3" />
                            {result.stars.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    {result.copyText && (
                      <div className="shrink-0">
                        {copiedId === result.id ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    )}
                    {result.url && !result.copyText && (
                      <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 border-t border-border text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono">Tab</kbd>
                Filter
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono">Enter</kbd>
                Select/Copy
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-secondary font-mono">Esc</kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
