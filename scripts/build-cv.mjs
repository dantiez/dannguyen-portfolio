// One-off CV → PDF generator.
// Run: `npm run cv:build`  →  outputs public/resume.pdf
//
// Source markdown: docs/cv-content.md (single source of truth)
// Style:           scripts/cv-style.css (ATS-friendly print)
// Engine:          md-to-pdf (wraps Puppeteer + Chromium)
//
// Re-run after every edit to docs/cv-content.md so the public PDF
// stays in sync with the portfolio bio + skills shown on the site.
import { mdToPdf } from 'md-to-pdf';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'docs', 'cv-content.md');
const DEST = path.join(ROOT, 'public', 'resume.pdf');
const STYLE = path.join(__dirname, 'cv-style.css');

if (!fs.existsSync(path.dirname(DEST))) {
  fs.mkdirSync(path.dirname(DEST), { recursive: true });
}

const pdf = await mdToPdf(
  { path: SRC },
  {
    dest: DEST,
    stylesheet: [STYLE],
    document_title: 'Dan Nguyen Tien — AI-Augmented QA Engineer Resume',
    pdf_options: {
      format: 'A4',
      margin: { top: '18mm', bottom: '18mm', left: '20mm', right: '20mm' },
      printBackground: true,
      preferCSSPageSize: true,
    },
    launch_options: { headless: 'new' },
  },
);

if (pdf) {
  const { size } = fs.statSync(DEST);
  console.log(`${path.relative(process.cwd(), DEST)}  ${(size / 1024).toFixed(1)}KB`);
} else {
  console.error('CV build failed');
  process.exit(1);
}
