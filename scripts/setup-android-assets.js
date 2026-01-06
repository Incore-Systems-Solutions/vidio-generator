/**
 * Script untuk setup Android Icon dan Splash Screen
 *
 * Cara pakai:
 * 1. Letakkan file icon.png (1024x1024) dan splash.png (2732x2732) di folder resources/
 * 2. Jalankan: node scripts/setup-android-assets.js
 *
 * Atau gunakan cara manual sesuai panduan di SETUP_ICON_SPLASH.md
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, "..");
const resourcesDir = path.join(projectRoot, "resources");
const androidResDir = path.join(
  projectRoot,
  "android",
  "app",
  "src",
  "main",
  "res"
);

console.log("🎨 Android Assets Setup Helper\n");

// Check if resources folder exists
if (!fs.existsSync(resourcesDir)) {
  console.log("📁 Membuat folder resources/...");
  fs.mkdirSync(resourcesDir, { recursive: true });
}

// Check for icon and splash files
const iconPath = path.join(resourcesDir, "icon.png");
const splashPath = path.join(resourcesDir, "splash.png");

console.log("📋 Checklist:");
console.log(
  `  ${fs.existsSync(iconPath) ? "✅" : "❌"} Icon file (resources/icon.png)`
);
console.log(
  `  ${
    fs.existsSync(splashPath) ? "✅" : "❌"
  } Splash file (resources/splash.png)`
);

if (!fs.existsSync(iconPath) || !fs.existsSync(splashPath)) {
  console.log("\n⚠️  File tidak ditemukan!");
  console.log("\n📝 Langkah selanjutnya:");
  console.log("1. Siapkan file icon.png (1024x1024 px)");
  console.log("2. Siapkan file splash.png (2732x2732 px)");
  console.log("3. Letakkan di folder resources/");
  console.log("4. Jalankan script ini lagi");
  console.log("\n💡 Atau gunakan cara manual di SETUP_ICON_SPLASH.md");
  process.exit(0);
}

console.log("\n✅ File ditemukan!");
console.log("\n📦 Untuk generate assets, gunakan salah satu cara:");
console.log("\n1️⃣  Menggunakan @capacitor/assets (Recommended):");
console.log("   npm install @capacitor/assets --save-dev");
console.log("   npx capacitor-assets generate --android");
console.log("\n2️⃣  Menggunakan Android Studio:");
console.log("   - Buka Android Studio");
console.log("   - Klik kanan res > New > Image Asset");
console.log("   - Pilih icon.png Anda");
console.log("\n3️⃣  Menggunakan Online Tool:");
console.log("   - Icon: https://icon.kitchen/");
console.log(
  "   - Splash: https://apetools.webprofusion.com/app/#/tools/imagegorilla"
);
console.log("\n📖 Lihat panduan lengkap di SETUP_ICON_SPLASH.md");

// Create a simple splash drawable XML as example
const splashXmlPath = path.join(
  androidResDir,
  "drawable",
  "splash_background.xml"
);
const splashXmlContent = `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <!-- Background color -->
    <item android:drawable="@color/splash_background"/>

    <!-- Logo/Icon centered -->
    <item>
        <bitmap
            android:gravity="center"
            android:src="@drawable/splash"/>
    </item>
</layer-list>`;

console.log("\n🎨 Membuat template splash_background.xml...");
if (!fs.existsSync(path.dirname(splashXmlPath))) {
  fs.mkdirSync(path.dirname(splashXmlPath), { recursive: true });
}
fs.writeFileSync(splashXmlPath, splashXmlContent);
console.log("✅ Template dibuat di:", splashXmlPath);

// Create colors.xml if not exists
const colorsXmlPath = path.join(androidResDir, "values", "colors.xml");
if (!fs.existsSync(colorsXmlPath)) {
  const colorsXmlContent = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="colorPrimary">#6366F1</color>
    <color name="colorPrimaryDark">#4F46E5</color>
    <color name="colorAccent">#EC4899</color>
    <color name="splash_background">#0F172A</color>
</resources>`;

  console.log("\n🎨 Membuat colors.xml...");
  if (!fs.existsSync(path.dirname(colorsXmlPath))) {
    fs.mkdirSync(path.dirname(colorsXmlPath), { recursive: true });
  }
  fs.writeFileSync(colorsXmlPath, colorsXmlContent);
  console.log("✅ colors.xml dibuat");
}

console.log("\n✨ Setup selesai!");
console.log("\n📝 Next steps:");
console.log("1. Generate icon dan splash menggunakan salah satu cara di atas");
console.log("2. Copy hasil generate ke folder android/app/src/main/res/");
console.log(
  "3. Rebuild aplikasi: cd android && ./gradlew clean && ./gradlew assembleDebug"
);
console.log("\n📖 Baca SETUP_ICON_SPLASH.md untuk panduan lengkap");
