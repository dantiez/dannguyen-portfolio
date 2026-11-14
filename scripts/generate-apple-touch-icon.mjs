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

// Composed SVG: deep-navy rounded background + chip-check logo stroked in electric blue.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" rx="36" fill="#0a0f1c"/>
  <g transform="translate(28,28) scale(5.2)"
     fill="none" stroke="#3b82f6" stroke-width="2"
     stroke-linecap="round" stroke-linejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2"/>
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>
    <path d="m9.5 12 1.75 1.75L14.75 10.25"/>
  </g>
</svg>
`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(OUT);

const { size } = fs.statSync(OUT);
console.log(`${path.relative(process.cwd(), OUT)}  ${(size / 1024).toFixed(1)}KB`);
