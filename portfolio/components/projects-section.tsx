"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Lightbulb, 
  Target,
  TrendingUp,
  ExternalLink
} from "lucide-react"

interface CaseStudy {
  id: string
  title: string
  problem: string
  solution: string
  impact: string
  tags: string[]
  featured?: boolean
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "E-Commerce Platform Optimization",
    problem: "High cart abandonment rate (78%) and slow page load times affecting conversions.",
    solution: "Implemented server-side rendering, optimized images with lazy loading, and redesigned the checkout flow with progressive form validation.",
    impact: "Reduced abandonment by 45%, improved LCP by 60%, increased conversions by 32%.",
    tags: ["Performance", "UX", "Next.js"],
    featured: true
  },
  {
    id: "2",
    title: "Real-time Collaboration Engine",
    problem: "Legacy system couldn't handle concurrent users editing same documents.",
    solution: "Built a CRDT-based collaboration engine with WebSocket connections and operational transformation.",
    impact: "Supports 10,000+ concurrent users with <50ms sync latency.",
    tags: ["Architecture", "WebSocket", "Rust"],
    featured: true
  },
  {
    id: "3",
    title: "API Gateway Redesign",
    problem: "Monolithic API causing bottlenecks and deployment challenges.",
    solution: "Migrated to microservices architecture with a custom API gateway handling rate limiting, authentication, and load balancing.",
    impact: "99.99% uptime, 5x throughput improvement, independent deployments.",
    tags: ["Microservices", "DevOps", "Go"]
  },
  {
    id: "4",
    title: "ML Pipeline Automation",
    problem: "Manual model training and deployment taking weeks.",
    solution: "Created an automated MLOps pipeline with feature stores, model versioning, and A/B testing infrastructure.",
    impact: "Reduced deployment time from weeks to hours, enabled rapid experimentation.",
    tags: ["MLOps", "Python", "AWS"]
  },
  {
    id: "5",
    title: "Design System Implementation",
    problem: "Inconsistent UI across 12 different products in the organization.",
    solution: "Built a comprehensive design system with 50+ components, documentation, and automated visual regression testing.",
    impact: "40% faster development, consistent brand experience, reduced QA time.",
    tags: ["Design Systems", "React", "Storybook"]
  },
  {
    id: "6",
    title: "Database Migration Strategy",
    problem: "PostgreSQL database hitting performance limits at scale.",
    solution: "Designed and executed a zero-downtime migration to a distributed database with proper sharding strategy.",
    impact: "Handled 10x data growth, maintained sub-10ms query times.",
    tags: ["Database", "PostgreSQL", "Scaling"]
  }
]

export function ProjectsSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const featuredProjects = caseStudies.filter(cs => cs.featured)
  const otherProjects = caseStudies.filter(cs => !cs.featured)

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-balance">
              Problem Solver
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Every challenge is an opportunity to innovate. Here are some problems I&apos;ve solved 
              and the impact they&apos;ve made.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {featuredProjects.map((study) => (
              <div
                key={study.id}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:glow"
                onMouseEnter={() => setHoveredId(study.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Featured Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                    Featured
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-6 pr-20">{study.title}</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">The Problem</p>
                      <p className="text-sm text-muted-foreground">{study.problem}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">The Solution</p>
                      <p className="text-sm text-muted-foreground">{study.solution}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">The Impact</p>
                      <p className="text-sm text-muted-foreground">{study.impact}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Hover Arrow */}
                <div className={`absolute bottom-8 right-8 transition-all duration-300 ${hoveredId === study.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                  <ArrowRight className="h-5 w-5 text-primary" />
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherProjects.map((study) => (
              <div
                key={study.id}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors text-sm">
                  {study.title}
                </h4>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
                  {study.problem}
                </p>
                <div className="flex flex-wrap gap-1">
                  {study.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Case Studies
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
