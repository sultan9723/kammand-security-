"use client";

import Link from "next/link";
import { useState } from "react";
import { CookiePreferencesButton } from "../consent/cookie-preferences-button";

type FooterGroup = {
  readonly label: string;
  readonly links: readonly {
    readonly label: string;
    readonly href: string;
  }[];
};

export function FooterNavigation({ groups }: { groups: readonly FooterGroup[] }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <div className="site-footer__nav">
      {groups.map((group) => {
        const isOpen = openGroup === group.label;
        const panelId = `footer-${group.label.toLowerCase()}-links`;

        return (
          <nav
            aria-label={`${group.label} footer navigation`}
            className={`site-footer__group${isOpen ? " is-open" : ""}`}
            key={group.label}
          >
            <p className="site-footer__group-label">{group.label}</p>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="site-footer__group-trigger"
              onClick={() => setOpenGroup(isOpen ? null : group.label)}
              type="button"
            >
              {group.label}
              <svg aria-hidden="true" viewBox="0 0 20 20">
                <path d="m6 8 4 4 4-4" />
              </svg>
            </button>
            <ul id={panelId}>
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    {link.label}
                    <span aria-hidden="true">-&gt;</span>
                  </Link>
                </li>
              ))}
              {group.label === "Legal" ? (
                <li className="site-footer__preferences-item">
                  <CookiePreferencesButton />
                  <span aria-hidden="true">-&gt;</span>
                </li>
              ) : null}
            </ul>
          </nav>
        );
      })}
    </div>
  );
}
