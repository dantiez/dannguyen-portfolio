# Brainstorm: CV / Resume Download Feature

**Date:** 2026-05-15
**Status:** Critical — current button broken (404), 3 places reference `/resume.pdf` that doesn't exist

---

## 1. Current State — Broken

| Location | Code | UX |
|---|---|---|
| Navbar "Download CV" button | `<a href="/resume.pdf" download>` | Click → 404 (no file) |
| Contact LinkCard "Download Resume" | `<a href="/resume.pdf" target="_blank">` | Click → 404 |
| Mobile menu drawer | inherits Navbar | Same broken |

Recruiter click → broken link → immediate trust loss. **Highest priority** trong các pending features.

---

## 2. Decisions Locked (strong opinion, defensible)

### D1 — Single EN canonical PDF
**Không** sinh per-locale PDF (EN/VI/JA). Lý do brutal:

- **VN recruiter:** expect English CV — Vietnamese tech industry standard. VI CV = downmarket signal.
- **Japan recruiter:** không nhận translated CV. Japan đòi format chuẩn (履歴書 + 職務経歴書) với photo, family name first, education table format. Translated EN CV = half-measure, **không pass Japan ATS**. Nếu muốn Japan thật, phải tự build 履歴書 riêng — defer entirely.
- **Global recruiter:** EN expected.

→ **1 file**: `public/resume.pdf` (EN). Locale switcher trên portfolio không ảnh hưởng CV download.

### D2 — File generated from `docs/cv-content.md` (single source of truth)
- Markdown source đã maintain trong commit `f1517d4`
- Generate PDF qua **Pandoc** + **xelatex** hoặc **FlowCV** (manual)
- Tránh duplicate content giữa portfolio + CV (DRY)

### D3 — UX: open in new tab, browser handles preview/download
- Drop `download` attribute → browser native PDF viewer kicks in (desktop)
- iOS Safari downloads automatically (limitation OS, OK)
- Recruiter chọn save hay xem inline → tôn trọng workflow của họ
- Filename khi save: control qua `download` attr value → `Dan_Nguyen_Tien_QA_Resume.pdf` (search-friendly when sorted on disk)

### D4 — ATS-first format
- Single column layout
- Standard section headers: Summary, Skills, Experience, Education, Languages, Certifications
- No graphics, no two-column, no fancy fonts
- Text-based (not image-of-text)
- Keyword density: tools name explicit (Selenium, Playwright, Postman...)

→ **Pandoc default LaTeX template** OK. Hoặc Resume.io / FlowCV với "ATS-friendly" template.

---

## 3. Generation Approaches — Pick One

### A — Pandoc CLI **[Recommended for technical user]**
```bash
brew install pandoc basictex   # one-time
pandoc docs/cv-content.md \
  -o public/resume.pdf \
  --pdf-engine=xelatex \
  -V geometry:margin=2cm \
  -V fontsize=11pt
```
- ✅ Markdown → PDF deterministic
- ✅ Re-run on every CV edit, version control friendly
- ✅ Add to npm scripts: `"cv:build": "pandoc docs/cv-content.md -o public/resume.pdf ..."`
- ❌ Default LaTeX template plain (no visual flourish)
- ❌ Pandoc + TeX install ~500MB disk space
- ❌ CI integration cần Docker image với TeX

### B — FlowCV **[Recommended for visual polish]**
- Web app https://flowcv.com — free tier
- Paste markdown content, pick ATS-friendly template
- Download PDF, drop vào `public/resume.pdf`
- ✅ Beautiful template (single column, ATS-friendly)
- ✅ Recruiter-tested format
- ✅ 1-time effort, no infrastructure
- ❌ Manual sync khi bio thay đổi
- ❌ Not version-controlled (PDF is binary)

### C — Canva
- Visual template — beautiful but ATS-risky
- Use khi gửi CV trực tiếp recruiter (cá nhân), KHÔNG cho ATS upload
- Defer — không recommend cho portfolio download button

