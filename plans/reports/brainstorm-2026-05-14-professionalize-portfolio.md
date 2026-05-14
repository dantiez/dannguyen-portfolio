# Brainstorm: Professionalize QA/QC Portfolio (Remote/Global Track)

**Date:** 2026-05-14
**Owner:** Dan Nguyen Tien
**Stack hiện tại:** React 19 + Vite 6 + Tailwind CDN + TypeScript 5.8
**Goal:** Apply remote/global QA jobs → portfolio cần đạt chuẩn quốc tế (EN-first, ISTQB-aware, artifact-driven)
**Scope:** Full audit + phased roadmap. UI polish + Content + Code quality + New features.

---

## 1. TL;DR — Brutal Honest Verdict

Portfolio hiện tại **đẹp visual nhưng yếu credibility cho thị trường global**. Cụ thể:

- **3 critical defects** che lấp giá trị: (1) Contact form **không gửi gì** (preventDefault → silent fail), (2) Tailwind chạy CDN trong production (anti-pattern, slow), (3) `Stats` section bị duplicate hoàn toàn bên trong `Experience.tsx` → DRY violation rõ rệt + recruiter thấy 2 lần "200+ Bugs" sẽ nghĩ "fluff".
- **Content gap fatal cho global apply:** không có **case study thật**, không có **bug report sample**, không có **automation code repo link**, không có **certification** (ISTQB/Agile Tester). Đây là 4 thứ recruiter QA quốc tế screen đầu tiên.
- **Số liệu mâu thuẫn:** Hero ghi "2+ years" còn Experience ghi "1+ years" → -1 điểm trust ngay 5 giây đầu.
- **Tất cả CTA chết:** Download CV, LinkedIn, GitHub, Resume đều `href="#"`. Mobile menu không mở. Recruiter mở mobile sẽ stuck.

**Kết luận:** không chỉ "fix lại", mà cần **restructure** theo mô hình QA portfolio chuẩn (Artifact + Evidence + Metrics), và sửa nền code (bỏ CDN, tách module, a11y, SEO).

---

## 2. Current State Audit

### 2.1 Architecture & Code Quality

| Issue | Severity | Location |
|---|---|---|
| Tailwind via `<script src="cdn.tailwindcss.com">` — Tailwind chính thức cảnh báo không dùng production | **P0** | `index.html:23` |
| Importmap song song với npm deps → React load 2 đường, cache miss | P1 | `index.html:73-81` |
| `react-router-dom` được import (`Experience.tsx:2`) nhưng **không có BrowserRouter** → sẽ crash nếu uncomment Link | **P0 latent** | `App.tsx`, `Experience.tsx:24-31` |
| `process.env.GEMINI_API_KEY` define trong Vite config — legacy AI Studio template, không dùng | P3 | `vite.config.ts:14-15` |
| Component name collision: `CareerTimeline.tsx` export `const Experience: React.FC` (line 3) | P2 | `CareerTimeline.tsx:3` |
| `Stats.tsx` không được render trong `App.tsx`, nhưng cùng nội dung lại nằm trong `Experience.tsx:38-88` | **P1** | App.tsx vs Experience.tsx |
| Section IDs vs Navbar labels không khớp 1:1 (`careertimeline` vs button "CareerTimeLine") — fragile | P2 | `Navbar.tsx:41`, `App.tsx:18-35` |
| Không có `Error Boundary`, không có 404, không có loading states | P2 | global |
| `tsconfig.json` thiếu `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` | P2 | `tsconfig.json` |
| Không có ESLint, Prettier, lint-staged, husky | P2 | repo |
| Không có testing setup (Vitest + RTL) — ironic cho QA portfolio | **P1** | repo |
| Image `hinhdacat.jpg` 456KB, no WebP/AVIF, no lazy load | P2 | `images/` |
| Inline `<style>` cho scrollbar + `.hero-pattern` trong `index.html` — nên vào CSS module hoặc Tailwind plugin | P3 | `index.html:47-71` |

### 2.2 Content Quality (cho QA Global Hiring)

