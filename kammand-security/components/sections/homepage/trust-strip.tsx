import Image from "next/image";
import Link from "next/link";
import { frameworkBadges } from "../../../lib/framework-badges";
import styles from "./homepage-sections.module.css";

/**
 * Sits directly under the hero and answers "is this for me?" before the
 * visitor has to scroll for it.
 *
 * The badges scroll continuously. The mechanics:
 *
 *  - The track holds two identical groups and translates by exactly -50%, so
 *    the second group lands where the first began and the loop is seamless.
 *  - Three badges do not span a desktop viewport, so each group repeats the
 *    set `REPEATS` times. Without this the track is narrower than the screen
 *    and the strip shows an empty gap on every pass.
 *  - Exactly one set carries links and alt text. Every other set is
 *    decorative and hidden from assistive technology, so a screen reader
 *    announces each framework once rather than once per repetition.
 *  - Images load eagerly: the strip is immediately below the hero, so lazy
 *    loading would pop in while the visitor is already looking at it.
 *
 * Under `prefers-reduced-motion` the animation stops and the strip renders as
 * a single static, centred row.
 */
const REPEATS = 5;

function BadgeSet({ decorative }: { decorative: boolean }) {
  return (
    <>
      {frameworkBadges.map((badge) => (
        <li
          className={
            decorative
              ? `${styles.badgeItem} ${styles.badgeItemDecorative}`
              : styles.badgeItem
          }
          key={badge.href}
        >
          {decorative ? (
            <span className={styles.badge}>
              <Image
                alt=""
                className={styles.badgeImage}
                height={badge.height}
                loading="eager"
                src={badge.src}
                width={badge.width}
              />
            </span>
          ) : (
            <Link className={styles.badge} href={badge.href}>
              <Image
                alt={`${badge.label} — see how KAMMAND advises on this framework`}
                className={styles.badgeImage}
                height={badge.height}
                loading="eager"
                src={badge.src}
                width={badge.width}
              />
            </Link>
          )}
        </li>
      ))}
    </>
  );
}

function BadgeGroup({ labelled }: { labelled: boolean }) {
  return (
    <ul
      className={styles.badgeGroup}
      {...(labelled ? {} : { "aria-hidden": true })}
    >
      {Array.from({ length: REPEATS }, (_, repeat) => (
        <BadgeSet decorative={!labelled || repeat > 0} key={repeat} />
      ))}
    </ul>
  );
}

export function TrustStrip() {
  return (
    <section className={styles.trustStrip} aria-labelledby="trust-strip-title">
      <h2 className="sr-only" id="trust-strip-title">
        Frameworks KAMMAND advises on
      </h2>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          <BadgeGroup labelled />
          <BadgeGroup labelled={false} />
        </div>
      </div>
    </section>
  );
}
