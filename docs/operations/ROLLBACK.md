# KAMMAND Rollback Runbook

This runbook describes how to respond if a KAMMAND website release is unhealthy after deployment.

Do not expose production secrets, provider credentials, or private deployment details in incident notes.

## 1. Identify a Bad Release

Treat a release as potentially bad if any of the following are observed:

- homepage or critical routes return errors
- global navigation or CTAs are broken
- contact submissions fail unexpectedly
- booking page is unusable
- consent preferences fail or optional third-party content loads incorrectly
- metadata, robots, or sitemap output is materially wrong in production
- a security, privacy, or secrets issue is discovered
- CI passed but production smoke tests fail

## 2. Immediate Triage

1. Confirm the impacted environment.
2. Capture the deployed Git commit SHA.
3. Check the deployment provider status and logs.
4. Check `/api/health` for basic application availability.
5. Smoke-test `/`, `/contact`, `/book`, `/privacy`, and `/services`.
6. Classify impact as content, configuration, integration, or code.

## 3. Roll Back Code

Use the selected deployment platform's rollback capability to restore the last known good deployment.

If platform rollback is unavailable:

1. Identify the last known good Git commit.
2. Create a revert commit against the release branch.
3. Run `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build`.
4. Deploy the reverted commit through the normal deployment workflow.

Do not force-push shared release branches unless the release manager explicitly approves it.

## 4. Disable Broken Integrations

If the issue is isolated to an integration:

- Calendly: unset or correct `NEXT_PUBLIC_CALENDLY_URL`; the booking page should fall back to `/contact`.
- Contact delivery: switch to a safe non-production mode only if the site is not accepting production inquiries, or restore the previous verified provider configuration.
- Analytics: set `NEXT_PUBLIC_ANALYTICS_PROVIDER=disabled`.
- Monitoring: remove or disable the provider configuration if it causes production errors.

Do not replace production configuration with fake values.

## 5. Communication

Internal release status should include:

- affected environment
- current deployed commit
- symptom
- user impact
- rollback decision
- owner
- next check time

Avoid sharing secrets, full contact messages, or private user information in status updates.

## 6. Post-Rollback

After rollback:

1. Confirm critical routes load.
2. Confirm contact and booking behavior.
3. Confirm robots and sitemap output.
4. Review logs for continuing errors.
5. Open a follow-up fix branch.
6. Document root cause before reattempting release.
