import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, o as renderScript, r as renderTemplate } from '../chunks/astro/server_DLHOh8jC.mjs';
import 'kleur/colors';
import { N as NavbarWithModal } from '../chunks/NavbarWithModal_DF7YqAOL.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createContext, useState, useEffect, useContext } from 'react';
import { C as Card, B as Button, d as Badge, c as CardContent$1, a as CardHeader, b as CardTitle, e as cn } from '../chunks/card_D8elN7z5.mjs';
import { UserCheck, User, Upload, Wand2, Palette, FileText, Volume2, Briefcase, Smile, GraduationCap, BarChart3, BookOpen, Newspaper, Mic, Star, Lightbulb, Loader2, Play } from 'lucide-react';
import { b as backgroundsApi, u as uploadApi, c as charactersApi, p as publicVideoGalleryApi } from '../chunks/api_Zi8Etrro.mjs';
import { I as Input } from '../chunks/input_BNBZJNyb.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Textarea } from '../chunks/select_8smLBtfp.mjs';
import { v as videoSetupStorage } from '../chunks/videoSetupStorage_3qmsD2TP.mjs';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const VideoSetupContext = createContext(
  void 0
);
const initialData = {
  selectedCharacter: null,
  selectedBackground: null,
  characterImage: null,
  backgroundImage: null,
  prompt: "",
  aspekRasio: "",
  judulVideo: "",
  bahasa: "",
  gayaSuara: "",
  voiceOver: "",
  tone: "",
  backgroundMusic: "",
  resolusiVideo: "",
  isShare: "n"
};
function VideoSetupProvider({ children }) {
  const [data, setData] = useState(initialData);
  useEffect(() => {
    const savedData = localStorage.getItem("videoSetupData");
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setData((prev) => ({
          ...prev,
          prompt: parsedData.prompt || "",
          characterImage: parsedData.karakter_image || null,
          backgroundImage: parsedData.background_image || null,
          aspekRasio: parsedData.aspek_rasio || "",
          judulVideo: parsedData.judul_video || "",
          bahasa: parsedData.bahasa || "",
          gayaSuara: parsedData.gaya_suara || "",
          voiceOver: parsedData.voice_over || "",
          tone: parsedData.tone || "",
          backgroundMusic: parsedData.background_music || "",
          resolusiVideo: parsedData.resolusi_video || "",
          isShare: parsedData.is_share || "n"
        }));
        localStorage.removeItem("videoSetupData");
      } catch (error) {
        console.error("Error parsing videoSetupData from localStorage:", error);
      }
    }
  }, []);
  const updateCharacter = (characterId, imageUrl) => {
    setData((prev) => ({
      ...prev,
      selectedCharacter: characterId,
      characterImage: imageUrl
    }));
  };
  const updateBackground = (backgroundId, imageUrl) => {
    setData((prev) => ({
      ...prev,
      selectedBackground: backgroundId,
      backgroundImage: imageUrl
    }));
  };
  const updatePrompt = (prompt) => {
    setData((prev) => ({
      ...prev,
      prompt
    }));
  };
  const updateAspectRatio = (ratio) => {
    setData((prev) => ({
      ...prev,
      aspekRasio: ratio
    }));
  };
  const updateJudulVideo = (judul) => {
    setData((prev) => ({
      ...prev,
      judulVideo: judul
    }));
  };
  const updateBahasa = (bahasa) => {
    setData((prev) => ({
      ...prev,
      bahasa
    }));
  };
  const updateGayaSuara = (gaya) => {
    setData((prev) => ({
      ...prev,
      gayaSuara: gaya
    }));
  };
  const updateVoiceOver = (voice) => {
    setData((prev) => ({
      ...prev,
      voiceOver: voice
    }));
  };
  const updateTone = (tone) => {
    setData((prev) => ({
      ...prev,
      tone
    }));
  };
  const updateBackgroundMusic = (music) => {
    setData((prev) => ({
      ...prev,
      backgroundMusic: music
    }));
  };
  const updateResolusiVideo = (resolusi) => {
    setData((prev) => ({
      ...prev,
      resolusiVideo: resolusi
    }));
  };
  const updateIsShare = (isShare) => {
    setData((prev) => ({
      ...prev,
      isShare
    }));
  };
  const resetData = () => {
    setData(initialData);
  };
  return /* @__PURE__ */ jsx(
    VideoSetupContext.Provider,
    {
      value: {
        data,
        updateCharacter,
        updateBackground,
        updatePrompt,
        updateAspectRatio,
        updateJudulVideo,
        updateBahasa,
        updateGayaSuara,
        updateVoiceOver,
        updateTone,
        updateBackgroundMusic,
        updateResolusiVideo,
        updateIsShare,
        resetData
      },
      children
    }
  );
}
function useVideoSetup() {
  const context = useContext(VideoSetupContext);
  if (context === void 0) {
    throw new Error("useVideoSetup must be used within a VideoSetupProvider");
  }
  return context;
}

