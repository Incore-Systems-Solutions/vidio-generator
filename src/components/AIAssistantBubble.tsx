import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, MessageCircle, X, Send, Bot } from "lucide-react";

// Translations for AIAssistantBubble
const translations = {
  ID: {
    welcomeMessage:
      "👋 Halo! Anda bisa membuat video realistic tanpa harus mengetik prompt lengkap. Apakah ada yang bisa saya bantu?",
    startConsultation: "Buat Video Sekarang",
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
    startConsultation: "Create Video Now",
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
    startConsultation: "立即制作视频",
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
    startConsultation: "إنشاء فيديو الآن",
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

  const handleStartConsultation = () => {
    // Redirect directly to konsultan-video page
    window.location.href = "/konsultan-video";
  };

  // Get current translations
  const t = translations[selectedLanguage as keyof typeof translations];

  return (
    <>
      {/* Welcome Bubble */}
      {showWelcome && (
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
                    onClick={handleStartConsultation}
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
            onClick={handleStartConsultation}
            size="lg"
            className="relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-2xl shadow-purple-500/50 border-0 transition-all duration-300 hover:scale-110"
          >
            <MessageCircle className="w-7 h-7 text-white" />
          </Button>
        </div>
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
        .animate-in {
          animation-fill-mode: both;
        }
        .slide-in-from-right {
          animation-name: slide-in-from-right;
        }
      `}</style>
    </>
  );
}
