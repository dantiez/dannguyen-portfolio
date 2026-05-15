# Portfolio Pro Features — Prioritized Roadmap

**Date:** 2026-05-15
**Owner:** Dan Nguyen Tien
**Stack:** React 19 + Vite 6 + Tailwind 4 + i18n EN/VI/JA + AI-Augmented positioning
**Status:** Branch ahead 8 commits, deployed at https://dantiez-portfolio.vercel.app
**Scope chosen:** Recruiter-facing essentials + Content polish + Technical polish (skip novelty)

---

## 0. TL;DR — Top 5 Wins to Pick First

Nếu chỉ làm 5 thứ, pick exactly these (ROI cao nhất cho recruiter):

| # | Feature | Effort | Impact | Tier |
|---|---|---|---|---|
| 1 | **Real Contact form (Formspree)** | 1h | Cao | Essential |
| 2 | **SEO meta + OG image** | 2h | Cao | Essential |
| 3 | **GitHub repo showcase section** (3-4 repos pinned) | 2-3h | Cao | Content |
| 4 | **Resume PDF preview page** (recruiter doesn't have to download) | 1h | Trung-Cao | Essential |
| 5 | **Plausible analytics** | 30 min | Cao (insight) | Technical |

Total ~7-8h cho 5 wins. Mỗi cái commit riêng.

---

## 1. Recruiter-Facing Essentials

### 1.1 Real Contact Form (Formspree) ⭐
**Why:** F1 critical defect — form hiện tại `preventDefault` → submit không gì xảy ra. Recruiter điền form → silent fail → mất cơ hội.

**How:**
- Tạo Formspree free account → get endpoint URL
- Add `VITE_FORMSPREE_ENDPOINT` env var (`.env.local` + Vercel project settings)
- Replace `onSubmit={(e) => e.preventDefault()}` với async fetch POST
- Add loading state, success/error toast, honeypot field (anti-spam)
- Telemetry: thông tin email vào Anthropic dùng được

**Effort:** 1h
**Risk:** Free tier 50 submission/month. Đủ cho portfolio. Upgrade $10/mo nếu vượt.

### 1.2 SEO Meta Tags + OG Image ⭐
**Why:** Hiện tại không có meta description, OG image, Twitter card → LinkedIn share preview xấu/trống → recruiter share đến HR không impressive.

**How:**
- Update `index.html`:
  - `<meta name="description">` từ `t.meta.description` (i18n-aware — defaults EN since locale default is EN)
  - `<meta property="og:title">`, `og:description`, `og:image`, `og:url`, `og:type`
  - `<meta name="twitter:card" content="summary_large_image">`, twitter:image, twitter:title
- Generate OG image (1200×630) — design include name + role + portrait + accent gradient. Tools: Canva, Figma, or `og-image-builder` Vite plugin
- Place OG at `public/og-image.png`
- Add `dictionaries/*.ts` field `meta.description` (1-sentence summary, ~155 chars)

**Effort:** 2h (1h design OG image + 1h wire meta)
**Risk:** Low. Static. LinkedIn cache OG 7 days — push trước khi share.

### 1.3 Resume PDF Preview Page
**Why:** Recruiter click "Download CV" → file download → cần mở app PDF → friction. Inline preview = 0 friction.

**How:**
- Generate `public/resume.pdf` từ `docs/cv-content.md` (Pandoc / Typora — user task)
- Add route hoặc anchor `/#resume` opening modal với `<embed>` / `<iframe src="/resume.pdf">`. Simplest: thay button "Download CV" thành 2 buttons: "View Resume" (inline modal) + "Download PDF" (file download)
- Or: a dedicated `/resume` page với `<embed>` PDF + back-to-portfolio link

**Effort:** 1h (modal version) hoặc 30 min (separate page)
**Risk:** PDF rendering inconsistent across browsers. Mobile UX kém với inline PDF. Recommend: separate page + native viewer fallback.

### 1.4 404 Page
**Why:** Vercel default 404 trông không brand. Recruiter mistype URL → mất impression.

**How:**
- Vercel routing: add `public/404.html` static OR `vercel.json` rewrite to root
- Design: simple page với "Lost a test case?" copy (QA-themed humor), back-to-home button
- Match theme (dark/light)

**Effort:** 30 min
**Risk:** None

### 1.5 JSON-LD Person Schema
**Why:** Google search "Dan Nguyen Tien QA" → rich result với photo + role + links. Critical cho recruiter discovery.

**How:**
- Inline `<script type="application/ld+json">` trong `index.html` với schema.org Person:
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Dan Nguyen Tien",
  "jobTitle": "AI-Augmented QA Engineer",
  "url": "https://dantiez-portfolio.vercel.app",
  "image": "https://dantiez-portfolio.vercel.app/og-image.png",
  "email": "mailto:dannt4022@gmail.com",
  "telephone": "+84-907-281-361",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Ho Chi Minh City",
    "addressCountry": "VN"
  },
  "sameAs": [
    "https://www.linkedin.com/in/dan-nguyen-tien-a24244302",
    "https://github.com/dantiez"
  ],
  "knowsLanguage": ["en", "vi", "ja"]
}
```

**Effort:** 30 min
**Risk:** None. Validate qua Google Rich Results Test.

### 1.6 sitemap.xml + robots.txt
**Why:** Bot crawl hygiene. Cho phép Googlebot index nhanh + chặn nội dung không muốn.

**How:**
- `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://dantiez-portfolio.vercel.app/sitemap.xml
  ```
- `public/sitemap.xml`: single URL entry cho `/` (SPA hiện tại). Khi migrate Astro (Phase 4) thêm `/en`, `/vi`, `/ja` URLs

**Effort:** 15 min
**Risk:** None

---

## 2. Content Polish

### 2.1 GitHub Repos Showcase Section ⭐
**Why:** Recruiter QA muốn xem code thật. Currently không có direct path từ portfolio → GitHub repos. Showcase section pin 3-4 repos quan trọng.

**How:**
- New section component `RepoShowcase.tsx` giữa AI Workflow và Skills
- Static data array (KISS, no GitHub API): pin 3-4 repos
  ```
  [
    { name: 'qa-playwright-showcase', desc: '...', stars, lang, url },
    { name: 'api-test-collections', desc: '...', stars, lang, url },
    ...
  ]
  ```
- Each repo card: name, description, language pill, stars (optional, static), `View on GitHub →` button
- OR: GitHub REST API public fetch (no auth) `GET /users/dantiez/repos?sort=updated&per_page=4`. Live data nhưng risk rate limit (60 req/h unauthenticated)

**Decision point:**
- **Static (Recommended for KISS)**: 30 min, 0 runtime risk, manual sync khi có repo mới
- **GitHub API live**: 2h, async loading state, fallback khi rate limited

**Effort:** Static 1h, API 2-3h
**Risk:** API rate limit nếu nhiều visitor. Static = no risk.

### 2.2 Case Studies Section (deferred until NDA-cleared content)
**Why:** Critical cho QA hiring per brainstorm `brainstorm-2026-05-14-professionalize-portfolio.md`. Recruiter QA quốc tế screen "tell me about a bug you found" → portfolio preempt.

**Blocker:** NDA với HOPEE — chưa rõ có publish được không (Q1 trong brainstorm gốc). Defer cho đến khi:
- (a) Được phép anonymize HOPEE work, hoặc
- (b) Tự build demo project (test saucedemo.com / restful-booker) với case study artificial

**Effort:** 1-2 ngày per case study (content writing > coding)
**Risk:** NDA leak. Chỉ làm sau khi confirm legal.

### 2.3 Certifications Section
**Why:** ATS filter đầu tiên. Empty hiện tại.

**How:**
- New small section trong Skills hoặc dưới CareerTimeline
- Show "In Progress: ISTQB Foundation Level (target Q3 2026)" — honest signal
- Khi pass cert thật → add badge + date + verify URL

**Effort:** 30 min scaffold (empty state)
**Risk:** Showing empty section signals weak. Recommend defer cho đến khi enroll ISTQB.

### 2.4 "Currently Building" / "Now" Section
**Why:** Show user is actively learning (Playwright + Claude Code). Signal "growth mindset" thường recruiter value.

**How:**
- Small section hoặc enhance Hero status badge
- 2-3 bullet về current learning:
  - "Building Playwright test suite with Claude Code"
  - "Studying for ISTQB Foundation Level"
  - "Exploring LLM evaluation frameworks (Promptfoo, Ragas)"

**Effort:** 1h
**Risk:** Maintenance — must update monthly hoặc trông cũ. Set CalReminder.

### 2.5 Testimonials
**Why:** Social proof.

**Blocker:** User mới 2 năm career, chưa có recommendation từ manager/colleague. Defer.

**Effort:** N/A (content blocker)

---

## 3. Technical Polish

### 3.1 Plausible / Cloudflare Web Analytics ⭐
**Why:** Đo recruiter visit, biết content nào hit/miss.

**How:**
- Plausible: $9/mo (paid) hoặc free Cloudflare Web Analytics (recommend Cloudflare for free tier)
- Cloudflare CWA: add JS snippet vào `index.html`
- Track: page views, source, referrer, device. Privacy-friendly, no cookies
- Dashboard: web.cloudflare.com

**Effort:** 30 min
**Risk:** Cloudflare CWA requires site through Cloudflare proxy (currently Vercel direct). Workaround: use Vercel Analytics (free tier) — built-in, 1-click enable.

**Recommendation:** **Vercel Analytics** built-in (free) thay vì Plausible/Cloudflare. Zero config, integrate với hosting hiện tại.

### 3.2 GitHub Actions CI/CD
**Why:** Auto-run lint + test + build on every PR. Catch regression trước khi deploy.

**How:**
- `.github/workflows/ci.yml`: trigger on push/PR
- Jobs: install → typecheck → lint → test → build
- Vercel preview deploy automatic (Vercel-side, no GitHub config needed)
- Optional: badge in README

**Effort:** 30 min
**Risk:** None. Vercel deploy already auto.

### 3.3 Playwright E2E Tests
**Why:** QA portfolio without E2E tests trông không serious. Cũng là portfolio artifact để defend Playwright claim.

**How:**
- Install Playwright (devDep)
- 3-5 E2E tests:
  - Hero renders, name visible
  - Locale switcher: EN → VI → JA changes content
  - Theme toggle: dark → light
  - Mobile drawer opens + closes
  - Contact form: name/email/message fields fillable
- Run in CI (GitHub Actions)
- Bonus: deploy as `github.com/dantiez/qa-playwright-showcase` repo separately

**Effort:** 3-4h (setup + 5 tests)
**Risk:** CI flake. Mitigate with `test.use({ ... timeouts ... })`. Vercel preview URL flaky during deploys — use local dev server in CI.

### 3.4 Print Stylesheet
**Why:** Recruiter prints portfolio để chia sẻ với hiring manager → looks professional.

**How:**
- Add `@media print { ... }` rules trong `index.css`:
  - Hide: Navbar, MobileMenu, theme toggle, ThemeToggle, locale switcher, footer
  - Show: full content stacked
  - Force light theme on print (recolor)
  - Page break after each section
  - Image: keep portrait

**Effort:** 1h
**Risk:** None

### 3.5 Error Boundary
**Why:** Production error → React unmount → blank page. Recruiter sees blank → exit. Error Boundary catches + fallback UI.

**How:**
- Add `ErrorBoundary.tsx` class component (React 19 still supports)
- Wrap `<App />` trong `index.tsx`
- Fallback UI: simple "Something went wrong" + reload button + contact email

**Effort:** 30 min
**Risk:** None

### 3.6 Loading States
**Why:** First paint flicker. Optional polish.

**How:**
- App.tsx: thêm `<Suspense fallback={<Skeleton />}>` cho components nếu lazy-load
- Currently no lazy load — KISS skip

**Effort:** 1h
**Recommendation:** Skip — bundle nhỏ enough, không cần.

### 3.7 Performance Budget + Lighthouse CI
**Why:** Đo objectively, prevent regression.

**How:**
- Add `lighthouse-ci` to GitHub Actions
- Budget: Perf ≥ 95, A11y = 100, Best Practices ≥ 95, SEO ≥ 100
- Fail build if drop > 5 points

**Effort:** 1-2h
**Risk:** Brittle if external font load varies. Set conservative thresholds.

### 3.8 Image Lazy Load
**Why:** Below-fold images không cần load upfront.

**How:**
- Hero portrait: keep `fetchPriority="high"` (above fold)
- Other images (nếu thêm): `loading="lazy"`

**Effort:** 15 min (when adding more images)
**Risk:** None

---

## 4. NÊN BỎ (anti-recommended)

| Feature | Lý do bỏ |
|---|---|
| Cmd+K search | Over-engineered cho 1-page SPA. YAGNI cứng |
| AI chatbot widget | Cringe-risk cao. "AI QA tester demo AI chatbot" → recruiter nghĩ gimmick |
| Custom cursor | Japan recruiter ghét. Distraction |
| Background particles / Three.js | Bundle bloat + perf hit cho impression visual marginal |
| Sound effects | Auto-fail UX 100% recruiter |
| RSS feed (without blog) | Empty placeholder = signal incomplete |
| Newsletter signup | User chưa có content output |
| Live chat widget | Spam target. Recruiter dùng email |
| Cookie consent banner | Khi không có cookie tracking (Vercel Analytics is cookieless) — clutter |
| Easter eggs / Konami code | Junior signal |

---

## 5. Implementation Phasing (suggested order)

### Sprint A — "Apply-ready" (1-2 buổi work)
1. SEO meta tags + OG image (2h)
2. JSON-LD Person schema (30 min)
3. Real Contact form Formspree (1h)
4. robots.txt + sitemap.xml (15 min)
5. Resume PDF page + button refactor (1h)
6. Vercel Analytics enable (5 min, dashboard click)

**Total:** ~5h. Single commit hoặc 2 commits.

### Sprint B — "Showcase depth" (1-2 ngày)
7. GitHub Repos Showcase section (1-2h static or 3h API)
8. "Currently Building" section (1h)
9. 404 page (30 min)
10. Print stylesheet (1h)
11. Error Boundary (30 min)

**Total:** ~5-6h.

### Sprint C — "Quality signal" (1 buổi work, ưu tiên nếu Playwright claim)
12. Playwright E2E tests setup (3-4h)
13. GitHub Actions CI/CD (30 min)
14. Lighthouse CI (1h, optional)

**Total:** ~5h. Outputs include public Playwright repo cho interview defense.

### Defer (blocker dependent)
- Case Studies section (NDA clearance)
- Certifications section (until enroll ISTQB)
- Testimonials (career too young)

---

## 6. Bundle Size Budget Watch

Hiện tại baseline: JS gzip 83.5 KB, CSS 9.4 KB.

Cap mỗi feature đề xuất:
- Formspree fetch: +0 KB (vanilla fetch)
- SEO meta: +0 KB (static HTML)
- OG image: +0 JS, asset on disk
- Vercel Analytics script: +1-2 KB
- GitHub Repos static: +0.5 KB data
- Print stylesheet: +0.3 KB CSS
- Error Boundary: +0.2 KB
- Playwright E2E: +0 (devDep only)

**Projected total after Sprint A+B:** JS ~85 KB gzip, CSS ~10 KB. Vẫn dưới brainstorm target < 100 KB.

---

## 7. Decision Points (chờ user chốt)

| # | Question | Default |
|---|---|---|
| D1 | Contact form provider: **Formspree** vs Resend+CF Worker vs EmailJS | Formspree (KISS) |
| D2 | OG image: Canva manual vs `og-image-builder` Vite plugin | Canva manual (1 file, no build step) |
| D3 | GitHub Repos: static array vs live API | **Static** (KISS, no rate limit) |
| D4 | Analytics: Vercel built-in vs Plausible vs Cloudflare CWA | **Vercel Analytics** (zero config, free) |
| D5 | Playwright tests: in same repo (`tests/e2e/`) vs separate repo | Same repo `tests/e2e/`, mirror to public repo `qa-playwright-showcase` |
| D6 | Resume PDF: separate page vs modal | **Separate page** (mobile UX better) |
| D7 | "Currently Building" section: standalone vs merge into Hero | **Standalone** (more visible) |

---

## 8. Success Metrics

- **Lighthouse**: Perf ≥ 95, A11y = 100, BP ≥ 95, SEO = 100 (after Sprint A)
- **OG share preview** correct on LinkedIn + Twitter + Slack
- **Contact form** submission lands in inbox within 60s
- **JSON-LD** passes Google Rich Results Test
- **Bundle**: JS gzip < 90 KB after all features
- **Recruiter inquiry**: ≥ 5 in first 4 weeks post-deploy (track via Vercel Analytics + LinkedIn)

---

## 9. Unresolved Questions

1. **Formspree free tier OK?** Hay muốn tự host email forwarding qua Cloudflare Worker + Resend?
2. **OG image design preference:** dark background (match theme) hay light? Mention vai trò "AI-Augmented" trên OG?
3. **GitHub repos to pin** (cần 3-4):
   - `qa-playwright-showcase` (chưa có — phải build)
   - Còn 2-3 repos khác cần bạn list
4. **"Currently Building" content:** ngoài Playwright + ISTQB, còn gì?
5. **Vercel Analytics OK chưa?** Hay muốn Plausible $9/mo cho privacy-grade?
6. **Sprint priority:** A trước rồi B/C, hay parallel?
7. **NDA HOPEE final answer:** đã hỏi manager về case study publish chưa? (Block Phase 2 Case Studies)
8. **Domain custom:** vẫn dùng `dantiez-portfolio.vercel.app` hay đăng ký custom domain (`dantiez.dev`, `dannt.io`)?

---

## 10. Next Step

**Recommend:** Sprint A (5h, "apply-ready") trước. Sau khi Sprint A xong → deploy → share LinkedIn → đợi recruiter feedback 1 tuần → quyết định Sprint B/C theo signal.

Bạn pick item nào để implement đầu tiên, hoặc bảo "Sprint A all" → tôi build sequential 1 commit/feature.
