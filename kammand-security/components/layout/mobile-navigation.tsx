"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { DirectionalArrow } from "../ui/directional-arrow";
import {
  directNavigationItems,
  navigationDropdowns,
} from "./navigation-items";

const menuId = "mobile-navigation-panel";
type MobileGroupKey = (typeof navigationDropdowns)[number]["key"];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<MobileGroupKey | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const closeMenu = useCallback(({ restoreFocus = true } = {}) => {
    setIsOpen(false);
    setOpenGroup(null);

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

  const isLinkActive = useCallback(
    (href: string) => {
      if (!pathname) {
        return false;
      }
      if (href === "/") {
        return pathname === "/";
      }
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );

  const isGroupActive = useCallback(
    (group: (typeof navigationDropdowns)[number]) =>
      isLinkActive(group.viewAllHref) || group.items.some((item) => isLinkActive(item.href)),
    [isLinkActive],
  );

  const openMenu = useCallback(() => {
    const activeGroup = navigationDropdowns.find((group) => isGroupActive(group));
    setOpenGroup(activeGroup?.key ?? null);
    setIsOpen(true);
  }, [isGroupActive]);

  return (
    <div className="site-header__mobile-nav">
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-label="Open primary navigation"
        className="site-header__menu-trigger"
        onClick={openMenu}
        ref={triggerRef}
        title="Open navigation"
        type="button"
      >
        <span aria-hidden="true" className="site-header__menu-icon">
          <span />
          <span />
          <span />
        </span>
      </button>

      {isOpen ? createPortal(
        <div
          aria-modal="true"
          className="site-header__mobile-panel"
          id={menuId}
          ref={panelRef}
          role="dialog"
        >
          <div className="site-header__mobile-panel-header">
            <div className="site-header__mobile-panel-brand">
              <Link
                aria-label="KAMMAND home"
                className="site-header__wordmark"
                href="/"
                onClick={() => closeMenu({ restoreFocus: false })}
              >
                KAMMAND
              </Link>
            </div>
            <button
              aria-label="Close primary navigation"
              className="site-header__menu-trigger site-header__menu-trigger--close"
              onClick={() => closeMenu()}
              ref={closeButtonRef}
              title="Close navigation"
              type="button"
            >
              <span aria-hidden="true" className="site-header__menu-icon">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>

          <nav aria-label="Mobile primary navigation" className="site-header__mobile-nav-content">
            <div className="site-header__mobile-intro" aria-hidden="true">
              <span>Explore KAMMAND</span>
              <span>GRC / Cybersecurity advisory</span>
            </div>
            <ul className="site-header__mobile-list">
              {navigationDropdowns.map((group, index) => {
                const groupId = `mobile-nav-${group.key}-panel`;
                const isGroupOpen = openGroup === group.key;

                return (
                  <li
                    className={`site-header__mobile-group${
                      isGroupActive(group) ? " site-header__mobile-group--active" : ""
                    }`}
                    key={group.key}
                  >
                    <button
                      aria-controls={groupId}
                      aria-expanded={isGroupOpen}
                      className="site-header__mobile-link site-header__mobile-group-trigger"
                      onClick={() => setOpenGroup(isGroupOpen ? null : group.key)}
                      type="button"
                    >
                      <span className="site-header__mobile-item-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="site-header__mobile-group-label">{group.label}</span>
                      <span aria-hidden="true" className="site-header__mobile-disclosure-icon">
                        <span />
                        <span />
                      </span>
                    </button>

                    {isGroupOpen ? (
                      <div className="site-header__mobile-sublist-wrap" id={groupId}>
                        <ul className="site-header__mobile-sublist">
                          {group.items.map((item) => (
                            <li key={item.href}>
                              <Link
                                aria-current={
                                  isLinkActive(item.href) ? "page" : undefined
                                }
                                className="site-header__mobile-sublink"
                                href={item.href}
                                onClick={() => closeMenu({ restoreFocus: false })}
                              >
                                {item.label}
                                <DirectionalArrow className="site-header__mobile-sublink-arrow" />
                              </Link>
                            </li>
                          ))}
                          <li>
                            <Link
                              className="ui-button ui-button--secondary site-header__mobile-view-all"
                              href={group.viewAllHref}
                              onClick={() => closeMenu({ restoreFocus: false })}
                            >
                              {group.viewAllLabel}
                              <DirectionalArrow />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}

              {directNavigationItems.map((item, index) => (
                <li key={item.href}>
                  <Link
                    aria-current={isLinkActive(item.href) ? "page" : undefined}
                    className="site-header__mobile-link site-header__mobile-link--direct"
                    href={item.href}
                    onClick={() => closeMenu({ restoreFocus: false })}
                  >
                    <span className="site-header__mobile-item-number">
                      {String(navigationDropdowns.length + index + 1).padStart(2, "0")}
                    </span>
                    <span className="site-header__mobile-group-label">{item.label}</span>
                    <span aria-hidden="true" className="site-header__mobile-direct-icon">
                      <DirectionalArrow />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>,
        document.body,
      ) : null}
    </div>
  );
}