### D — HTML print → Save as PDF
- Build `public/resume.html` styled page → user opens → Cmd+P → Save as PDF
- ✅ Single source of truth (HTML can render same as portfolio bio)
- ❌ Recruiter expects PDF immediately, not HTML
- ❌ Each browser renders differently
- ❌ Mobile UX terrible
- Reject

### E — Server-side PDF gen (Puppeteer in API route)
- Vercel serverless function renders HTML → PDF on demand
- Always in sync với portfolio
- ❌ Overkill cho 1 static file
- ❌ Bundle bloat, cold start cost
- ❌ YAGNI cứng
- Reject

**→ Recommend Approach A (Pandoc) cho automation + version control.**
**→ Fallback Approach B (FlowCV) nếu Pandoc setup phức tạp.**

User có thể combine: Pandoc draft, FlowCV polish, both output to `public/resume.pdf`.

---

## 4. UX Refinement

### 4.1 Button Text (3 langs)
Current: "Download CV" / "Tải CV" / "履歴書ダウンロード"

Đề xuất giữ nguyên text + chỉnh behavior:

| Locale | Button text | Action |
|---|---|---|
| EN | Download CV | `href="/resume.pdf" target="_blank" rel="noopener"` |
| VI | Tải CV | same |
| JA | 履歴書ダウンロード | same |

### 4.2 Two Variants
- **Navbar button:** primary CTA, prominent — `target="_blank"` opens browser PDF viewer (desktop) hoặc downloads (mobile)
- **Contact LinkCard "Download Resume":** secondary, đã có `target="_blank"` — OK

### 4.3 Add metadata to PDF properties
Khi generate Pandoc:
```
--metadata title="Dan Nguyen Tien — AI-Augmented QA Engineer"
--metadata author="Dan Nguyen Tien"
--metadata subject="Resume / CV"
--metadata keywords="QA Engineer, Test Automation, AI, Selenium, Playwright, Postman"
```
→ PDF properties hiện title đúng khi recruiter save/preview, ATS scan keywords.

### 4.4 Filename khi browser download
Add `download="Dan_Nguyen_Tien_QA_Resume.pdf"` attribute on the `<a>`. Browser saves với tên đó thay vì `resume.pdf`.

### 4.5 Optional polish — Last updated badge
Show "Last updated: May 2026" near Download button. Signal đang được maintain.

Implementation: import `package.json` version / commit date, render trong Contact section.

---

## 5. Edge Cases

| Case | Behavior |
|---|---|
| User on slow connection | Browser shows progress, không block portfolio JS |
| User on iOS Safari | Downloads + opens in Files app (OS limitation) |
| User on Firefox mobile | Downloads. OK |
| User clicks before PDF deployed (race condition with Vercel build) | 404. Mitigation: deploy `resume.pdf` trước UI thay đổi |
| ATS scrape | Reads text content. Pandoc PDF = text-based. OK |
| Recruiter prints | A4/Letter page break. Pandoc default OK |
| Recruiter shares URL trực tiếp `dantiez-portfolio.vercel.app/resume.pdf` | Đó là điểm cộng — direct shareable. OK |

---

## 6. Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| PDF chưa exist khi deploy code → 404 | **High** | High (current state!) | **MUST** generate + commit PDF TRƯỚC khi push the change |
| Pandoc fails on user machine | Medium | Low | Fallback B (FlowCV) |
| CV nội dung lệch khỏi portfolio bio | High | Medium | Sync workflow: edit `docs/cv-content.md` → re-run `npm run cv:build` |
| CV file size > 1MB (recruiter mobile slow) | Low | Low | Pandoc default PDF ~50-200KB. Watch khi add photo |
| ATS reject due to format | Medium | High | Use ATS-tested templates (FlowCV "Modern" / Pandoc default). Test on Jobscan.co free |
| Filename inconsistent across browsers | Low | Low | `download` attribute force tên |

---

## 7. Implementation Phasing

