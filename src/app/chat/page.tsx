"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Send,
  User,
  Film,
  Star,
  Play,
  Bookmark,
  Bot,
  RotateCcw,
} from "lucide-react";
import { Movie, ChatMessage } from "@/types";
import WatchlistButton from "@/components/WatchlistButton";

const CHAT_STARTERS = [
  "Recommend me something like Dark but less confusing.",
  "Mujhe Interstellar jaisi mind-bending sci-fi movies batao.",
  "Aaj raat family ke saath dekhne ke liye 2 ghante se kam ki movie suggest karo.",
  "Sad ending wali thriller movies suggest karo.",
  "Christopher Nolan ki best films suggest karo.",
];

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchConversation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const fetchConversation = async () => {
    try {
      const res = await fetch("/api/ai/chat");
      const data = await res.json();
      if (data.conversation) {
        setConversationId(data.conversation.id);
        const mapped = data.conversation.messages.map((m: any) => {
          let recs = [];
          try {
            const meta = JSON.parse(m.metadata || "{}");
            recs = meta.recommendations || [];
          } catch (e) {}

          return {
            id: m.id,
            sender: m.sender,
            content: m.content,
            timestamp: m.createdAt,
            recommendations: recs,
          };
        });
        setMessages(mapped);
      }
    } catch (e) {}
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    setInput("");

    // Add user message optimistically
    const tempUserMsg: ChatMessage = {
      id: `temp-${Date.now()}`,
      sender: "user",
      content: messageContent,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageContent,
          conversationId,
        }),
      });
      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 pt-20 sm:pt-24 pb-20 px-4 sm:px-8 max-w-5xl mx-auto flex flex-col h-[90vh]">
      {/* Chat Header */}
      <div className="flex items-center justify-between py-4 border-b border-white/10 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-purple to-brand-crimson flex items-center justify-center shadow-lg shadow-purple-900/40">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
              CineSa AI Companion
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h1>
            <p className="text-xs text-gray-400">
              Natural Language & Multi-Lingual Movie Discovery Agent
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([]);
            fetchConversation();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 transition"
          title="Reset conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 no-scrollbar">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* Bot Avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-brand-purple/30 border border-brand-purple/40 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-4 h-4 text-brand-purple" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 space-y-3 ${
                  isUser
                    ? "bg-brand-red text-white ml-12 rounded-tr-sm shadow-md glow-red"
                    : "glass-panel border border-white/10 mr-8 rounded-tl-sm"
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">
                  {msg.content}
                </p>

                {/* Embedded Movie Cards Carousel / Grid */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-purple-300">
                      Suggested Films:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {msg.recommendations.map((mov) => (
                        <div
                          key={mov.id}
                          className="flex items-center gap-3 p-2 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 transition group"
                        >
                          <Link
                            href={`/movie/${mov.id}`}
                            className="relative aspect-[2/3] w-12 rounded-lg overflow-hidden flex-shrink-0"
                          >
                            <Image
                              src={mov.posterUrl}
                              alt={mov.title}
                              fill
                              className="object-cover"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/movie/${mov.id}`}
                              className="font-bold text-xs text-white group-hover:text-brand-crimson transition truncate block"
                            >
                              {mov.title}
                            </Link>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                              <span className="flex items-center text-brand-gold font-semibold">
                                ★ {mov.voteAverage.toFixed(1)}
                              </span>
                              <span>{mov.releaseYear}</span>
                              <span>{mov.runtime}m</span>
                            </div>
                          </div>

                          <WatchlistButton
                            movieId={mov.id}
                            variant="icon"
                            className="p-1.5 scale-90"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-gray-300" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex gap-3 items-center text-xs text-purple-300">
            <div className="w-8 h-8 rounded-xl bg-brand-purple/30 border border-brand-purple/40 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-brand-purple animate-spin" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl glass-panel border border-white/10 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              <span className="ml-1 text-gray-400 text-xs">CineSa is thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Starters if conversation is fresh */}
      {messages.length <= 1 && (
        <div className="py-2 overflow-x-auto no-scrollbar flex gap-2 mb-2">
          {CHAT_STARTERS.map((starter, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(starter)}
              className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-brand-purple/50 transition whitespace-nowrap"
            >
              &quot;{starter}&quot;
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="relative flex items-center mt-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask CineSa in English, Hindi or Hinglish..."
          className="w-full pl-5 pr-14 py-4 rounded-2xl glass-panel border border-white/15 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-brand-purple shadow-xl"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="absolute right-2.5 p-2.5 rounded-xl bg-gradient-to-tr from-brand-purple to-brand-crimson text-white hover:opacity-90 disabled:opacity-40 transition shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
