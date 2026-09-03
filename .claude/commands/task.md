---
description: Route a task to a model matched to its complexity, then run it to the AGENTS.md gate
argument-hint: <what you want done>
---

Run this task end to end, choosing the model yourself: **$ARGUMENTS**

## 1. Classify

Read enough of the repo to classify honestly — do not guess from the wording alone.
Apply the tier rubric already in context from the model-routing hook. If it is not
there, the rubric lives in `.claude/hooks/model-router.sh`.

Announce the routing decision in one line before doing anything else:

    Route: T<n> -> <model> — <the single reason that decided the tier>

## 2. Dispatch

- **T0** — do it here, now.
- **T1** — `Agent(subagent_type: "general-purpose", model: "haiku")`
- **T2** — `Agent(subagent_type: "general-purpose", model: "sonnet")`
- **T3** — do it here on opus. Spawn `model: "opus"` agents only to parallelize
  genuinely independent parts, never to hand off the thinking.

Every subagent prompt you write must carry, in full:
- the exact files it may touch, and that it may touch no others
- `kammand-security/AGENTS.md` is binding: design tokens, Server Components by
  default, WCAG 2.2 AA, no fabricated claims, reuse before creating
- the gate it must run and report (below)
- an instruction to report what it actually ran, not what it intended to run

## 3. Gate

Anything above T0 that changed code runs, from `kammand-security/`:

    npm run lint && npm run typecheck && npm run test && npm run build

Report the real outcome. A failure or a skipped step is stated plainly with its
output — never smoothed over.

## 4. Report

- The tier and model, and whether the classification held up in hindsight
- Files changed, with paths
- Gate results, verbatim on failure
- Anything you left out and why

Do not commit, branch, or open a PR unless the task explicitly asked for it.
Per AGENTS.md, feature work is branched off `develop` and the user merges.