### Phase 1 — Get PDF live (urgent, 30-60 min) **DO FIRST**
1. User picks Approach A (Pandoc) hoặc B (FlowCV)
2. Generate `public/resume.pdf`
3. Verify file < 500KB, opens correctly, content matches `docs/cv-content.md`
4. Commit + push → button works

### Phase 2 — Wire UX improvements (15 min)
1. Drop `download` attribute on Navbar "Download CV" → `target="_blank" rel="noopener"`
2. Add `download="Dan_Nguyen_Tien_QA_Resume.pdf"` filename
3. Verify Contact LinkCard already has `target="_blank"`

### Phase 3 — Automation (optional, 30 min)
1. Add `npm run cv:build` script (Pandoc command)
2. (Optional) Add pre-commit hook regenerate PDF if `docs/cv-content.md` changed — over-engineering, skip
3. Document workflow in `docs/cv-content.md` header

### Phase 4 — "Last updated" polish (optional, 30 min)
1. Add `meta.cvUpdated: '2026-05'` to dictionaries
2. Render below "Download CV" button or in Contact section

---

## 8. Success Metrics

- PDF accessible at `/resume.pdf` returns 200 (not 404)
- File size < 300KB ATS-friendly
- ATS scan score ≥ 80 via Jobscan.co
- Opens correctly trên Chrome, Firefox, Safari, Edge desktop + iOS Safari + Android Chrome
- Filename `Dan_Nguyen_Tien_QA_Resume.pdf` on download
- Content matches `docs/cv-content.md` (same title, same skills, same experience)
- LinkedIn share preview shows PDF correctly khi recruiter paste URL

---

## 9. Anti-Recommendations

| Idea | Lý do bỏ |
|---|---|
| Per-locale PDFs (resume-vi.pdf, resume-ja.pdf) | YAGNI. Recruiter expect EN. Japan needs separate 履歴書 format anyway |
| Server-side PDF gen (Puppeteer/Vercel function) | Overkill. Static PDF đủ |
| PDF preview modal in portfolio | Mobile UX bad. Browser native viewer là đủ |
| Multiple CV variants (creative/technical/management) | At career level 2 years, 1 CV đủ. Don't fragment |
| Watermark "CONFIDENTIAL" on PDF | Recruiter quốc tế khó chịu. Skip |
| Password-protect PDF | Recruiter ghét. Skip |
| Track download count via analytics | YAGNI. Vercel Analytics page view enough |
| Auto-generate PDF in CI on every push | Over-engineering. Manual `npm run cv:build` đủ |

---

## 10. Open Questions (need user input)

1. **Approach A (Pandoc CLI) vs B (FlowCV manual)?**
   - Pandoc: technical workflow, version-controlled, npm script
   - FlowCV: prettier output, manual sync
   - Hybrid: both possible
   - Recommend: **A** (matches dev workflow + DRY với markdown source)
2. **Add ISTQB / Playwright certifications now?** CV currently lists `Certifications (Planned)`. Empty signals weak. Maybe drop section until enroll cert thật.
3. **Resume photo?** Some markets (Japan, Germany) expect photo. Others (US, UK) explicitly discourage. KISS: **no photo** trên ATS CV (use portfolio portrait separately).
4. **"Last updated" badge near Download button?** Signal active maintenance. Recommend yes nếu commit thường xuyên.
5. **Filename:** `Dan_Nguyen_Tien_QA_Resume.pdf` OK? Hoặc `Dan_Nguyen_Tien_AI_Augmented_QA_Resume.pdf` (longer, more keywords)?

---

## 11. Next Step

Chốt Q1 (Pandoc vs FlowCV) + Q3 (photo or not) → user generate PDF → drop vào `public/resume.pdf` → tôi wire Phase 2 UX improvements (15 min code change) + commit.

Alternative: nếu chưa generate được PDF, **tạm thời disable "Download CV" buttons** (hide hoặc grey out với tooltip "Coming soon") — better than 404.
