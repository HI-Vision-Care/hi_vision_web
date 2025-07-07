/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, X, Sparkles } from "lucide-react";
import { useGetUserProfile } from "@/services/account/hook";
import { useAccountId } from "@/hooks/useAccountId";

export type Message = {
  sender: "user" | "bot";
  text: string;
};

export const HEALTH_KEYWORDS = ["tư vấn", "sức khỏe", "triệu chứng", "bệnh"];

export function needsMedicalAdvice(text: string) {
  const lower = text.toLowerCase();
  return HEALTH_KEYWORDS.some((kw) => lower.includes(kw));
}

const SUGGESTIONS = [
  "Tôi cần tư vấn",
  "Truy vấn sức khỏe",
  "Hướng dẫn đặt lịch",
  "Hãy kể chuyện cười",
];

function calculateAge(dob: string) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export default function ModernChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const accountId = useAccountId(); // lấy id & role
  const userRole = Cookies.get("role");
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useGetUserProfile(accountId, userRole || "");

  // Lấy tên (ưu tiên profile?.name, fallback username, hoặc "Khách")
  const name =
    profile?.name ||
    profile?.account?.username ||
    profile?.account?.email ||
    "Khách";
  console.log(accountId);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || prompt.trim();
    if (!textToSend) return;

    const userMessage: Message = { sender: "user", text: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    const history = newMessages.slice(-5);

    try {
      const body: any = { history, brief: true };
      if (needsMedicalAdvice(textToSend) && profile) {
        body.userInfo = {
          name: profile?.name || profile?.account?.username || "Khách",
          age: profile?.dob ? calculateAge(profile.dob) : undefined,
          gender: profile?.gender,
          // condition: ... // có thể lấy từ profile nếu có
        };
      }

      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "API error");

      const botMessage: Message = { sender: "bot", text: data.result };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      const errorMessage: Message = {
        sender: "bot",
        text: "Có lỗi xảy ra: " + (error.message || error.toString()),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        size="icon"
      >
        <Brain className="h-6 w-6 text-white" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[600px] shadow-2xl border-0 z-50 flex flex-col overflow-hidden rounded-lg p-0">
          {/* Header - Fixed at top */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800">HI-Vision AI</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 hover:bg-gray-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Chat Content - Scrollable area */}
          <div className="flex-1 flex flex-col min-h-0">
            {messages.length === 0 ? (
              /* Welcome Screen */
              <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50/30 to-purple-50/30">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {profileLoading
                      ? "Đang tải thông tin..."
                      : profileError
                      ? "Xin chào!"
                      : `Xin chào ${name}!`}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Tôi có thể giúp gì cho bạn hôm nay?
                  </p>
                </div>

                {/* Suggestion Buttons */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  {SUGGESTIONS.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-3 text-xs text-left whitespace-normal border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors bg-transparent"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              /* Messages */
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30 scroll-smooth messages-container"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#cbd5e1 transparent",
                }}
              >
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === "user"
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                          : "bg-white border border-gray-200 text-gray-800 shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Area - Fixed at bottom */}
            <div className="flex-shrink-0 p-4 border-t bg-white rounded-b-lg">
              <div className="relative">
                <div className="flex items-center gap-2 p-3 border border-gray-200 rounded-2xl bg-gray-50 focus-within:border-blue-300 focus-within:bg-white transition-colors">
                  <textarea
                    value={prompt}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Hỏi Gemini"
                    className="flex-1 border-0 bg-transparent resize-none focus:outline-none text-sm min-h-[20px] max-h-[100px] py-1"
                    rows={1}
                    disabled={loading}
                    style={{
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  />

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-500 hover:text-blue-700"
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>

                {prompt.trim() && (
                  <Button
                    onClick={() => sendMessage()}
                    disabled={loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 px-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xs"
                  >
                    {loading ? "Đang gửi..." : "Gửi"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
      <style jsx>{`
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }
        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }
        .messages-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .messages-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
    </>
  );
}
