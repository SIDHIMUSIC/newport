"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  GitFork, 
  ExternalLink, 
  Code2,
  Activity,
  Calendar
} from "lucide-react"

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
}

interface ContributionDay {
  date: string
  count: number
  level: number
}

// Mock data for demonstration (replace with real API calls)
const mockRepos: Repository[] = [
  {
    id: 1,
    name: "next-auth-starter",
    description: "A production-ready authentication starter kit for Next.js applications",
    html_url: "https://github.com",
    stargazers_count: 1247,
    forks_count: 234,
    language: "TypeScript",
    updated_at: "2026-03-10T10:00:00Z",
    topics: ["nextjs", "auth", "typescript"]
  },
  {
    id: 2,
    name: "react-component-library",
    description: "Beautiful, accessible React components built with Tailwind CSS",
    html_url: "https://github.com",
    stargazers_count: 892,
    forks_count: 156,
    language: "TypeScript",
    updated_at: "2026-03-08T14:30:00Z",
    topics: ["react", "tailwind", "components"]
  },
  {
    id: 3,
    name: "ai-code-assistant",
    description: "AI-powered code assistant that helps you write better code faster",
    html_url: "https://github.com",
    stargazers_count: 2134,
    forks_count: 389,
    language: "Python",
    updated_at: "2026-03-12T09:15:00Z",
    topics: ["ai", "python", "llm"]
  },
  {
    id: 4,
    name: "serverless-api-framework",
    description: "A lightweight framework for building serverless APIs with TypeScript",
    html_url: "https://github.com",
    stargazers_count: 567,
    forks_count: 89,
    language: "TypeScript",
    updated_at: "2026-03-05T16:45:00Z",
    topics: ["serverless", "api", "aws"]
  },
  {
    id: 5,
    name: "database-migration-tool",
    description: "Zero-downtime database migrations made simple",
    html_url: "https://github.com",
    stargazers_count: 423,
    forks_count: 67,
    language: "Go",
    updated_at: "2026-02-28T11:20:00Z",
    topics: ["database", "migrations", "go"]
  },
  {
    id: 6,
    name: "realtime-collaboration",
    description: "Real-time collaboration engine for web applications",
    html_url: "https://github.com",
    stargazers_count: 756,
    forks_count: 134,
    language: "Rust",
    updated_at: "2026-03-01T08:00:00Z",
    topics: ["websocket", "collaboration", "rust"]
  }
]

// Generate mock contribution data
function generateContributionData(): ContributionDay[] {
  const days: ContributionDay[] = []
  const today = new Date()
  
  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const count = Math.floor(Math.random() * 12)
    days.push({
      date: date.toISOString().split('T')[0],
      count,
      level: count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 9 ? 3 : 4
    })
  }
  
  return days
}

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-green-500",
  Rust: "bg-orange-500",
  Go: "bg-cyan-500",
}

export function GitHubSection() {
  const [repos, setRepos] = useState<Repository[]>([])
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setRepos(mockRepos)
      setContributions(generateContributionData())
      setLoading(false)
    }, 500)
    
    return () => clearTimeout(timer)
  }, [])

  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0)
  const totalContributions = contributions.reduce((acc, day) => acc + day.count, 0)

  // Group contributions by week for the graph
  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <section id="github" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Open Source
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-balance">
              GitHub Activity
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Contributing to the open-source community and building tools that developers love.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary">{repos.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Repositories</div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary">{totalStars.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Stars</div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary">{totalForks.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">Total Forks</div>
            </div>
            <div className="p-6 rounded-xl bg-card border border-border text-center">
              <div className="text-3xl font-bold text-primary">{totalContributions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">Contributions</div>
            </div>
          </div>

          {/* Contribution Graph */}
          <div className="p-6 rounded-xl bg-card border border-border mb-12 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Contribution Activity</h3>
            </div>
            
            {loading ? (
              <div className="h-32 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="flex gap-1 min-w-fit">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={`w-3 h-3 rounded-sm transition-colors ${
                          day.level === 0 ? "bg-muted" :
                          day.level === 1 ? "bg-primary/30" :
                          day.level === 2 ? "bg-primary/50" :
                          day.level === 3 ? "bg-primary/70" :
                          "bg-primary"
                        }`}
                        title={`${day.count} contributions on ${day.date}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-sm bg-muted" />
                <div className="w-3 h-3 rounded-sm bg-primary/30" />
                <div className="w-3 h-3 rounded-sm bg-primary/50" />
                <div className="w-3 h-3 rounded-sm bg-primary/70" />
                <div className="w-3 h-3 rounded-sm bg-primary" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Repository Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-6 rounded-xl bg-card border border-border animate-pulse">
                  <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ))
            ) : (
              repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {repo.name}
                      </h3>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {repo.description || "No description provided"}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 rounded-full ${languageColors[repo.language] || "bg-gray-500"}`} />
                        {repo.language}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {repo.stargazers_count.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      {repo.forks_count.toLocaleString()}
                    </div>
                  </div>
                  
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs rounded-md bg-primary/10 text-primary"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))
            )}
          </div>

          {/* View More */}
          <div className="text-center mt-12">
            <Button variant="outline" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                View All Repositories
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
