# Brainstorm: Scroll-spy "Career" Not Highlighting Bug

**Date:** 2026-05-15
**Type:** Bug fix (UX regression discovered post-deploy)
**Severity:** P2 — visual signal of broken nav UX, recruiter notices quickly

---

## 1. Problem Statement

User reports: scroll xuống section "Professional Journey" (id=`careertimeline`), nhưng nav item "Career" **không** được highlight (vẫn highlight section khác hoặc không gì cả).

---

## 2. Root Cause Analysis

`lib/use-scroll-spy.ts` dùng IntersectionObserver với `rootMargin: '-20% 0px -40% 0px'` (40% viewport band), threshold `[0, 0.25, 0.5, 0.75, 1]`. Picking logic:

```ts
const visible = entries.filter((e) => e.isIntersecting)
  .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
setActiveId(visible[0].target.id);
```

**Vấn đề:** ratio = `intersectionRect / elementRect`. Khi sections có **chiều cao chênh lệch lớn**, sort by ratio favors **section ngắn** một cách bất công.

Đo cụ thể trên portfolio:
| Section | Chiều cao ước tính | Max ratio trong band (40vh ≈ 320px) |
|---|---|---|
| Hero | ~700px | 0.46 |
| Achievements | ~700px | 0.46 |
| **CareerTimeline** | **~1500px** (5 entries × 250-300px) | **0.21** |
| AiWorkflow | ~700px | 0.46 |
| Skills | ~900px | 0.36 |
| Contact | ~900px | 0.36 |

Khi user scroll qua CareerTimeline, **band luôn chứa < 21% của section**. Trong khi đó section trên (Achievements) đang exit band với ratio ~0.4 còn cao hơn → **Achievements vẫn được sort top → highlight sai**. Tới khi Achievements thoát hẳn band thì CareerTimeline win với ratio 0.21 — đoạn này highlight đúng nhưng ngắn — rồi AiWorkflow vào band với ratio rising, lại win → CareerTimeline mất highlight giữa chừng.

**Tóm tắt: thuật toán sort-by-ratio bị broken với section dài.**

---

## 3. Options Evaluated

### A — Slim band IntersectionObserver (`rootMargin: '-49% 0px -49% 0px'`)
- Band còn ~2% viewport (~16px thin line)
- Sections contiguous nên đúng 1 section intersect tại 1 thời điểm
- KISS: 1-line change
- ❌ Cảm giác "lazy" — highlight chỉ đổi khi section MIDDLE chạm middle viewport. UX hơi conservative.
- ❌ Edge: scroll smooth fast có thể "skip" band trong 1 frame — vẫn ổn vì lần fire kế tiếp catch up

### B — Scroll event + position-based pick **[Recommended]**
- Bỏ IntersectionObserver, listen scroll + rAF throttle
- Trigger: section top ≤ 25% viewport height → section đó active
- Snappy "top detection" — đổi highlight ngay khi user enter section
- Match GitHub docs sidebar / Stripe docs nav UX
- ✅ Stable cho mọi chiều cao section
- ✅ Đoán định dễ test
- ✅ Early-break loop (sections trong document order)
- ⚠️ Listener scroll (vs passive observer) — rAF throttle = OK perf, 0 jank

### C — IntersectionObserver + custom pick by `getBoundingClientRect().top`
- Keep observer cho efficiency, nhưng pick logic dùng top position thay vì ratio
- ❌ Observer chỉ fire on intersection change events → có thể miss intermediate scroll positions
- ❌ Hybrid complexity, ít rõ ràng hơn B

### D — Keep current + tweak rootMargin
- Cố tune rootMargin để bớt bug
- ❌ Không fix root cause, chỉ shift symptom. Reject.

---

## 4. Recommended Solution: Option B

**File:** `lib/use-scroll-spy.ts` rewrite (~20 lines)

**Logic:**
1. On scroll → rAF throttle
2. Compute `triggerY = window.innerHeight * 0.25` (top quarter line)
3. Iterate `sectionIds` in order, find LAST section có `top ≤ triggerY`
4. Early break khi gặp section với top > triggerY (sections in document order)
5. setActiveId nếu thay đổi

**Pseudo:**
```ts
function compute() {
  const triggerY = window.innerHeight * 0.25;
  let candidate = null;
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= triggerY) candidate = id;
    else break; // document order — stop early
  }
  setActiveId(candidate);
}
```

**rAF + listeners:**
- `scroll` (passive)
- `resize` (window height changes affect triggerY)
- Initial compute on mount

**Effort:** 15 phút rewrite + 5 phút manual verify.

---

## 5. Test Plan (Manual)

Scroll slowly từ top → bottom, verify highlight đổi đúng:
1. Top of page (Hero) → "About" active
2. Scroll qua Achievements → "Achievements" active
3. Vào CareerTimeline → **"Career" active** (bug fix verify)
4. Vào AiWorkflow → "AI Workflow" active
5. Skills → "Skills" active
6. Contact → "Contact" active

Scroll up reverse → verify highlight đổi đúng chiều ngược.

Mobile: same flow.

Test 3 locales: nav labels khác nhau nhưng active state logic không đổi.

---

## 6. Risk Register

| Risk | Mitigation |
|---|---|
| rAF throttle vẫn fire mỗi frame nếu scroll liên tục | early-break loop O(N) — N=6 sections, trivial cost |
| Resize không fire khi mobile address bar collapses | hiếm gặp, nếu cần thì thêm `visualViewport` listener — KISS skip cho v1 |
| Section element removed/added dynamically | sectionIds static, không xảy ra. OK |
| First paint chưa có scroll event → activeId=null → no highlight | compute() initial call on mount fix điều này |

---

## 7. Out of Scope (defer)

- Highlight smooth transition (CSS already handles via `transition-colors`)
- Active indicator underline animation
- Active section reflected in URL hash (recruiter share-link)

---

## 8. Next Step

Implement rewrite `lib/use-scroll-spy.ts` per Option B. Single file change, gates re-run, commit.

No unresolved questions.
