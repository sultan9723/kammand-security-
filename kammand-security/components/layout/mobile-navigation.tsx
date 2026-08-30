"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  consultationLink,
  directNavigationItems,
  navigationDropdowns,
} from "./navigation-items";

const menuId = "mobile-navigation-panel";
type MobileGroupKey = (typeof navigationDropdowns)[number]["key"];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<MobileGroupKey | null>("services");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(({ restoreFocus = true } = {}) => {
    setIsOpen(false);
    setOpenGroup("services");

    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) {
        return;
      }

      const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeMenu, isOpen]);

  return (
    <div className="site-header__mobile-nav">
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label="Open primary navigation"
        className="site-header__menu-trigger"
        onClick={() => setIsOpen(true)}
        ref={triggerRef}
        type="button"
      >
        Menu
      </button>

      {isOpen ? (
        <div
          aria-modal="true"
          className="site-header__mobile-panel"
          id={menuId}
          ref={panelRef}
          role="dialog"
        >
          <div className="site-header__mobile-panel-header">
            <Link
              aria-label="KAMMAND home"
              className="site-header__wordmark"
              href="/"
              onClick={() => closeMenu({ restoreFocus: false })}
            >
              KAMMAND
            </Link>
            <button
              aria-label="Close primary navigation"
              className="site-header__menu-trigger"
              onClick={() => closeMenu()}
              ref={closeButtonRef}
              type="button"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile primary navigation">
            <ul className="site-header__mobile-list">
              {navigationDropdowns.map((group) => {
                const groupId = `mobile-nav-${group.key}-panel`;
                const isGroupOpen = openGroup === group.key;

                return (
                  <li className="site-header__mobile-group" key={group.key}>
                    <button
                      aria-controls={groupId}
                      aria-expanded={isGroupOpen}
                      className="site-header__mobile-link site-header__mobile-group-trigger"
                      onClick={() => setOpenGroup(isGroupOpen ? null : group.key)}
                      type="button"
                    >
                      {group.label}
                      <span aria-hidden="true">{isGroupOpen ? "-" : "+"}</span>
                    </button>
                    {isGroupOpen ? (
                      <ul className="site-header__mobile-sublist" id={groupId}>
                        {group.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              className="site-header__mobile-sublink"
                              href={item.href}
                              onClick={() => closeMenu({ restoreFocus: false })}
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            className="site-header__mobile-sublink site-header__mobile-sublink--all"
                            href={group.viewAllHref}
                            onClick={() => closeMenu({ restoreFocus: false })}
                          >
                            {group.viewAllLabel}
                            <span aria-hidden="true">-&gt;</span>
                          </Link>
                        </li>
                      </ul>
                    ) : null}
                  </li>
                );
              })}

              {directNavigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className="site-header__mobile-link"
                    href={item.href}
                    onClick={() => closeMenu({ restoreFocus: false })}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              className="site-header__mobile-cta"
              href={consultationLink.href}
              onClick={() => closeMenu({ restoreFocus: false })}
            >
              {consultationLink.label}
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
