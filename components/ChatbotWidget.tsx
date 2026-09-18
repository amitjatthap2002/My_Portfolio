"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Mic,
  MicOff,
  Send,
  Sparkles,
  User,
  Volume2,
  X,
} from "lucide-react";
import { findBestSectionAnswer, SECTION_FALLBACK } from "@/data/mySection";
import { findBestAnswer } from "@/data/chatbotQA";

/* ─────────────────────── types ─────────────────────── */
interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
}

type VoiceStatus =
  | "idle"
  | "requesting"   // waiting for mic permission
  | "listening"    // actively capturing
  | "processing"   // transcript received, sending
  | "error";       // something went wrong

/* ─────────────────────── helpers ─────────────────────── */

/** Strip markdown so TTS doesn't say "asterisk asterisk" */
function stripMarkdown(raw: string): string {
  return raw
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/#{1,6}\s/g, "")
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/^[-•>]\s/gm, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/---+/g, "")
    .replace(/\n{2,}/g, ". ")
    .trim();
}

/** Map SpeechRecognition error codes to friendly messages */
function friendlyMicError(code: string): string {
  switch (code) {
    case "not-allowed":
    case "permission-denied":
      return "Microphone access denied. Please allow mic permission in your browser and try again.";
    case "audio-capture":
      return "No microphone found. Please connect a mic and try again.";
    case "network":
      return "Network error during voice recognition. Check your internet connection.";
    case "no-speech":
      return "No speech detected. Please speak clearly after clicking the mic.";
    case "aborted":
      return ""; // user cancelled — silent
    default:
      return `Voice error: ${code}. Try again.`;
  }
}