| Gap | Why it matters cho remote/global |
|---|---|
| Không có **case study** dạng kể chuyện | Recruiter QA global đánh giá qua "tell me about a bug you found" — portfolio cần preempt câu hỏi này |
| Không có **bug report sample** (Jira screenshot, repro steps, severity rationale) | Đây là deliverable concrete nhất của QA |
| Không có **test plan / test case sample** | Chứng minh thinking process, không chỉ tools |
| Không có **automation code link** (GitHub repo Selenium/Playwright/Cypress) | Global hiring rất chú trọng coding-capable QA |
| Không có **certification section** (ISTQB Foundation tối thiểu, Agile Tester, AWS Cloud Practitioner...) | Filter đầu tiên của ATS/recruiter |
| Không có **metrics dạng STAR** (Situation-Task-Action-Result) — "200+ bugs" trần trụi không context | Recruiter muốn ROI |
| Không có **domain mention** (e-commerce, fintech, microservice domain nào?) | Match keyword với JD |
| "Success Rate 99.8%" — không có nguồn, smell fake | Trust killer |
| "1+ Years" (Experience) vs "over 2 years" (Hero) | Inconsistency = sloppy QA |
| English có lỗi nhỏ ("HOPEE Co., Ltd." viết hoa toàn bộ HOPEE nhưng có thể đúng) | Cần review pass kỹ |
| Stack ghi "Java" nhưng JD remote thường yêu cầu Python/JS automation | Có thể không match keyword |
| Không có testimonial / reference / LinkedIn recommendation block | Social proof yếu |

### 2.3 UI/UX

| Issue | Notes |
|---|---|
| Hero: orbital rings spin liên tục → distracting + battery drain trên mobile | nên pause khi `prefers-reduced-motion` |
| 2 sections (Stats + Experience phần dưới) duplicate stat cards | redundant cảm giác |
| Quá nhiều `border-y` giữa sections → trang nhìn segmented thay vì flow | giảm divider, dùng spacing |
| Color contrast: `text-slate-400 dark:text-slate-500` trên `bg-background-dark` ≈ 3.0:1 → fail WCAG AA | a11y |
| Material Symbols load full font axis — heavy, không subset | perf |
| Profile image hover scale 110 nhưng container `overflow-hidden` → scale bị cắt | visual bug |
| Mobile menu button không có drawer/dropdown | mobile UX broken |
| Không có scroll-spy active state trên Navbar | navigation feel cheap |
| Không có scroll progress / back-to-top | minor polish |
| Form không có toast/feedback, không có loading state, không có error states inline | UX gap |
| Light mode tồn tại trong CSS (`dark:` modifiers) nhưng **không có toggle** → dead code path | confusing |

### 2.4 SEO / Discoverability

| Issue |
|---|
| Không có `<meta name="description">`, OG image, Twitter card, canonical URL |
| Không có `JSON-LD` Person schema (huge cho recruiter Google "Dan Nguyen Tien QA") |
| Không có `sitemap.xml`, `robots.txt` |
| SPA pure, không SSG → bot crawl yếu (mặc dù modern Google handle JS, nhưng LinkedIn/Twitter previewer thì không) |
| Không có analytics (Plausible/GA4) để biết recruiter có vào hay không |

### 2.5 Functional Defects (Phải fix)

| # | Defect | File:Line |
|---|---|---|
| F1 | Contact form `onSubmit={(e) => e.preventDefault()}` — gửi xong **không có gì xảy ra** | `Contact.tsx:47` |
| F2 | "Download CV" button không có `onClick` / `href` | `Navbar.tsx:50-52` |
| F3 | Social icons `href="#"` | `Hero.tsx:154`, `Contact.tsx:118` |
| F4 | LinkedIn / GitHub / Resume LinkCard `href="#"` | `Contact.tsx:117` |
| F5 | Mobile menu button click → không action | `Navbar.tsx:57-59` |
| F6 | Email icon trong Hero không phải link `<a mailto:>` (chỉ là div) | `Hero.tsx:76-81` |
| F7 | Light mode CSS có, toggle không có → user prefers-light bị broken styling | `index.html:2` (class="dark") |
| F8 | "1+ Years" vs "over 2 years" mâu thuẫn | `Hero.tsx:38`, `Experience.tsx:16-18` |
| F9 | "Success Rate 99.8%" không có nguồn — strip nếu không justify được | `Hero.tsx:137` |
| F10 | `Experience.tsx` import `Link` không dùng (đã comment) — sẽ crash nếu mở | `Experience.tsx:2,23-32` |

---

## 3. Three Approaches — Tradeoff Analysis

### Approach A — "Conservative Polish" (1-2 tuần)
**Scope:** Sửa F1-F10, gỡ duplicate Stats, fix data inconsistency, polish UI, add a11y basics. **Giữ nguyên** stack & structure.

