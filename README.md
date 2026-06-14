# Dan Nguyen Tien — Portfolio

Personal portfolio of an **AI-Augmented QA Engineer**. Dark-themed, bilingual (EN/VI), accessible single-page site built with React 19, Vite, and Tailwind CSS v4.

🔗 Live: deployed on Vercel

## Features

- **Sections** — Hero, Currently Building, Achievements, Career Timeline, AI Workflow, Repo Showcase, Skills, Contact
- **Bilingual** — English / Vietnamese with a locale switcher
- **Light & dark themes** — dark by default, no-flash theme script, persisted to `localStorage`
- **Subtle 3D Hero** — lazy-loaded particle sphere (Three.js / React Three Fiber), disabled on mobile and when `prefers-reduced-motion` is set
- **Accessible** — skip-to-content link, focus-visible styles, reduced-motion support
- **Contact form** — serverless submission via [Formspree](https://formspree.io)
- **Analytics** — Vercel Analytics

## Tech Stack

| Area | Tools |
|------|-------|
| Framework | React 19, TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4, `@tailwindcss/forms` |
| 3D | Three.js, `@react-three/fiber` |
| Icons | lucide-react |
| Testing | Vitest, Testing Library |
| Quality | ESLint, Prettier |

## Getting Started

**Prerequisites:** Node.js 20+

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env.local
# then set VITE_FORMSPREE_ENDPOINT (create a free form at https://formspree.io)

# 3. Start the dev server
npm run dev
```

App runs at http://localhost:3000.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` / `lint:fix` | Lint (and auto-fix) |
| `npm run format` / `format:check` | Format with Prettier |
| `npm run typecheck` | Type-check without emitting |
| `npm test` / `test:watch` / `test:coverage` | Run the test suite |
| `npm run images:optimize` | Generate optimized AVIF/WebP/JPG variants (sharp) |
| `npm run og:generate` | Build the social preview (OG) image |
| `npm run favicon:build` | Build the Apple touch icon |
| `npm run cv:build` | Render the CV (`docs/cv-content.md`) to PDF |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_FORMSPREE_ENDPOINT` | Yes (for contact form) | Formspree endpoint, e.g. `https://formspree.io/f/xxxxxxxx` |

Set locally in `.env.local`; configure in Vercel project settings for production.

## Project Structure

```
components/     UI sections + reusable ui/ primitives
lib/            hooks (theme, scroll-spy, contact form) + i18n + shared data
images/         source + optimized portrait/OG assets
scripts/        build-time tooling (images, OG, favicon, CV)
docs/           CV + LinkedIn content sources
public/         static assets served as-is
```

## Deployment

Optimized for **Vercel**: connect the repo, set `VITE_FORMSPREE_ENDPOINT`, and Vercel auto-detects the Vite build (`npm run build` → `dist/`).
