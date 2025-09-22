import { e as createComponent, f as createAstro, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DLHOh8jC.mjs';
import 'kleur/colors';
import { $ as $$Main } from '../chunks/main_CrLwiLZA.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { B as Button, C as Card, a as CardHeader, b as CardTitle, c as CardContent, d as Badge, N as Navbar } from '../chunks/card_DMaO0jxC.mjs';
import { v as videoGenerationApi } from '../chunks/api_B4s6jhmt.mjs';
import { ArrowLeft, CheckCircle, Video, Settings, Maximize2, Download, Share2, ArrowRight, Music, Camera, Play, MessageCircle } from 'lucide-react';
export { renderers } from '../renderers.mjs';

function VideoDownload({
  videoUrl,
  taskId,
  onBack
}) {
  const [selectedQuality, setSelectedQuality] = useState("1080p");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const qualityOptions = [
    {
      id: "720p",
      label: "720p HD",
      // size: "15 MB",
      icon: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gray-600 rounded-full" }),
      pro: false
    },
    {
      id: "1080p",
      label: "1080p Full HD",
      // size: "25 MB",
      icon: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-blue-600 rounded-full" }),
      pro: false
    },
    {
      id: "4k",
      label: "4K Ultra HD",
      // size: "35 MB",
      icon: /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-gray-400 rounded-full" }),
      pro: false
    }
  ];
  const platformOptions = [
    {
      id: "tiktok",
      name: "TikTok",
      icon: /* @__PURE__ */ jsx(Music, { className: "w-5 h-5" }),
      description: "Format 9:16, optimal untuk TikTok",
      color: "bg-black text-white"
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: /* @__PURE__ */ jsx(Camera, { className: "w-5 h-5" }),
      description: "Format square dan story",
      color: "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: /* @__PURE__ */ jsx(Play, { className: "w-5 h-5" }),
      description: "Format 16:9 kualitas",
      color: "bg-red-600 text-white"
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: /* @__PURE__ */ jsx(MessageCircle, { className: "w-5 h-5" }),
      description: "Kirimkan file di aplikasi",
      color: "bg-green-600 text-white"
    }
  ];
  const getSelectedQuality = () => {
    return qualityOptions.find((q) => q.id === selectedQuality);
  };
  const handleDownload = async () => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `video-${taskId}.mp4`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      const link = document.createElement("a");
      link.href = videoUrl;
      link.download = `video-${taskId}.mp4`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handlePlatformShare = async (platformId) => {
    setSelectedPlatform(platformId);
    try {
      switch (platformId) {
        case "tiktok":
          await shareToTikTok();
          break;
        case "instagram":
          await shareToInstagram();
          break;
        case "youtube":
          await shareToYouTube();
          break;
        case "whatsapp":
          await shareToWhatsApp();
          break;
        default:
          console.log(`Platform ${platformId} not implemented`);
      }
    } catch (error) {
      console.error(`Error sharing to ${platformId}:`, error);
    }
  };
  const shareToTikTok = async () => {
    try {
      const result = await videoGenerationApi.convertVideoForPlatform(
        videoUrl,
        "tiktok",
        taskId
      );
      if (result.status) {
        const tiktokUrl = `https://www.tiktok.com/upload?video_url=${encodeURIComponent(
          result.data.convertedUrl
        )}`;
        window.open(
          tiktokUrl,
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
      }
    } catch (error) {
      console.error("TikTok conversion failed, using original video:", error);
      const tiktokUrl = `https://www.tiktok.com/upload?video_url=${encodeURIComponent(
        videoUrl
      )}`;
      window.open(
        tiktokUrl,
        "_blank",
        "width=800,height=600,scrollbars=yes,resizable=yes"
      );
    }
  };
  const shareToInstagram = async () => {
    try {
      const result = await videoGenerationApi.convertVideoForPlatform(
        videoUrl,
        "instagram",
        taskId
      );
      if (result.status) {
        const instagramUrl = `https://www.instagram.com/create/?video_url=${encodeURIComponent(
          result.data.convertedUrl
        )}`;
        window.open(
          instagramUrl,
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
      }
    } catch (error) {
      console.error(
        "Instagram conversion failed, using original video:",
        error
      );
      const instagramUrl = `https://www.instagram.com/create/?video_url=${encodeURIComponent(
        videoUrl
      )}`;
      window.open(
        instagramUrl,
        "_blank",
        "width=800,height=600,scrollbars=yes,resizable=yes"
      );
    }
  };
  const shareToYouTube = async () => {
    try {
      const result = await videoGenerationApi.convertVideoForPlatform(
        videoUrl,
        "youtube",
        taskId
      );
      if (result.status) {
        const youtubeUrl = `https://www.youtube.com/upload?video_url=${encodeURIComponent(
          result.data.convertedUrl
        )}`;
        window.open(
          youtubeUrl,
          "_blank",
          "width=800,height=600,scrollbars=yes,resizable=yes"
        );
      }
    } catch (error) {
      console.error("YouTube conversion failed, using original video:", error);
      const youtubeUrl = `https://www.youtube.com/upload?video_url=${encodeURIComponent(
        videoUrl
      )}`;
      window.open(
        youtubeUrl,
        "_blank",
        "width=800,height=600,scrollbars=yes,resizable=yes"
      );
    }
  };
  const shareToWhatsApp = async () => {
    const whatsappUrl = `https://web.whatsapp.com/send?text=${encodeURIComponent(
      videoUrl
    )}`;
    window.open(
      whatsappUrl,
      "_blank",
      "width=800,height=600,scrollbars=yes,resizable=yes"
    );
  };
  const handleCreateNewVideo = () => {
    localStorage.removeItem("videoSetupData");
    localStorage.removeItem("x-api-key");
    window.location.href = "/";
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
      onBack && /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", onClick: onBack, children: [
        /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
        "Kembali"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsx("div", { className: "w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-6 h-6 text-green-600 dark:text-green-400" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Video Anda Siap!" }),
          /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "Video telah berhasil dibuat dengan kualitas AI terbaik. Download sekarang atau bagikan langsung ke platform favorit Anda." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs(Card, { children: [
        /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Video, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsx("span", { children: "Preview Video" })
        ] }) }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "w-full h-96 bg-black rounded-lg overflow-hidden", children: /* @__PURE__ */ jsx(
            "video",
            {
              src: videoUrl,
              controls: true,
              className: "w-full h-full object-cover",
              poster: "",
              children: "Your browser does not support the video tag."
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 right-2 flex space-x-2", children: [
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", className: "h-8 w-8 p-0", children: /* @__PURE__ */ jsx(Settings, { className: "w-4 h-4" }) }),
            /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", className: "h-8 w-8 p-0", children: /* @__PURE__ */ jsx(Maximize2, { className: "w-4 h-4" }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center justify-between text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("span", { children: "0 detik" }),
            /* @__PURE__ */ jsx("span", { children: "Kualitas" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Download Video" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-semibold text-foreground mb-3", children: "Pilih Kualitas" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-3", children: qualityOptions.map((quality) => /* @__PURE__ */ jsx(
                "div",
                {
                  className: `p-4 border rounded-lg cursor-pointer transition-all ${selectedQuality === quality.id ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20" : "border-border hover:border-purple-300"}`,
                  onClick: () => setSelectedQuality(quality.id),
                  children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                      quality.icon,
                      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
                        /* @__PURE__ */ jsx("span", { className: "font-medium text-foreground", children: quality.label }),
                        quality.pro && /* @__PURE__ */ jsx(Badge, { className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs", children: "PRO" })
                      ] }) })
                    ] }),
                    selectedQuality === quality.id && /* @__PURE__ */ jsx("div", { className: "w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx(CheckCircle, { className: "w-4 h-4 text-white" }) })
                  ] })
                },
                quality.id
              )) })
            ] }),
            /* @__PURE__ */ jsxs(
              Button,
              {
                className: "w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                size: "lg",
                onClick: handleDownload,
                children: [
                  /* @__PURE__ */ jsx(Download, { className: "w-4 h-4 mr-2" }),
                  "Download Video ",
                  getSelectedQuality()?.label
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Share2, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Bagikan ke Platform" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "space-y-3", children: platformOptions.map((platform) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "p-4 border rounded-lg hover:border-purple-300 transition-all cursor-pointer",
              onClick: () => handlePlatformShare(platform.id),
              children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: `w-10 h-10 rounded-lg flex items-center justify-center ${platform.color}`,
                      children: platform.icon
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { children: [
                    /* @__PURE__ */ jsx("h3", { className: "font-medium text-foreground", children: platform.name }),
                    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: platform.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    variant: "outline",
                    size: "sm",
                    onClick: (e) => {
                      e.stopPropagation();
                      handlePlatformShare(platform.id);
                    },
                    children: /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" })
                  }
                )
              ] })
            },
            platform.id
          )) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12", children: /* @__PURE__ */ jsx(Card, { className: "bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800", children: /* @__PURE__ */ jsxs(CardContent, { className: "p-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-foreground mb-4", children: "Extend Video Baru" }),
        /* @__PURE__ */ jsx("p", { className: "text-muted-foreground mb-6 max-w-2xl mx-auto", children: "Ulang semua langkah dari awal untuk membuat video lainnya sesuai kebutuhan." }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            onClick: handleCreateNewVideo,
            className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3 text-lg",
            size: "lg",
            children: [
              "Buat Video Baru",
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5 ml-2" })
            ]
          }
        )
      ] }) }) })
    ] })
  ] });
}