- ✅ Nhanh, ít risk, ship được sớm
- ✅ Đủ cho LinkedIn share / immediate apply
- ❌ Vẫn không có case study → vẫn yếu so với QA global benchmark
- ❌ Tailwind CDN còn → bị flag bởi devs xem profile

### Approach B — "Balanced Pro Rebuild" (3-4 tuần) **[Recommended]**
**Scope:** A + bỏ Tailwind CDN, restructure content cho QA chuẩn (Case Studies + Bug Reports + Automation Repo + Certifications), proper SEO/SSG, light/dark toggle, deploy CI/CD, basic Vitest setup (để portfolio QA có test).

- ✅ Đạt chuẩn QA portfolio quốc tế
- ✅ Code quality match level "QA biết code"
- ✅ Foundation tốt để mở rộng (blog, i18n sau này)
- ⚠️ Cần content writing effort lớn nhất: viết 2-3 case studies thật
- ⚠️ Cần real assets: Jira screenshot (anonymize NDA), GitHub repo automation

### Approach C — "Ambitious Showcase Platform" (6-8 tuần)
**Scope:** B + headless CMS-lite (MDX/Contentlayer), blog với articles về testing methodology, interactive Bug Tracker demo (recruiter có thể play với 1 mini Jira), Playwright test suite chạy trong CI hiển thị badge, OG image generator động, i18n EN/VI/JP (b/c bạn có background Nhật → leverage!).

- ✅ Stand-out cực mạnh — recruiter sẽ remember
- ✅ Tận dụng background Japan (Japanese language section riêng → unlock Japan remote market)
- ❌ Over-engineering cho mục tiêu "apply việc"
- ❌ Maintenance burden cao
- ❌ Risk: làm dở giữa chừng → portfolio "tệ hơn" so với current

---

## 4. Recommended Path — Approach B + Selective C bits

**Rationale:**
- Approach A là **không đủ** cho "remote/global + làm bài bản".
- Approach C **YAGNI** ngay từ đầu — CMS-lite, interactive demos không cần thiết cho v1.
- **B** cân bằng: content chuẩn QA + code quality solid + foundation cho mở rộng.
- **Cherry-pick từ C:** (1) Japanese flag/section nếu muốn target Japan market, (2) OG image — chỉ cần file PNG tĩnh ban đầu.

**Holy Trinity Check:**
- YAGNI: bỏ Stats duplicate, bỏ Gemini env legacy, không thêm CMS, không thêm i18n v1.
- KISS: 1 page SPA, MDX cho case studies, static deploy (Vercel/Cloudflare Pages).
- DRY: extract `StatCard`, `Tag`, `SectionHeader` thành shared components.

---

## 5. Phased Roadmap

### Phase 0 — Foundation Fix (2-3 ngày) — UNBLOCKERS
| Task | Acceptance |
|---|---|
| Migrate Tailwind CDN → Tailwind via PostCSS + content scanning | `index.html` no `<script cdn.tailwindcss.com>`, build output có CSS purged |
| Gỡ legacy: `GEMINI_API_KEY` define, importmap | `vite.config.ts` clean, `index.html` no importmap |
| Add ESLint + Prettier + tsconfig strict + Vitest | `npm run lint`, `npm run test` xanh |
| Setup deploy: Cloudflare Pages hoặc Vercel + custom domain | Live URL `dannt.dev` hoặc similar |
| Fix F8 (year inconsistency), F9 (Success Rate fake) — chọn con số có thể defend hoặc xóa | Hero & Experience đồng bộ |
| Fix F10: gỡ `react-router-dom` import unused trong Experience.tsx | Build clean |

### Phase 1 — Restructure Content Architecture (3-5 ngày)
| Task | Acceptance |
|---|---|
| Xóa `Stats.tsx` (duplicate); merge thành 1 section duy nhất `<Achievements />` | App.tsx render 1 lần |
| Rename `CareerTimeline.tsx` internal component (`Experience` → `CareerTimeline`) tránh collision | No dup names |
| Restructure App sections theo flow chuẩn QA portfolio:<br>1. Hero<br>2. About (1 paragraph + key strengths)<br>3. **Case Studies** (NEW — 2-3 cards)<br>4. **Automation Showcase** (NEW — GitHub repo embed)<br>5. Skills (re-grouped by proficiency level)<br>6. Experience timeline<br>7. **Certifications** (NEW)<br>8. Contact | App.tsx có đủ section, IDs nhất quán |
| Extract shared primitives: `<Tag>`, `<StatCard>`, `<SectionHeader>`, `<Card>` | components/ui/ folder mới |

