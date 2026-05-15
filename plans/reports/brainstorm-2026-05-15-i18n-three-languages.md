# Brainstorm: i18n EN / VI / JA (UI chrome scope)

**Date:** 2026-05-15
**Owner:** Dan Nguyen Tien
**Stack:** React 19 + Vite 6 + Tailwind 4 + TypeScript strict
**Goal:** Toggle 3 languages cho portfolio: English (default) > Vietnamese > Japanese. Phục vụ VN + Japan + global markets cùng lúc.
**Scope:** Chrome only — UI labels, section headers, button text, form placeholders, structural content (Hero bio, Skills descriptions, CareerTimeline bullets). **Phase 2 case studies / bug reports / automation docs giữ EN-only.**

---

## 1. TL;DR — Brutal Honest Verdict

User đã chọn đúng scope (chrome only) — đây là điểm cứu request này khỏi YAGNI violation.

**Nhưng vẫn còn 3 risk lớn:**
1. **AI translate JP technical** dễ sai sắc thái → recruiter Nhật cảm thấy "MT smell". Phải review native hoặc ít nhất so sánh với JD QA Nhật để tune từ vựng (リグレッションテスト vs 回帰テスト).
2. **Maintenance debt mãi mãi**: mỗi copy edit từ giờ × 3. Phải có quy trình clear (lock EN trước, dịch 1 lần, không edit lặt vặt).
3. **Bundle bloat tiềm năng** nếu chọn i18next: +30KB JS gzipped. Cho 1 portfolio scale này = overkill rõ rệt.

**Final call:** Custom React Context với typed dictionaries (zero-dep, ~1KB), JP font lazy load. Implement đúng cách → cost <1 ngày dev + 2-3 giờ tune translation.

---

## 2. Options Analyzed

### A — `i18next` + `react-i18next` (industry standard)
- ✅ Battle-tested, pluralization, interpolation, namespaces
- ✅ Có language detector plugin, sync with `<html lang>`, browser detection
- ❌ +30KB gzipped — bloat lớn vs current 73KB JS gzip total
- ❌ Runtime key lookup → typo-prone nếu không type-gen từ JSON
- ❌ Setup nặng tay cho ~80 strings

### B — Custom React Context + typed dictionaries **[Recommended]**
- ✅ Zero runtime dep (<1KB code)
- ✅ Type-safe access: `t.hero.welcome` autocomplete + refactor-safe
- ✅ Đơn giản 1 buổi setup
- ✅ Kiểm soát hoàn toàn (no API surprise)
- ⚠️ Self-implement nên thiếu features advanced (pluralization, ICU format) — **không cần cho portfolio này**

### C — `next-intl` / `paraglide` / `tolgee`
- ✅ Modern type-safe alternatives
- ❌ Đều tied to Next.js hoặc cần build step riêng → mismatch với Vite SPA hiện tại
- ❌ Mất thời gian learning curve cho ROI thấp

### D — Multi-page (separate `/en`, `/vi`, `/ja` routes)
- ✅ SEO win — mỗi locale = URL riêng = Google index riêng
- ✅ LinkedIn/Twitter preview lấy đúng OG meta theo locale
- ❌ Yêu cầu router (react-router-dom đã uninstall), hoặc migrate Astro (Phase 4 task)
- ❌ Còn phải build language switcher chuyển URL, không đơn giản hơn B
- **Defer:** sẽ tính lại khi migrate Astro ở Phase 4. Lúc đó dùng `<html lang>` + locale-prefixed routes là chuẩn. Hiện tại Approach B là stepping stone tốt.

**→ Chọn B + URL strategy defer đến Phase 4 (Astro migration).**

---

## 3. Recommended Architecture

```
lib/i18n/
├── types.ts                      # Locale type + Dictionary shape
├── dictionaries/
│   ├── en.ts                     # English (source of truth)
│   ├── vi.ts                     # Vietnamese (type-checked against en)
│   └── ja.ts                     # Japanese (type-checked against en)
├── locale-context.tsx            # React Context + Provider
├── use-locale.ts                 # Hook: { locale, setLocale, locales }
└── use-translation.ts            # Hook: { t } returns active dict
```

### Dictionary Schema (typed structural content)