function CharacterCard({
  type,
  title,
  description,
  image,
  tags = [],
  isSelected = false,
  onClick
}) {
  const handleClick = () => {
    if (type === "custom") {
      window.location.href = "/buat-karakter-kustom";
    } else if (onClick) {
      onClick();
    }
  };
  const getIcon = () => {
    switch (type) {
      case "custom":
        return /* @__PURE__ */ jsx(Wand2, { className: "w-full h-full text-purple-600" });
      case "upload":
        return /* @__PURE__ */ jsx(Upload, { className: "w-full h-full text-gray-600" });
      case "character":
        return /* @__PURE__ */ jsx(User, { className: "w-full h-full text-gray-600" });
      default:
        return /* @__PURE__ */ jsx(UserCheck, { className: "w-full h-full text-gray-600" });
    }
  };
  const getCardStyle = () => {
    if (type === "custom") {
      return "border-2 border-dashed border-purple-300 hover:border-purple-400 cursor-pointer transition-colors";
    }
    if (isSelected) {
      return "border-2 border-purple-500 shadow-lg cursor-pointer transition-all";
    }
    return "border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors";
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: `p-3 sm:p-4 md:p-6 h-full flex flex-col ${getCardStyle()}`,
      onClick: handleClick,
      children: [
        (type === "character" || type === "upload") && image ? /* @__PURE__ */ jsx("div", { className: "mb-3 sm:mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-full h-32 sm:h-40 md:h-48 bg-gray-100 rounded-lg overflow-hidden mb-3 sm:mb-4", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: title,
            className: "w-full h-full object-cover"
          }
        ) }) }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-3 sm:mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12", children: getIcon() }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-base md:text-lg font-semibold mb-2 text-center leading-tight", children: type === "custom" ? /* @__PURE__ */ jsx("span", { className: "text-purple-600", children: "Buat dengan AI" }) : title }),
          type === "custom" && /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4 leading-tight", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "text-xs sm:text-sm text-gray-500 text-center mb-3 sm:mb-4 leading-tight hidden sm:block", children: description }),
          type === "upload" && /* @__PURE__ */ jsx("div", { className: "space-y-1 sm:space-y-2", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "w-full text-xs sm:text-sm py-1 sm:py-2",
              children: "Pilih File"
            }
          ) }),
          tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 justify-center mt-auto", children: [
            tags.map((tag, index) => /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs px-1 py-0 hidden sm:inline-block",
                children: tag
              },
              index
            )),
            tags.slice(0, 2).map((tag, index) => /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs px-1 py-0 sm:hidden",
                children: tag
              },
              `mobile-${index}`
            ))
          ] })
        ] })
      ]
    }
  );
}

