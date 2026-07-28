import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  AlertCircle,
  Minus,
  Briefcase,
  FileText,
  HelpCircle,
  Building2,
  ChevronDown
} from 'lucide-react';
import { sendChatbotMessage, ChatMessageItem } from '../services/api';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessageItem[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: "Hello! 👋 Welcome to **Bucks & Bricks Co.**\n\nI am your official AI Recruitment Assistant. How can I help you today?\n\n* **Ask about Published Jobs** (e.g. *\"What remote jobs are available?\"*)\n* **AI Resume Checker** (e.g. *\"How does the resume checker work?\"*)\n* **Services & Hiring** (e.g. *\"What recruitment services do you offer?\"*)",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text || !text.trim() || isLoading) return;

    const userMsgText = text.trim();
    if (!textToSend) {
      setInputMessage('');
    }
    setLastFailedMessage(null);

    const newUserMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      // Build history payload for API (last 10 messages without welcome greeting)
      const historyPayload = updatedMessages
        .filter(m => m.id !== 'welcome-1' && !m.error)
        .slice(-10)
        .map(m => ({
          role: m.role,
          content: m.content
        }));

      const res = await sendChatbotMessage(userMsgText, historyPayload);

      const assistantMsg: ChatMessageItem = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: res.reply || "I'm here to help you with Bucks & Bricks recruitment services and published job openings!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chatbot API error:', err);
      setLastFailedMessage(userMsgText);
      const errorMsg: ChatMessageItem = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Connection Notice**: Unable to generate AI response right now (${err.message || 'Network error'}). Please click Retry below.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        error: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      // Remove last error message from list before retrying
      setMessages(prev => prev.filter(m => !m.error));
      handleSendMessage(lastFailedMessage);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    { label: "Available Jobs", query: "What published job vacancies are currently available?", icon: <Briefcase size={13} className="text-[#052842] dark:text-sky-400" /> },
    { label: "AI Resume Checker", query: "How does the free AI Resume Checker tool work?", icon: <FileText size={13} className="text-[#052842] dark:text-sky-400" /> },
    { label: "Our Services", query: "What executive search and recruitment services do you offer?", icon: <Building2 size={13} className="text-[#052842] dark:text-sky-400" /> },
    { label: "How to Apply", query: "What is the job application and interview process?", icon: <HelpCircle size={13} className="text-[#052842] dark:text-sky-400" /> }
  ];

  // Custom clean inline markdown formatter
  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return <strong key={i} className="font-bold text-[#011c30] dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
        return <em key={i} className="italic text-slate-700 dark:text-slate-300">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return <code key={i} className="bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 px-1 py-0.5 rounded font-mono text-[11px]">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  const renderFormattedMessage = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed font-sans">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;
          if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || trimmed.startsWith('# ')) {
            const headingText = trimmed.replace(/^#+\s*/, '');
            return <h4 key={idx} className="font-bold font-display text-[#011c30] dark:text-white text-sm sm:text-base mt-2.5 mb-1">{parseInlineFormatting(headingText)}</h4>;
          }
          if (trimmed.startsWith('---')) {
            return <hr key={idx} className="my-2 border-slate-200/80 dark:border-slate-700/80" />;
          }
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const listItem = trimmed.replace(/^[\*\-]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 my-0.5">
                <span className="text-[#052842] dark:text-sky-400 font-bold mt-0.5">•</span>
                <span className="flex-1">{parseInlineFormatting(listItem)}</span>
              </div>
            );
          }
          return <p key={idx} className="my-1">{parseInlineFormatting(trimmed)}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-none">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto group relative flex items-center gap-2.5 bg-gradient-to-r from-[#052842] to-[#011c30] text-white px-4 py-3.5 rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-700/50 cursor-pointer"
          aria-label="Open AI Assistant"
        >
          <div className="relative">
            <Bot size={24} className="text-sky-400 group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500 border border-[#052842]"></span>
            </span>
          </div>
          <span className="font-display font-bold text-xs sm:text-sm tracking-wide pr-1">
            AI Assistant
          </span>
          <span className="hidden sm:inline-block text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-sans font-semibold border border-sky-400/30">
            Online
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="pointer-events-auto w-[92vw] sm:w-[400px] md:w-[420px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#052842] via-[#042036] to-[#011c30] text-white px-4 py-3.5 flex items-center justify-between border-b border-slate-700/50">
            <div className="flex items-center gap-3">
              <div className="relative p-2 bg-white/10 rounded-xl backdrop-blur-xs border border-white/10">
                <Bot size={20} className="text-sky-400" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#052842] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-sm text-white tracking-tight">
                    Bucks & Bricks AI
                  </h3>
                  <Sparkles size={12} className="text-amber-400 animate-pulse" />
                </div>
                <p className="text-[11px] text-sky-200/80 font-sans">
                  Recruitment & Vacancies Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title={isMinimized ? "Expand" : "Minimize"}
              >
                {isMinimized ? <ChevronDown size={18} className="rotate-180" /> : <Minus size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                title="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isMinimized && (
            <>
              {/* Message History */}
              <div className="flex-1 p-4 overflow-y-auto max-h-[420px] min-h-[300px] bg-slate-50/60 dark:bg-slate-900/60 space-y-4">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      {/* Avatar */}
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          isUser
                            ? 'bg-[#052842] text-white shadow-xs'
                            : msg.error
                            ? 'bg-rose-500 text-white'
                            : 'bg-gradient-to-br from-sky-500 to-[#052842] text-white shadow-xs'
                        }`}
                      >
                        {isUser ? <User size={14} /> : msg.error ? <AlertCircle size={14} /> : <Bot size={14} />}
                      </div>

                      {/* Bubble */}
                      <div className={`max-w-[80%] flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`px-3.5 py-2.5 rounded-2xl shadow-xs text-xs sm:text-sm ${
                            isUser
                              ? 'bg-[#052842] text-white rounded-tr-none'
                              : msg.error
                              ? 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 rounded-tl-none'
                              : 'bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-tl-none'
                          }`}
                        >
                          {renderFormattedMessage(msg.content)}

                          {/* Retry Option if Failed */}
                          {msg.error && lastFailedMessage && (
                            <div className="mt-2 pt-2 border-t border-rose-200 dark:border-rose-800/80">
                              <button
                                onClick={handleRetry}
                                className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[11px] rounded-lg transition-colors cursor-pointer shadow-xs"
                              >
                                <RefreshCw size={12} className="animate-spin-hover" />
                                Retry Request
                              </button>
                            </div>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 px-1 font-sans">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Typing / Loading Indicator */}
                {isLoading && (
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-[#052842] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Bot size={14} />
                    </div>
                    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-sky-500 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-sans ml-1.5">AI is thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Chips */}
              {messages.length <= 2 && !isLoading && (
                <div className="p-2.5 bg-slate-100/70 dark:bg-slate-800/50 border-t border-slate-200/80 dark:border-slate-800">
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 px-1 mb-1.5 flex items-center gap-1">
                    <Sparkles size={11} className="text-amber-500" /> Suggested queries:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestedQuestions.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(item.query)}
                        className="inline-flex items-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:scale-[1.02] shadow-2xs cursor-pointer"
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about jobs, resume score, or services..."
                    disabled={isLoading}
                    className="flex-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-transparent focus:border-sky-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all disabled:opacity-60"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-[#052842] hover:bg-[#031828] disabled:bg-slate-300 dark:disabled:bg-slate-800 text-white p-2.5 rounded-xl transition-all disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-sm cursor-pointer shrink-0"
                    title="Send Message"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-1.5 px-1">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Powered by Google Gemini AI
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500">
                    Gatekeeper Protected
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
