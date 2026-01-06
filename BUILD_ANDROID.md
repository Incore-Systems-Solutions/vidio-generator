# Panduan Build Android dengan Capacitor

## Setup Berhasil! ✅

Aplikasi Anda sudah berhasil di-setup untuk Android menggunakan Capacitor.

## Cara Build APK

### Opsi 1: Menggunakan Android Studio (Direkomendasikan)

1. Android Studio sudah terbuka otomatis
2. Tunggu Gradle sync selesai
3. Pilih menu **Build > Build Bundle(s) / APK(s) > Build APK(s)**
4. Tunggu proses build selesai
5. APK akan tersimpan di: `android/app/build/outputs/apk/debug/app-debug.apk`

### Opsi 2: Menggunakan Command Line

```bash
# Build debug APK
cd android
./gradlew assembleDebug

# Build release APK (untuk production)
./gradlew assembleRelease
```

## Workflow Development

### 1. Membuat perubahan pada kode web

```bash
npm run build:mobile
```

### 2. Sync perubahan ke Android

```bash
npx cap sync android
```

### 3. Buka Android Studio (jika belum terbuka)

```bash
npx cap open android
```

### 4. Run di emulator atau device

- Klik tombol Run (▶️) di Android Studio
- Atau gunakan: `cd android && ./gradlew installDebug`

## Konfigurasi Penting

### File Konfigurasi

- **capacitor.config.json** - Konfigurasi utama Capacitor
- **astro.config.mobile.mjs** - Konfigurasi Astro untuk build mobile (static)
- **android/app/build.gradle** - Konfigurasi Android app

### Package Name

- App ID: `com.instantvideoapp.com`
- App Name: `instantvideoapp`

## Tips

1. **Untuk development**: Gunakan `npm run dev` untuk web development
2. **Untuk mobile build**: Gunakan `npm run build:mobile` untuk static build
3. **Untuk production web**: Gunakan `npm run build` untuk SSR build

## Troubleshooting

### Jika ada error saat sync:

```bash
npx cap sync android --force
```

### Jika perlu clean build:

```bash
cd android
./gradlew clean
./gradlew assembleDebug
```

### Update Capacitor plugins:

```bash
npm install @capacitor/core@latest @capacitor/cli@latest @capacitor/android@latest --legacy-peer-deps
npx cap sync android
```

## Lokasi File APK

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release.apk`

## Next Steps

1. Test aplikasi di emulator atau device Android
2. Customize icon dan splash screen di folder `android-resources`
3. Update app name dan package ID jika diperlukan
4. Setup signing key untuk release build
