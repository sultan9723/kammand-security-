import { defineConfig } from "vitest/config";

/**
 * Test environments are declared per file, not here.
 *
 * `node` is the default: it covers lib modules, route handlers, and config.
 * A test that renders React opts in with a first-line docblock:
 *
 *     // @vitest-environment jsdom
 *
 * The split does not follow directory boundaries — `app/insights/[slug]`
 * is a node test while its sibling pages are jsdom — so the per-file
 * docblock stays the source of truth rather than a glob in this file.
 *
 * The timeouts below are deliberately above Vitest's 5s default. Each jsdom
 * file boots its own environment, and under load that setup alone can exceed
 * 5s and fail a test that is not actually slow.
 */
export default defineConfig({
  test: {
    environment: "node",
    testTimeout: 20_000,
    hookTimeout: 20_000,
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**", "test-results/**"],
  },
});
