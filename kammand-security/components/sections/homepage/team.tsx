import { teamMembers } from "../../../lib/team";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/section-heading";
import styles from "./homepage-sections.module.css";

/**
 * Practitioners.
 *
 * Renders nothing while `teamMembers` is empty. Credentials are a factual
 * claim; AGENTS.md forbids inventing them, so the section stays absent until
 * real people with real certifications are listed.
 */
export function TeamSection() {
  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className={styles.sectionSubtle} aria-labelledby="team-title">
      <Container>
        <div className={styles.intro}>
          <SectionHeading
            description="The practitioners who do the work, and the credentials they hold."
            eyebrow="Practitioners"
            title="Who you will actually work with."
            titleId="team-title"
          />
        </div>

        <div className={styles.grid}>
          {teamMembers.map((member) => (
            <article className={styles.card} key={member.name}>
              <span className={styles.role}>{member.role}</span>
              <h3 className={styles.title}>{member.name}</h3>
              <p className={styles.description}>{member.focus}</p>
              {member.credentials.length > 0 ? (
                <ul className={styles.credentials}>
                  {member.credentials.map((credential) => (
                    <li className={styles.credential} key={credential}>
                      {credential}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
