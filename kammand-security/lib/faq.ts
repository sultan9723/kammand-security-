/**
 * Homepage FAQ.
 *
 * Every answer is limited to what the site can already substantiate: the
 * frameworks and industries KAMMAND publishes pages for, the engagement
 * phases in `engagementSteps`, and the positions stated on /security and
 * /privacy. Per AGENTS.md, no answer may assert a certification, audit
 * result, client outcome, or guarantee.
 */

export type FaqEntry = {
  question: string;
  answer: string;
  /** Optional page that substantiates or expands the answer. */
  link?: { label: string; href: string };
};

export const homepageFaqs: readonly FaqEntry[] = [
  {
    question: "Which frameworks does KAMMAND work with?",
    answer:
      "SAMA CSF, NCA ECC, Saudi PDPL, and ISO 27001. Where obligations overlap, KAMMAND maps them into one control environment rather than running each framework as a separate programme.",
    link: { label: "See framework coverage", href: "/frameworks" },
  },
  {
    question: "Do you advise only, or help implement?",
    answer:
      "Both. Engagements move through discovery and design into delivery, which includes supporting implementation of controls, documentation, remediation activity, and reporting routines, then reviewing whether those controls hold.",
    link: { label: "See how we work", href: "/services" },
  },
  {
    question: "Which sectors do you work in?",
    answer:
      "Financial services, fintech and payments, insurance, technology, healthcare, and other critical or regulated enterprises across the GCC — organizations that answer to regulators, boards, and auditors at the same time.",
    link: { label: "See industries", href: "/industries" },
  },
  {
    question: "We already have policies. Is that enough?",
    answer:
      "Documentation on its own rarely survives an assessment. The common gap is ownership and evidence: who is accountable for a control, and what record shows it operated. KAMMAND works on that layer rather than producing more documents.",
  },
  {
    question: "How is information we share handled?",
    answer:
      "KAMMAND publishes its current security posture and privacy practices rather than asserting a certification it does not hold. Review both before sharing anything sensitive, and raise specific confidentiality requirements during the first conversation.",
    link: { label: "Read the security position", href: "/security" },
  },
  {
    question: "What happens after I book a consultation?",
    answer:
      "A focused discussion about an active or near-term advisory need — your obligations, current controls, and priorities. It is a scoping conversation, not a sales presentation, and you should leave it with a clearer view of the next step whether or not you engage KAMMAND.",
    link: { label: "Book a consultation", href: "/book" },
  },
] as const;
