// One-off image derivative generator.
// Re-run when source images change: `node scripts/optimize-images.mjs`
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC_DIR = path.join(__dirname, '..', 'images');
const OUT_DIR = path.join(__dirname, '..', 'images', 'optimized');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// Hero portrait is rendered inside a 288px circle (md:w-72), bumped 2x for HiDPI.
const TARGETS = [
  {
    src: 'hinhdacat.jpg',
    base: 'portrait',
    sizes: [
      { width: 360, suffix: '360' },
      { width: 720, suffix: '720' },
    ],
    formats: ['avif', 'webp', 'jpg'],
  },
];

async function build() {
  for (const { src, base, sizes, formats } of TARGETS) {
    const input = path.join(SRC_DIR, src);
    for (const { width, suffix } of sizes) {
      for (const format of formats) {
        const out = path.join(OUT_DIR, `${base}-${suffix}.${format}`);
        const pipeline = sharp(input)
          .resize(width, width, { fit: 'cover', position: 'attention' })
          .rotate();

        if (format === 'avif') {
          await pipeline.avif({ quality: 50, effort: 4 }).toFile(out);
        } else if (format === 'webp') {
          await pipeline.webp({ quality: 75 }).toFile(out);
        } else if (format === 'jpg') {
          await pipeline.jpeg({ quality: 80, mozjpeg: true }).toFile(out);
        }
        const { size } = fs.statSync(out);
        console.log(`${path.relative(process.cwd(), out)}  ${(size / 1024).toFixed(1)}KB`);
      }
    }
  }
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
