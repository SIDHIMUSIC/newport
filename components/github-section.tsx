"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Star,
  GitFork,
  ExternalLink,
  Code2,
  Activity,
} from "lucide-react"

const GITHUB_USERNAME = "SIDHIMUSIC"

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

function generateContributionData(): ContributionDay[] {
  const days: ContributionDay[] = []
  const today = new Date()

  for (let i = 364; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const count = Math.floor(Math.random() * 10)

    days.push({
      date: date.toISOString().split("T")[0],
      count,
      level:
        count === 0
          ? 0
          : count < 3
          ? 1
          : count < 6
          ? 2
          : count < 9
          ? 3
          : 4,
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
    async function fetchGitHubRepos() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos`
        )

        const data = await res.json()

        const formattedRepos = data.map((repo: any) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          updated_at: repo.updated_at,
          topics: repo.topics || [],
        }))

        setRepos(formattedRepos)
        setContributions(generateContributionData())
        setLoading(false)
      } catch (error) {
        console.error("GitHub fetch error:", error)
        setLoading(false)
      }
    }

    fetchGitHubRepos()
  }, [])

  const totalStars = repos.reduce(
    (acc, repo) => acc + repo.stargazers_count,
    0
  )

  const totalForks = repos.reduce(
    (acc, repo) => acc + repo.forks_count,
    0
  )

  const totalContributions = contributions.reduce(
    (acc, day) => acc + day.count,
    0
  )

  const weeks: ContributionDay[][] = []
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7))
  }

  return (
    <section id="github" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm uppercase">
            Open Source
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold mt-4">
            GitHub Activity
          </h2>

          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Contributing to open-source and building tools developers love.
          </p>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">

          <div className="p-6 rounded-xl bg-card border text-center">
            <div className="text-3xl font-bold text-primary">
              {repos.length}
            </div>
            <div className="text-sm text-muted-foreground">
              Repositories
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border text-center">
            <div className="text-3xl font-bold text-primary">
              {totalStars.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Stars
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border text-center">
            <div className="text-3xl font-bold text-primary">
              {totalForks.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Total Forks
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border text-center">
            <div className="text-3xl font-bold text-primary">
              {totalContributions.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Contributions
            </div>
          </div>

        </div>

        {/* Repo Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {repos.map((repo) => (

            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl bg-card border hover:border-primary/50 transition"
            >

              <div className="flex items-center justify-between mb-3">

                <div className="flex items-center gap-2">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold group-hover:text-primary">
                    {repo.name}
                  </h3>
                </div>

                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100" />

              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {repo.description || "No description"}
              </p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">

                {repo.language && (
                  <div className="flex items-center gap-1">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        languageColors[repo.language] || "bg-gray-500"
                      }`}
                    />
                    {repo.language}
                  </div>
                )}

                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  {repo.stargazers_count}
                </div>

                <div className="flex items-center gap-1">
                  <GitFork className="h-4 w-4" />
                  {repo.forks_count}
                </div>

              </div>

            </a>

          ))}

        </div>

        {/* View GitHub */}

        <div className="text-center mt-12">

          <Button variant="outline" asChild>

            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View All Repositories
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>

          </Button>

        </div>

      </div>
    </section>
  )
}
