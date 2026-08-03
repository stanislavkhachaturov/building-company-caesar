/**
 * Скачивает фотографии с Unsplash, приводит их к нужным размерам,
 * конвертирует в WebP и генерирует src/lib/images.generated.ts
 * с размерами и blur-заглушками для next/image.
 *
 * Запуск: pnpm assets
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "src", "lib", "images.generated.ts");

/** name -> [unsplash id, целевая ширина, вертикальный фокус кропа] */
const SOURCES = {
  hero: ["1486406146926-c627a92ad1ab", 2000, "center"],
  about: ["1503387762-592deb58ef4e", 1400, "center"],
  cta: ["1590069261209-f8e9b8642343", 1800, "center"],

  "project-house-1": ["1600585154340-be6161a56a0c", 1280, "center"],
  "project-house-2": ["1580587771525-78b9dba3b914", 1280, "center"],
  "project-house-3": ["1523217582562-09d0def993a6", 1280, "center"],
  "project-house-4": ["1512917774080-9991f1c4c750", 1280, "center"],

  "project-flat-1": ["1600607687939-ce8a6c25118c", 1280, "center"],
  "project-flat-2": ["1600489000022-c2086d79f9d4", 1280, "center"],
  "project-flat-3": ["1584622650111-993a426fbf0a", 1280, "center"],
  "project-flat-4": ["1600566752355-35792bedcfea", 1280, "center"],

  "project-work-1": ["1517581177682-a085bb7ffb15", 1280, "center"],
  "project-work-2": ["1531834685032-c34bf0d84c77", 1280, "center"],
  "project-work-3": ["1587582423116-ec07293f0395", 1280, "center"],
  "project-work-4": ["1516156008625-3a9d6067fab5", 1280, "center"],
};

const ASPECT = { hero: 16 / 10, cta: 16 / 6, default: 4 / 3 };

async function download(id) {
  const url = `https://images.unsplash.com/photo-${id}?w=2400&q=85&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

await fs.mkdir(OUT_DIR, { recursive: true });
await fs.mkdir(path.dirname(MANIFEST), { recursive: true });

const manifest = {};

for (const [name, [id, width, position]] of Object.entries(SOURCES)) {
  const raw = await download(id);
  const ratio = ASPECT[name] ?? ASPECT.default;
  const height = Math.round(width / ratio);

  const pipeline = sharp(raw).resize(width, height, { fit: "cover", position });
  await pipeline.clone().webp({ quality: 82 }).toFile(path.join(OUT_DIR, `${name}.webp`));

  const blur = await sharp(raw)
    .resize(20, Math.max(1, Math.round(20 / ratio)), { fit: "cover", position })
    .blur(1.2)
    .webp({ quality: 40 })
    .toBuffer();

  manifest[name] = {
    src: `/images/${name}.webp`,
    width,
    height,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };

  console.log(`✓ ${name} ${width}×${height}`);
}

const body = `// Сгенерировано автоматически: pnpm assets. Не редактировать вручную.
// Источник фотографий — Unsplash (https://unsplash.com/license).

export type SiteImage = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export const images = ${JSON.stringify(manifest, null, 2)} satisfies Record<string, SiteImage>;

export type ImageName = keyof typeof images;
`;

await fs.writeFile(MANIFEST, body, "utf8");
console.log(`\nМанифест: ${path.relative(ROOT, MANIFEST)}`);
