"use client"

import { Code2, Cpu, Globe, Zap } from "lucide-react"

const skills = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "Building end-to-end applications with modern frameworks and best practices."
  },
  {
    icon: Globe,
    title: "Web Architecture",
    description: "Designing scalable systems that handle millions of requests."
  },
  {
    icon: Cpu,
    title: "System Design",
    description: "Creating efficient, maintainable, and performant software solutions."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Ensuring lightning-fast experiences for every user interaction."
  }
]

const techStack = [
  "TypeScript", "React", "Next.js", "Node.js", 
  "Python", "PostgreSQL", "Redis", "AWS",
  "Docker", "GraphQL", "Tailwind CSS", "Rust"
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              About
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-4 text-balance">
              Crafting Digital Experiences
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto leading-relaxed">
              I&apos;m a developer passionate about creating accessible, pixel-perfect user 
              interfaces that blend thoughtful design with robust engineering.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {skills.map((skill, index) => (
              <div 
                key={skill.title}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:glow-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <skill.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{skill.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-6">Technologies I Work With</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
