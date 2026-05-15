import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom doesn't ship these; stubs let hooks that use them mount without throwing.
if (typeof window !== 'undefined') {
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }

  if (!('IntersectionObserver' in window)) {
    class IntersectionObserverStub {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
      takeRecords = vi.fn().mockReturnValue([]);
      root = null;
      rootMargin = '';
      thresholds: number[] = [];
    }
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      IntersectionObserverStub;
    (global as unknown as { IntersectionObserver: unknown }).IntersectionObserver =
      IntersectionObserverStub;
  }
}
