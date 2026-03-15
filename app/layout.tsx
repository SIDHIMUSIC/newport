import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geist = Geist({
subsets: ["latin"],
variable: "--font-sans",
})

const geistMono = Geist_Mono({
subsets: ["latin"],
variable: "--font-mono",
})

export const metadata: Metadata = {
title: "Harry Portfolio | Full Stack Developer",
description:
"Problem Solver. Code Architect. Building the future through elegant solutions.",
keywords: [
"developer",
"portfolio",
"software engineer",
"full stack developer",
"web development",
],
authors: [{ name: "Harry" }],
creator: "Harry",

icons: {
icon: "/icon.svg",
apple: "/apple-icon.png",
},
}

export const viewport: Viewport = {
width: "device-width",
initialScale: 1,
themeColor: "#0f0f1a",
}

export default function RootLayout({
children,
}: {
children: React.ReactNode
}) {
return (
<html lang="en" suppressHydrationWarning>
<body
className={"${geist.variable} ${geistMono.variable} font-sans antialiased"}
>
<ThemeProvider
attribute="class"
defaultTheme="dark"
enableSystem
disableTransitionOnChange
>
{children}
</ThemeProvider>

    <Analytics />
  </body>
</html>

)
}
