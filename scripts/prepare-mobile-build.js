import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, "../src/pages");

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");

  // Remove prerender = false lines
  content = content.replace(/export const prerender = false;?\n?/g, "");

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`Processed: ${filePath}`);
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      walkDir(filePath);
    } else if (file.endsWith(".astro")) {
      processFile(filePath);
    }
  });
}

console.log("Preparing files for mobile build...");
walkDir(pagesDir);
console.log("Done!");
