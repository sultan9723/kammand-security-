# KAMMAND Security Development Rules

## Project
KAMMAND Security is a premium cybersecurity and GRC consultancy website focused on regulated GCC organizations.

## Technology
- Next.js
- TypeScript
- App Router
- Tailwind CSS
- Server Components by default
- Client Components only when interactivity requires them

## Source Of Truth
- `docs/specs/SPEC-001-DESIGN-SYSTEM.md` is the authoritative design-system specification.
- `app/globals.css` is the authoritative implementation of foundational design tokens.
- Do not invent new colors, typography scales, spacing, radii, shadows, motion styles, or visual treatments without an approved spec change.
- Do not duplicate design token values in components, documentation, or local constants when a token already exists.

## Design Direction
The approved visual direction is Direction A:

- arctic/light primary canvas
- deep navy technical sections
- controlled cobalt/electric blue accent
- strong serif display headings
- clean sans-serif body and UI typography
- IBM Plex Mono for technical labels and framework identifiers
- high whitespace
- restrained borders and shadows
- technical diagrams and framework mapping as the visual language

Midnight Navy is rejected and must not be used as the design direction.

## Typography
- Use Fraunces for display and heading typography.
- Use Inter for body copy, UI, navigation, buttons, forms, and cards.
- Use IBM Plex Mono only for technical labels, framework identifiers, control IDs, and small metadata.
- Follow the heading sizes, line heights, letter spacing, and reading widths defined in `SPEC-001-DESIGN-SYSTEM.md` and implemented in `globals.css`.
- Do not create arbitrary heading sizes for one-off pages or components.

## Visual Rules
- Minimal
- Premium
- Technical
- Restrained
- No purple AI gradients
- No glassmorphism
- No generic cyberpunk styling
- No generic cybersecurity shield imagery
- No hacker stock photography
- No excessive rounded cards
- No decorative effects without meaning
- No fabricated trust claims

KAMMAND visual language should communicate:
- risk
- control
- governance
- evidence
- audit
- remediation
- compliance

## Components
Reuse existing components before creating new ones.

All reusable UI belongs in:
- components/ui
- components/layout
- components/sections

Do not duplicate component logic.

## Repository Layout

The application is `kammand-security/`. Nothing outside it ships.

```
kammand-security/     the Next.js app — all shipping code
docs/specs/           numbered, authoritative specifications
docs/audits/          point-in-time findings, not authoritative
docs/operations/      release, rollback, environment runbooks
.github/workflows/    CI: lint, typecheck, test, build
```

Never recreate `components/` or `lib/` at the repository root. Those paths
exist only inside `kammand-security/`, and a duplicate at the root makes it
ambiguous which tree is real.

Inside the app:

```
app/                  routes, route handlers, metadata
components/ui/        primitives with no domain knowledge
components/layout/    header, footer, navigation
components/sections/  page sections, grouped by the page that owns them
lib/                  logic, data access, integrations
content/              authored data (entries, copy tables)
public/images/        image assets
```

`lib/` uses a folder per domain once that domain has more than one module or
its own tests (`lib/leads/`, `lib/consent/`, `lib/analytics/`). A domain with a
single module stays a single file (`lib/booking.ts`, `lib/services.ts`).
Promote a file to a folder when you add its second module — do not pre-create
empty folders.

`content/` holds authored data. `lib/` holds the logic that reads it. Keep
that boundary: a content file must not import from `lib/`.

## Responsive Design
Every feature must support:
- Mobile
- Tablet
- Desktop
- Large desktop

Do not design desktop first and simply shrink it.

No hover-only functionality.

Minimum interactive target size should be approximately 44px.

Prevent horizontal overflow.

## Accessibility
Target WCAG 2.2 AA.

Requirements:
- semantic HTML
- visible keyboard focus
- keyboard navigation
- correct heading hierarchy
- exactly one logical H1 per page
- form labels
- accessible errors
- sufficient contrast
- reduced-motion support
- meaningful alt text for informative images
- decorative visuals hidden from assistive technology where appropriate

