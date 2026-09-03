---
name: kammand-css-architecture
description: Where KAMMAND styles belong and how to keep them findable - splitting the oversized globals.css, choosing between tokens, shared rules and component styles, and preventing regrowth. Use when adding styles for a new component or section, when you cannot find the rules for something, or when touching app/globals.css.
---

# KAMMAND CSS Architecture

`app/globals.css` is the authoritative implementation of design tokens
(`AGENTS.md`, Source Of Truth). It is **not** the place for every component's
styles, and today it holds them anyway: roughly 10,700 lines carrying 133
distinct component class prefixes behind only a handful of section banners.

That single fact is the main reason the codebase is hard to read. Finding the
rules for one section means scanning thousands of unrelated lines.

## What belongs where

**`app/globals.css` — global only.** Nothing component-specific.

- `:root` design tokens: color, type scale, spacing, radii, shadow, motion
- element resets and base typography
- accessibility primitives: focus rings, skip link, `prefers-reduced-motion`
- layout primitives used site-wide

**Beside the component — everything else.** A component's styles live in a
CSS Module named for it:

```
components/sections/homepage/hero.tsx
components/sections/homepage/hero.module.css
```

Imported as `import styles from "./hero.module.css"`. Next.js supports CSS
Modules with no configuration.

The test for where a rule goes: **if exactly one component uses it, it is not
global.** Two or three components sharing a rule usually means a missing
shared component, not a global class.

## Tokens are never redefined

`AGENTS.md` forbids duplicating token values in components, docs, or local
constants. A component stylesheet consumes tokens and defines nothing that
looks like a token:

```css
/* correct */
.hero__title { color: var(--color-ink); font-size: var(--font-display-lg); }

/* wrong — a literal that a token already covers */
.hero__title { color: #0b1220; font-size: 76px; }
```

A new color, size, spacing step, radius, shadow, or easing curve requires an
approved change to `SPEC-001-DESIGN-SYSTEM.md` first. Never invent one inside a
component file.

## Migrating out of globals.css

Move one component at a time, never in bulk. Per component:

1. Find its block: `grep -n '^\.<prefix>' app/globals.css`
2. Cut those rules into `<component>.module.css` beside the component.
3. Convert BEM class names to module-local names — `.hero__title` becomes
   `.title`, since the module already scopes it.
4. Update the component's `className` to `styles.title`.
5. Confirm no other file referenced the old global class:
   `grep -rn "hero__title" --include=*.tsx .`
6. Run the gate, then look at the page in a browser before moving on.

Media queries move with their component. A component's breakpoints belong in
its own file, not scattered through a global stylesheet.

Do not migrate a component and restyle it in the same change. Moving styles
must produce an identical rendering; a visual change on top of a move makes
both impossible to review.

## Preventing regrowth

Before adding any rule to `app/globals.css`, answer: which second component
uses this? If there is no answer, it belongs in a module.

Signs the file is drifting again:

- a class prefix naming a single section
- a media query tuned to one component's layout
- a literal color, size, or duration that duplicates a token
- a block with no banner comment explaining what owns it

## Order inside globals.css

While the file still holds mixed content, keep it navigable. Every block gets a
banner, and blocks stay in this order:

```
1. @import / @layer setup
2. :root tokens
3. base element and typography resets
4. accessibility primitives
5. layout primitives
6. anything not yet migrated  <- shrinking, never growing
```

## Before you finish

Report the line count of `app/globals.css` before and after your change. On any
task that touches styles, that number should go down or stay flat. If it went
up, name the shared rule that justified it.