/* ─────────────────────── component ─────────────────────── */
export default function ChatbotWidget() {
  const [isOpen, setIsOpen]           = useState(false);
  const [input, setInput]             = useState("");
  const [messages, setMessages]       = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I'm Amit's AI Assistant 🤖 Ask me anything about his skills, projects, education, or certifications.",
    },
  ]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  const [isSpeaking, setIsSpeaking]       = useState(false);
  const [voiceStatus, setVoiceStatus]     = useState<VoiceStatus>("idle");
  const [voiceError, setVoiceError]       = useState<string>("");

  const scrollRef        = useRef<HTMLDivElement>(null);
  const inputRef         = useRef<HTMLInputElement>(null);
  const thinkingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recognitionRef   = useRef<any>(null);
  const voicesRef        = useRef<SpeechSynthesisVoice[]>([]);

  const suggestions = [
    "Tell me about Amit",
    "Show AI projects",
    "What technologies does he know?",
    "Show education summary",
  ];

  /* ── voice preload ── */
  useEffect(() => {
    const load = () => {
      const v = window.speechSynthesis?.getVoices() ?? [];
      if (v.length) voicesRef.current = v;
    };
    load();
    window.speechSynthesis?.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", load);
  }, []);

  /* ── cleanup on unmount ── */
  useEffect(() => {
    return () => {
      thinkingTimerRef.current && clearTimeout(thinkingTimerRef.current);
      window.speechSynthesis?.cancel();
      abortRecognition();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── external toggle (CommandPalette) ── */
  useEffect(() => {
    const onToggle = () =>
      setIsOpen((prev) => {
        if (prev) {
          window.speechSynthesis?.cancel();
          setIsSpeaking(false);
        }
        return !prev;
      });
    window.addEventListener("toggle-chatbot", onToggle);
    return () => window.removeEventListener("toggle-chatbot", onToggle);
  }, []);

  /* ── scroll to bottom ── */
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isBotThinking]);

  /* ── autofocus ── */
  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen]);

  /* ═══════════════════════════════════════════
     TTS — speak bot response
  ═══════════════════════════════════════════ */
  const speakText = useCallback((raw: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);

    const text = stripMarkdown(raw);
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);

    /* pick best English voice */
    const voices = voicesRef.current;
    const pick =
      voices.find((v) =>
        ["David", "Mark", "Guy", "Male"].some((n) => v.name.includes(n))
      ) ??
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          !v.name.toLowerCase().includes("female") &&
          !v.name.toLowerCase().includes("zira")
      );
    if (pick) utter.voice = pick;

    utter.rate   = 1.0;
    utter.pitch  = 1.1;
    utter.volume = 1;

    utter.onstart = () => setIsSpeaking(true);
    utter.onend   = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utter);
  }, []);

  /* ═══════════════════════════════════════════
     AI engine
  ═══════════════════════════════════════════ */
  const processQuery = useCallback((q: string): string => {
    return (
      findBestAnswer(q) ??
      findBestSectionAnswer(q) ??
      SECTION_FALLBACK
    );
  }, []);

  /* ═══════════════════════════════════════════
     Send message — stable via useCallback
  ═══════════════════════════════════════════ */
  const handleSend = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      window.speechSynthesis?.cancel();
      setIsSpeaking(false);

      thinkingTimerRef.current && clearTimeout(thinkingTimerRef.current);

      setMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, sender: "user", text: trimmed },
      ]);
      setInput("");
      setIsBotThinking(true);

      thinkingTimerRef.current = setTimeout(() => {
        const answer = processQuery(trimmed);
        setIsBotThinking(false);
        setMessages((prev) => [
          ...prev,
          { id: `b-${Date.now()}`, sender: "bot", text: answer },
        ]);
        speakText(answer);
      }, 900);
    },
    [processQuery, speakText]
  );

  /* ═══════════════════════════════════════════
     Abort ongoing recognition
  ═══════════════════════════════════════════ */
  const abortRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.abort(); } catch (_) {}
      recognitionRef.current = null;
    }
    setVoiceStatus("idle");
    setIsListening(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* tiny helper so we don't need setIsListening separately */
  const [, setIsListening] = useState(false); // kept for toggle check

  const isListening = voiceStatus === "listening" || voiceStatus === "requesting";

  /* ═══════════════════════════════════════════
     Voice recording toggle
  ═══════════════════════════════════════════ */
  const handleVoiceToggle = useCallback(() => {
    /* ── STOP if already listening ── */
    if (isListening) {
      abortRecognition();
      setVoiceError("");
      return;
    }

    /* ── browser support check ── */
    const SpeechRecognition =
      (window as any).SpeechRecognition ??
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError(
        "Voice input not supported. Please use Google Chrome or Microsoft Edge."
      );
      setVoiceStatus("error");
      return;
    }

    /* stop any TTS so mic doesn't pick it up */
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setVoiceError("");
    setVoiceStatus("requesting");

    const rec = new SpeechRecognition();
    rec.lang             = "en-US";
    rec.interimResults   = true;   // show live transcript in input
    rec.maxAlternatives  = 1;
    rec.continuous       = false;

    recognitionRef.current = rec;

    /* ── onstart: permission granted ── */
    rec.onstart = () => {
      setVoiceStatus("listening");
      setInput("");
    };

    /* ── interim + final results ── */
    rec.onresult = (evt: any) => {
      let interim = "";
      let final   = "";

      for (let i = evt.resultIndex; i < evt.results.length; i++) {
        const t = evt.results[i][0].transcript;
        if (evt.results[i].isFinal) final += t;
        else interim += t;
      }

      /* show interim live in input box */
      if (interim) setInput(interim);

      /* when final result arrives → send */
      if (final.trim()) {
        setVoiceStatus("processing");
        setInput(final.trim());
        recognitionRef.current = null;
        /* slight delay so user sees the transcribed text */
        setTimeout(() => {
          handleSend(final.trim());
          setVoiceStatus("idle");
        }, 400);
      }
    };

    /* ── errors ── */
    rec.onerror = (evt: any) => {
      recognitionRef.current = null;
      const msg = friendlyMicError(evt.error ?? "unknown");
      if (msg) {
        setVoiceError(msg);
        setVoiceStatus("error");
      } else {
        setVoiceStatus("idle");
      }
    };

    /* ── recognition ended without a result ── */
    rec.onend = () => {
      if (recognitionRef.current) {
        recognitionRef.current = null;
      }
      setVoiceStatus((s) => (s === "listening" || s === "requesting" ? "idle" : s));
    };

    /* ── start ── */
    try {
      rec.start();
    } catch (err) {
      console.warn("[VoiceBot] start() failed:", err);
      recognitionRef.current = null;
      setVoiceStatus("error");
      setVoiceError("Could not start microphone. Try reloading the page.");
    }
  }, [isListening, abortRecognition, handleSend]);

  /* ═══════════════════════════════════════════
     Close chatbot
  ═══════════════════════════════════════════ */
  const handleClose = useCallback(() => {
    setIsOpen(false);
    abortRecognition();
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
    setVoiceError("");
    if (thinkingTimerRef.current) {
      clearTimeout(thinkingTimerRef.current);
      setIsBotThinking(false);
    }
  }, [abortRecognition]);

  /* ═══════════════════════════════════════════
     Mic button label / color helpers
  ═══════════════════════════════════════════ */
  const micBtnClass = (() => {
    switch (voiceStatus) {
      case "requesting":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50 animate-pulse";
      case "listening":
        return "bg-red-500/20 text-red-400 border border-red-500/60 shadow-[0_0_14px_rgba(239,68,68,0.4)] animate-pulse";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border border-blue-500/50";
      case "error":
        return "bg-zinc-800 text-rose-400 border border-rose-700/50";
      default:
        return "bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/50 hover:border-zinc-600";
    }
  })();

  const micTitle = (() => {
    switch (voiceStatus) {
      case "requesting":  return "Requesting microphone permission…";
      case "listening":   return "Listening… click to stop";
      case "processing":  return "Processing your voice…";
      case "error":       return "Voice error — click to retry";
      default:            return "Click to speak";
    }
  })();

  const inputPlaceholder = (() => {
    switch (voiceStatus) {
      case "requesting":  return "Waiting for mic permission…";
      case "listening":   return "🎙 Listening — speak now…";
      case "processing":  return "Processing voice…";
      default:            return "Ask something…";
    }
  })();

  /* ═══════════════════════════════════════════
     RENDER
  ═══════════════════════════════════════════ */
  return (
    <div className="fixed bottom-6 right-6 z-[900]">
      {/* ── Floating button ── */}
      <motion.button
        onClick={() => (isOpen ? handleClose() : setIsOpen(true))}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg hover:shadow-primary/30 cursor-pointer border border-white/10 relative"
        aria-label="Open AI Assistant"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <MessageSquare className="w-5 h-5 animate-pulse" />
        )}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500" />
          </span>
        )}
      </motion.button>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[390px] h-[500px] rounded-2xl glass-card bg-zinc-950/95 border-zinc-800 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* ── Header ── */}
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
                  <span className="text-[9px] text-zinc-500 font-mono flex items-center gap-1">
                    Profile Agent v1.3
                    {isSpeaking && (
                      <span className="flex items-center gap-0.5 text-primary ml-1 animate-pulse">
                        <Volume2 className="w-2.5 h-2.5" />
                        <span>Speaking…</span>
                      </span>
                    )}
                    {voiceStatus === "listening" && (
                      <span className="flex items-center gap-0.5 text-red-400 ml-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-flex" />
                        <span>Listening…</span>
                      </span>
                    )}
                  </span>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="p-1 rounded hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* ── Voice error banner ── */}
            {voiceError && (
              <div className="px-4 py-2 bg-rose-950/40 border-b border-rose-800/50 text-[10px] text-rose-300 flex items-start gap-2">
                <MicOff className="w-3 h-3 shrink-0 mt-0.5 text-rose-400" />
                <span>{voiceError}</span>
                <button
                  onClick={() => { setVoiceError(""); setVoiceStatus("idle"); }}
                  className="ml-auto text-rose-500 hover:text-rose-300 shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* ── Messages ── */}
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
                    <div
                      className={`w-6 h-6 rounded-full shrink-0 flex items-center justify-center ${
                        isBot
                          ? "bg-primary/10 text-primary border border-primary/25"
                          : "bg-zinc-800 text-zinc-200"
                      }`}
                    >
                      {isBot ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                    </div>
                    <div className="max-w-[78%]">
                      <div
                        className={`text-xs px-3.5 py-2.5 rounded-2xl border ${
                          isBot
                            ? "bg-zinc-900/40 text-zinc-300 border-zinc-800/60 rounded-tl-none"
                            : "bg-primary text-white border-primary rounded-tr-none shadow-md shadow-primary/10"
                        }`}
                      >
                        <p className="whitespace-pre-line leading-relaxed font-sans">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Bot thinking */}
              {isBotThinking && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full shrink-0 bg-primary/10 text-primary border border-primary/25 flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-zinc-900/40 border border-zinc-800/60 px-3.5 py-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1 items-center h-2">
                      {[0, 150, 300].map((d) => (
                        <span
                          key={d}
                          className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce"
                          style={{ animationDelay: `${d}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── Suggestion chips ── */}
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

            {/* ── Input row ── */}
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
                placeholder={inputPlaceholder}
                disabled={voiceStatus === "listening" || voiceStatus === "processing"}
                className={`flex-1 bg-zinc-900/60 border text-xs text-zinc-200 placeholder-zinc-500 rounded-xl px-3 py-2 focus:outline-none transition-colors focus:ring-0 ${
                  voiceStatus === "listening"
                    ? "border-red-500/60 placeholder-red-400/60"
                    : voiceStatus === "error"
                    ? "border-rose-700/60"
                    : "border-zinc-800/80 hover:border-zinc-700/60 focus:border-primary"
                }`}
              />

              {/* Mic button */}
              <button
                type="button"
                onClick={handleVoiceToggle}
                className={`p-2 rounded-xl transition-all cursor-pointer ${micBtnClass}`}
                title={micTitle}
                aria-label={micTitle}
              >
                {voiceStatus === "listening" ? (
                  <MicOff className="w-3.5 h-3.5" />
                ) : (
                  <Mic className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Send button */}
              <button
                type="submit"
                disabled={!input.trim() || isBotThinking || voiceStatus === "listening"}
                className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 disabled:bg-zinc-800 disabled:text-zinc-600 transition-colors shadow-md shadow-primary/10 cursor-pointer"
                aria-label="Send message"
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
