"use client"

import { Button } from "@/components/ui/button"
import { 
  Star, 
  GitFork, 
  ExternalLink,
  Sparkles
} from "lucide-react"

interface FeaturedProjectProps {
  name: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
}

const defaultProject: FeaturedProjectProps = {
  name: "ai-code-assistant",
  description: "AI-powered code assistant that helps you write better code faster. Uses advanced LLM technology to provide intelligent suggestions, refactoring, and documentation.",
  stars: 2134,
  forks: 389,
  language: "Python",
  url: "https://github.com"
}

export function FeaturedProject({ project = defaultProject }: { project?: FeaturedProjectProps }) {
  return (
    <div className="fixed top-24 right-6 z-40 hidden xl:block">
      <div className="glass rounded-xl p-4 w-72 glow-sm animate-float">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-primary">Top Project</span>
        </div>

        {/* Project Info */}
        <a 
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <h4 className="font-semibold group-hover:text-primary transition-colors mb-1">
            {project.name}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
            {project.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              {project.language}
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3" />
              {project.stars.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-3 w-3" />
              {project.forks.toLocaleString()}
            </span>
          </div>

          {/* CTA */}
          <Button size="sm" variant="outline" className="w-full text-xs">
            View on GitHub
            <ExternalLink className="ml-1 h-3 w-3" />
          </Button>
        </a>
      </div>
    </div>
  )
}
