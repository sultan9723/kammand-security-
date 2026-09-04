---
name: kammand-content-integrity
description: Classify and verify every user-facing claim on the KAMMAND site so nothing fabricated ships - customers, certifications, statistics, case studies, partnerships, testimonials, awards. Use when writing or reviewing marketing copy, adding a trust or proof section, filling proof.ts or team.ts, or when a claim needs checking before it goes live. For whether a section belongs on a page at all, see grc-site-architecture.
---

# KAMMAND Content Integrity

`AGENTS.md` forbids fabricating customers, certifications, statistics, case
studies, partnerships, testimonials, compliance claims, and awards. That rule is
absolute. This skill is the procedure that enforces it.

The stake is specific: this site sells assurance to regulated buyers. A buyer
who catches one inflated claim reasonably assumes the controls advice is
inflated too. **An unverifiable claim costs more than the missing section it was
meant to fill.**

`grc-site-architecture` decides whether a *section* ships. This skill decides
whether a *sentence* ships.

## Classify every claim

Every user-facing sentence is exactly one of three things. Decide which before
writing it, not after.

| Class | Definition | Ships? |
|-------|------------|--------|
| **Verifiable fact** | True today, and someone could check it | Yes |
| **Capability framing** | States what the practice is built for or how it works, asserts no history | Yes |
| **Unsupported claim** | Asserts a customer, credential, outcome, or number that is not backed | Never |

The move that rescues most blocked copy is rewriting an unsupported claim as
capability framing. It keeps the positioning and drops the lie:

- ✗ `Trusted by regulated fintechs across Saudi Arabia and the GCC` — a customer
  claim, while `lib/proof.ts` is empty
- ✓ `Built for organizations under SAMA, NCA, and PDPL supervision` — true today,
  same positioning, asserts no client

## Detect

Scan for the shapes that always need evidence:

```
grep -rniE "trusted by|clients?|customers?|leading|award|certified|accredited|partner(ship)?|[0-9]+\+|[0-9]+%|years of experience|we have (helped|worked)" \
  --include=*.ts --include=*.tsx app components lib | grep -v "\.test\."
```

Then the placeholder sweep — these must never reach a page:

```
grep -rniE "coming soon|in review|publication pending|under review|lorem|TBD|placeholder|TODO" \
  --include=*.ts --include=*.tsx app components lib | grep -v "\.test\."
```

For every hit, record the file:line, the class, and — if it is a fact — what
backs it.

**Most hits will be disclaimers, and disclaimers are the good case.** The
framework pages already carry careful ones, for example `lib/frameworks.ts:425`:
KAMMAND "does not imply that KAMMAND is an accredited certification body or that
it issues ISO certification", and `lib/framework-badges.ts:5` states the badges
are "not partnership, endorsement, accreditation, or certification" claims.
These are load-bearing. Never delete or soften a disclaimer to make a grep go
quiet — it is doing exactly the job this skill exists to enforce.

## The empty-array pattern

When a trust section has no real content, the section renders nothing. It does
not render a placeholder.

```ts
// lib/proof.ts
export const engagementOutcomes: readonly EngagementOutcome[] = [];
```

```tsx
if (engagementOutcomes.length === 0) {
  return null;
}
```

`lib/proof.ts` and `lib/team.ts` both work this way, and the section components
return `null` while they are empty. This is deliberate and correct.

**Absent beats placeholder beats fabricated.** A visible "case studies coming
soon" tells a regulated buyer the firm is not operating yet — the precise
opposite of the signal the section existed to send.

Keep the type. An empty typed array documents the shape the real data will take
and makes filling it a data change rather than a rebuild.

## Verifying a new factual claim

Before writing any claim of class *verifiable fact*:

1. **Ask.** Do not infer a credential, client, or number from context. The
   ISO 27001 Lead Auditor line in the hero was written only after the business
   owner confirmed the credential is held.
2. **Scope it honestly.** A credential belongs to a person, not the company. Write
   "Led by an ISO 27001 Lead Auditor", never "ISO 27001 certified", which claims
   the company holds a certification it does not.
3. **Back it one click away.** Every framework or capability named in a claim
   should reach a page that explains the actual scope of work. `CRFR` currently
   violates this — it is named in the hero with no `/frameworks/crfr` page.
4. **Never present framework names as endorsement.** `SPEC-003 §2` bars
   presenting them as client logos, partnerships, accreditation, or regulator
   approval. The trust-strip badges are marks of what the practice advises on.

## Pin every claim with a test

A verified claim that is not pinned will drift. Add the exact string to the
route's test so a later edit cannot quietly broaden it:

```tsx
// Both lines below are factual claims — a held credential, and a statement
// of who the practice is built for rather than who it has served.
expect(
  screen.getByText(
    "Led by an ISO 27001 Lead Auditor · SAMA CSF & CRFR specialist advisory",
  ),
).toBeTruthy();
```

`app/page.test.tsx` does this for the hero. Copy the pattern for any new claim.

Also assert the *absence* of what must not appear. The homepage JSON-LD test
asserts no `aggregateRating` and no `review` property — structured data must not
claim what the page cannot support.

## Do not

- Do not soften an unsupported claim into a vaguer unsupported claim. "Trusted
  by many organizations" is worse than the specific version, not better.
- Do not fill `proof.ts` or `team.ts` with illustrative examples. The doc
  comments in those files are examples; the arrays stay empty until real
  entries exist.
- Do not rewrite approved business copy that is already true. `AGENTS.md`
  forbids it unless explicitly asked.
- Do not treat a spec as permission. `docs/specs/` records approved copy, but a
  spec written before a claim was verified does not make the claim true.

## Before you finish

For every claim added or changed, state: the class, what backs it if it is a
fact, and the test that pins it. For every claim you removed, state what it
was and why it could not be supported.

If a claim could not be verified, say so plainly and leave it out. An
unverified claim is reported as unverified, never quietly shipped.

Gate: `npm run lint && npm run typecheck && npm run test && npm run build`.
