"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Bot, User, Sparkles, Mic } from "lucide-react";
import { findBestSectionAnswer, SECTION_FALLBACK } from "@/data/mySection";
import { findBestAnswer } from "@/data/chatbotQA";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  isTyping?: boolean;
}

// ChatbotEntry interface removed — now handled by chatbotQA.ts

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi, I'm Amit's AI Assistant! Ask me anything about his education, projects, skills, or certifications.",
    },
  ]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Suggestions for user to click
  const suggestions = [
    "Tell me about Amit",
    "Show AI projects",
    "What technologies does he know?",
    "Show education summary",
  ];

  // Listen to external toggle event (e.g., from command palette)
  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => {
        if (prev && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
        return !prev;
      });
    };
    window.addEventListener("toggle-chatbot", handleToggle);
    return () => window.removeEventListener("toggle-chatbot", handleToggle);
  }, []);

  // Autofocus input when drawer opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isBotThinking]);

  // Function to read text aloud using Web Speech API
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Fetch available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find a male voice (Microsoft David, Google Male, etc.)
      const maleVoice = voices.find(v => 
        v.name.includes("Male") || 
        v.name.includes("David") || 
        v.name.includes("Mark") || 
        v.name.includes("Guy")
      ) || voices.find(v => v.lang.startsWith("en-") && !v.name.includes("Female") && !v.name.includes("Zira"));
      
      if (maleVoice) {
        utterance.voice = maleVoice;
      }
      
      // Make it sound like a younger student (higher pitch makes it less deep/mature)
      utterance.rate = 1.1; 
      utterance.pitch = 1.6; 
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // AI response engine — mySection.ts (primary) + chatbotQA.ts (fallback)
  const processQuery = (query: string): string => {
    // 1st: Try the richer mySection knowledge base
    const sectionResult = findBestSectionAnswer(query);
    if (sectionResult) return sectionResult;

    // 2nd: Try chatbotQA as backup
    const qaResult = findBestAnswer(query);
    if (qaResult) return qaResult;

    // 3rd: Generic fallback
    return SECTION_FALLBACK;
  };

  const handleVoiceRecording = () => {
    if (isListening) return; // Prevent starting multiple instances

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice input. Try using Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Can be adapted to other languages
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setInput(""); // clear input when starting to listen
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      // Auto send after successful recognition
      setTimeout(() => handleSend(transcript), 600);
    };

    recognition.onerror = (event: any) => {
      // Use console.warn instead of console.error to prevent Next.js from throwing a dev overlay
      // 'aborted' and 'no-speech' are common and non-fatal
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        console.warn("Speech recognition issue:", event.error);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSend = (textToSend: string) => {
    if (!textToSend.trim()) return;

    // ✅ Immediately stop any ongoing speech so new answer takes over
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // ✅ Cancel any previous pending bot response (fixes race condition)
    if (thinkingTimerRef.current) {
      clearTimeout(thinkingTimerRef.current);
      thinkingTimerRef.current = null;
    }

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsBotThinking(true);

    // Simulate AI thinking and typing latency
    thinkingTimerRef.current = setTimeout(() => {
      const responseText = processQuery(textToSend);
      setIsBotThinking(false);
      
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: responseText,
      };
      setMessages((prev) => [...prev, botMessage]);
      
      // Speak the bot's response out loud
      speakText(responseText);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[900]">
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg hover:shadow-primary/30 cursor-pointer border border-white/10 relative"
        aria-label="Open AI Assistant"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5 animate-pulse" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
          </span>
        )}
      </motion.button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] h-[480px] rounded-2xl glass-card bg-zinc-950/95 border-zinc-800 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-zinc-900/60 px-4 py-3 border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-100 flex items-center gap-1">
                    Aetheria Assistant
                    <Sparkles className="w-3 h-3 text-secondary animate-pulse" />
                  </h4>
                  <span className="text-[9px] text-zinc-500 font-mono">Profile Agent v1.2</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                }}
                className="p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message History area */}
            <div
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar bg-zinc-950/20"
            >
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${!isBot ? "flex-row-reverse" : ""}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] ${
                        isBot ? "bg-primary/10 text-primary border border-primary/25" : "bg-zinc-800 text-zinc-200"
                      }`}
                    >
                      {isBot ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </div>

                    {/* Speech bubble */}
                    <div className="max-w-[75%] space-y-1">
                      <div
                        className={`text-xs px-3.5 py-2.5 rounded-2xl border ${
                          isBot
                            ? "bg-zinc-900/40 text-zinc-300 border-zinc-800/60 rounded-tl-none"
                            : "bg-primary text-white border-primary rounded-tr-none shadow-md shadow-primary/10"
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed font-sans">{msg.text}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bot thinking bubble */}
              {isBotThinking && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full shrink-0 bg-primary/10 text-primary border border-primary/25 flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-800/60 px-3.5 py-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1 items-center h-2">
                      <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions Chips */}
            {messages.length === 1 && (
              <div className="px-4 py-2 flex flex-wrap gap-1.5 border-t border-zinc-800/40 bg-zinc-900/10">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-[10px] text-zinc-400 hover:text-primary bg-zinc-900 hover:bg-zinc-900/60 border border-zinc-800/80 hover:border-primary/30 px-2 py-1 rounded-full cursor-pointer transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Chat Input form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="p-3 border-t border-zinc-800/80 bg-zinc-900/30 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/60 text-xs text-zinc-200 placeholder-zinc-500 rounded-xl px-3 py-2 focus:outline-none focus:border-primary transition-colors focus:ring-0"
              />
              <button
                type="button"
                onClick={handleVoiceRecording}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isListening 
                    ? "bg-red-500/20 text-red-500 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)] animate-pulse" 
                    : "bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50"
                }`}
                title="Use Voice Command"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
              <button
                type="submit"
                disabled={!input.trim() || isBotThinking}
                className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:bg-zinc-800 disabled:text-zinc-600 transition-colors shadow-md shadow-primary/10 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
