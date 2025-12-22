import React, { useState, useEffect } from "react";
import Joyride, { type CallBackProps, STATUS, type Step } from "react-joyride";
import { Sparkles, X } from "lucide-react";

// Translations for Tour Guide
const translations = {
  ID: {
    welcomeTitle: "Selamat Datang di InstanVideo! 🎉",
    welcomeContent:
      "Mari kami tunjukkan cara membuat video AI yang menakjubkan dalam 4 langkah mudah. Klik 'Mulai' untuk memulai tur!",
    step1Title: "1. Navigasi & Menu",
    step1Content:
      "Di sini Anda bisa mengakses menu utama, melihat riwayat video, dan mengubah bahasa. Klik logo untuk kembali ke beranda.",
    step2Title: "2. Galeri Video Inspirasi",
    step2Content:
      "Lihat video-video menakjubkan yang dibuat oleh pengguna lain. Klik video untuk melihat detail dan mendapatkan inspirasi!",
    step3Title: "3. Buat Video dengan AI",
    step3Content:
      "Klik tombol 'Buat Video Sekarang' untuk melihat 2 pilihan: Auto AI (chat dengan AI) atau Manual (upload gambar & tulis prompt sendiri).",
    step4Title: "4. Riwayat Video Anda",
    step4Content:
      "Akses semua video yang pernah Anda buat. Download, bagikan, atau buat video baru berdasarkan video lama.",
    finalTitle: "Siap Membuat Video? 🚀",
    finalContent:
      "Sekarang Anda sudah tahu cara menggunakan InstanVideo! Pilih cara yang Anda suka: Chat dengan AI atau Buat Manual. Selamat berkreasi!",
    startButton: "Mulai Tur",
    nextButton: "Lanjut",
    backButton: "Kembali",
    skipButton: "Lewati",
    lastButton: "Selesai",
    closeButton: "Tutup",
    dontShowAgain: "Jangan tampilkan lagi",
  },
  EN: {
    welcomeTitle: "Welcome to InstanVideo! 🎉",
    welcomeContent:
      "Let us show you how to create amazing AI videos in 4 easy steps. Click 'Start' to begin the tour!",
    step1Title: "1. Navigation & Menu",
    step1Content:
      "Here you can access the main menu, view video history, and change language. Click the logo to return home.",
    step2Title: "2. Video Gallery Inspiration",
    step2Content:
      "See amazing videos created by other users. Click on a video to see details and get inspired!",
    step3Title: "3. Create Video with AI",
    step3Content:
      "Click 'Create Video Now' button to see 2 options: Auto AI (chat with AI) or Manual (upload images & write your own prompt).",
    step4Title: "4. Your Video History",
    step4Content:
      "Access all videos you've created. Download, share, or create new videos based on old ones.",
    finalTitle: "Ready to Create? 🚀",
    finalContent:
      "Now you know how to use InstanVideo! Choose your preferred way: Chat with AI or Create Manually. Happy creating!",
    startButton: "Start Tour",
    nextButton: "Next",
    backButton: "Back",
    skipButton: "Skip",
    lastButton: "Finish",
    closeButton: "Close",
    dontShowAgain: "Don't show again",
  },
  ZH: {
    welcomeTitle: "欢迎来到 InstanVideo！🎉",
    welcomeContent:
      "让我们向您展示如何通过 4 个简单步骤创建令人惊叹的 AI 视频。点击 开始导览！",
    step1Title: "1. 导航和菜单",
    step1Content:
      "在这里您可以访问主菜单、查看视频历史记录和更改语言。点击徽标返回主页。",
    step2Title: "2. 视频画廊灵感",
    step2Content:
      "查看其他用户创建的精彩视频。点击视频查看详细信息并获得灵感！",
    step3Title: "3. 使用 AI 创建视频",
    step3Content:
      "点击立即制作视频按钮查看 2 个选项：自动AI（与AI聊天）或手动（上传图片并编写自己的提示）。",
    step4Title: "4. 您的视频历史",
    step4Content: "访问您创建的所有视频。下载、分享或基于旧视频创建新视频。",
    finalTitle: "准备好创建了吗？🚀",
    finalContent:
      "现在您知道如何使用 InstanVideo 了！选择您喜欢的方式：与 AI 聊天或手动创建。祝您创作愉快！",
    startButton: "开始导览",
    nextButton: "下一步",
    backButton: "返回",
    skipButton: "跳过",
    lastButton: "完成",
    closeButton: "关闭",
    dontShowAgain: "不再显示",
  },
  AR: {
    welcomeTitle: "مرحبًا بك في InstanVideo! 🎉",
    welcomeContent:
      "دعنا نوضح لك كيفية إنشاء مقاطع فيديو AI مذهلة في 4 خطوات سهلة. انقر على 'ابدأ' لبدء الجولة!",
    step1Title: "1. التنقل والقائمة",
    step1Content:
      "هنا يمكنك الوصول إلى القائمة الرئيسية وعرض سجل الفيديو وتغيير اللغة. انقر على الشعار للعودة إلى الصفحة الرئيسية.",
    step2Title: "2. معرض الفيديو الملهم",
    step2Content:
      "شاهد مقاطع الفيديو المذهلة التي أنشأها مستخدمون آخرون. انقر على فيديو لرؤية التفاصيل والحصول على الإلهام!",
    step3Title: "3. إنشاء فيديو باستخدام AI",
    step3Content:
      "انقر على زر 'إنشاء فيديو الآن' لرؤية خيارين: الذكاء الاصطناعي التلقائي (الدردشة مع AI) أو يدوي (تحميل الصور وكتابة التحديد الخاص بك).",
    step4Title: "4. سجل الفيديو الخاص بك",
    step4Content:
      "الوصول إلى جميع مقاطع الفيديو التي أنشأتها. تنزيل أو مشاركة أو إنشاء مقاطع فيديو جديدة بناءً على القديمة.",
    finalTitle: "هل أنت مستعد للإنشاء؟ 🚀",
    finalContent:
      "الآن تعرف كيفية استخدام InstanVideo! اختر الطريقة المفضلة لديك: الدردشة مع AI أو الإنشاء يدويًا. استمتع بالإبداع!",
    startButton: "ابدأ الجولة",
    nextButton: "التالي",
    backButton: "رجوع",
    skipButton: "تخطي",
    lastButton: "إنهاء",
    closeButton: "إغلاق",
    dontShowAgain: "لا تظهر مرة أخرى",
  },
};

