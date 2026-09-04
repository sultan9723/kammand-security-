---
name: kammand-design-consistency
description: Find and fix visual drift across the KAMMAND site - duplicate card and button treatments, bespoke type sizes, literal values that duplicate a token, undefined custom properties, dead selectors, and hover states with no focus counterpart. Use when the site looks like several sites, after adding sections, before a release, or when asked to make the design consistent. Not for deciding which file a rule lives in - that is kammand-css-architecture.
---

# KAMMAND Design Consistency

One system, or it is not a system. The question this skill answers is not "does
this rule live in the right file" — that is `kammand-css-architecture` — but
"how many different ways does this site do the same thing".

Drift is counted, never sensed. "The cards look inconsistent" is not a finding.
"34 `box-shadow` declarations, 9 of which use the only shadow token" is.

The root cause in this repo is structural: **there is no shared `.card` base
class.** Five sections each invented their own box, so every new section
reinvents it again. Collapsing variants without giving them something to
collapse *onto* just resets the clock.

| Selector | Background | Shadow | Padding |
|----------|-----------|--------|---------|
| `.frameworks-overview__map-card` | tinted `color-mix` | bespoke | `--space-5` |
| `.industries-overview__card` | `--color-surface-elevated` | none | `--space-6` |
| `.service-cell` | `--color-surface` | none | varies |
| `.services-capabilities__card` | `--color-surface-elevated` | none | `--space-6` |
| `.internal-link-card` | none (row, not a box) | none | `padding-block` |

Radius is consistent across all five. Surface, shadow, and padding are not.

## Detect

Run all of these from `kammand-security/`. Each prints a number you compare
against the thresholds below.

**Shadow drift** — the worst offender in this repo:

```
grep -c 'box-shadow:' app/globals.css                      # total declarations
grep -c 'box-shadow:[^;]*var(--shadow' app/globals.css     # tokenised ones
grep -oE 'box-shadow: [^;]*rgba\([^;]+' app/globals.css | sort -u
```

The third command is the important one. A shadow written as
`rgba(21, 94, 239, 0.14)` has hardcoded `--color-accent`'s RGB channels, so it
will not follow a palette change.

**Custom properties referenced but never defined.** These fail `var()`
substitution, which invalidates the *whole declaration* — the property silently
falls back to its initial value and the rule looks like it does nothing:

```
grep -o 'var(--[a-z0-9-]*' app/globals.css | sed 's/var(//' | sort -u > /tmp/used.txt
grep -oE '^\s+--[a-z0-9-]+:' app/globals.css | tr -d ' :' | sort -u > /tmp/def.txt
comm -23 /tmp/used.txt /tmp/def.txt
```

Ignore three known-good families in the output: `--font-display`,
`--font-body`, `--font-mono` are injected by `next/font` at runtime, and
`--*-index` properties are set inline via `style` props for animation stagger.
Everything else is a bug.

**Bespoke type sizes and literal values outside `:root`:**

```
awk '/^:root/{r=1;next} r&&/^}/{r=0;next} !r && /clamp\(/{print NR": "$0}' app/globals.css
awk '/^:root/{r=1;next} r&&/^}/{r=0;next} !r && /font-size:[^;]*[0-9](px|rem)/ && !/clamp\(/{print NR": "$0}' app/globals.css
awk '/^:root/{r=1;next} r&&/^}/{r=0;next} !r && /#[0-9a-fA-F]{3,8}\b/{print NR": "$0}' app/globals.css
```

**Variant proliferation** — how many ways does the site draw one thing:

```
grep -oE '\.ui-button--[a-z]+' app/globals.css | sort -u
grep -oE 'border-radius: [^;]+' app/globals.css | sort | uniq -c | sort -rn
```

**Dead selectors.** 93 at last count, including a whole unused `.text-display`
/ `.text-h1` / `.text-h2` / `.text-h3` utility scale (globals.css:211-243) and an
entire alternate insights card layout (`.insight-entry*`, `.insights-preview*`).
Confirm nothing renders a class before deleting it:

