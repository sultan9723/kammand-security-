/**
 * Test environment shims.
 *
 * jsdom implements no IntersectionObserver, and Framer Motion's `whileInView`
 * constructs one on mount. Without this, any component using a viewport
 * trigger throws during render and takes the whole suite down with it.
 *
 * The stub reports nothing as intersecting, which is the correct default: a
 * scroll-triggered animation should not have run in a test that never
 * scrolled. Components must render their content regardless — that is the
 * behaviour worth asserting, and this shim keeps it assertable.
 *
 * Guarded on `window` because vitest.config.mts sets `node` as the default
 * environment; only files with the jsdom docblock have a DOM.
 */
class IntersectionObserverStub implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: readonly number[] = [];

  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

// Reached through globalThis rather than `window` directly: lib.dom declares
// IntersectionObserver as always present, so an `in` guard against `window`
// narrows it to `never` and fails the build's type check.
const globals = globalThis as {
  window?: unknown;
  IntersectionObserver?: typeof IntersectionObserver;
};

if (typeof globals.window !== "undefined" && !globals.IntersectionObserver) {
  globals.IntersectionObserver =
    IntersectionObserverStub as unknown as typeof IntersectionObserver;
}
