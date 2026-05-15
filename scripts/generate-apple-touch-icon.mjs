// Generates public/apple-touch-icon.png (180x180) from the bug icon
// for iOS "Add to Home Screen" — solid dark background + brand stroke,
// rounded corners handled by the OS.
//
// Re-run: `npm run favicon:build` after editing the icon design.
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'apple-touch-icon.png');

if (!fs.existsSync(path.dirname(OUT))) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
}

// Composed SVG: dark rounded background + bug icon stroked in brand blue.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="36" fill="#0d1117"/>
  <g transform="translate(28,28) scale(5.2)"
     fill="none" stroke="#6e9eff" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
    <path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4"/>
  </g>
</svg>
`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);

const { size } = fs.statSync(OUT);
console.log(`${path.relative(process.cwd(), OUT)}  ${(size / 1024).toFixed(1)}KB`);