function FilterRow({
  characterType,
  characterStyle,
  onCharacterTypeChange,
  onCharacterStyleChange
}) {
  const characterTypeOptions = [
    { id: "all", label: "Semua", isActive: characterType === "all" },
    { id: "male", label: "Pria", isActive: characterType === "male" },
    { id: "female", label: "Wanita", isActive: characterType === "female" }
  ];
  const characterStyleOptions = [
    { id: "all", label: "Semua", isActive: characterStyle === "all" },
    {
      id: "realistic",
      label: "Realistis",
      isActive: characterStyle === "realistic"
    },
    { id: "anime", label: "Anime", isActive: characterStyle === "anime" },
    { id: "cartoon", label: "Kartun", isActive: characterStyle === "cartoon" },
    { id: "3d", label: "3D", isActive: characterStyle === "3d" }
  ];
  return /* @__PURE__ */ jsx(Card, { className: "w-full", children: /* @__PURE__ */ jsxs(CardContent$1, { className: "p-3 sm:p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-4 lg:hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 sm:space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg", children: /* @__PURE__ */ jsx(User, { className: "w-4 h-4 sm:w-5 sm:h-5 text-purple-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-base font-semibold text-foreground", children: "Jenis Karakter" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2", children: characterTypeOptions.map((option) => /* @__PURE__ */ jsxs(
          Button,
          {
            variant: option.isActive ? "default" : "outline",
            size: "sm",
            onClick: () => onCharacterTypeChange(option.id),
            className: `
                    relative transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2
                    ${option.isActive ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md" : "hover:border-purple-300 hover:text-purple-600"}
                  `,
            children: [
              option.isActive && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-600 rounded-full" }) }),
              option.label
            ]
          },
          option.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 sm:space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-1.5 sm:p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg", children: /* @__PURE__ */ jsx(Palette, { className: "w-4 h-4 sm:w-5 sm:h-5 text-purple-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-sm sm:text-base font-semibold text-foreground", children: "Gaya Karakter" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2", children: characterStyleOptions.map((option) => /* @__PURE__ */ jsxs(
          Button,
          {
            variant: option.isActive ? "default" : "outline",
            size: "sm",
            onClick: () => onCharacterStyleChange(option.id),
            className: `
                    relative transition-all duration-200 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2
                    ${option.isActive ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md" : "hover:border-purple-300 hover:text-purple-600"}
                  `,
            children: [
              option.isActive && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-600 rounded-full" }) }),
              option.label
            ]
          },
          option.id
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-purple-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-foreground", children: "Jenis Karakter" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: characterTypeOptions.map((option) => /* @__PURE__ */ jsxs(
          Button,
          {
            variant: option.isActive ? "default" : "outline",
            size: "sm",
            onClick: () => onCharacterTypeChange(option.id),
            className: `
                    relative transition-all duration-200
                    ${option.isActive ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md" : "hover:border-purple-300 hover:text-purple-600"}
                  `,
            children: [
              option.isActive && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-purple-600 rounded-full" }) }),
              option.label
            ]
          },
          option.id
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "h-8 w-px bg-border mx-4" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg", children: /* @__PURE__ */ jsx(Palette, { className: "w-5 h-5 text-purple-600" }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-foreground", children: "Gaya Karakter" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: characterStyleOptions.map((option) => /* @__PURE__ */ jsxs(
          Button,
          {
            variant: option.isActive ? "default" : "outline",
            size: "sm",
            onClick: () => onCharacterStyleChange(option.id),
            className: `
                    relative transition-all duration-200
                    ${option.isActive ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md" : "hover:border-purple-300 hover:text-purple-600"}
                  `,
            children: [
              option.isActive && /* @__PURE__ */ jsx("div", { className: "absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-purple-600 rounded-full" }) }),
              option.label
            ]
          },
          option.id
        )) })
      ] })
    ] })
  ] }) });
}

function BackgroundCard({
  type,
  title,
  description,
  image,
  tags = [],
  isSelected = false,
  onClick
}) {
  const getIcon = () => {
    switch (type) {
      case "custom":
        return /* @__PURE__ */ jsx(Wand2, { className: "w-8 h-8 text-purple-600" });
      case "upload":
        return /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-gray-600" });
      default:
        return null;
    }
  };
  const getCardStyle = () => {
    if (type === "custom") {
      return "border-2 border-dashed border-purple-300 hover:border-purple-400 cursor-pointer transition-colors";
    }
    if (isSelected) {
      return "border-2 border-purple-500 shadow-lg cursor-pointer transition-all";
    }
    return "border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors";
  };
  return /* @__PURE__ */ jsxs(
    Card,
    {
      className: `p-2 sm:p-3 md:p-4 h-full flex flex-col ${getCardStyle()}`,
      onClick,
      children: [
        (type === "background" || type === "upload") && image ? /* @__PURE__ */ jsx("div", { className: "mb-2 sm:mb-3 md:mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-full h-20 sm:h-24 md:h-32 bg-gray-100 rounded-lg overflow-hidden mb-2 sm:mb-3", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: title,
            className: "w-full h-full object-cover"
          }
        ) }) }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-2 sm:mb-3 md:mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8", children: getIcon() }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xs sm:text-sm font-semibold mb-1 sm:mb-2 text-center leading-tight", children: type === "custom" ? /* @__PURE__ */ jsx("span", { className: "text-purple-600", children: "Buat dengan AI" }) : title }),
          type === "custom" && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mb-1 sm:mb-2 leading-tight", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mb-2 sm:mb-3 leading-tight hidden sm:block", children: description }),
          type === "upload" && /* @__PURE__ */ jsx("div", { className: "space-y-1 sm:space-y-2", children: /* @__PURE__ */ jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "w-full text-xs py-1 sm:py-2",
              children: "Pilih File"
            }
          ) }),
          tags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-1 justify-center mt-auto", children: [
            tags.map((tag, index) => /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs px-1 py-0 hidden sm:inline-block",
                children: tag
              },
              index
            )),
            tags.slice(0, 2).map((tag, index) => /* @__PURE__ */ jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs px-1 py-0 sm:hidden",
                children: tag
              },
              `mobile-${index}`
            ))
          ] })
        ] })
      ]
    }
  );
}

