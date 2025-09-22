import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_DLHOh8jC.mjs';
import 'kleur/colors';
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent, B as Button, d as Badge, N as Navbar } from '../chunks/card_DMaO0jxC.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { I as Input } from '../chunks/input_nhgdP4CX.mjs';
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, T as Textarea } from '../chunks/select_B6iHT4LV.mjs';
import { User, FileText, ArrowLeft, Eye, CheckCircle, ThumbsUp, ThumbsDown, Lightbulb } from 'lucide-react';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

function CustomCharacterForm() {
  const [characterName, setCharacterName] = useState("");
  const [characterStyle, setCharacterStyle] = useState("");
  const [characterDescription, setCharacterDescription] = useState("");
  const [selectedExample, setSelectedExample] = useState(null);
  const [previewGenerated, setPreviewGenerated] = useState(false);
  const [previewConfirmed, setPreviewConfirmed] = useState(null);
  const styleOptions = [
    { value: "realistic", label: "Realistis" },
    { value: "cartoon", label: "Kartun" },
    { value: "anime", label: "Anime" },
    { value: "3d", label: "3D" }
  ];
  const exampleDescriptions = [
    {
      id: "teacher",
      title: "Guru Muda",
      description: "Seorang pengajar muda berusia 25 tahun dengan rambut coklat pendek, memakai kemeja putih dan celana hitam, memiliki ekspresi ramah dan ceria",
      style: "Cartoon"
    },
    {
      id: "doctor",
      title: "Dokter Perempuan",
      description: "Dokter perempuan berusia 35 tahun dengan jas putih, rambut hitam diikat rapi, memakai kacamata, terlihat profesional dan berwibawa",
      style: "Realistis"
    },
    {
      id: "chef",
      title: "Chef Pria",
      description: "Chef pria berusia 40 tahun dengan topi chef putih, baju chef putih, kumis tipis, memiliki senyum hangat dan gesture memasak",
      style: "Realistis"
    },
    {
      id: "entrepreneur",
      title: "Pengusaha Wanita",
      description: "Pengusaha wanita berusia 30 tahun dengan blazer navy, rambut panjang bergelombang, memakai jam tangan elegan, terlihat percaya diri",
      style: "Realistis"
    }
  ];
  const handleExampleClick = (example) => {
    setCharacterName(example.title);
    setCharacterDescription(example.description);
    setCharacterStyle(example.style.toLowerCase());
    setSelectedExample(example.id);
  };
  const handleGeneratePreview = () => {
    if (characterName && characterDescription && characterStyle) {
      setPreviewGenerated(true);
    }
  };
  const handleConfirmPreview = (confirmed) => {
    setPreviewConfirmed(confirmed);
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mb-4", children: [
        /* @__PURE__ */ jsx(User, { className: "w-8 h-8 text-purple-600 mr-3" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "Buat Karakter Custom" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-muted-foreground max-w-3xl mx-auto", children: "Deskripsikan karakter yang Anda inginkan dan AI akan membuatkannya untuk Anda" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Prompt Detail Karakter" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Nama Karakter" }),
              /* @__PURE__ */ jsx(
                Input,
                {
                  placeholder: "Masukkan nama karakter anda...",
                  value: characterName,
                  onChange: (e) => setCharacterName(e.target.value)
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Style" }),
              /* @__PURE__ */ jsxs(Select, { value: characterStyle, onValueChange: setCharacterStyle, children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "w-full", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Pilih style karakter anda" }) }),
                /* @__PURE__ */ jsx(SelectContent, { children: styleOptions.map((style) => /* @__PURE__ */ jsx(SelectItem, { value: style.value, children: style.label }, style.value)) })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-sm font-medium mb-2 block", children: "Deskripsikan Detail" }),
              /* @__PURE__ */ jsx(
                Textarea,
                {
                  placeholder: "Masukkan detail dari karakter yang ingin anda buat...",
                  value: characterDescription,
                  onChange: (e) => setCharacterDescription(e.target.value),
                  className: "min-h-32"
                }
              ),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "Semakin detail deskripsi, semakin baik hasil yang akan dihasilkan AI" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
              /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "lg", className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsx(ArrowLeft, { className: "w-4 h-4" }),
                /* @__PURE__ */ jsx("span", { children: "← Kembali Ke Template" })
              ] }),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  size: "lg",
                  className: "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center space-x-2",
                  onClick: handleGeneratePreview,
                  disabled: !characterName || !characterDescription || !characterStyle,
                  children: [
                    /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Lihat Preview Karakter" })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Eye, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Preview Karakter" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("div", { className: "bg-gray-900 rounded-lg h-64 flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-400", children: [
              /* @__PURE__ */ jsx(User, { className: "w-16 h-16 mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { children: "Preview karakter akan muncul di sini" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(
              "div",
              {
                className: `aspect-square rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer transition-all ${i === 1 ? "ring-2 ring-purple-500" : "hover:ring-2 hover:ring-gray-300"}`,
                children: /* @__PURE__ */ jsx(User, { className: "w-8 h-8 text-gray-400" })
              },
              i
            )) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300 mb-2", children: characterDescription || "Belum ada deskripsi karakter" }),
              /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                "Style: ",
                characterStyle || "Belum dipilih"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(CheckCircle, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Konfirmasi Preview" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { className: "space-y-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Apakah preview karakter di atas sudah sesuai dengan deskripsi yang Anda berikan?" }),
            /* @__PURE__ */ jsx("div", { className: "bg-gray-50 dark:bg-gray-800 p-4 rounded-lg", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-700 dark:text-gray-300", children: characterDescription || "Belum ada deskripsi karakter" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex space-x-4", children: [
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  className: "flex items-center space-x-2 text-green-600 border-green-600 hover:bg-green-50",
                  onClick: () => handleConfirmPreview(true),
                  disabled: !characterDescription,
                  children: [
                    /* @__PURE__ */ jsx(ThumbsUp, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Ya, Sudah Sesuai" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  variant: "outline",
                  size: "lg",
                  className: "flex items-center space-x-2 text-red-600 border-red-600 hover:bg-red-50",
                  onClick: () => handleConfirmPreview(false),
                  disabled: !characterDescription,
                  children: [
                    /* @__PURE__ */ jsx(ThumbsDown, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { children: "Belum Sesuai" })
                  ]
                }
              )
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Lightbulb, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Contoh Deskripsi" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Klik contoh di bawah untuk menggunakan sebagai template:" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: exampleDescriptions.map((example) => /* @__PURE__ */ jsxs(
              "div",
              {
                className: `p-3 border rounded-lg cursor-pointer transition-all ${selectedExample === example.id ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20" : "border-gray-200 hover:border-gray-300"}`,
                onClick: () => handleExampleClick(example),
                children: [
                  /* @__PURE__ */ jsx("p", { className: "text-sm font-medium mb-2", children: example.title }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-600 dark:text-gray-400 mb-2", children: example.description }),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "w-full text-xs",
                      children: "Klik untuk gunakan"
                    }
                  )
                ]
              },
              example.id
            )) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Lightbulb, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Tips untuk Preview Terbaik" })
          ] }) }),
          /* @__PURE__ */ jsxs(CardContent, { children: [
            /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx("li", { children: "• Sertakan detail fisik yang spesifik" }),
              /* @__PURE__ */ jsx("li", { children: "• Jelaskan gaya berpakaian dengan detail" }),
              /* @__PURE__ */ jsx("li", { children: "• Tambahkan karakteristik unik" }),
              /* @__PURE__ */ jsx("li", { children: "• Sebutkan ekspresi wajah dan pose" }),
              /* @__PURE__ */ jsx("li", { children: "• Tentukan usia dan gender dengan jelas" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-2", children: [
              /* @__PURE__ */ jsx(Lightbulb, { className: "w-4 h-4 text-yellow-600 mt-0.5" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-yellow-800 dark:text-yellow-200", children: "Preview akan menampilkan variasi visual berdasarkan deskripsi Anda. Pilih yang paling sesuai, konfirmasi kesesuaian, baru bisa membuat karakter." })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Card, { children: [
          /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs(CardTitle, { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx(Lightbulb, { className: "w-5 h-5" }),
            /* @__PURE__ */ jsx("span", { children: "Tips untuk Preview Terbaik" })
          ] }) }),
          /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsx("li", { children: "• Tambahkan detail warna rambut, mata, dan kulit" }),
            /* @__PURE__ */ jsx("li", { children: "• Sebutkan postur tubuh (tinggi, pendek, ramping, dll)" }),
            /* @__PURE__ */ jsx("li", { children: "• Jelaskan ekspresi wajah yang diinginkan" }),
            /* @__PURE__ */ jsx("li", { children: "• Tambahkan aksesori khusus (kacamata, jam, dll)" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$BuatKarakterKustom = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BuatKarakterKustom;
  return renderTemplate`<html lang="en" class="scroll-smooth"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Buat Karakter Custom - Video Generator</title><meta name="description" content="Buat karakter AI custom sesuai keinginan Anda dengan deskripsi detail.">${renderHead()}</head> <body class="min-h-screen bg-background antialiased"> <!-- Navigation with Integrated Stepper --> ${renderComponent($$result, "Navbar", Navbar, { "client:load": true, "currentStep": 1, "totalSteps": 4, "client:component-hydration": "load", "client:component-path": "@/components/Navbar", "client:component-export": "Navbar" })} <!-- Main Content --> <main class="flex-1"> <div class="container mx-auto px-8 py-12"> ${renderComponent($$result, "CustomCharacterForm", CustomCharacterForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/CustomCharacterForm", "client:component-export": "CustomCharacterForm" })} </div> </main> <!-- Footer --> <footer class="border-t py-12 mt-24"> <div class="container mx-auto px-4"> <div class="text-center text-muted-foreground"> <p>&copy; 2024 Video Generator. All rights reserved.</p> </div> </div> </footer> </body></html>`;
}, "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/buat-karakter-kustom.astro", void 0);

const $$file = "C:/Users/Mrian07/Documents/BACKUP-E/KERJA/vidio-generator/src/pages/buat-karakter-kustom.astro";
const $$url = "/buat-karakter-kustom";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$BuatKarakterKustom,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
