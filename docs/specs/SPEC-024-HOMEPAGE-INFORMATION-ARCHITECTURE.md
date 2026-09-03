# SPEC-024 — Homepage Information Architecture

Supersedes the homepage section ordering in `docs/KAMMAND-MASTER-SPEC.md`
for the sections currently built. The master spec's inventory still stands as
the target; this spec records the order and the reasoning behind it.

## Problem

The homepage rendered 6 of the 10 body sections the master spec calls for, in
an order that did not match the buyer's decision sequence, and it presented the
same ideas more than once:

- **Overlapping circular diagrams** centred on the KAMMAND mark, orbiting the
  same four industry words: the hero orbit, the framework "CONTROL MODEL", and
  the services "CONTROL SYSTEM" radial. See Diagrams below for what changed.
- **Services were gated and then duplicated.** A radial revealed one service in
  a detail panel — hardcoded to Risk Management, not selectable — and all six
  then appeared again as cards below it.
- **Frameworks preceded services**, so a first-time visitor met the standards
  before learning what KAMMAND sells.
- **Insights rendered four placeholder cards** reading "IN REVIEW" and
  "PUBLICATION PENDING".
- **Industries had six built pages that the homepage never linked to.**

## Decisions

### Diagrams

The services "CONTROL SYSTEM" radial is removed: it gated five of six services
behind a panel that was hardcoded to one service and never selectable.

The framework "CONTROL MODEL" diagram is **retained as originally designed**,
by explicit decision. An earlier revision removed it to leave the hero orbit as
the single canonical model; that was reversed and the section restored
byte-for-byte to its original implementation.

The homepage therefore carries the hero orbit, the framework control model,
and the consultation diagram in the final CTA. The risk of overlapping
vocabulary across them is accepted.

### Primary content is never gated

Services render as six visible cards. No selector, no detail panel, no second
copy of the same list. Interaction may enrich content, never gate it.

### Section order

Sections follow the order in which a regulated buyer asks their questions:

| # | Section | Buyer question |
|---|---------|----------------|
| 1 | Hero | What is this? |
| 2 | Trust strip | Is it for me? |
| 3 | Services | Can you solve my problem? |
| 4 | Framework intelligence | Do you know my regulator? |
| 5 | Industries | Do you know my sector? |
| 6 | Process + deliverables | Are you systematic, and what do I get? |
| 7 | Why KAMMAND | Why you and not a large firm? |
| 8 | Proof | Can I trust you? *(hidden until real)* |
| 9 | Team | Who does the work? *(hidden until real)* |
| 10 | FAQ | What's the catch? |
| 11 | Consultation CTA | What happens next? |

Services precede frameworks. What KAMMAND does is established before the
standards it maps to.

### Placeholders do not ship

Insights is removed from the homepage until entries are published. A visible
"in review" state tells a regulated buyer the firm is not yet operating, which
is the opposite of the signal the section exists to send. `/insights` is
unaffected and remains linked from the navigation.

### Trust sections

Six sections were added to close the trust gap. Each is built only from facts
the site can already substantiate.

| Section | Source of truth | State |
|---------|-----------------|-------|
| Trust strip | framework and industry pages that exist | live |
| Why KAMMAND | approved `operatingPrinciples` | live |
| Engagement deliverables | artifacts named in `engagementSteps` | live, inside Process |
| FAQ | published framework, service, and /security positions | live |
| Proof | `lib/proof.ts` | renders nothing until real entries exist |
| Team | `lib/team.ts` | renders nothing until real entries exist |

**Proof and Team render `null` while their data is empty.** A visible
"case studies coming soon" tells a regulated buyer the firm is not operating,
and a fabricated one breaches `AGENTS.md`. Absence is the correct state until
the business supplies real, consented entries.

**Engagement deliverables live inside the Process section, not beside it.** A
standalone engagement section repeated all four phase headings — Discover,
Design, Deliver, Assure — on one page. Process now answers both "what do you
do" and "what do I receive"; a test asserts each phase heading appears exactly
once.

Deliberately absent from the engagement content: durations, pricing, team size,
and commercial terms. Those are real commitments that must come from the
business.

## Implementation