const $$Astro = createAstro();
const prerender = false;
const $$Download = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Download;
  const url = Astro2.url.searchParams.get("url") || "";
  const taskId = Astro2.url.searchParams.get("taskId") || "";
  const videoUrl = url ? decodeURIComponent(url) : "";
  return renderTemplate`${renderComponent($$result, "Layout", $$Main, { "content": { title: "Download Video" } }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="min-h-screen bg-background"> <div class="container mx-auto px-4 py-8"> ${renderComponent($$result2, "Navbar", Navbar, { "currentStep": 4 })} <div class="max-w-7xl mx-auto mt-8"> ${videoUrl && taskId ? renderTemplate`${renderComponent($$result2, "VideoDownload", VideoDownload, { "videoUrl": videoUrl, "taskId": taskId, "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/VideoDownload", "client:component-export": "VideoDownload" })}` : renderTemplate`<div class="text-center py-12"> <h2 class="text-2xl font-bold text-foreground mb-4">
Video tidak ditemukan
</h2> <p class="text-muted-foreground">
Silakan kembali ke halaman generate untuk melanjutkan.
</p> </div>`} </div> </div> <footer class="bg-muted/50 border-t"> <div class="container mx-auto px-4 py-6"> <div class="text-center text-muted-foreground"> <p>&copy; 2025 Video Generator. All rights reserved.</p> </div> </div> </footer> </main> ` })}`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/download.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/download.astro";
const $$url = "/download";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Download,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
