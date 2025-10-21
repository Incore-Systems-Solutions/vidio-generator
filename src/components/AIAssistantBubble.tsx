import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, MessageCircle, X, Send, Bot } from "lucide-react";

// Translations for AIAssistantBubble
const translations = {
  ID: {
    welcomeMessage:
      "👋 Halo! Anda bisa membuat video realistic tanpa harus mengetik prompt lengkap. Apakah ada yang bisa saya bantu?",
    startConsultation: "Mulai Konsultasi",
    aiAssistant: "AI Assistant",
    readyToHelp: "Siap membantu Anda",
    greetingBold: "Halo!",
    greetingMessage:
      "Saya adalah AI Assistant yang siap membantu Anda membuat video realistic tanpa harus mengetik prompt lengkap!",
    canIHelp: "Apakah ada yang bisa saya bantu?",
    tellMe:
      "Ceritakan saja apa yang ingin Anda buat, dan saya akan membantu mewujudkannya.",
    justNow: "Baru saja",
    placeholder: "Ketik pesan Anda di sini...",
    pressEnter: "Tekan Enter untuk mengirim pesan",
  },
  EN: {
    welcomeMessage:
      "👋 Hello! You can create realistic videos without typing full prompts. Can I help you with something?",
    startConsultation: "Start Consultation",
    aiAssistant: "AI Assistant",
    readyToHelp: "Ready to help you",
    greetingBold: "Hello!",
    greetingMessage:
      "I am an AI Assistant ready to help you create realistic videos without typing full prompts!",
    canIHelp: "Can I help you with something?",
    tellMe:
      "Just tell me what you want to create, and I'll help make it happen.",
    justNow: "Just now",
    placeholder: "Type your message here...",
    pressEnter: "Press Enter to send message",
  },
  ZH: {
    welcomeMessage:
      "👋 你好！您可以在不输入完整提示的情况下创建逼真的视频。我能帮您什么吗？",
    startConsultation: "开始咨询",
    aiAssistant: "AI 助手",
    readyToHelp: "随时为您服务",
    greetingBold: "你好！",
    greetingMessage:
      "我是 AI 助手，可以帮助您在不输入完整提示的情况下创建逼真的视频！",
    canIHelp: "我能帮您什么吗？",
    tellMe: "只需告诉我您想创建什么，我会帮助实现它。",
    justNow: "刚刚",
    placeholder: "在此输入您的消息...",
    pressEnter: "按 Enter 发送消息",
  },
  AR: {
    welcomeMessage:
      "👋 مرحبًا! يمكنك إنشاء مقاطع فيديو واقعية دون كتابة مطالبات كاملة. هل يمكنني مساعدتك في شيء؟",
    startConsultation: "بدء الاستشارة",
    aiAssistant: "مساعد الذكاء الاصطناعي",
    readyToHelp: "جاهز لمساعدتك",
    greetingBold: "مرحبًا!",
    greetingMessage:
      "أنا مساعد الذكاء الاصطناعي جاهز لمساعدتك في إنشاء مقاطع فيديو واقعية دون كتابة مطالبات كاملة!",
    canIHelp: "هل يمكنني مساعدتك في شيء؟",
    tellMe: "فقط أخبرني بما تريد إنشاءه، وسأساعد في تحقيقه.",
    justNow: "الآن",
    placeholder: "اكتب رسالتك هنا...",
    pressEnter: "اضغط Enter لإرسال الرسالة",
  },
};

export function AIAssistantBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ID");

  // Load language from localStorage and listen for changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (
      savedLanguage &&
      translations[savedLanguage as keyof typeof translations]
    ) {
      setSelectedLanguage(savedLanguage);
    }

    // Check localStorage periodically (for same-window changes)
    const interval = setInterval(() => {
      const currentLanguage = localStorage.getItem("preferredLanguage");
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    }, 500);

    // Listen for language changes via custom event
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("preferredLanguage");
      if (
        newLanguage &&
        translations[newLanguage as keyof typeof translations]
      ) {
        setSelectedLanguage(newLanguage);
      }
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
      clearInterval(interval);
    };
  }, [selectedLanguage]);

  useEffect(() => {
    // Show welcome message after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Save message to localStorage for konsultan page
      localStorage.setItem("user-initial-message", message.trim());
      // Redirect to konsultan-video page
      window.location.href = "/konsultan-video";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get current translations
  const t = translations[selectedLanguage as keyof typeof translations];

  return (
    <>
      {/* Welcome Bubble - Show when closed */}
      {showWelcome && !isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] animate-in slide-in-from-right duration-500">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-30 animate-pulse" />

            {/* Welcome Message */}
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl p-4 max-w-xs">
              <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-40 animate-pulse" />
                  <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm leading-relaxed mb-3">
                    {t.welcomeMessage}
                  </p>
                  <Button
                    size="sm"
                    onClick={() => setIsOpen(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {t.startConsultation}
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowWelcome(false)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Bubble Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <div className="relative">
            {/* Pulse Animation Ring */}
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse" />

            {/* Notification Badge */}
            {showWelcome && (
              <div className="absolute -top-1 -right-1 z-10">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-500 rounded-full blur-sm animate-pulse" />
                  <div className="relative w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                </div>
              </div>
            )}

            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl shadow-purple-500/50 border-0 transition-all duration-300 hover:scale-110"
            >
              <MessageCircle className="w-7 h-7 text-white" />
            </Button>
          </div>
        ) : (
          <div className="relative">
            {/* Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />

            {/* Chat Window */}
            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-purple-500/30 rounded-3xl shadow-2xl w-96 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-40 animate-pulse" />
                      <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold flex items-center">
                        {t.aiAssistant}
                        <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      </h3>
                      <p className="text-xs text-gray-400">{t.readyToHelp}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Chat Content */}
              <div className="p-6 space-y-4 h-80 overflow-y-auto">
                {/* AI Message */}
                <div className="flex items-start space-x-3 animate-in slide-in-from-left duration-500">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-sm opacity-40" />
                    <div className="relative w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl rounded-tl-none p-4">
                      <p className="text-white text-sm leading-relaxed">
                        👋 <strong>{t.greetingBold}</strong>
                        <br />
                        <br />
                        {t.greetingMessage}
                        <br />
                        <br />✨ <strong>{t.canIHelp}</strong>
                        <br />
                        <br />
                        {t.tellMe}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{t.justNow}</p>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-white/10 p-4 bg-slate-950/50">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t.placeholder}
                      className="bg-slate-900/50 border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 rounded-xl"
                      autoFocus
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {t.pressEnter}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes slide-in-from-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-from-left {
          from {
            transform: translateX(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-in {
          animation-fill-mode: both;
        }
        .slide-in-from-right {
          animation-name: slide-in-from-right;
        }
        .slide-in-from-left {
          animation-name: slide-in-from-left;
        }
      `}</style>
    </>
  );
}