function BackgroundGallery() {
  const { data, updateBackground } = useVideoSetup();
  const [backgrounds, setBackgrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    const fetchBackgrounds = async () => {
      try {
        setLoading(true);
        const data2 = await backgroundsApi.getBackgrounds();
        setBackgrounds(data2);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch backgrounds"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBackgrounds();
  }, []);
  useEffect(() => {
    if (data.backgroundImage && !data.selectedBackground && backgrounds.length > 0) {
      const matchingBackground = backgrounds.find(
        (bg) => bg.image === data.backgroundImage
      );
      if (matchingBackground) {
        updateBackground(matchingBackground.id, data.backgroundImage);
      } else {
        updateBackground("upload", data.backgroundImage);
      }
    }
  }, [
    data.backgroundImage,
    backgrounds,
    data.selectedBackground,
    updateBackground
  ]);
  const handleBackgroundSelect = async (backgroundId) => {
    if (backgroundId === "upload") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          try {
            setUploading(true);
            setError(null);
            const base64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(file);
            });
            const result = await uploadApi.uploadImage(base64);
            setBackgrounds(
              (prev) => prev.map(
                (bg) => bg.id === "upload" ? {
                  ...bg,
                  image: result.url,
                  description: "Background yang diupload"
                } : bg
              )
            );
            updateBackground(backgroundId, result.url);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
          } finally {
            setUploading(false);
          }
        }
      };
      input.click();
    } else {
      const background = backgrounds.find((bg) => bg.id === backgroundId);
      updateBackground(backgroundId, background?.image || null);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0", children: /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-bold text-foreground", children: "Galeri Background" }) }),
    loading ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 sm:py-8", children: /* @__PURE__ */ jsx("div", { className: "text-sm sm:text-base text-muted-foreground", children: "Loading backgrounds..." }) }) : uploading ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 sm:py-8", children: /* @__PURE__ */ jsx("div", { className: "text-sm sm:text-base text-muted-foreground", children: "Uploading image..." }) }) : error ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 sm:py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-sm sm:text-base text-red-500", children: [
      "Error: ",
      error
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4", children: backgrounds.map((background) => /* @__PURE__ */ jsx(
      BackgroundCard,
      {
        type: background.type,
        title: background.title,
        description: background.description || void 0,
        image: background.image || void 0,
        tags: background.tags || void 0,
        isSelected: data.selectedBackground === background.id,
        onClick: () => handleBackgroundSelect(background.id)
      },
      background.id
    )) })
  ] });
}