- `app/page.tsx` — section order and the six added sections
- `components/sections/homepage/services.tsx` — radial and hardcoded detail
  panel removed; the six-card rail is the section
- `components/sections/homepage/framework-control-model.tsx` — **unchanged**
- `app/globals.css` — **unchanged**
- `components/sections/homepage/insights.tsx` — deleted, orphaned
- `components/sections/homepage/homepage-sections.module.css` — shared layout
  primitives for every section built as a CSS Module
- `trust-strip.tsx`, `why-kammand.tsx`, `proof.tsx`, `team.tsx`, `faq.tsx`,
  `industries.tsx` — new sections
- `components/sections/homepage/process.tsx` — renders phase deliverables
- `lib/company.ts` — approved positioning, now shared with the company page
  instead of duplicated in it
- `lib/engagement.ts`, `lib/faq.ts` — content derived from existing approved copy
- `lib/proof.ts`, `lib/team.ts` — typed, empty, awaiting real entries

## Verification

Measured in-browser after the change:

| Metric | Before | After |
|--------|--------|-------|
| Services visible without interaction | 1 of 6 | 6 of 6 |
| Placeholder strings on the page | 4 | 0 |
| Duplicated `h3` headings | 4 | 0 |
| Homepage links to industry pages | 0 | 6 |
| Body sections rendered | 5 | 8 |
| Framework section | original | unchanged |

Single `h1`, no horizontal overflow, lint / typecheck / 166 tests / build all
passing.

**Known trade-off:** the homepage is now 8397px, about 10 viewports on a
laptop. `grc-site-architecture` sets roughly 8 as the threshold. The added
trust sections are worth the length, but the page should not grow further
without removing something — the next section added needs one taken out.

## Amendment: section styling pass

The sections above shipped structurally correct but visually off-theme. The
cause was a gap in the design system rather than in the sections themselves.

### `.ui-section-heading` had no base styles

`components/ui/section-heading.tsx` emits `.ui-section-heading`,
`__eyebrow`, `__title`, and `__description`, but `globals.css` styled only
`.services-section__heading .ui-section-heading__*`. Every other consumer fell
back to bare element styles, so eyebrows rendered as 16px body text in the
default ink colour instead of the accent mono label used everywhere else on
the site.

The primitive now carries its own base block in `globals.css`, centred to match
the established header treatment (`.process-section__header`). The services
overrides are reduced to the one thing still specific to it — a 22ch title
measure, because that title is the longest on the page. Sections needing a
different measure override the title width and nothing else.

Centring is the default because every consumer is a full-width homepage band.
Card body copy stays left-aligned: centred prose in a grid costs legibility and
reads as filler.

### Services: cells to cards

`.services-rail` was one bordered container of six flat cells whose titles were
0.75rem uppercase mono — the same weight as a metadata label, for what is the
page's primary capability list. Each capability is now its own card with a
filled icon plate, a Fraunces title at `--font-size-h4`, and a footer rule that
resolves to the accent on engagement. The grid is 1 / 2 / 3 columns rather than
the previous 6-across at desktop, which had reduced each service to a sliver.

The reveal animation was moved from `transform` to `translate` so its filled
end state no longer out-ranks the hover lift in the cascade.

### Industries: dossier cards

Sectors are presented as filed records — a 52px index spine carrying a record
mark and a vertical number, with the sector on the right. The spine fills with
the accent on hover, so the whole record is the target rather than the link
text. The filing metaphor is the point: these are organizations under standing
regulatory oversight, not product tiles.

### Removed

`.services-section__workspace`, `.services-control__*`, and
`.services-detail__*` — roughly 300 lines left behind when the radial selector
and its detail aside were removed. Nothing referenced them.

### Verification

Lint, typecheck, 166 tests, and build all pass. Measured in-browser at 1422px:
all four `.ui-section-heading` instances centred with the mono accent eyebrow,
no horizontal overflow, all module and `:global()` hover rules compiled with
correct scoping.

The browser window would not resize below 1422px this session, and
`frame-ancestors 'none'` blocks an iframe probe, so the mobile layout was
verified from the compiled CSSOM rather than visually: both grids collapse to
`1fr` below 640px and the card's content column is `minmax(0, 1fr)`. This
should be confirmed on a real device.