```
grep -oE '^\.[a-z][a-z0-9_-]+' app/globals.css | sort -u | sed 's/^\.//' | while read c; do
  grep -rqF "$c" --include=*.tsx app components || echo "DEAD: $c"
done
```

**Hover without focus.** Every hover affordance needs a keyboard equivalent:

```
grep -c ':hover' app/globals.css
grep -c ':focus-visible' app/globals.css
```

## Thresholds

| Check | Threshold | Repo at last audit |
|-------|-----------|--------------------|
| Undefined `var()` (excluding font + index families) | must be 0 | **4** — `--space-14` at :904 and :10200, `--space-7` at :6973 and :7825 |
| `box-shadow` declarations not using a shadow token | must trend to 0 | **~24 of 34** |
| `box-shadow` hardcoding a token's RGB as `rgba()` | must be 0 | **4** — e.g. `rgba(21,94,239,…)` is `--color-accent`; `rgba(11,22,35,…)` is `--color-ink` |
| Literal hex colour outside `:root` | must be 0 | 0 — hold this line |
| Literal `font-size` outside `:root` (`px` **and** `rem`) | must be 0 | **7** — 10px, 10.5px, 13px, 14px, 0.625rem, 0.66rem, 0.6875rem |
| `clamp()` outside `:root` | 1 tolerated for the hero; more is drift | **1** (globals.css:946) |
| `.ui-button--*` variants | 3 | 3 — hold this line |
| Distinct card treatments | 1 base + documented modifiers | **5 incompatible** |
| Dead selectors | must be 0 | **93** |

Note the `rem` row: a literal like `0.6875rem` reads as a considered value and
hides from a `px` grep. Match both units.

A count that moves in the wrong direction is a finding even if it is still
under threshold. Report before and after.

## Fix

**Undefined property** — decide which it is. If the value was meant to exist,
use the nearest defined step (the scale runs `--space-12` then `--space-16`;
there is no 14 and no 7). If the token genuinely should exist, that is a
`SPEC-001-DESIGN-SYSTEM.md` change and needs approval first. Never define a new
token inline to make a rule work.

**Shadow drift** — collapse onto `--shadow-elevated`. Where a shadow is doing
real work that the token cannot express (a focus glow, a diagram highlight),
keep it but make it use `color-mix(in srgb, var(--color-...))` rather than a raw
`rgba()` literal, so it tracks the palette.

**Bespoke size** — replace with the nearest scale token. If nothing fits, the
scale is wrong; that is a spec change, not a local override.

**Dead selector** — delete it. Confirm with the sweep above first; a selector
referenced only from a `.module.css` or built with a template literal will not
appear in a plain grep, so check both before deleting.

**Hover without focus** — add `:focus-visible` to the same rule block, never as
a separate block that can drift apart.

## Do not

- **Do not invent tokens.** New colour, size, spacing step, radius, shadow, or
  easing requires an approved `SPEC-001` change first.
- **Do not move rules between files.** That is `kammand-css-architecture`.
  Mixing a move with a restyle makes both unreviewable.
- **Do not restyle a component while collapsing its variants.** Collapsing is
  meant to produce an identical or strictly more consistent rendering.
- **Do not touch `framework-control-model.tsx` or its CSS.** That section is
  deliberately preserved as originally designed.

## Before you finish

Report the before and after count for every threshold you touched, and the
`app/globals.css` line count either side of the change.

Then verify in a browser. This is the failure mode that matters: a previous
pass removed a diagram and left `position: absolute` rules positioned around
the deleted element. Lint, typecheck, 161 tests, and the build all passed while
the section had a 226px hole in it. **A consistency change is not done until
the affected sections have been looked at.**

Gate: `npm run lint && npm run typecheck && npm run test && npm run build`.
