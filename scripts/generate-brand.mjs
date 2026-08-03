/**
 * Генерирует иконки приложения и OG-картинку из public/favicon.svg и фонового фото.
 *
 * Запуск: pnpm brand
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const logoSvg = await fs.readFile(path.join(PUBLIC, "favicon.svg"));

// --- Иконки приложения -------------------------------------------------------
for (const size of [192, 512]) {
  await sharp(logoSvg, { density: 600 })
    .resize(size, size, { fit: "contain", background: { r: 8, g: 9, b: 11, alpha: 1 } })
    .flatten({ background: "#08090b" })
    .png()
    .toFile(path.join(PUBLIC, `icon-${size}.png`));
  console.log(`✓ icon-${size}.png`);
}

// Apple добавляет свой скруглённый фон — оставляем поля вокруг знака
await sharp({
  create: { width: 180, height: 180, channels: 4, background: "#0e1014" },
})
  .composite([
    {
      input: await sharp(logoSvg, { density: 600 }).resize(140, 140, { fit: "contain" }).png().toBuffer(),
      gravity: "center",
    },
  ])
  .png()
  .toFile(path.join(PUBLIC, "apple-icon.png"));
console.log("✓ apple-icon.png");

// --- OG-картинка -------------------------------------------------------------
const W = 1200;
const H = 630;

const background = await sharp(path.join(PUBLIC, "images", "hero.webp"))
  .resize(W, H, { fit: "cover", position: "center" })
  .modulate({ brightness: 0.42, saturation: 0.75 })
  .toBuffer();

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stop-color="#08090B" stop-opacity="0.97"/>
      <stop offset="0.55" stop-color="#08090B" stop-opacity="0.82"/>
      <stop offset="1" stop-color="#08090B" stop-opacity="0.45"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#F9BE5C"/>
      <stop offset="1" stop-color="#DE7C0C"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#shade)"/>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="url(#accent)"/>
  <g transform="translate(80 300)">
    <text x="0" y="0" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="bold" fill="#F4F6F8" letter-spacing="2">СК «ЦЕЗАРЬ»</text>
    <text x="0" y="66" font-family="Helvetica, Arial, sans-serif" font-size="36" fill="#F0921F">Полный цикл строительных работ</text>
    <text x="0" y="122" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#B9C1CC">От фундамента до отделки · Кавминводы</text>
    <text x="0" y="196" font-family="Helvetica, Arial, sans-serif" font-size="38" font-weight="bold" fill="#F4F6F8">8 980 000-84-08</text>
  </g>
</svg>`);

await sharp(background)
  .composite([
    { input: overlay, top: 0, left: 0 },
    {
      input: await sharp(logoSvg, { density: 600 }).resize(150, 150, { fit: "contain" }).png().toBuffer(),
      top: 80,
      left: 80,
    },
  ])
  .jpeg({ quality: 88 })
  .toFile(path.join(PUBLIC, "og.jpg"));
console.log("✓ og.jpg");
