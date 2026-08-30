"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  consultationLink,
  directNavigationItems,
  navigationDropdowns,
} from "./navigation-items";

type DropdownKey = (typeof navigationDropdowns)[number]["key"];

export function DesktopNavigation() {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const openTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const pointerOpenStateRef = useRef<DropdownKey | null>(null);
  const hasPointerOpenStateRef = useRef(false);

  const closeDropdown = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpenDropdown(null);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openDropdownWithDelay = useCallback(
    (key: DropdownKey) => {
      clearCloseTimer();

      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }

      openTimerRef.current = window.setTimeout(() => {
        setOpenDropdown(key);
        openTimerRef.current = null;
      }, 180);
    },
    [clearCloseTimer],
  );

  const closeDropdownWithDelay = useCallback(() => {
    if (openTimerRef.current) {
      window.clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }

    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setOpenDropdown(null);
      closeTimerRef.current = null;
    }, 120);
  }, [clearCloseTimer]);

  const toggleDropdown = useCallback(
    (key: DropdownKey, wasOpenBeforePointer?: boolean) => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = null;
      }

      clearCloseTimer();
      if (typeof wasOpenBeforePointer === "boolean") {
        setOpenDropdown(wasOpenBeforePointer ? null : key);
        pointerOpenStateRef.current = null;
        hasPointerOpenStateRef.current = false;
        return;
      }

      setOpenDropdown((current) => (current === key ? null : key));
    },
    [clearCloseTimer],
  );

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeDropdown();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
      }
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, [closeDropdown]);

  return (
    <nav
      aria-label="Primary navigation"
      className="site-header__desktop-nav"
      onMouseLeave={closeDropdownWithDelay}
      ref={navRef}
    >
      <ul className="site-header__nav-list">
        {navigationDropdowns.map((group) => {
          const panelId = `desktop-nav-${group.key}-panel`;
          const isOpen = openDropdown === group.key;

          return (
            <li
              className="site-header__nav-item"
              key={group.key}
              onMouseEnter={() => openDropdownWithDelay(group.key)}
            >
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="site-header__nav-link site-header__nav-trigger"
                onClick={() =>
                  toggleDropdown(
                    group.key,
                    hasPointerOpenStateRef.current
                      ? pointerOpenStateRef.current === group.key
                      : undefined,
                  )
                }
                onFocus={() => setOpenDropdown(group.key)}
                onPointerDown={() => {
                  pointerOpenStateRef.current = openDropdown;
                  hasPointerOpenStateRef.current = true;
                }}
                type="button"
              >
                {group.label}
                <span aria-hidden="true" className="site-header__nav-caret">
                  v
                </span>
              </button>

              <div
                className="site-header__dropdown"
                data-open={isOpen}
                id={panelId}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setOpenDropdown(group.key);
                }}
              >
                <ul className="site-header__dropdown-list">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        className="site-header__dropdown-link"
                        href={item.href}
                        onClick={closeDropdown}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  className="site-header__dropdown-all"
                  href={group.viewAllHref}
                  onClick={closeDropdown}
                >
                  {group.viewAllLabel}
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </li>
          );
        })}
        {directNavigationItems.map((item) => (
          <li key={item.href}>
            <Link className="site-header__nav-link" href={item.href} onFocus={closeDropdown}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link className="site-header__cta" href={consultationLink.href}>
        {consultationLink.label}
      </Link>
    </nav>
  );
}