```ts
// lib/i18n/types.ts
export type Locale = 'en' | 'vi' | 'ja';

export const LOCALES: Array<{ code: Locale; label: string; nativeLabel: string }> = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
];

// Dictionary type inferred from en.ts; vi.ts and ja.ts use `satisfies Dictionary`
// so missing keys are caught at compile time.
```

### Type-safe access (KISS pattern)

```tsx
const { t } = useTranslation();

<h2>{t.hero.bio}</h2>
<button>{t.hero.cta.primary}</button>
```

Tại sao tốt hơn `t('hero.bio')`:
- Autocomplete IDE work full
- Rename refactoring trong IDE work
- Compile error nếu missing key trong vi/ja
- Không cần parsing string path runtime

### Persistence + Detection (Match useTheme pattern)

```ts
// Precedence:
// 1. URL param ?lang=ja  (Phase 4: locale-prefixed URL)
// 2. localStorage 'locale'
// 3. navigator.language → 'ja-JP' → 'ja', 'vi-VN' → 'vi', else 'en'
// 4. Default 'en'
```

Inline script trong `<head>` set `<html lang="...">` trước paint (no FOUC nếu CSS phụ thuộc lang attribute — hiện không, nhưng future-proof cho JP font conditional).

### Japanese Font Strategy

Vấn đề: Inter không support kanji. Hiện rendering JP sẽ fall back font system (Hiragino Sans macOS, Yu Gothic Windows, Noto Sans CJK Linux). **Inconsistent across OS.**

**Options:**
1. **Conditional Google Fonts** — chỉ inject `<link>` Noto Sans JP khi `locale === 'ja'`. Saves 70KB cho EN/VI users. Recommended.
2. Always load Noto Sans JP — đơn giản nhưng +70KB cho tất cả users.
3. System font stack only — KISS nhất nhưng nhìn không đồng nhất.

→ Option 1: dynamic `<link>` injection trong locale setter effect khi switch sang ja.

### Locale Switcher UI

3 button pill group trong Navbar + MobileMenu. Show nativeLabel + flag emoji optional (emoji flags không render trên Windows OS).

Suggested layout (desktop): `[EN] [VI] [JA]` thumb-friendly buttons, active state primary color background. ~80px width total.

---

## 4. Strings Audit (Chrome scope)

Đếm strings cần translate, theo component:

| Component | Strings | Notes |
|---|---|---|
| Navbar | 7 | Labels + "Download CV" + "MENU" |
| Hero | 8 | Welcome pill, title, subtitle, bio (1 long paragraph), 2 CTA, status badge, social labels |
| Achievements | 5 | "QC/QA Engineer", "Years of Experience", body, 3 stat labels |
| CareerTimeline | ~30 | Section header + subtitle + 5 entries (title, items, tags, subtext) |
| Skills | ~17 | Header + 8 card titles + 8 descriptions + tag dedupes |
| Contact | ~20 | Section header, body, info card labels, form labels, button, validation note |
| Mobile menu | 3 | "MENU", "Site navigation", "Appearance" |
| Footer | 1 | Copyright |
| Skip link | 1 | "Skip to main content" |
| Theme toggle aria | 2 | "Switch to light/dark mode" |
| **TOTAL** | **~94 unique strings** | × 3 langs = ~282 translations |