## Images And Static Assets

Every image lives under `public/images/<area>/<descriptive-name>.<ext>`, where
`<area>` matches the section that uses it (`company`, `insights`, `industries`).
Nothing else belongs at the root of `public/`.

Format:

- Photographs and renders: WebP. Convert before committing; do not commit PNG
  or JPEG sources for photographic content.
- Diagrams, icons, and logos: SVG, with the artwork optimized and any editor
  metadata stripped.
- PNG only when the asset genuinely needs lossless pixels.

A committed raster image should be well under 200 KB. If it is larger, it has
not been converted. `next.config.ts` configures AVIF and WebP derivatives, so
Next re-encodes on delivery — that is not a reason to commit a heavy source.

Render with `next/image`, never a bare `<img>`. Always pass `sizes` alongside
`fill`, and reserve `priority` for an image above the fold.

Alt text follows the accessibility rules in this document: describe the
meaning for informative images, and pass an empty `alt` for decorative ones so
assistive technology skips them.

## Motion
Motion must communicate state, meaning, GRC relationships, framework mapping, or attention priority.

Use the motion tokens and reduced-motion rules defined in `SPEC-001-DESIGN-SYSTEM.md` and implemented in `globals.css`.

Avoid:
- bouncing
- elastic motion
- excessive springs
- random particles
- continuous animation without meaning
- layout thrashing

Always respect `prefers-reduced-motion`.

## Content
Do not fabricate:
- customers
- certifications
- statistics
- case studies
- partnerships
- testimonials
- compliance claims
- awards

Do not rewrite approved business copy unless explicitly asked.

Use descriptive link text. Avoid "click here".

Use buttons for actions and links for navigation.

## Security
Never expose secrets in client-side code.

Validate server-side input.

Use environment variables for credentials.

Use appropriate security headers.

Avoid unnecessary third-party scripts.

## Performance
Prefer Server Components.

Avoid unnecessary JavaScript.

Optimize images.

Avoid large dependencies without justification.

Target:
- Lighthouse Performance >= 95
- Accessibility >= 95
- Best Practices >= 95
- SEO >= 95

## Development
Before completing a feature, run from `kammand-security/`:

```
npm run lint && npm run typecheck && npm run test && npm run build
```

Then verify responsive behavior and accessibility.

Report what actually ran. A failing or skipped gate is stated plainly with its
output, never smoothed over.

### Tests

Tests sit beside the code they cover, named `<module>.test.ts` or
`<component>.test.tsx`. Match the source filename exactly — `next.config.ts` is
covered by `next.config.test.ts`.

`vitest.config.mts` sets `node` as the default environment. A test that renders
React opts in on its first line:

```ts
// @vitest-environment jsdom
```

The environment split does not follow directory boundaries, so this docblock is
the source of truth rather than a glob. Keep it on the first line.

There is no end-to-end suite. Do not add a `test:e2e` script without also
adding a working Playwright configuration and at least one passing spec.

## Branching & Pull Requests
Feature-driven workflow, one feature per branch and one PR per feature:

1. Always base new feature branches on `develop`:
   - `git checkout develop`
   - `git pull origin develop`
   - `git checkout -b feature/<name>`
2. Build the feature, run lint/typecheck/test/build.
3. Commit with a clear conventional message:
   - `git add <changed paths>` (stage only the feature's files)
   - `git commit -m "feat/..."`
4. Push the branch and open a PR against `develop`:
   - `git push -u origin feature/<name>`
   - `gh pr create --base develop --head feature/<name> --title "..." --body "..."`
5. Do NOT merge the PR. The user reviews and merges manually on GitHub.
6. After the PR is merged, the feature branch is deleted/archived.

Notes:
- The GitHub CLI (`gh`) is available at `C:\Users\DELL\.github-cli\bin\gh.exe`.
- `git add --all` is avoided; stage only the intended feature files to keep PRs focused.
