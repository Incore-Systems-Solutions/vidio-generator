import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import {
  Menu,
  User,
  Settings,
  CreditCard,
  Sparkles,
  Download,
  CheckCircle2,
  History,
  MessageCircle,
  X,
  Globe,
  ChevronDown,
} from "lucide-react";

// Translations for navbar
const translations = {
  ID: {
    tagline: "Pembuatan Video AI",
    videoGallery: "Galeri Video",
    consultant: "Konsultan Pembuatan Video",
    videoHistory: "Riwayat Video",
    language: "Bahasa",
  },
  EN: {
    tagline: "AI Video Generation",
    videoGallery: "Video Gallery",
    consultant: "Video Making Consultant",
    videoHistory: "Video History",
    language: "Language",
  },
  ZH: {
    tagline: "AI 视频生成",
    videoGallery: "视频库",
    consultant: "视频制作顾问",
    videoHistory: "视频历史",
    language: "语言",
  },
  AR: {
    tagline: "إنشاء فيديو بالذكاء الاصطناعي",
    videoGallery: "معرض الفيديو",
    consultant: "مستشار صناعة الفيديو",
    videoHistory: "سجل الفيديو",
    language: "اللغة",
  },
};

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ID");

  const languages = [
    { code: "ID", label: "Indonesia", nativeLabel: "Indonesia" },
    { code: "EN", label: "English", nativeLabel: "English" },
    { code: "ZH", label: "Mandarin", nativeLabel: "中文" },
    { code: "AR", label: "Arabic", nativeLabel: "العربية" },
  ];

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (
      savedLanguage &&
      translations[savedLanguage as keyof typeof translations]
    ) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        languageDropdownOpen &&
        !target.closest(".language-dropdown-container")
      ) {
        setLanguageDropdownOpen(false);
      }
    };

    if (languageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [languageDropdownOpen]);

  // Handler to change language and save to localStorage
  const handleLanguageChange = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem("preferredLanguage", langCode);
    setLanguageDropdownOpen(false);

    // Dispatch custom event for other components
    window.dispatchEvent(new Event("languageChanged"));
  };

  // Get current translations
  const t = translations[selectedLanguage as keyof typeof translations];

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-white/10 bg-gradient-to-r from-slate-950/90 via-indigo-950/90 to-slate-950/90 backdrop-blur-xl supports-[backdrop-filter]:bg-opacity-80">
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="py-3 sm:py-4">
          {/* Top Row - Logo and Actions */}
          <div className="flex items-center justify-between">
            {/* Logo/Brand with Animation */}
            <div className="flex items-center group">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  <img
                    src="/logo.svg"
                    alt="Instant VideoApp"
                    className="h-8 sm:h-10 md:h-11 w-auto relative z-10 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Brand Name with Gradient */}
                <div className="hidden sm:block">
                  <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    InstanVideo
                  </h1>
                  <p className="text-[10px] text-gray-400 font-light tracking-wider">
                    {t.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation Menu */}
            <div className="hidden md:flex items-center space-x-3">
              {/* Galeri Video Button */}
              <Button
                variant="ghost"
                size="sm"
                className="group relative overflow-hidden bg-gradient-to-r from-slate-500/10 to-gray-500/10 hover:from-slate-500/20 hover:to-gray-500/20 border border-slate-500/20 hover:border-slate-500/40 text-slate-300 hover:text-slate-200 transition-all duration-300 px-4"
                onClick={() => (window.location.href = "/")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-slate-500/0 via-slate-500/10 to-slate-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10 text-sm font-medium">
                  {t.videoGallery}
                </span>
              </Button>

              {/* Video Making Consultant Button - PROMINENT/CORE */}
              <div className="relative">
                {/* Outer Glow Effect for Prominence */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-xl opacity-30 blur-lg group-hover:opacity-50 animate-pulse"></div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="group relative overflow-hidden bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border-2 border-purple-400/50 hover:border-purple-400/70 text-white hover:text-white transition-all duration-300 px-5 py-2.5 font-semibold shadow-lg shadow-purple-500/30"
                  onClick={() => (window.location.href = "/konsultan-video")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-400/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <MessageCircle className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10 text-sm">{t.consultant}</span>
                </Button>
              </div>

              {/* Riwayat Video Button */}
              <Button
                variant="ghost"
                size="sm"
                className="group relative overflow-hidden bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 hover:text-blue-200 transition-all duration-300 px-4"
                onClick={() => (window.location.href = "/riwayat-video")}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <History className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10 text-sm font-medium">
                  {t.videoHistory}
                </span>
              </Button>

              {/* Language Switcher */}
              <div className="relative language-dropdown-container">
                <Button
                  variant="ghost"
                  size="sm"
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-300 hover:text-emerald-200 transition-all duration-300 px-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLanguageDropdownOpen(!languageDropdownOpen);
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  <Globe className="w-4 h-4 mr-2 relative z-10" />
                  <span className="relative z-10 text-sm font-medium">
                    {selectedLanguage}
                  </span>
                  <ChevronDown className="w-3 h-3 ml-1 relative z-10" />
                </Button>

                {/* Dropdown Menu */}
                {languageDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-40 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/20 rounded-lg shadow-xl overflow-hidden z-[110]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        className={`w-full px-4 py-2.5 text-left text-sm transition-colors duration-200 flex items-center justify-between ${
                          selectedLanguage === lang.code
                            ? "bg-emerald-500/20 text-emerald-200"
                            : "text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-200"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLanguageChange(lang.code);
                        }}
                      >
                        <span className="font-medium">{lang.nativeLabel}</span>
                        <span className="text-xs text-gray-500">
                          {lang.code}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              {/* <ThemeToggle /> */}
              <Button
                variant="ghost"
                size="sm"
                className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {/* Galeri Video - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start bg-gradient-to-r from-slate-500/10 to-gray-500/10 hover:from-slate-500/20 hover:to-gray-500/20 border border-slate-500/20 text-slate-300 hover:text-slate-200"
              onClick={() => {
                window.location.href = "/";
                setMobileMenuOpen(false);
              }}
            >
              <Sparkles className="w-4 h-4 mr-3" />
              <span className="text-sm font-medium">{t.videoGallery}</span>
            </Button>

            {/* AI Consultant - Mobile (PROMINENT) */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-20 blur-md animate-pulse"></div>
              <Button
                variant="ghost"
                size="sm"
                className="relative w-full justify-start bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500/40 hover:to-pink-500/40 border-2 border-purple-400/50 text-white hover:text-white font-semibold shadow-lg shadow-purple-500/20"
                onClick={() => {
                  window.location.href = "/konsultan-video";
                  setMobileMenuOpen(false);
                }}
              >
                <MessageCircle className="w-5 h-5 mr-3" />
                <span className="text-sm">{t.consultant}</span>
              </Button>
            </div>

            {/* Riwayat Video - Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start bg-gradient-to-r from-blue-500/10 to-cyan-500/10 hover:from-blue-500/20 hover:to-cyan-500/20 border border-blue-500/20 text-blue-300 hover:text-blue-200"
              onClick={() => {
                window.location.href = "/riwayat-video";
                setMobileMenuOpen(false);
              }}
            >
              <History className="w-4 h-4 mr-3" />
              <span className="text-sm font-medium">{t.videoHistory}</span>
            </Button>

            {/* Language Switcher - Mobile */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-xs text-gray-400 mb-2 px-2 flex items-center">
                <Globe className="w-3 h-3 mr-1" />
                {t.language}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    type="button"
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedLanguage === lang.code
                        ? "bg-gradient-to-r from-emerald-500/30 to-teal-500/30 border-2 border-emerald-400/50 text-emerald-200"
                        : "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-gray-400 hover:text-emerald-300 hover:border-emerald-500/40"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange(lang.code);
                    }}
                  >
                    <div className="text-xs">{lang.nativeLabel}</div>
                    <div className="text-[10px] opacity-70">{lang.code}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </nav>
  );
}
