# Instant Video App

Aplikasi generator video AI dengan dukungan web dan mobile (Android).

## Flow Aplikasi

```
START: User bayar dengan koin
↓
[MODAL 1: Pembuatan Naskah]
├─ Polling check-prompt setiap 5 detik
├─ Tampil progress per scene
└─ STOP ketika prompt_video !== null ✅
↓
setIsOptimizingPrompt(false)
setIsBatchProcessing(true)
↓
[MODAL 2: Batch Processing]
├─ Tampil list batch
├─ Polling status-batch setiap 5 detik
├─ Tampil progress setiap batch
└─ Check semua status
↓
┌────┴────┐
│ Failed? │─ YES → Tampil button "Regenerate Batch" ✅
└────┬────┘
NO (All Success)
↓
Tampil Success Message
↓
Tampil Button "Generate Video" ✅
↓
User klik button
↓
Call API: /api/generate-video/${uuid}
        ↓
  Redirect ke: /generate/${uuid}
↓
END: GenerateVideoPage (Video Merge Status)
```

## Tech Stack

- **Framework**: Astro 5 + React 19
- **Styling**: Tailwind CSS 4
- **Mobile**: Capacitor
- **UI Components**: Radix UI
- **Real-time**: Pusher.js

## Development

### Web Development (dengan SSR)

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Mobile Development (Android)

```bash
# Build dan buka Android Studio
npm run android

# Atau step by step:
npm run build:mobile    # Build static version
npm run cap:sync        # Sync ke Android
npm run cap:open:android # Buka Android Studio
```

## Dokumentasi Lengkap

Lihat [CAPACITOR_SETUP.md](./CAPACITOR_SETUP.md) untuk:

- Setup lengkap Capacitor
- Cara build APK/AAB
- Testing di device/emulator
- Troubleshooting
- Plugin tambahan

## Struktur Project

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Astro pages
│   ├── layouts/        # Layout components
│   ├── styles/         # Global styles
│   └── lib/            # Utilities
├── public/             # Static assets
├── android/            # Android native project (generated)
├── astro.config.mjs    # Astro config (SSR)
├── astro.config.mobile.mjs  # Astro config (Static)
└── capacitor.config.ts # Capacitor config
```

## Scripts

- `npm run dev` - Development server (SSR)
- `npm run build` - Build production (SSR)
- `npm run build:mobile` - Build static untuk mobile
- `npm run android` - Build & open Android Studio
- `npm run cap:sync` - Sync web assets ke native
- `npm run cap:open:android` - Open Android Studio

## Requirements

### Web Development

- Node.js 18+
- npm atau yarn

### Mobile Development

- Android Studio
- JDK 17+
- Android SDK

## License

All rights reserved © 2025