export function HomeTourGuide() {
  const [run, setRun] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ID");
  const [showWelcome, setShowWelcome] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load language from localStorage
  useEffect(() => {
    if (!isClient) return;

    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (
      savedLanguage &&
      translations[savedLanguage as keyof typeof translations]
    ) {
      setSelectedLanguage(savedLanguage);
    }

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem("preferredLanguage");
      if (
        newLanguage &&
        translations[newLanguage as keyof typeof translations]
      ) {
        setSelectedLanguage(newLanguage);
      }
    };

    const interval = setInterval(() => {
      const currentLanguage = localStorage.getItem("preferredLanguage");
      if (currentLanguage && currentLanguage !== selectedLanguage) {
        setSelectedLanguage(currentLanguage);
      }
    }, 500);

    window.addEventListener("languageChanged", handleLanguageChange);
    return () => {
      window.removeEventListener("languageChanged", handleLanguageChange);
      clearInterval(interval);
    };
  }, [selectedLanguage, isClient]);

  // Check if tour should be shown
  useEffect(() => {
    if (!isClient) return;

    const tourCompleted = localStorage.getItem("homeTourCompleted");
    const dontShowAgain = localStorage.getItem("homeTourDontShow");

    if (!tourCompleted && !dontShowAgain) {
      // Show welcome modal after 1 second
      setTimeout(() => {
        setShowWelcome(true);
      }, 1000);
    }
  }, [isClient]);

  const t = translations[selectedLanguage as keyof typeof translations];

  // Define tour steps
  const steps: Step[] = [
    {
      target: ".navbar-container",
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2 text-sm">
              1
            </span>
            {t.step1Title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {t.step1Content}
          </p>
        </div>
      ),
      placement: "bottom",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: ".video-gallery-section",
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2 text-sm">
              2
            </span>
            {t.step2Title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {t.step2Content}
          </p>
        </div>
      ),
      placement: "top",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: ".menu-ai-consultant",
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2 text-sm">
              3
            </span>
            {t.step3Title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {t.step3Content}
          </p>
          <p className="text-gray-400 text-xs mt-2">
            💡 Klik tombol ini untuk melihat 2 pilihan: Auto AI atau Manual
          </p>
        </div>
      ),
      placement: "bottom",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: ".menu-video-history",
      content: (
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-2 text-sm">
              4
            </span>
            {t.step4Title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {t.step4Content}
          </p>
        </div>
      ),
      placement: "bottom",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
    {
      target: "body",
      content: (
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white">{t.finalTitle}</h3>
          <p className="text-gray-300 leading-relaxed">{t.finalContent}</p>
        </div>
      ),
      placement: "center",
      disableBeacon: true,
      floaterProps: {
        disableAnimation: true,
      },
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, action, type, lifecycle } = data;

    // console.log("Joyride callback:", {
    //   status,
    //   index,
    //   action,
    //   type,
    //   lifecycle,
    // });

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status as any)) {
      setRun(false);
      setShowWelcome(false);
      localStorage.setItem("homeTourCompleted", "true");
    }

    if (action === "close") {
      setRun(false);
      setShowWelcome(false);
    }
  };

  const handleStartTour = () => {
    setShowWelcome(false);
    // Add delay to ensure DOM is ready
    setTimeout(() => {
      // console.log("Starting tour, checking elements...");
      // Check all elements exist
      steps.forEach((step, index) => {
        if (step.target && step.target !== "body") {
          const element = document.querySelector(step.target as string);
          // console.log(
          //   `Step ${index + 1} - Target: ${step.target}, Found: ${!!element}`
          // );
        }
      });
      setRun(true);
    }, 500);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem("homeTourDontShow", "true");
    localStorage.setItem("homeTourCompleted", "true");
    setShowWelcome(false);
  };

  const handleSkipTour = () => {
    setShowWelcome(false);
  };

  // Manual trigger for tour (can be called from help button)
  useEffect(() => {
    if (!isClient) return;

    const handleStartTourEvent = () => {
      // console.log("Manual tour trigger");
      setTimeout(() => {
        setRun(true);
      }, 300);
    };

    window.addEventListener("startHomeTour", handleStartTourEvent);
    return () => {
      window.removeEventListener("startHomeTour", handleStartTourEvent);
    };
  }, [isClient]);

  // Don't render anything on server
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
            onClick={handleSkipTour}
          />

          {/* Modal Content */}
          <div className="relative max-w-lg w-full">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 rounded-3xl opacity-30 blur-2xl animate-pulse" />

            <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              {/* Close Button */}
              <button
                onClick={handleSkipTour}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
                <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center border-2 border-purple-400/50">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl font-bold text-center mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {t.welcomeTitle}
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-300 text-center mb-8 leading-relaxed">
                {t.welcomeContent}
              </p>

              {/* Buttons */}
              <div className="space-y-3">
                {/* Start Tour Button */}
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl blur opacity-50" />
                  <button
                    onClick={handleStartTour}
                    className="relative w-full py-3.5 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>{t.startButton}</span>
                  </button>
                </div>

                {/* Skip Button */}
                <button
                  onClick={handleSkipTour}
                  className="w-full py-3 bg-slate-800/50 hover:bg-slate-800/70 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300"
                >
                  {t.skipButton}
                </button>

                {/* Don't Show Again */}
                <button
                  onClick={handleDontShowAgain}
                  className="w-full py-2 text-sm text-gray-500 hover:text-gray-400 transition-colors"
                >
                  {t.dontShowAgain}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Joyride Tour */}
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        disableScrolling={false}
        disableOverlayClose
        spotlightClicks={false}
        locale={{
          back: t.backButton,
          close: t.closeButton,
          last: t.lastButton,
          next: t.nextButton,
          skip: t.skipButton,
        }}
        styles={{
          options: {
            primaryColor: "#8b5cf6",
            textColor: "#ffffff",
            backgroundColor: "#0f172a",
            overlayColor: "rgba(15, 23, 42, 0.8)",
            arrowColor: "#0f172a",
            zIndex: 10000,
          },
          tooltip: {
            borderRadius: 16,
            padding: 20,
            backgroundColor: "#0f172a",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            boxShadow: "0 20px 60px rgba(139, 92, 246, 0.3)",
          },
          tooltipContainer: {
            textAlign: "left",
          },
          tooltipContent: {
            padding: "10px 0",
          },
          buttonNext: {
            backgroundColor: "#8b5cf6",
            borderRadius: 8,
            padding: "10px 20px",
            fontSize: 14,
            fontWeight: 600,
          },
          buttonBack: {
            color: "#9ca3af",
            marginRight: 10,
          },
          buttonSkip: {
            color: "#9ca3af",
          },
          spotlight: {
            borderRadius: 12,
          },
        }}
      />
    </>
  );
}
