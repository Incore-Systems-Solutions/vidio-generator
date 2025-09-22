import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, o as renderScript, r as renderTemplate } from '../chunks/astro/server_DLHOh8jC.mjs';
import 'kleur/colors';
import { C as Card, B as Button, d as Badge, c as CardContent, a as CardHeader, b as CardTitle, N as Navbar } from '../chunks/card_DMaO0jxC.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { createContext, useState, useContext, useEffect } from 'react';
import { UserCheck, User, Upload, Wand2, Palette, Eye, FileText, Volume2, Briefcase, Smile, GraduationCap, BarChart3, BookOpen, Newspaper, Mic, Star, Lightbulb } from 'lucide-react';
import { b as backgroundsApi, u as uploadApi, c as charactersApi } from '../chunks/api_B4s6jhmt.mjs';
import { I as Input } from '../chunks/input_nhgdP4CX.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Textarea } from '../chunks/select_B6iHT4LV.mjs';
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
  resolusiVideo: ""
};
function VideoSetupProvider({ children }) {
  const [data, setData] = useState(initialData);
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
        return /* @__PURE__ */ jsx(Wand2, { className: "w-8 h-8 text-purple-600" });
      case "upload":
        return /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-gray-600" });
      case "character":
        return /* @__PURE__ */ jsx(User, { className: "w-8 h-8 text-gray-600" });
      default:
        return /* @__PURE__ */ jsx(UserCheck, { className: "w-8 h-8 text-gray-600" });
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
      className: `p-6 h-full flex flex-col ${getCardStyle()}`,
      onClick: handleClick,
      children: [
        (type === "character" || type === "upload") && image ? /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: title,
            className: "w-full h-full object-cover"
          }
        ) }) }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: getIcon() }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-2 text-center", children: type === "custom" ? /* @__PURE__ */ jsx("span", { className: "text-purple-600", children: "Buat dengan AI" }) : title }),
          type === "custom" && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 text-center mb-4", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500 text-center mb-4", children: description }),
          type === "upload" && /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "w-full", children: "Pilih File" }) }),
          tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 justify-center mt-auto", children: tags.map((tag, index) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, index)) })
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
    { id: "realistic", label: "Realistis", isActive: characterStyle === "realistic" },
    { id: "anime", label: "Anime", isActive: characterStyle === "anime" },
    { id: "cartoon", label: "Kartun", isActive: characterStyle === "cartoon" },
    { id: "3d", label: "3D", isActive: characterStyle === "3d" }
  ];
  return /* @__PURE__ */ jsx(Card, { className: "w-full", children: /* @__PURE__ */ jsx(CardContent, { className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
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
  ] }) }) });
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
      className: `p-4 h-full flex flex-col ${getCardStyle()}`,
      onClick,
      children: [
        (type === "background" || type === "upload") && image ? /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx("div", { className: "w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-3", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: image,
            alt: title,
            className: "w-full h-full object-cover"
          }
        ) }) }) : /* @__PURE__ */ jsx("div", { className: "flex justify-center mb-4", children: getIcon() }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-semibold mb-2 text-center", children: type === "custom" ? /* @__PURE__ */ jsx("span", { className: "text-purple-600", children: "Buat dengan AI" }) : title }),
          type === "custom" && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mb-2", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500 text-center mb-3", children: description }),
          type === "upload" && /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "sm", className: "w-full text-xs", children: "Pilih File" }) }),
          tags.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1 justify-center mt-auto", children: tags.map((tag, index) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: tag }, index)) })
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
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Galeri Background" }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "flex items-center space-x-2",
          children: [
            /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "Live Preview" })
          ]
        }
      )
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Loading backgrounds..." }) }) : uploading ? /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Uploading image..." }) }) : error ? /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-red-500", children: [
      "Error: ",
      error
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4", children: backgrounds.map((background) => /* @__PURE__ */ jsx(
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
    updateResolusiVideo
  } = useVideoSetup();
  const [script, setScript] = useState("");
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
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
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
                /* @__PURE__ */ jsx(SelectItem, { value: "9:16", children: "9:16 (Vertical)" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "1:1", children: "1:1 (Square)" }),
                /* @__PURE__ */ jsx(SelectItem, { value: "4:3", children: "4:3 (Standard)" })
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
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
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
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
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
                    /* @__PURE__ */ jsx(SelectItem, { value: "720p", children: "720p (HD)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "480p", children: "480p (SD)" }),
                    /* @__PURE__ */ jsx(SelectItem, { value: "4k", children: "4K (Ultra HD)" })
                  ] })
                ]
              }
            )
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
        /* @__PURE__ */ jsxs(CardContent, { className: "space-y-3", children: [
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
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
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
      resolusi_video: data.resolusiVideo
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
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-foreground mb-4", children: "Setup Video AI Anda" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Lengkapi semua pengaturan untuk video AI Anda dalam satu langkah. Pilih karakter, tulis script, dan tentukan environment untuk hasil terbaik." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mb-12", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-6xl", children: /* @__PURE__ */ jsx(
      FilterRow,
      {
        characterType,
        characterStyle,
        onCharacterTypeChange: handleCharacterTypeChange,
        onCharacterStyleChange: handleCharacterStyleChange
      }
    ) }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-2", children: "Pilih Karakter AI Anda" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Pilih karakter yang sesuai dengan kebutuhan video Anda" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-7xl", children: loading ? /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Loading characters..." }) }) : uploading ? /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsx("div", { className: "text-muted-foreground", children: "Uploading image..." }) }) : error ? /* @__PURE__ */ jsx("div", { className: "text-center py-8", children: /* @__PURE__ */ jsxs("div", { className: "text-red-500", children: [
        "Error: ",
        error
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6", children: characters.map((character) => /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(BackgroundGallery, {}) }),
    /* @__PURE__ */ jsx("div", { className: "mb-8", children: /* @__PURE__ */ jsx(VideoDetailSection, {}) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center space-x-4", children: /* @__PURE__ */ jsx(
      Button,
      {
        size: "lg",
        className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
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

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Video Generator - Create Amazing Videos</title><meta name="description" content="Create professional videos with our easy-to-use video generator. Follow simple steps to generate, customize, and download your videos.">${renderHead()}</head> <body class="min-h-screen bg-background antialiased"> <!-- Navigation with Integrated Stepper --> ${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "currentStep": 1, "totalSteps": 4, "client:component-hydration": "load", "client:component-path": "@/components/Navbar", "client:component-export": "Navbar" })} <!-- Main Content --> <main class="flex-1"> <div class="container mx-auto px-8 py-12"> ${renderComponent($$result, "SetupPage", SetupPage, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/SetupPage", "client:component-export": "SetupPage" })} </div> </main> <!-- Footer --> <footer class="border-t py-12 mt-24"> <div class="container mx-auto px-4"> <div class="text-center text-muted-foreground"> <p>&copy; 2024 Video Generator. All rights reserved.</p> </div> </div> </footer> ${renderScript($$result, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
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
