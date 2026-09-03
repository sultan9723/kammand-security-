---
name: kammand-ux-qa
description: Run a measured browser QA pass over KAMMAND routes at desktop and mobile widths - fold and CTA reachability, scroll depth, heading hierarchy, horizontal overflow, tap targets, console errors, hidden content. Use after changing page structure or styling, before a release, or when a page is reported as feeling scattered, hidden, or broken on mobile.
---

# KAMMAND UX QA

Measure, do not eyeball. Every finding in a QA report carries a number or a
selector. "The hero feels big" is not a finding; "h1 is 76px and pushes the
primary CTA to 694px, below a 588px fold" is.

## Setup

A dev server is often already running. Check before starting another:

```
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

If it returns 200, use it. `next dev` refuses to start a second server from the
same directory and will exit 1.

Then, with the `claude-in-chrome` skill loaded, create a tab and navigate.
Close every tab you opened when you finish.

## Route inventory

Enumerate from the App Router rather than guessing:

```
find app -name "page.tsx" | sed 's|^app||;s|/page.tsx$||;s|^$|/|'
```

Cover at minimum: `/`, one service, one framework, one industry, `/insights`,
`/contact`, `/book`, and one legal page.

## Viewports

- Desktop: 1440×800
- Mobile: 390×844

`resize_window` may not shrink the content viewport below the browser's
minimum width. **Verify with `innerWidth` before reporting a mobile result.**
If the viewport did not actually change, say so and audit the responsive layer
from the CSS and component code instead. Never describe a mobile rendering you
did not observe.

## The measurement probe

Run this per route and record the output:

```js
const vh = innerHeight, vw = innerWidth;
const h1s = [...document.querySelectorAll('h1')];
const cta = document.querySelector('main a[href*="book"], main a[href*="contact"]');
const r = cta && cta.getBoundingClientRect();
const levels = [...document.querySelectorAll('h1,h2,h3,h4')].map(h => +h.tagName[1]);
let skips = [];
levels.reduce((p, c, i) => (c - p > 1 && skips.push(`${p}->${c} at #${i}`), c), levels[0]);
JSON.stringify({
  viewport: vw + 'x' + vh,
  docHeight: document.documentElement.scrollHeight,
  viewportsTall: +(document.documentElement.scrollHeight / vh).toFixed(1),
  h1Count: h1s.length,
  h1Text: h1s.map(h => h.textContent.trim().slice(0, 60)),
  headingSkips: skips,
  firstCtaTop: r ? Math.round(r.top + scrollY) : null,
  ctaBelowFold: r ? r.top + scrollY > vh : 'no CTA found',
  horizontalOverflow: document.documentElement.scrollWidth > vw
    ? document.documentElement.scrollWidth - vw + 'px' : false,
  smallTapTargets: [...document.querySelectorAll('a,button')]
    .filter(e => { const b = e.getBoundingClientRect();
      return b.width && b.height && (b.width < 44 || b.height < 44); })
    .map(e => e.tagName + ' "' + e.textContent.trim().slice(0, 25) + '"').slice(0, 10),
  imgsMissingAlt: [...document.querySelectorAll('img')].filter(i => !i.hasAttribute('alt')).length
}, null, 1);
```

## Thresholds

A finding is raised when:

| Check | Threshold |
|-------|-----------|
| `h1Count` | must be exactly 1 |
| `headingSkips` | must be empty |
| `ctaBelowFold` | must be false at both widths |
| `viewportsTall` | over ~8 on the homepage is a finding |
| `horizontalOverflow` | must be false |
| `smallTapTargets` | any interactive element under 44px is a finding |
| `imgsMissingAlt` | must be 0 |

## Hidden content

For each interactive widget on a page, count how many items it holds and how
many are readable without interaction. Report as `visible/total`. Anything
that gates primary content — services, frameworks — is a finding regardless of
how well it is built. See the `grc-site-architecture` skill.

Also check for the reverse: the same content rendered twice, once inside a
widget and once as a list. That is duplication, not redundancy for safety.

## Console

```
read_console_messages with pattern: "error|Error|warn|hydrat|Failed"
```

Console tracking starts when the tool is first called, so **reload the page
after calling it** or you will see nothing from page load.

Note that `next.config.ts` applies a strict CSP without `'unsafe-eval'` in all
environments. React's development build needs `eval`, so an `eval() is not
supported` error in the dev overlay is expected and is not a page defect. It
does degrade the dev experience, and is worth fixing by scoping the strict CSP
to production. Do not report it as a production bug.

## Placeholder sweep

Grep the rendered text of every route for content that must never ship:

```
"coming soon", "in review", "publication pending", "under review",
"lorem", "TBD", "placeholder", "TODO"
```

Report each with its route and section.

## Report format

Per route: the probe output, threshold breaches, hidden-content ratios,
placeholder hits, console errors. Then a ranked list across all routes, worst
first, each with the specific file that owns the fix.

State what you could not verify. An unverified mobile viewport is reported as
unverified, never as a pass.
