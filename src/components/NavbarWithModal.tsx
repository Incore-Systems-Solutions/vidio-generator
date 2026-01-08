import React, { useState } from "react";
import {
  Home,
  Sparkles,
  History,
  Menu,
  X,
  Globe,
  TvMinimal,
  Film,
} from "lucide-react";

interface NavbarWithModalProps {
  currentStep?: number;
  totalSteps?: number;
}

// Translations
const translations = {
  ID: {
    home: "Beranda",
    create: "Buat Video",
    history: "Riwayat",
    menu: "Menu",
    autoAI: "Auto AI",
    manual: "Manual",
    language: "Bahasa",
  },
  EN: {
    home: "Home",
    create: "Create",
    history: "History",
    menu: "Menu",
    autoAI: "Auto AI",
    manual: "Manual",
    language: "Language",
  },
  ZH: {
    home: "首页",
    create: "创建",
    history: "历史",
    menu: "菜单",
    autoAI: "自动AI",
    manual: "手动",
    language: "语言",
  },
  AR: {
    home: "الرئيسية",
    create: "إنشاء",
    history: "التاريخ",
    menu: "القائمة",
    autoAI: "الذكاء الاصطناعي التلقائي",
    manual: "يدوي",
    language: "اللغة",
  },
};

export function NavbarWithModal({
  currentStep = 1,
  totalSteps = 4,
}: NavbarWithModalProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ID");

  const languages = [
    { code: "ID", label: "Indonesia", nativeLabel: "Indonesia" },
    { code: "EN", label: "English", nativeLabel: "English" },
    { code: "ZH", label: "Mandarin", nativeLabel: "中文" },
    { code: "AR", label: "Arabic", nativeLabel: "العربية" },
  ];

  // Load language from localStorage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (
      savedLanguage &&
      translations[savedLanguage as keyof typeof translations]
    ) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem("preferredLanguage", langCode);
    window.dispatchEvent(new Event("languageChanged"));
  };

  const t = translations[selectedLanguage as keyof typeof translations];

  return (
    <>
      {/* Top Bar - Logo Only */}
      <div className="bg-slate-950/95 backdrop-blur-xl border-b border-slate-800/50 px-4 py-3">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.svg" alt="InstantVideoApp" className="h-8 w-auto" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Instant!!
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar - Native Style */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800/50 safe-area-bottom">
        <div className="grid grid-cols-4 gap-1 px-2 py-2">
          {/* Home */}
          <button
            onClick={() => (window.location.href = "/index.html")}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors hover:bg-slate-800/50 active:bg-slate-800/70"
          >
            <Home className="w-6 h-6 text-purple-400 mb-1" />
            <span className="text-[10px] text-gray-400 font-medium">
              {t.home}
            </span>
          </button>

          {/* Create Video */}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors hover:bg-slate-800/50 active:bg-slate-800/70"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="text-[10px] text-purple-400 font-medium mt-1">
              {t.create}
            </span>
          </button>

          {/* History */}
          <button
            onClick={() => (window.location.href = "/riwayat-video.html")}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors hover:bg-slate-800/50 active:bg-slate-800/70"
          >
            <History className="w-6 h-6 text-blue-400 mb-1" />
            <span className="text-[10px] text-gray-400 font-medium">
              {t.history}
            </span>
          </button>

          {/* Menu */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors hover:bg-slate-800/50 active:bg-slate-800/70"
          >
            <Menu className="w-6 h-6 text-gray-400 mb-1" />
            <span className="text-[10px] text-gray-400 font-medium">
              {t.menu}
            </span>
          </button>
        </div>
      </div>

      {/* Create Video Bottom Sheet */}
      {isCreateModalOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
            onClick={() => setIsCreateModalOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-slate-900 rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300">
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-semibold text-white">{t.create}</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Pilih metode pembuatan video
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Options */}
            <div className="px-4 py-4 space-y-3 pb-safe">
              {/* Auto AI Option */}
              <button
                onClick={() => {
                  window.location.href = "/konsultan-video.html";
                }}
                className="w-full p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-2 border-purple-500/30 hover:border-purple-500/50 rounded-2xl transition-all active:scale-[0.98] text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
                      <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3">
                        <TvMinimal className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-white mb-1">
                      {t.autoAI}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Biarkan AI membuat video untuk Anda secara otomatis
                    </p>
                  </div>
                </div>
              </button>

              {/* Manual Video Option */}
              <button
                onClick={() => {
                  window.location.href = "/create-video.html";
                }}
                className="w-full p-4 bg-slate-800/50 border-2 border-slate-700 hover:border-slate-600 rounded-2xl transition-all active:scale-[0.98] text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="bg-slate-700 rounded-xl p-3">
                      <Film className="w-6 h-6 text-blue-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-white mb-1">
                      {t.manual}
                    </h4>
                    <p className="text-sm text-gray-400">
                      Kontrol penuh atas setiap detail video Anda
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Safe Area Bottom */}
            <div className="safe-area-bottom bg-slate-900"></div>
          </div>
        </>
      )}

      {/* Menu Bottom Sheet */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 z-[70] bg-slate-900 rounded-t-3xl shadow-2xl animate-in slide-in-from-bottom duration-300 safe-area-bottom">
            {/* Handle Bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800">
              <h3 className="text-lg font-semibold text-white">{t.menu}</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-slate-800 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="px-4 py-4 max-h-[70vh] overflow-y-auto">
              {/* Create Video Options */}
              {/* Language Selector */}
              <div className="mb-4">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2 flex items-center">
                  <Globe className="w-3 h-3 mr-1" />
                  {t.language}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`p-3 rounded-xl text-sm font-medium transition-all ${
                        selectedLanguage === lang.code
                          ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-2 border-emerald-400/50 text-emerald-200"
                          : "bg-slate-800/50 border border-slate-700 text-gray-400 hover:text-emerald-300 hover:border-emerald-500/40"
                      }`}
                    >
                      <div className="text-xs">{lang.nativeLabel}</div>
                      <div className="text-[10px] opacity-70">{lang.code}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Padding */}
              <div className="h-4"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
