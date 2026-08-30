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
Before completing a feature:
1. Run lint
2. Run typecheck when configured
3. Run tests when configured
4. Run build
5. Verify responsive behavior
6. Verify accessibility

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