### Phase 2 — Content Creation (5-7 ngày — bottleneck)
Đây là phần **bạn cần đầu tư thật**, không phải code:

| Asset | Format | Tips |
|---|---|---|
| **Case Study #1** — Microservice integration bug found | MDX với: Context / Approach / Tools used / Bug found (anonymized screenshot) / Impact (severity, business cost avoided) | Bug nào ấn tượng nhất tại HOPEE, anonymize tên client |
| **Case Study #2** — API testing với Postman/Mockoon | MDX với: API contract / test scenarios / 1 bug interesting | Show JSON request/response (anonymized) |
| **Case Study #3 (optional)** — Performance baseline với JMeter | MDX với: setup / threshold / finding | Optional nhưng impressive |
| **Automation Repo** — GitHub public repo | Selenium hoặc Playwright (recommend Playwright — modern, JS-native) test 1 site công khai (saucedemo.com / theinternet.herokuapp.com) | README chuẩn, CI badge xanh, 10-20 test cases |
| **Bug Report Sample PDF** | Jira-style template, attach file ở Contact section | Severity/Priority matrix, repro steps, expected vs actual, screenshots |
| **Resume PDF** | Tailored cho QA remote/global, ATS-friendly | Sử dụng FlowCV hoặc Rezi |
| **Certification plan** | ISTQB Foundation Level (target 3 tháng), Agile Tester | Hiển thị "In Progress" hợp lệ nếu đang học |
| Hero copy review | "over 2 years" → con số chính xác tới tháng (e.g., "1 year 11 months as of May 2026") | Honesty wins recruiter trust |

### Phase 3 — UI Polish & A11y (3-4 ngày)
| Task | Acceptance |
|---|---|
| Light/Dark toggle với `useTheme` hook + persist localStorage | Toggle works, no flash |
| `prefers-reduced-motion` respect — pause orbital rings | Accessibility |
| Mobile menu drawer thật sự (Radix Dialog hoặc Headless UI) | Click → menu mở |
| Color contrast fix — `slate-400` → `slate-300` trên dark | axe DevTools 0 violations |
| Add focus rings cho tất cả interactive elements | Tab through site OK |
| Scroll-spy active state cho Navbar | Section đang xem highlighted |
| Skip-to-content link | Screen reader test |
| Image optimize: `hinhdacat.jpg` → WebP + AVIF, `<picture>` element | Lighthouse perf ≥ 95 |
| Material Symbols → subset chỉ icons dùng, hoặc switch sang Lucide React (recommended: tree-shakeable, 10KB instead of 200KB) | Bundle size giảm |

### Phase 4 — SEO + Deploy + Test Coverage (2-3 ngày)
| Task | Acceptance |
|---|---|
| Meta tags: description, OG image, Twitter card | LinkedIn preview render OK |
| JSON-LD Person schema | Google Rich Results test pass |
| `sitemap.xml`, `robots.txt` | Both present |
| Cân nhắc: migrate Vite SPA → **Astro** (zero JS by default, SSG, MDX native) hoặc giữ Vite + thêm `vite-plugin-ssr` cho prerender. **Recommend Astro** cho QA portfolio — content-heavy, ít interactivity. | Static HTML cho mỗi page |
| Contact form thật: **Formspree** (free tier 50/month) hoặc **Resend + Cloudflare Worker** | Submit → email vào inbox |
| Analytics: Plausible (privacy-friendly) hoặc Cloudflare Web Analytics | Dashboard live |
| Vitest unit tests cho utility functions + 1-2 components | Coverage ≥ 50% (showcase, không cần 100%) |
| Playwright E2E: navbar nav, contact form submit (mock), dark mode toggle | CI badge xanh |
| GitHub Actions: lint + test + deploy on main push | Workflow file exists |

---

## 6. Tech Stack Recommendations

