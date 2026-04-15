"use client";

import { env } from "@/env";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Message = { id: string; role: "user" | "ai"; content: string };

export default function ChatKitWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content:
        "Hello! 👋 I'm your PlanOva Assistant. Ask me anything about events, categories, or how I can help you!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Only scroll if the chat widget is open
    if (isOpen && messagesEndRef.current) {
      // Use a slight delay to ensure DOM is updated
      const timer = setTimeout(() => {
        messagesEndRef.current?.parentElement?.scrollTo({
          top: messagesEndRef.current?.parentElement?.scrollHeight,
          behavior: "smooth",
        });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const apiUrl = `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ai/chat`;
      console.log("Calling API:", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
      });

      console.log("Response status:", res.status);
      console.log("Response content-type:", res.headers.get("content-type"));

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      const isJson = contentType?.includes("application/json");

      if (!isJson) {
        const text = await res.text();
        console.error("Non-JSON response:", text.substring(0, 100));
        throw new Error(
          res.status === 404
            ? "API endpoint not found. Please check backend configuration."
            : `Server error (${res.status}). Please ensure the backend is running.`,
        );
      }

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(data.message || data.error || `Error: ${res.status}`);
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "ai",
        content:
          data.data?.reply ||
          data.reply ||
          "I couldn't generate a response. Please try again.",
      };
      setMessages((prev) => [...prev, aiMessage]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "ai",
        content: `⚠️ ${error.message || "Failed to connect to the backend. Please check if the server is running and the API endpoint is correct."}`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${!isOpen ? "pointer-events-none" : "pointer-events-auto"}`}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed ${isMobile ? "bottom-20 left-2 right-2" : "bottom-24 right-6"} z-50 ${isMobile ? "w-auto" : "w-96"} ${isMobile ? "h-[70vh] max-h-[500px]" : "h-130"} shadow-2xl rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col pointer-events-auto`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-600 dark:to-teal-700 p-3 sm:p-4 text-white flex items-center justify-between shadow-md flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div className="bg-white/20 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                  <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-lg leading-tight truncate">
                    PlanOva Assistant
                  </h3>
                  <p className="text-teal-100 text-[10px] sm:text-xs font-medium">
                    AI Powered Help
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-zinc-50 dark:bg-zinc-900/50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-2xl p-2.5 sm:p-3.5 text-xs sm:text-sm shadow-sm ${msg.role === "user" ? "bg-teal-500 text-white rounded-br-sm" : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-100 dark:border-zinc-700 rounded-bl-sm"}`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 p-2.5 sm:p-3.5 rounded-2xl rounded-bl-sm shadow-sm">
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-teal-500" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex-shrink-0">
              <form
                onSubmit={handleSend}
                className="relative flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something..."
                  className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 outline-none text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex-shrink-0 p-2 bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  <Send className="w-4 h-4 sm:w-4 sm:h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 p-3 sm:p-4 rounded-full bg-teal-500 hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700 text-white shadow-lg hover:shadow-teal-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center border-0 pointer-events-auto"
        title={isOpen ? "Close assistant" : "Open assistant"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