function VideoDetailSection() {
  const {
    data,
    updatePrompt,
    updateAspectRatio,
    updateJudulVideo,
    updateBahasa,
    updateGayaSuara,
    updateVoiceOver,
    updateTone,
    updateBackgroundMusic,
    updateResolusiVideo,
    updateIsShare
  } = useVideoSetup();
  const [script, setScript] = useState(data.prompt || "");
  useEffect(() => {
    setScript(data.prompt || "");
  }, [data.prompt]);
  const toneOptions = [
    { id: "professional", label: "Professional", icon: Briefcase },
    { id: "friendly", label: "Friendly", icon: Smile },
    { id: "educational", label: "Educational", icon: GraduationCap },
    { id: "marketing", label: "Marketing", icon: BarChart3 },
    { id: "storytelling", label: "Storytelling", icon: BookOpen },
    { id: "news", label: "News", icon: Newspaper }
  ];
  const wordCount = script.split(/\s+/).filter((word) => word.length > 0).length;
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-6", children: "Detail Video & Script" }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Informasi Dasar" })
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent$1, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Judul Video" }),
            /* @__PURE__ */ jsx(
              Input,
              {
                placeholder: "Masukkan judul video anda...",
                value: data.judulVideo,
                onChange: (e) => updateJudulVideo(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Aspek Rasio" }),
            /* @__PURE__ */ jsxs(Select, { value: data.aspekRasio, onValueChange: updateAspectRatio, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih rasio video anda" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "16:9", children: "16:9 (Widescreen)" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "9:16", children: "9:16 (Vertical)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Script/Naskah Video" }),
            /* @__PURE__ */ jsx(
              Textarea,
              {
                placeholder: "Masukkan script video anda...",
                value: script,
                onChange: (e) => {
                  setScript(e.target.value);
                  updatePrompt(e.target.value);
                },
                className: "min-h-32"
              }
            ),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-2", children: [
              wordCount,
              " kata"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Volume2, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Pengaturan Suara & Bahasa" })
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent$1, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Bahasa" }),
            /* @__PURE__ */ jsxs(Select, { value: data.bahasa, onValueChange: updateBahasa, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih bahasa untuk video anda" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "id", children: "Bahasa Indonesia" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "en", children: "English" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "es", children: "Español" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "fr", children: "Français" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Gaya Suara" }),
            /* @__PURE__ */ jsxs(Select, { value: data.gayaSuara, onValueChange: updateGayaSuara, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih gaya suara untuk video anda" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "natural", children: "Natural" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "energetic", children: "Energetic" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "calm", children: "Calm" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "professional", children: "Professional" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Voice Over" }),
            /* @__PURE__ */ jsxs(Select, { value: data.voiceOver, onValueChange: updateVoiceOver, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih voice over untuk video anda" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "male", children: "Male Voice" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "female", children: "Female Voice" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "child", children: "Child Voice" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Tone/Nada Video" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: toneOptions.map((tone) => {
              const Icon = tone.icon;
              return /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: data.tone === tone.id ? "default" : "outline",
                  size: "sm",
                  onClick: () => updateTone(tone.id),
                  className: `flex items-center space-x-2 ${data.tone === tone.id ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" : ""}`,
                  children: [
                    /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: tone.label })
                  ]
                },
                tone.id
              );
            }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Mic, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Pengaturan Lanjutan" })
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent$1, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Background Music" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: data.backgroundMusic,
                onValueChange: updateBackgroundMusic,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih background music" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "upbeat", children: "Upbeat" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "calm", children: "Calm" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "dramatic", children: "Dramatic" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "corporate", children: "Corporate" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "ambient", children: "Ambient" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "none", children: "Tidak ada musik" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Resolusi Video" }),
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: data.resolusiVideo,
                onValueChange: updateResolusiVideo,
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih resolusi video" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsx(SelectItem, { value: "1080p", children: "1080p (Full HD)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "720p", children: "720p (HD)" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Share Video Public" }),
            /* @__PURE__ */ jsxs(Select, { value: data.isShare, onValueChange: updateIsShare, children: [
              /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih visibility video" }) }),
              /* @__PURE__ */ jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsx(SelectItem, { value: "y", children: "Share Public" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "n", children: "Private" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Star, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Preview" })
        ] }) }),
        /* @__PURE__ */ jsxs(CardContent$1, { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Bahasa:" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: data.bahasa || "Belum dipilih" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Gaya Suara:" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: data.gayaSuara || "Belum dipilih" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Tone:" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: data.tone || "Belum dipilih" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Background Musik:" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: data.backgroundMusic || "Belum dipilih" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Resolusi:" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: data.resolusiVideo || "Belum dipilih" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: "Voice Over:" }),
            /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: data.voiceOver || "Belum dipilih" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Lightbulb, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Tips" })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent$1, { children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsx("li", { children: "• Gunakan kalimat yang jelas dan tidak terlalu panjang" }),
          /* @__PURE__ */ jsx("li", { children: "• Tambahkan jeda dengan tanda koma atau titik" }),
          /* @__PURE__ */ jsx("li", { children: "• Hindari singkatan yang sulit diucapkan" }),
          /* @__PURE__ */ jsx("li", { children: "• Jelaskan script dengan detail agar menghasilkan video yang diinginkan" })
        ] }) })
      ] })
    ] })
  ] });
}