| Concern | Current | Recommend | Why |
|---|---|---|---|
| Framework | Vite SPA | **Astro 5** + React islands | Content-driven portfolio, SSG = SEO win, ít JS ship |
| Styling | Tailwind CDN | Tailwind 4 via Vite plugin | Production-ready, JIT, purged |
| Icons | Material Symbols (200KB) | **Lucide React** (tree-shakeable) | 10x smaller, cleaner |
| Content | Hardcoded JSX | **MDX** trong `content/` | Case studies dễ viết, version-control |
| Form backend | None (preventDefault) | **Formspree** free hoặc Resend + CF Worker | Zero infra |
| Hosting | None | **Cloudflare Pages** hoặc **Vercel** | Free, fast, CDN edge |
| Analytics | None | **Plausible** ($9/mo) hoặc **Cloudflare Web Analytics** (free) | Privacy + recruiter visit insight |
| Tests | None | **Vitest** + **Playwright** | "QA biết test code của mình" = strong signal |
| CI | None | **GitHub Actions** | Badge "build passing" trên README repo |
| Resume hosting | None | PDF in `/public/resume.pdf` + version-control | Always latest |

**Anti-recommendations (don't add):**
- ❌ Next.js — overkill cho portfolio
- ❌ Headless CMS (Sanity/Contentful) — MDX đủ rồi
- ❌ shadcn/ui full setup — chỉ cần 3-4 primitives, không cần ecosystem
- ❌ Framer Motion — bundle bloat, CSS animation đủ cho portfolio này
- ❌ i18n v1 — content tiếng Anh là đủ cho global apply. Thêm sau khi có v1 stable.

---

## 7. Content Structure Templates (cho Case Studies)

### Case Study Card Schema (MDX frontmatter)
```yaml
---
title: "Catching a Race Condition in Microservice Payment Flow"
domain: "E-commerce / Microservices"
role: "Manual + API Tester"
duration: "3 sprints (Q3 2025)"
tools: ["Postman", "Mockoon", "Jira", "PostgreSQL", "JMeter"]
severity: "Critical"
impact: "Prevented potential double-charge for ~12K users at launch"
artifacts:
  - bug_report: "./assets/bug-PAY-1042.pdf"
  - test_plan: "./assets/test-plan.pdf"
---
```

### Recommended Sections per Case Study
1. **Context** (3-4 câu) — system, team size, your role
2. **Challenge** — risk được test
3. **Approach** — methodology (e.g., risk-based testing, boundary value analysis)
4. **Bug Discovery** — repro steps tóm tắt + 1 screenshot (anonymized)
5. **Impact** — severity rationale + estimated business cost prevented
6. **Lessons learned** — 2-3 bullet

---

## 8. Skills Re-structuring (theo proficiency thay vì flat list)

Hiện tại skills là flat list — global recruiter muốn thấy **level**.

```
EXPERT (đã ship production work với):
  - Manual Testing (Functional, Regression, Smoke, UAT)
  - API Testing (Postman, REST contract validation)
  - Database Verification (MySQL, PostgreSQL — SQL JOINs, integrity checks)
  - Defect Lifecycle (Jira, severity/priority triage)

PROFICIENT (used in projects, comfortable):
  - Mockoon (API mocking)
  - JMeter (basic performance baselines)
  - Agile/Scrum ceremonies
  - Git workflows

LEARNING / FAMILIAR (đang phát triển):
  - Selenium WebDriver
  - Playwright (recommended pivot từ Selenium)
  - Python (testing scripts)
  - CI/CD pipelines (Jenkins/GitHub Actions)

CERTIFICATIONS (in progress / planned):
  - ISTQB Foundation Level (target: Q3 2026)
  - Agile Tester Extension
```

**Honesty principle:** đừng claim "Java" ở level expert nếu chỉ basic syntax. Recruiter sẽ test trong interview, mismatch sẽ kill candidacy.

---

## 9. Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Case studies không có dữ liệu thật (NDA tại HOPEE) | High | High | Anonymize: rename "Client A", redact screenshots, change number ranges. Hoặc tự tạo demo project test cho 1 public site (saucedemo.com) |
| Content writing tốn nhiều thời gian hơn dự kiến | High | Medium | Time-box 2 ngày/case study. Quality over quantity — 1 case study chất lượng > 3 case studies nông |
| Astro migration breaks existing styling | Medium | Medium | Migrate behind feature branch, không touch main cho đến khi parity |
| Lighthouse perf không đạt 95 do background images | Medium | Low | Lazy load images dưới fold, dùng AVIF |
| Cloudflare Pages free tier giới hạn | Low | Low | Vẫn dư cho portfolio traffic. Backup plan: Vercel free |
| Contact form spam | Medium | Low | Formspree có honeypot built-in. Add reCAPTCHA v3 nếu cần |
| Tự build trong nhiều tuần → mất momentum | High | High | Phase 0+1 ship trong 1 tuần, deploy ngay (kể cả chưa có case study), iterate sau |

---

## 10. Success Metrics

### Technical
- Lighthouse: **Perf ≥ 95, A11y ≥ 100, Best Practices ≥ 95, SEO ≥ 100**
- Bundle size: **< 100KB JS gzipped** (hiện tại với CDN Tailwind: ~250KB)
- Zero axe-core violations
- Test coverage: utility ≥ 70%, E2E happy paths covered
- CI: lint + test + build < 2 min

### Business / Recruiter outcomes
- LinkedIn profile views tăng (track baseline trước launch)
- ≥ 5 recruiter inquiry trong 4 tuần đầu sau launch (giả định share active)
- Domain time-on-site median ≥ 90s (Plausible)
- Resume download rate ≥ 30% từ Contact section

### Quality (meta — chính bạn là QA)
- Zero broken links (`linkinator` trong CI)
- Zero typos (Grammarly pass + spell check CI)
- 0 console errors trong production

---

## 11. Implementation Considerations

- **Branch strategy:** main = production, dev branches per phase. Tag releases (v0.2 = Phase 0 done, v1.0 = Phase 4 done).
- **Migration order quan trọng:** Phase 0 trước Phase 1 — không restructure khi nền code chưa stable.
- **Content-first vs code-first dilemma:** đề xuất **chạy song song** — bạn viết case studies (markdown drafts) trong khi tôi/dev refactor code. Markdown không cần code ready.
- **NDA check:** trước khi publish case study về HOPEE, **xác nhận** với manager hiện tại có OK không. Nếu không, dùng demo project tự build.
- **Photo update:** ảnh hiện tại `hinhdacat.jpg` (đá cát?) — recruiter cần thấy face shot rõ ràng, neutral background, professional attire. Đầu tư 1 buổi chụp.

---

## 12. Suggested Execution Sequence

```
Week 1: Phase 0 (Foundation Fix) + start writing Case Study #1 draft
Week 2: Phase 1 (Restructure) + Case Study #1 polish + start #2
Week 3: Phase 2 (Content) + Phase 3 (UI Polish) parallel
Week 4: Phase 4 (SEO + Deploy + Tests) + soft launch
Week 5: Iterate based on first recruiter feedback
```

**First win to ship:** sau Week 1, deploy v0.2 với foundation fixed + dummy case study placeholders. Có URL chia sẻ ngay, parallel content work.

---

## 13. Unresolved Questions

1. **Real case study data availability:** Bạn có quyền (NDA) publish bug/test artifact từ HOPEE không? Nếu không, kế hoạch B: tự test 1 OSS hoặc public site (saucedemo, restful-booker) làm portfolio.
2. **Photo:** có sẵn ảnh chân dung professional hơn `hinhdacat.jpg`? Nếu không, có sẵn sàng đầu tư 1 buổi chụp?
3. **Domain name:** đã có domain chưa? (`dannt.dev`, `dannguyentien.com`, `dannt-qa.com`?) Cần đăng ký trước Phase 4.
4. **Japan market positioning:** bạn có 4 năm ở Nhật + tiếng Nhật — có muốn target remote QA cho Japanese companies không? Nếu yes, cần section JP hoặc resume bilingual.
5. **Certification budget & timeline:** ISTQB Foundation exam $230 USD. Sẵn sàng đầu tư trong Q3 2026?
6. **Automation language preference:** Java (hiện tại có trong skills) vs Python vs JS/TS? Recommend **TS + Playwright** cho match global remote trend, nhưng nếu bạn comfortable Java hơn → giữ Java + Selenium.
7. **Contact form spam tolerance:** OK với Formspree free (50 submission/month) hay cần unlimited (paid $10/mo)?
8. **Migration appetite:** OK migrate Vite SPA → Astro (recommended) hay muốn giữ Vite SPA stack hiện tại?

---

## 14. Next Step (Decision Required)

Trước khi tôi/ai đó implement, cần bạn chốt:

1. **Approve Approach B + selective C?** hoặc thay đổi scope.
2. **Trả lời 8 unresolved questions** ở mục 13 (ít nhất Q1, Q4, Q6, Q8 — đây là blockers cho Phase 0/1).
3. **Confirm sequence:** Phase 0 (Foundation Fix) bắt đầu trước nhất, hay muốn parallel với content writing?

Sau khi chốt → có thể gọi `/plan:parallel` để build detailed implementation plan với parallel phases, hoặc `/cook` từng phase một.
