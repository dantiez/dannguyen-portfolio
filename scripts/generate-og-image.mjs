// One-off OG image generator.
// Run: `node scripts/generate-og-image.mjs` (or `npm run og:generate`)
// Output: public/og-image.png (1200×630, ~30-50KB)
//
// Design intent: match AI-Era Hybrid theme — GitHub-grade dark base,
// dual-tone halo (primary blue + accent purple), bold typography stack.
import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'og-image.png');

if (!fs.existsSync(path.dirname(OUT))) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
}

// Inline SVG keeps the script zero-dep beyond sharp.
// We rely on the OS's default sans-serif since librsvg can't load
// remote @font-face — readable on every platform.
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d1117"/>
      <stop offset="1" stop-color="#161b22"/>
    </linearGradient>
    <radialGradient id="haloPrimary" cx="0.85" cy="0.15" r="0.5">
      <stop offset="0" stop-color="#3b82f6" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#3b82f6" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="haloAi" cx="0.15" cy="0.85" r="0.55">
      <stop offset="0" stop-color="#8b5cf6" stop-opacity="0.30"/>
      <stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#haloPrimary)"/>
  <rect width="1200" height="630" fill="url(#haloAi)"/>

  <!-- Subtle grid -->
  <g stroke="#3b82f6" stroke-opacity="0.04">
    ${Array.from({ length: 21 }, (_, i) => `<line x1="${i * 60}" y1="0" x2="${i * 60}" y2="630"/>`).join('')}
    ${Array.from({ length: 11 }, (_, i) => `<line x1="0" y1="${i * 60}" x2="1200" y2="${i * 60}"/>`).join('')}
  </g>

  <!-- Status pill -->
  <g transform="translate(80, 80)">
    <rect width="220" height="40" rx="20" fill="#8b5cf6" fill-opacity="0.15" stroke="#8b5cf6" stroke-opacity="0.4"/>
    <circle cx="22" cy="20" r="5" fill="#a78bfa"/>
    <text x="38" y="26" font-family="sans-serif" font-size="14" font-weight="700" fill="#a78bfa" letter-spacing="1">AI-AUGMENTED QA</text>
  </g>

  <!-- Name -->
  <text x="80" y="290" font-family="sans-serif" font-size="80" font-weight="900" fill="#e6edf3" letter-spacing="-2">DAN NGUYEN TIEN</text>

  <!-- Role tag in mono style -->
  <text x="80" y="360" font-family="monospace" font-size="36" font-weight="600" fill="#a78bfa">&lt;AI-Augmented QA Engineer/&gt;</text>

  <!-- Subtitle -->
  <text x="80" y="420" font-family="sans-serif" font-size="26" fill="#7d8590">Productivity-First Testing · LLM-Powered Workflow</text>

  <!-- Bottom row: URL + accent dot -->
  <g transform="translate(80, 530)">
    <circle cx="8" cy="8" r="6" fill="#3b82f6"/>
    <text x="28" y="14" font-family="sans-serif" font-size="22" fill="#e6edf3" font-weight="500">dantiez-portfolio.vercel.app</text>
  </g>

  <!-- Tools chip row -->
  <g transform="translate(80, 580)">
    <text x="0" y="0" font-family="monospace" font-size="16" fill="#7d8590">Claude  ·  Copilot  ·  Playwright  ·  Selenium  ·  Postman</text>
  </g>

  <!-- Right side: code-tag halo accent -->
  <g transform="translate(880, 200)" opacity="0.8">
    <rect width="240" height="240" rx="120" fill="none" stroke="#3b82f6" stroke-opacity="0.3" stroke-width="2"/>
    <rect x="40" y="40" width="160" height="160" rx="80" fill="none" stroke="#8b5cf6" stroke-opacity="0.4" stroke-width="2"/>
    <text x="120" y="135" font-family="monospace" font-size="48" font-weight="700" fill="#e6edf3" text-anchor="middle">QA</text>
  </g>
</svg>
`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const { size } = fs.statSync(OUT);
console.log(`${path.relative(process.cwd(), OUT)}  ${(size / 1024).toFixed(1)}KB`);