function SetupSection() {
  const { data, updateCharacter } = useVideoSetup();
  const [characterType, setCharacterType] = useState("all");
  const [characterStyle, setCharacterStyle] = useState("all");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data2 = await charactersApi.getCharacters();
        setCharacters(data2);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch characters"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, []);
  useEffect(() => {
    if (data.characterImage && !data.selectedCharacter && characters.length > 0) {
      const matchingCharacter = characters.find(
        (char) => char.image === data.characterImage
      );
      if (matchingCharacter) {
        updateCharacter(matchingCharacter.id, data.characterImage);
      } else {
        updateCharacter("upload", data.characterImage);
      }
    }
  }, [
    data.characterImage,
    characters,
    data.selectedCharacter,
    updateCharacter
  ]);
  const handleCharacterTypeChange = (type) => {
    setCharacterType(type);
  };
  const handleCharacterStyleChange = (style) => {
    setCharacterStyle(style);
  };
  const handleContinueToPayment = () => {
    videoSetupStorage.save({
      prompt: data.prompt,
      karakter_image: data.characterImage || "",
      background_image: data.backgroundImage || "",
      aspek_rasio: data.aspekRasio,
      judul_video: data.judulVideo,
      bahasa: data.bahasa,
      gaya_suara: data.gayaSuara,
      voice_over: data.voiceOver,
      tone: data.tone,
      background_music: data.backgroundMusic,
      resolusi_video: data.resolusiVideo,
      is_share: data.isShare
    });
    window.location.href = "/pembayaran";
  };
  const handleCharacterSelect = async (characterId) => {
    if (characterId === "upload") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
          try {
            setUploading(true);
            setError(null);
            const base64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result);
              reader.readAsDataURL(file);
            });
            const result = await uploadApi.uploadImage(base64);
            setCharacters(
              (prev) => prev.map(
                (char) => char.id === "upload" ? {
                  ...char,
                  image: result.url,
                  description: "Foto yang diupload"
                } : char
              )
            );
            updateCharacter(characterId, result.url);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Upload failed");
          } finally {
            setUploading(false);
          }
        }
      };
      input.click();
    } else {
      const character = characters.find((char) => char.id === characterId);
      updateCharacter(characterId, character?.image || null);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8 sm:mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3 sm:mb-4", children: "Setup Video AI Anda" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4", children: "Lengkapi semua pengaturan untuk video AI Anda dalam satu langkah. Pilih karakter, tulis script, dan tentukan environment untuk hasil terbaik." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-8 sm:mb-12", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-6xl", children: /* @__PURE__ */ jsx(
      FilterRow,
      {
        characterType,
        characterStyle,
        onCharacterTypeChange: handleCharacterTypeChange,
        onCharacterStyleChange: handleCharacterStyleChange
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-6 sm:mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-6 sm:mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl sm:text-2xl font-bold text-foreground mb-2", children: "Pilih Karakter AI Anda" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm sm:text-base text-muted-foreground px-4", children: "Pilih karakter yang sesuai dengan kebutuhan video Anda" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-7xl", children: loading ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 sm:py-8", children: /* @__PURE__ */ jsx("div", { className: "text-sm sm:text-base text-muted-foreground", children: "Loading characters..." }) }) : uploading ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 sm:py-8", children: /* @__PURE__ */ jsx("div", { className: "text-sm sm:text-base text-muted-foreground", children: "Uploading image..." }) }) : error ? /* @__PURE__ */ jsx("div", { className: "text-center py-6 sm:py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-sm sm:text-base text-red-500", children: [
        "Error: ",
        error
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6", children: characters.map((character) => /* @__PURE__ */ jsx(
        CharacterCard,
        {
          type: character.type,
          title: character.title,
          description: character.description || void 0,
          image: character.image || void 0,
          tags: character.tags || void 0,
          isSelected: data.selectedCharacter === character.id,
          onClick: () => handleCharacterSelect(character.id)
        },
        character.id
      )) }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 sm:mb-8", children: /* @__PURE__ */ jsx(BackgroundGallery, {}) }),
    /* @__PURE__ */ jsx("div", { className: "mb-6 sm:mb-8", children: /* @__PURE__ */ jsx(VideoDetailSection, {}) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center px-4", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "lg",
        className: "w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-sm sm:text-base",
        disabled: !data.selectedCharacter || uploading,
        onClick: handleContinueToPayment,
        children: uploading ? "Uploading..." : "Lanjutkan ke Pembayaran"
      }
    ) })
  ] });
}

function SetupPage() {
  return /* @__PURE__ */ jsx(VideoSetupProvider, { children: /* @__PURE__ */ jsx(SetupSection, {}) });
}

function Card2({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card2",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm transition-all duration-200",
        className
      ),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}

