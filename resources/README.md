# Setup Icon dan Splash Screen

## 📁 Folder ini untuk menyimpan asset icon dan splash screen

### File yang dibutuhkan:

1. **icon.png** - App icon (1024x1024 px, PNG)
2. **splash.png** - Splash screen (2732x2732 px, PNG)

---

## 🚀 Cara Tercepat (Recommended)

### Menggunakan Online Tool - Tidak perlu install apapun!

#### 1. Generate Icon

1. Buka: https://icon.kitchen/
2. Upload logo Anda atau gunakan `icon-source.svg` yang sudah ada
3. Customize:
   - Background: Pilih warna (contoh: #0F172A untuk dark blue)
   - Padding: 10-15%
   - Shape: Pilih sesuai selera
4. Download **Android Icon Pack**
5. Extract file ZIP
6. Copy semua folder `mipmap-*` ke `android/app/src/main/res/`

#### 2. Generate Splash Screen

1. Buka: https://www.appicon.co/#image-sets
2. Upload splash image Anda (atau buat di Canva/Figma dulu)
3. Pilih **Android** only
4. Download
5. Copy file splash ke `android/app/src/main/res/drawable/splash.png`

---

## 🎨 Cara Membuat Splash Screen Sederhana

### Opsi A: Menggunakan Canva (Gratis)

1. Buka Canva.com
2. Buat design baru: 2732x2732 px
3. Background: Solid color (#0F172A - dark blue)
4. Tambahkan logo di tengah
5. Export sebagai PNG
6. Simpan sebagai `splash.png` di folder ini

### Opsi B: Menggunakan Figma (Gratis)

1. Buat frame 2732x2732 px
2. Background: #0F172A
3. Import logo, letakkan di tengah
4. Export as PNG
5. Simpan sebagai `splash.png`

---

## 🛠️ Cara Manual (Jika punya file PNG siap)

### Jika sudah punya icon.png dan splash.png:

```bash
# Install Capacitor Assets
npm install @capacitor/assets --save-dev

# Generate semua ukuran otomatis
npx capacitor-assets generate --android

# Sync ke Android
npx cap sync android
```

---

## 📱 Struktur File Android

Setelah generate, struktur folder akan seperti ini:

```
android/app/src/main/res/
├── drawable/
│   └── splash.png
├── mipmap-mdpi/
│   ├── ic_launcher.png (48x48)
│   └── ic_launcher_round.png
├── mipmap-hdpi/
│   ├── ic_launcher.png (72x72)
│   └── ic_launcher_round.png
├── mipmap-xhdpi/
│   ├── ic_launcher.png (96x96)
│   └── ic_launcher_round.png
├── mipmap-xxhdpi/
│   ├── ic_launcher.png (144x144)
│   └── ic_launcher_round.png
└── mipmap-xxxhdpi/
    ├── ic_launcher.png (192x192)
    └── ic_launcher_round.png
```

---

## ✅ Checklist

- [ ] Buat/siapkan icon.png (1024x1024)
- [ ] Buat/siapkan splash.png (2732x2732)
- [ ] Generate menggunakan online tool atau @capacitor/assets
- [ ] Copy hasil ke folder android/app/src/main/res/
- [ ] Rebuild aplikasi
- [ ] Test di emulator/device

---

## 🎯 Rekomendasi Design

### Icon

- **Ukuran**: 1024x1024 px
- **Format**: PNG
- **Background**: Solid color atau gradient
- **Logo**: Centered dengan padding 10-15%
- **Style**: Simple, recognizable, scalable

### Splash Screen

- **Ukuran**: 2732x2732 px
- **Format**: PNG
- **Background**: Solid color matching brand (#0F172A untuk dark theme)
- **Logo**: Centered, ukuran medium (tidak terlalu besar)
- **Text**: Optional - app name di bawah logo

---

## 🔧 Rebuild Aplikasi

Setelah setup icon dan splash:

```bash
# Clean build
cd android
./gradlew clean

# Build debug APK
./gradlew assembleDebug

# Atau dari root
npx cap sync android
npx cap open android
```

Kemudian build dari Android Studio.

---

## 💡 Tips

1. **Gunakan vector/SVG** untuk source, convert ke PNG dengan ukuran besar
2. **Test di berbagai device** untuk memastikan icon terlihat baik
3. **Compress PNG** menggunakan TinyPNG untuk ukuran file lebih kecil
4. **Adaptive Icon**: Android modern menggunakan adaptive icon (bisa berbentuk bulat/kotak)
5. **Safe Area**: Untuk splash, pastikan logo tidak terlalu dekat dengan tepi

---

## 📚 Resources

- Icon Kitchen: https://icon.kitchen/
- App Icon Generator: https://www.appicon.co/
- Canva: https://www.canva.com/
- Figma: https://www.figma.com/
- TinyPNG: https://tinypng.com/
- Capacitor Assets: https://github.com/ionic-team/capacitor-assets

---

## ❓ Troubleshooting

### Icon tidak berubah setelah install

- Uninstall app dari device
- Clean project: `cd android && ./gradlew clean`
- Rebuild dan install ulang

### Splash screen tidak muncul

- Cek file ada di `android/app/src/main/res/drawable/splash.png`
- Cek `styles.xml` sudah configure splash theme
- Rebuild project

### File terlalu besar

- Compress menggunakan TinyPNG
- Target: Icon < 50KB, Splash < 200KB per file
