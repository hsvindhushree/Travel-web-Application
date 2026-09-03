import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { askGeminiChatbot } from '../services/aiService';
import { X, Sparkles, Send, Bot, User, Loader2, Copy, Check, Compass, MessageSquareQuote, Trash2 } from 'lucide-react';

export default function AIChatbot({ onClose }) {
  const { destinations, selectedDestination, apiKeys } = useApp();
  const [currentDest, setCurrentDest] = useState(selectedDestination || destinations[0]);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('wanderlust_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Fall back to default welcome message
    }
    return [
      {
        id: 1,
        sender: "ai",
        text: `Hello! I'm **Wanderlust AI**, your personal travel concierge for **${(selectedDestination || destinations[0]).name}**. Ask me anything: how long to stay, what hidden gems to visit, when to go, or what local dishes to taste!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem('wanderlust_chat_messages', JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save chat history to localStorage", e);
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    try {
      const responseText = await askGeminiChatbot(currentDest.name, text, messages, apiKeys.gemini);
      const aiMsg = {
        id: Date.now() + 1,
        sender: "ai",
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem('wanderlust_chat_messages');
    } catch (e) {}
    setMessages([
      {
        id: Date.now(),
        sender: "ai",
        text: `Chat history cleared! I'm ready to answer any new questions about **${currentDest.name}**.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const promptPills = [
    `How long to spend in ${currentDest.name}?`,
    `What are the must-see sights?`,
    `Best season to visit ${currentDest.name}?`,
    `What local foods should I try?`,
    `Is ${currentDest.name} safe for solo travel?`
  ];

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-xl flex justify-end animate-fadeIn">
      
      {/* Slide-over Container */}
      <div className="relative w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col shadow-2xl">
        
        {/* Header */}
        <div className="p-4 sm:p-6 glass-panel border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading flex items-center gap-2">
                Gemini AI Concierge
              </h3>
              <span className="text-[11px] text-cyan-400 font-mono block">
                {apiKeys.gemini ? "⚡ Gemini 2.5 Flash API Connected" : "✨ Smart Travel Advisor (Offline Mode)"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              title="Clear chat history from local storage"
              className="p-2 rounded-xl bg-slate-800/80 text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Destination Picker */}
        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-cyan-400" /> Focus Destination:
          </span>
          <select
            value={currentDest.id}
            onChange={(e) => {
              const d = destinations.find(x => x.id === e.target.value);
              if (d) setCurrentDest(d);
            }}
            className="bg-slate-900 text-cyan-300 font-bold px-3 py-1.5 rounded-lg border border-slate-800 focus:outline-none"
          >
            {destinations.map(d => (
              <option key={d.id} value={d.id}>{d.name}, {d.country}</option>
            ))}
          </select>
        </div>

        {/* Chat Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`group relative max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/50 text-[10px] text-slate-400">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'ai' && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-cyan-400 flex items-center gap-1"
                    >
                      {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  )}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center text-xs text-slate-400">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="flex items-center gap-1.5 bg-slate-950 px-4 py-2.5 rounded-2xl border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Wanderlust AI is typing suggestions...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Shortcuts */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {promptPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(pill)}
              className="px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 text-[11px] font-medium border border-slate-800 shrink-0 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquareQuote className="w-3 h-3 text-cyan-400" />
              {pill}
            </button>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-slate-900 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-slate-800 focus-within:border-cyan-500 transition-all"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder={`Ask Gemini about ${currentDest.name}...`}
              className="w-full bg-transparent text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none px-3"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold transition-all disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