const convertApiDataToVideoItem = (apiItem) => {
  const tags = apiItem.prompt.split(" ").filter((word) => word.length > 3).slice(0, 3).map((word) => word.replace(/[.,!?]/g, ""));
  const duration = Math.floor(apiItem.prompt.length / 50) + 1;
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const durationStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  return {
    id: apiItem.id.toString(),
    title: apiItem.prompt.length > 50 ? apiItem.prompt.substring(0, 50) + "..." : apiItem.prompt,
    creator: apiItem.user.name,
    likes: Math.floor(Math.random() * 500) + 10,
    // Random likes for demo
    thumbnail: apiItem.url_video,
    // Use video URL as thumbnail
    duration: durationStr,
    tags,
    isVideo: true,
    url_video: apiItem.url_video,
    prompt: apiItem.prompt
  };
};
function VideoGallery({ onVideoClick }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoDetail, setVideoDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        if (currentPage === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
        setError(null);
        const response = await publicVideoGalleryApi.getPublicVideos(
          currentPage,
          10
        );
        const convertedVideos = response.data.map(convertApiDataToVideoItem);
        if (currentPage === 1) {
          setVideos(convertedVideos);
        } else {
          setVideos((prevVideos) => [...prevVideos, ...convertedVideos]);
        }
        setTotalPages(response.last_page);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchVideos();
  }, [currentPage]);
  const handleVideoClick = async (video) => {
    setSelectedVideo(video);
    setLoadingDetail(true);
    setVideoDetail(null);
    try {
      const response = await publicVideoGalleryApi.getVideoDetail(video.id);
      setVideoDetail(response.data);
    } catch (error2) {
      console.error("Error fetching video detail:", error2);
    } finally {
      setLoadingDetail(false);
    }
    onVideoClick?.(video);
  };
  const handleLoadMore = () => {
    if (currentPage < totalPages && !loading && !loadingMore) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handleRefresh = () => {
    setCurrentPage(1);
    setVideos([]);
    setError(null);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-4xl font-light text-foreground mb-6 tracking-tight", children: "Video Gallery" }),
      /* @__PURE__ */ jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed", children: "Discover creative videos from our community. Find inspiration for your next project." })
    ] }),
    loading && /* @__PURE__ */ jsx("div", { className: "flex justify-center items-center py-16", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin text-gray-400" }),
      /* @__PURE__ */ jsx("span", { className: "text-muted-foreground text-sm", children: "Loading videos..." })
    ] }) }),
    error && /* @__PURE__ */ jsxs("div", { className: "text-center py-16", children: [
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6 text-sm", children: error }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleRefresh,
          variant: "outline",
          className: "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
          children: "Try Again"
        }
      )
    ] }),
    !loading && !error && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", children: videos.map((video) => /* @__PURE__ */ jsx(
      Card2,
      {
        className: "group cursor-pointer transition-all duration-300 hover:shadow-2xl border-0 bg-white overflow-hidden rounded-xl aspect-video",
        onClick: () => handleVideoClick(video),
        children: /* @__PURE__ */ jsx(CardContent, { className: "p-0 relative h-full", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full h-full overflow-hidden", children: [
          video.url_video ? /* @__PURE__ */ jsx(
            "video",
            {
              className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
              muted: true,
              loop: true,
              playsInline: true,
              preload: "metadata",
              onMouseEnter: (e) => {
                e.currentTarget.play();
              },
              onMouseLeave: (e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              },
              children: /* @__PURE__ */ jsx("source", { src: video.url_video, type: "video/mp4" })
            }
          ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-gray-500 text-center px-4", children: [
            /* @__PURE__ */ jsx("div", { className: "text-lg font-medium mb-1", children: video.title.split(" ").slice(0, 2).join(" ") }),
            /* @__PURE__ */ jsx("div", { className: "text-sm opacity-70", children: video.title.split(" ").slice(2).join(" ") })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: [
            /* @__PURE__ */ jsx("div", { className: "text-white mb-4", children: /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed line-clamp-3 font-medium", children: video.prompt || video.title }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center text-white/90 text-xs", children: [
              /* @__PURE__ */ jsx(User, { className: "w-3 h-3 mr-2" }),
              /* @__PURE__ */ jsx("span", { className: "truncate font-medium", children: video.creator })
            ] })
          ] }),
          !video.url_video && video.isVideo && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: /* @__PURE__ */ jsx("div", { className: "bg-white/95 rounded-full p-4 shadow-lg", children: /* @__PURE__ */ jsx(Play, { className: "w-6 h-6 text-gray-700 fill-current" }) }) })
        ] }) })
      },
      video.id
    )) }),
    !loading && !error && currentPage < totalPages && /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsx(
      Button,
      {
        onClick: handleLoadMore,
        variant: "outline",
        size: "lg",
        disabled: loadingMore,
        className: "px-8 py-3 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-200",
        children: loadingMore ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 mr-2 animate-spin" }),
          "Loading..."
        ] }) : `Load More Videos (${videos.length} of ${totalPages * 10})`
      }
    ) }),
    !loading && !error && currentPage >= totalPages && videos.length > 0 && /* @__PURE__ */ jsx("div", { className: "text-center mt-12", children: /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
      "You've reached the end! (",
      videos.length,
      " videos loaded)"
    ] }) }),
    selectedVideo && /* @__PURE__ */ jsx(
      VideoModal,
      {
        video: selectedVideo,
        videoDetail,
        loadingDetail,
        onClose: () => {
          setSelectedVideo(null);
          setVideoDetail(null);
        }
      }
    )
  ] });
}
function VideoModal({
  video,
  videoDetail,
  loadingDetail,
  onClose
}) {
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-0 bg-background/80 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "relative bg-background border shadow-2xl w-full h-full max-w-none max-h-none overflow-hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-6 border-b bg-background/95 backdrop-blur-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onClose,
              className: "text-foreground hover:bg-muted",
              children: "←"
            }
          ),
          /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground", children: video.title }) })
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: onClose,
            className: "text-foreground hover:bg-muted",
            children: "✕"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-80px)]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1 bg-muted/50 relative", children: video.url_video ? /* @__PURE__ */ jsx("div", { className: "w-full h-full relative", children: /* @__PURE__ */ jsxs(
          "video",
          {
            controls: true,
            className: "w-full h-full object-cover",
            poster: video.thumbnail,
            children: [
              /* @__PURE__ */ jsx("source", { src: video.url_video, type: "video/mp4" }),
              "Your browser does not support the video tag."
            ]
          }
        ) }) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-foreground text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl font-bold mb-4", children: video.title.split(" ").slice(0, 2).join(" ") }),
          /* @__PURE__ */ jsx("div", { className: "text-lg opacity-80", children: video.title.split(" ").slice(2).join(" ") })
        ] }) }) }),
        /* @__PURE__ */ jsx("div", { className: "w-80 bg-background border-l overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "p-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-muted rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(User, { className: "w-5 h-5 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-foreground font-medium", children: video.creator }),
              /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground text-sm", children: [
                "@",
                video.creator.toLowerCase().replace(/\s+/g, "_")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-foreground font-semibold mb-3", children: "Details" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: videoDetail && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Model:" }),
                /* @__PURE__ */ jsx("span", { className: "text-foreground", children: videoDetail.model_ai })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Aspect Ratio:" }),
                /* @__PURE__ */ jsx("span", { className: "text-foreground", children: videoDetail.aspect_ratio })
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "text-foreground font-semibold mb-3", children: "Start" }),
            /* @__PURE__ */ jsx("div", { className: "w-20 h-20 bg-muted rounded-lg flex items-center justify-center", children: video.url_video ? /* @__PURE__ */ jsx(
              "video",
              {
                className: "w-full h-full object-cover rounded-lg",
                muted: true,
                children: /* @__PURE__ */ jsx("source", { src: video.url_video, type: "video/mp4" })
              }
            ) : /* @__PURE__ */ jsx(Play, { className: "w-6 h-6 text-muted-foreground" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-foreground font-semibold", children: "Prompt" }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "text-muted-foreground hover:text-foreground",
                  onClick: () => {
                    if (videoDetail?.prompt) {
                      navigator.clipboard.writeText(videoDetail.prompt);
                    }
                  },
                  children: /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          strokeWidth: 2,
                          d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        }
                      )
                    }
                  )
                }
              )
            ] }),
            loadingDetail ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center py-8", children: /* @__PURE__ */ jsx(Loader2, { className: "w-6 h-6 animate-spin text-muted-foreground" }) }) : /* @__PURE__ */ jsx("div", { className: "bg-muted rounded-lg p-4", children: /* @__PURE__ */ jsx("p", { className: "text-foreground text-sm leading-relaxed", children: videoDetail?.prompt || video.prompt || "No prompt available" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "flex-1", children: "Video 2.1" }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "flex-1", children: "Professional Mode" })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              className: "w-full",
              size: "lg",
              onClick: () => {
                if (videoDetail) {
                  const videoSetupData = {
                    prompt: videoDetail.prompt || "",
                    karakter_image: videoDetail.karakter_image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
                    background_image: videoDetail.background_image || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
                    aspek_rasio: videoDetail.aspect_ratio || "16:9",
                    judul_video: videoDetail.prompt?.substring(0, 50) || "Recreated Video",
                    bahasa: videoDetail.bahasa || "id",
                    gaya_suara: videoDetail.gaya_suara || "natural",
                    voice_over: videoDetail.voice_over || "male",
                    tone: videoDetail.tone || "professional",
                    background_music: videoDetail.background_music || "upbeat",
                    resolusi_video: videoDetail.resolusi_video || "1080p",
                    is_share: videoDetail.share_url || "y"
                  };
                  localStorage.setItem(
                    "videoSetupData",
                    JSON.stringify(videoSetupData)
                  );
                  onClose();
                  window.location.href = "/";
                }
              },
              children: "Recreate"
            }
          )
        ] }) })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Video Generator - Create Amazing Videos</title><meta name="description" content="Create professional videos with our easy-to-use video generator. Follow simple steps to generate, customize, and download your videos.">${renderHead()}</head> <body class="min-h-screen bg-background antialiased"> <!-- Navigation with Integrated Stepper --> ${renderComponent($$result, "NavbarWithModal", NavbarWithModal, { "client:load": true, "currentStep": 1, "totalSteps": 4, "client:component-hydration": "load", "client:component-path": "@/components/NavbarWithModal", "client:component-export": "NavbarWithModal" })} <!-- Main Content --> <main class="flex-1"> <div class="container mx-auto px-8 py-12"> ${renderComponent($$result, "SetupPage", SetupPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/SetupPage", "client:component-export": "SetupPage" })} </div> <!-- Video Gallery Section --> <section class="bg-muted/30 py-16"> <div class="container mx-auto px-8"> ${renderComponent($$result, "VideoGallery", VideoGallery, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/VideoGallery", "client:component-export": "VideoGallery" })} </div> </section> </main> <!-- Footer --> <footer class="border-t py-12 mt-24"> <div class="container mx-auto px-4"> <div class="text-center text-muted-foreground"> <p>&copy; 2024 Video Generator. All rights reserved.</p> </div> </div> </footer> ${renderScript($$result, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
