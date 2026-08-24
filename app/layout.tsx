import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://amitjatthap.dev"),
  title: "Amit Jatthap — Full Stack Engineer & AI Developer",
  description:
    "Premium developer portfolio of Amit Jatthap — Senior Full Stack Engineer and AI Developer specializing in Next.js, LangChain, FastAPI, and agentic RAG pipelines.",
  keywords: [
    "Amit Jatthap",
    "Full Stack Engineer",
    "AI Developer",
    "Next.js",
    "LangChain",
    "FastAPI",
    "React",
    "TypeScript",
    "Portfolio",
    "RAG",
    "LangGraph",
  ],
  authors: [{ name: "Amit Jatthap", url: "https://github.com/amitjatthap" }],
  creator: "Amit Jatthap",
  openGraph: {
    title: "Amit Jatthap — Full Stack Engineer & AI Developer",
    description:
      "Premium portfolio showcasing AI systems, full stack applications, and interactive web experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Amit Jatthap Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amit Jatthap — Full Stack & AI Developer",
    description:
      "Premium portfolio showcasing AI systems, full stack applications, and interactive web experiences.",
    creator: "@amitjatthap",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
