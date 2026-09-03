---
name: grc-site-architecture
description: Decide what sections a KAMMAND page needs, what each one is for, and what order they go in. Use when adding or reordering page sections, when a page feels scattered or repetitive, when content seems hidden, or when deciding whether a new section earns its place. Not for visual styling — that is SPEC-001.
---

# GRC Site Architecture

KAMMAND sells trust to regulated buyers. The site's job is to move a stranger
from "who is this" to "book a consultation" without ever making them hunt.

Read `AGENTS.md` and `docs/KAMMAND-MASTER-SPEC.md` before changing structure.
The master spec's homepage list is the intended architecture; where the build
diverges, the divergence needs a reason, not a shrug.

## The buyer's sequence

A GRC buyer — a CISO, a compliance lead, a risk officer at a GCC bank or
fintech — asks four questions, always in this order:

1. **What is this and is it for me?** Position and audience.
2. **Can you solve my specific problem?** Services, frameworks, industries.
3. **Can I trust you with a regulated program?** Proof, method, credentials, people.
4. **What happens if I reach out?** A concrete, low-risk next step.

Sections must appear in the order those questions arise. A page that answers
question 3 before question 2 feels scattered even when every section is good on
its own. **Sequence is meaning.** Reordering is a real fix, not cosmetics.

## One job per section

Every section states its job in one sentence before it is built. If two
sections answer the same buyer question with the same vocabulary, they compete
and the visitor stalls. Merge them or cut one.

Watch specifically for **repeated vocabulary across diagrams**. Governance,
risk, compliance, and assurance are the four words this whole industry uses. If
three separate visuals each orbit those same four words, a reader cannot tell
what distinguishes them and concludes the site is padding. One canonical model
diagram per site. Everything else is a list.

## Never hide primary content behind interaction

A radial selector, tab set, accordion, or hover panel that reveals one item at
a time hides the rest. For **primary** content — the services you sell, the
frameworks you cover — that is a conversion defect, not a design choice.

- Primary content is visible by default, scannable without clicking.
- Interaction may *enrich* content, never *gate* it.
- If a widget shows item 1 of 6, the other 5 are effectively missing.
- Never render the same content twice — once inside a widget and again as a
  list below it. Pick the scannable one.

## Required sections for a credible GRC site

Ordered by the buyer's sequence. A section marked **required** that is missing
is a conversion gap, not a nice-to-have.

| # | Section | Buyer question | Status |
|---|---------|----------------|--------|
| 1 | Hero — position, audience, outcome, CTA | What is this? | required |
| 2 | Trust strip — frameworks, sectors, credentials | Is it for me? | required |
| 3 | Services / capabilities | Can you solve my problem? | required |
| 4 | Framework coverage | Do you know my regulator? | required |
| 5 | Industries served | Do you know my sector? | required |
| 6 | How we work — the method | Are you systematic? | required |
| 7 | Why KAMMAND — differentiation | Why not the Big Four? | required |
| 8 | Proof — outcomes, engagements, references | Can I trust you? | required |
| 9 | Team / credentials | Who actually does the work? | strong |
| 10 | Engagement model — what a project looks like | What am I buying? | strong |
| 11 | FAQ — objections, scope, confidentiality | What's the catch? | strong |
| 12 | Insights | Do you actually know things? | when real |
| 13 | Consultation CTA | What now? | required |

Sections 7–11 are where a boutique consultancy beats a large firm, and they are
the ones most often missing. A site with services and frameworks but no
differentiation, proof, or people reads as a brochure, not a firm.

## The honesty constraint

`AGENTS.md` forbids fabricated customers, certifications, statistics, case
studies, partnerships, testimonials, and awards. That constraint is absolute
and it is not a reason to skip the trust sections. Build trust from what is
true and verifiable:

- The method, in specific detail — depth of process is itself evidence.
- Named frameworks and control counts you genuinely work to.
- Founder and practitioner credentials that actually exist.
- Anonymised engagement shapes ("a GCC payments firm preparing for SAMA CSF")
  only where the engagement is real and the client consented.
- Clear scope, deliverables, and timelines — specificity reads as competence.

If a trust section cannot yet be filled truthfully, **leave it out entirely**.

## Placeholder content is worse than no content

Never ship a section whose content is "coming soon", "in review", "publication
pending", or lorem text. On a trust-driven site a visible placeholder tells a
regulated buyer the firm is not operating yet — the exact opposite of the
signal the section was meant to send. Remove the section until its content is
real, then add it back.

## Page length and the fold

- A primary CTA must be reachable in the first viewport at 1440×800 and at
  390×844. If the hero's headline pushes the CTA below the fold, the headline
  is too large.
- A homepage over roughly 8 viewports tall is asking too much. Measure it.
- Every section should be identifiable from its first 100 vertical pixels:
  eyebrow, heading, then substance.

## Before you finish

State, for each section you added, moved, or removed: the buyer question it
answers, and why it sits where it sits. If you cannot name the question, the
section does not belong on the page.
