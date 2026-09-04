---
name: kammand-accessibility
description: Audit and fix KAMMAND against WCAG 2.2 AA - focus parity between hover and keyboard, contrast against real token values, form labelling and error association, heading hierarchy, decorative vs informative SVG and image handling, reduced motion, and 44px targets. Use before a release, after adding interactive components or forms, or when accessibility is raised. For a fast structural sweep across routes, kammand-ux-qa gets there quicker.
---

# KAMMAND Accessibility

`AGENTS.md` targets WCAG 2.2 AA and `SPEC-011` is the approved audit spec. This
skill is the depth pass.

`kammand-ux-qa` already covers the fast structural checks — h1 count, heading
skips, tap targets, alt presence, horizontal overflow — as part of its per-route
probe. **Do not duplicate those here.** Run the UX QA probe first for breadth,
then use this skill for the things a one-page probe cannot see: keyboard
journeys, focus parity, computed contrast, and form semantics.

## What is already good

Do not "fix" these. They are correct, and a careless pass will regress them.

- **A universal focus ring exists** — `app/globals.css:152` sets
  `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px }`.
  Nothing on the site is keyboard-invisible.
- **Every `onClick` is on a real `<button>`.** There are no `div`-as-button
  anti-patterns. Keep it that way.
- **Forms are labelled.** `components/sections/contact/contact-form.tsx` pairs
  every control with a `<label htmlFor>` through its `FormField` component.
- **Complex diagrams are annotated.** `grc-orbit.tsx` and
  `framework-control-model.tsx` use `role="img"` with `aria-labelledby`, and mark
  decorative sub-groups `aria-hidden="true"`.
- **Decorative vs informative images are split correctly** in
  `trust-strip.tsx`: repeated badges get `alt=""`, the one labelled instance
  gets descriptive alt.

## The live finding: focus parity

Roughly half the interactive components define a rich `:hover` affordance with
no matching `:focus-visible`. Keyboard users get only the generic outline while
mouse users get a transform or colour change. This is not a WCAG failure —
focus is always visible — but it is a real inequity and the clearest
accessibility work available.

Known offenders, all in `app/globals.css`:

| Selector | Line |
|----------|------|
| `.ui-button:hover` and the `--primary` / `--secondary` / `--text` variants | 336, 346, 357, 370 |
| `.site-header__menu-trigger:hover` | 534 |
| `.final-cta__secondary:hover` | 3196 |
| `.site-footer__contact a:hover` | 3570 |
| `.site-footer__group a:hover` | 3668 |
| `.site-footer__newsletter-form button:hover` | 3793 |
| `.site-footer__social a:hover` | 3831 |

The `.ui-button` row matters most — it is every primary and secondary CTA on
every page.

Components that already do this correctly, to copy from: `.service-cell`
(1741-1742), `.services-capabilities__card` (4265-4266),
`.industries-overview__card` (5019-5020).

Detect:

```
grep -nE '^\.[a-z][^,{]*:hover' app/globals.css | wc -l
grep -nE ':focus-visible' app/globals.css | wc -l
```

Then for any rule with `:hover` and no sibling `:focus-visible`, add it to the
**same selector list**, never a separate block that can drift:

```css
.ui-button--secondary:hover,
.ui-button--secondary:focus-visible { … }
```

## Contrast

Compute against the real token values in `:root` (`app/globals.css:3-90`), not
against what a colour looks like. The pairs worth checking:

- `--color-text-muted` (#5b6b7e) on `--color-bg` (#f7fafc) and on
  `--color-surface` (#ffffff) — this is the one most likely to fail, and it is
  used for the hero credential and positioning lines, card metadata, and
  `.industryIndex`
- `--color-text-secondary` (#435367) on both backgrounds
- `--color-accent` (#155eef) on `--color-surface` for link text
- `--color-ink-text-muted` (#9db0c5) on `--color-ink` (#07111f) for dark sections

Body text needs 4.5:1; text at 18.66px+ bold or 24px+ needs 3:1; UI component
boundaries and focus indicators need 3:1.

In the browser, compute rather than eyeball:

```js
const el = document.querySelector('.homepage-hero__credential');
const cs = getComputedStyle(el);
JSON.stringify({ color: cs.color, bg: getComputedStyle(el.closest('section')).backgroundColor, size: cs.fontSize, weight: cs.fontWeight })
```

## Keyboard journeys

A probe cannot tell you whether a journey works. Tab through each of these and
record what happens:

1. **Skip link** — first Tab from page load reaches it, and activating it moves
   focus into `#main-content`.
2. **Mobile navigation** (`components/layout/mobile-navigation.tsx`) — opens by
   keyboard, traps focus while open, closes on `Escape`, and **returns focus to
   the trigger**. Focus restoration is the part most often missed.
3. **Desktop navigation dropdowns** (`desktop-navigation.tsx`) — submenus
   reachable and dismissible without a mouse.
4. **Cookie consent** (`components/consent/cookie-consent.tsx`) — reachable,
   operable, and does not trap focus behind the page content.
5. **Contact form** — tab order matches visual order; on submit failure focus
   moves to the error or the first invalid field.

Report each as pass/fail with what you observed. An untested journey is
reported as untested.

## Reduced motion

Every animation needs a `prefers-reduced-motion: reduce` counterpart.

```
grep -c 'animation:' app/globals.css
grep -c 'transition:' app/globals.css
sed -n '/prefers-reduced-motion/,/^}/p' app/globals.css | wc -l
```

Check specifically that the marquee in `homepage-sections.module.css` stops and
collapses to a single static row, and that the orbit and framework diagrams
resolve to their final state immediately rather than animating in.

## Errors and status

For the contact form: errors must be associated with their field via
`aria-describedby`, not only coloured red — colour alone fails 1.4.1. Submission
status needs an `aria-live` region so a screen-reader user learns the result.

## Do not

- Do not add ARIA where semantic HTML already works. A `<button>` needs no
  `role="button"`. ARIA that restates the element is noise.
- Do not remove the universal `:focus-visible` rule while adding component-level
  ones. It is the safety net.
- Do not change `framework-control-model.tsx` — deliberately preserved.
- Do not widen contrast by inventing a colour. A failing token is a `SPEC-001`
  change.

## Before you finish

State which WCAG criteria you machine-checked, which you verified by hand, and
which still need a human — screen-reader output and cognitive-load criteria
cannot be settled from code.

Note that `SPEC-011` is stale: it says industries pages are "not present in the
repository at this phase", but `app/industries/**` now ships six pages. Audit
them; flag the spec drift rather than trusting the spec's scope list.

Gate: `npm run lint && npm run typecheck && npm run test && npm run build`.