**Untranslate-able / Keep as-is:**
- Proper nouns: HOPEE Co., Ltd., FPT Aptech, Aptech Computer Education
- Tech terms (industry-standard EN even in JP/VI contexts): Postman, JMeter, Mockoon, Jira, MySQL, PostgreSQL, Selenium, Python, Java, Git, Jenkins, REST API, JSON/XML, Slack, Zoom, Confluence
- Dates: keep "11/2024 - Present" but consider locale format (JP: "2024年11月〜現在")
- Numbers: stat values "2+", "200+", "500+" unchanged
- Email/phone/URL: unchanged
- `<QA/QC Engineer>` brand tag: unchanged (it's a code-tag aesthetic)

### Translation pitfalls cụ thể

| EN | VI risk | JA risk |
|---|---|---|
| "Bug" (verb) "I break code so you don't have to" | "Tôi phá code để bạn không phải làm" — clunky. Reword: "Tôi tìm bug để bạn không phải lo." | "コードを壊すのが私の仕事です" — too casual. Tune to "バグを見つけるのが私の仕事です" |
| "QA Engineer" | "Kỹ sư QA" hoặc giữ "QA Engineer" — VN tech dùng EN | "QAエンジニア" — common JP usage |
| "Test Cases Written" | "Test case đã viết" / "Số test case" | "作成したテストケース" |
| "Get in Touch" | "Liên hệ" | "お問い合わせ" |
| "Available for work" | "Đang sẵn sàng nhận việc" | "求職中" hoặc "稼働可能" — careful: "稼働可能" sounds machine-like, "新しい機会を探しています" softer |
| "Microservice-based systems" | giữ EN "microservice" + Việt hóa context | "マイクロサービス" katakana standard |
| "Manual & Automated Testing" | "Kiểm thử thủ công & tự động" | "手動テスト & 自動テスト" |

**JP-specific note:** sử dụng です/ます (polite form) consistently. Tránh だ/である (literary). Recruiter Nhật chấm trừ rất nặng nếu inconsistent.

---

## 5. Implementation Plan (Sequential, ~1 day)

### Phase 3.5 — i18n Infrastructure (4-5h)
| Step | Time | Output |
|---|---|---|
| 1. Create `lib/i18n/` structure + types | 30m | Type-safe scaffold |
| 2. EN dictionary (extract current strings) | 1h | `en.ts` complete |
| 3. LocaleProvider + useLocale + useTranslation hooks | 1h | Context working |
| 4. Locale switcher component (Navbar + MobileMenu) | 1h | UI working in EN only |
| 5. Refactor 8 components to use `t.*` | 1.5h | All chrome via t() |
| 6. HTML lang attribute sync + inline script | 30m | `<html lang>` updates |
| 7. JP font conditional loader | 30m | Noto Sans JP loads on `ja` |
| 8. Update tests (LocaleProvider wrapper helper) | 30m | Tests pass |

### Phase 3.6 — Translation Pass (3-4h)
| Step | Time | Output |
|---|---|---|
| 1. Generate AI translation cho VI (Claude prompt với context) | 30m | `vi.ts` draft |
| 2. Generate AI translation cho JA | 30m | `ja.ts` draft |
| 3. Self-review VI (bạn native) | 30m | VI final |
| 4. Self-review JA + grammar tools (DeepL cross-check) | 1h | JA needs human eye |
| 5. Test all 3 locales in dev (toggle, layout shifts) | 30m | Bug-free toggle |
| 6. Test JP-specific edge cases (long strings, vertical text not needed but long compound words) | 30m | Layout robust |
| 7. **Optional:** xin native JP friend / fiverr ¥3,000 review | 1-2 days async | Native polish |

### Phase 3.7 — Polish (1-2h)
| Task |
|---|
| Lighthouse — ensure JP font lazy-load không hurt LCP |
| Test keyboard nav + screen reader announces locale change |
| `aria-live` announcement when locale changes (optional) |
| Update README với i18n architecture note |

---

## 6. AI Translation Prompt Template

Quan trọng: prompt phải bao gồm context để AI hiểu domain.

```
Translate the following English UI strings from a QA Engineer portfolio website to Japanese.

Context:
- The portfolio is for a 24-year-old Vietnamese QA Engineer with 2 years experience
- Target audience: Japanese tech recruiters hiring remote QA engineers
- Tone: professional but personable. Use です/ます form consistently.
- Keep technical terms as katakana when standard (e.g., テストケース, リグレッションテスト)
- Keep proper nouns untranslated (HOPEE, FPT Aptech, Postman, Jira, etc.)
- Keep brand-style tags like `<QA/QC Engineer>` as-is

Strings to translate (JSON):
{...en.ts content...}

Output: same JSON structure with Japanese values.
```

Lặp lại với prompt thay "Japanese" → "Vietnamese (Vietnam variant, modern tech industry tone)".

**Review checklist sau AI output:**
- [ ] です/ます consistent (no random だ)
- [ ] Politeness level appropriate (敬語 not too stiff)
- [ ] Tech terms match Japanese QA industry standard (cross-check JIRA Japan docs, Japanese Selenium tutorials)
- [ ] Date format: 「2024年11月〜現在」not「11/2024 - Present」trong CareerTimeline?
- [ ] Numbers: "2+" stays as-is OR localize to「2年以上」?
- [ ] VI: tránh dịch quá Anh-Việt thẳng (translation-ese)
- [ ] VI: dùng "Tôi" hay "Mình"? → Recommend "Tôi" (professional)

---

## 7. Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| AI translation JP unnatural | High | Medium-High | Native review OR cross-check với DeepL + glossary từ JP QA blogs |
| Layout breaks với JP long compound words | Medium | Low | Test sớm, dùng `overflow-wrap: break-word` + flexbox |
| JP font load lag (FOIT/FOUT) | Medium | Low | `font-display: swap`, preload only when locale=ja |
| Untranslated string slips qua | Medium | Low | TypeScript catch ở compile time nhờ `satisfies Dictionary` |
| Edit drift: EN updated, VI/JA quên | High | Medium | CI lint script check 3 dicts cùng shape, hoặc visual diff trên localhost trước khi commit |
| User chuyển locale rồi reload → flash sai lang | Low | Low | Inline script trong `<head>` đã handle |
| Phase 2 case studies viết EN xong, recruiter VN/JP đọc EN có "loose seams" với chrome đã dịch | High | Low | Đã accept trong scope decision — case studies stay EN |

---

## 8. Decisions Locked

1. ✅ **Approach B** — Custom React Context, zero deps
2. ✅ **3 locales** EN (default) > VI > JA
3. ✅ **Scope:** chrome only, NOT Phase 2 case studies
4. ✅ **Type-safe direct access** `t.section.key` pattern
5. ✅ **AI translate → self-review** workflow
6. ✅ **JP font conditional load** (Noto Sans JP only when ja active)
7. ✅ **Persistence:** localStorage > navigator.language > EN default
8. ✅ **URL strategy:** defer locale prefix routes đến Phase 4 (Astro migration)

---

## 9. Success Metrics

- All 3 locales render without layout breaks at 360px / 768px / 1280px
- Lighthouse perf score: maintained ≥ 90 in all locales
- No untranslated string leaks (CI lint catches structural drift)
- Bundle delta: <2KB JS gzipped (vs current 73KB)
- JP font: load only when ja active (verified via DevTools Network)
- Initial paint locale matches user expectation (no flash from EN→JA)
- `<html lang>` attribute matches active locale (for assistive tech)
- A11y: locale switcher keyboard-accessible, current selection announced

---

## 10. Open Questions

1. **JP date format:** Localize "11/2024 - Present" → "2024年11月〜現在"? (Recommend yes — recruiter signal)
2. **JP year-count format:** "2 Years" → "2年" hay "2年以上"?
3. **Native JP review:** willing to spend ¥3,000-5,000 hire native review trên Fiverr/Coconala? Hay tự confident với AI + DeepL?
4. **First-visit detection:** nếu navigator.language = 'ja' nhưng user thực ra muốn EN, có annoy không? → Recommend dùng detection NHƯNG show banner "Continue in 日本語?" để user override. Optional polish.
5. **Locale switcher placement priority:** ở Navbar (cùng theme toggle) hay floating button góc dưới? → Default Navbar.
6. **Resume PDF translation:** scope nói "chrome only" → CV PDF không dịch v1. Nhưng "Download CV" button có nên thay link theo locale (resume-en.pdf, resume-vi.pdf, resume-ja.pdf)? → Defer đến khi có CV thật.
7. **Phase 2 content language:** confirm lại — case studies stays EN. Recruiter JP click case study sẽ thấy EN. OK?

---

## 11. Next Steps

Sau khi approve report này:

1. **Trả lời câu Open Q1-Q7** (block để bắt đầu)
2. Execute Phase 3.5 (infrastructure) → tests pass, EN-only working
3. Execute Phase 3.6 (translation) → 3 locales live
4. Manual QA pass trên dev server với 3 locales × 3 viewports
5. Commit + (optional) deploy preview để share native reviewer
6. Resume Phase 4 (SEO/Deploy/Tests) hoặc Phase 2 (Content)

**Estimate:** ~1 buổi dev work + 3-4h translation + (1-2 ngày async nếu hire native review).
