# Sprint 1 Functional Slice – Andrew Mack

Role Focus: DevOps & Infrastructure – CI/CD, deployment, monitoring, and initial database provisioning (§"Sprint 1 Developer Focus").
Total Capacity: **≈ 63 hrs**

---
## 1  Repository Governance (6 hrs)
- Enable GitHub branch protections (status checks, PR review, signed commits).  
- Add `CODEOWNERS` (Owen → `/backend/**`, Carter → `/Lunara/**`, Andrew → infra files).  
- Configure Renovate bot for dependency updates.

**DoD**  
Direct pushes to `main` blocked; Renovate PR opens and passes CI.

Links: DevOps Workflow & Risk Management (scope-creep control).

**Why it matters (plain language)**  
Sets ground rules so nobody accidentally breaks `main` and every change is reviewed & tested.

---
## 2  CI Pipeline – GitHub Actions (12 hrs)
- Matrix (node 18 & 20).  
- Jobs: install deps (`pnpm` caching), lint, type-check, unit tests, Cypress e2e, build artefacts.  
- Upload Jest & Cypress coverage to Codecov.

**DoD**  
Average runtime <6 min; all status checks required for merge.

Links: QA Strategy & Deployment Strategy.

**Why it matters**  
A robot runs our tests on every push so we catch problems within minutes rather than demo day.

---
## 3  Containerisation & Local Dev DX (8 hrs)
- Multi-stage Dockerfile for backend (builder → node:alpine runtime).  
- Dockerfile for frontend static build (nginx).  
- `docker-compose.yml` with services: `mongodb`, `api`, `web`.  
- VSCode `devcontainer.json`.

**DoD**  
`docker compose up` serves full stack at `http://localhost:3000`.

Links: NFR3 (Reliability), Scalability.

**Why it matters**  
"Works on my machine" disappears – the same Docker images run on laptops and in the cloud.

---
## 4  Deployment – Render & Vercel (12 hrs)
- Render: create "lunara-api" service; health check `/api/health`; env secrets from Owen's `.env.example`.  
- Vercel: import repo, set `NEXT_PUBLIC_API_URL` env var.  
- Configure PR-preview deployments for both.  
- Slack webhook notifications.

**DoD**  
Merge to `main` triggers blue-green deploy; Slack shows URLs within 5 min.

Links: Deployment Strategy §.

**Why it matters**  
Automatic deploys mean a merged PR is live in minutes with no late-night FTP sessions.

---
## 5  MongoDB Atlas Provisioning (6 hrs)
- Free-tier cluster `LUNARA-DEV`.  
- Network access: Render IP + local ranges.  
- Users: `appUser` (readWrite) & `backupUser` (backupAdmin).  
- TLS enforced.

**DoD**  
Connection string stored in Render secret; Owen's server connects successfully (health endpoint 200).

Links: Database Schema Design, NFR7 (Backup).

**Why it matters**  
No database = no app.  Provision early to surface network issues and let Owen wire APIs immediately.

---
## 6  Daily Backup & Retention Policy (5 hrs)
- Enable daily snapshots; retain 30 days.  
- Document restore procedure in `/Docs/DevOps/backup.md`.

**DoD**  
First snapshot visible; restore test to new cluster succeeds.

Links: NFR7 (Data Backup).

**Why it matters**  
Backups are insurance.  If someone drops the production database, we can restore quickly.

---
## 7  Basic Monitoring & Alerting (6 hrs)
- UptimeRobot heartbeats for frontend & backend to #devops Slack channel.  
- MongoDB Atlas alerts: CPU >80%, disk >70%.  
- Render incident webhook to Slack.

**DoD**  
Test alert received & acknowledged.

Links: NFR3 (System Reliability), Monitoring.

**Why it matters**  
We need to know the site is down before our users tell us on social media.

---
## 8  Schema Migration Tooling (6 hrs)
- Add `migrate-mongo`; initial migration: create `users` email unique index.  
- CI step: "apply migrations" before tests.

**DoD**  
Running migration twice idempotent; index verified in Atlas.

Links: Database Schema Design.

**Why it matters**  
A structured migration tool prevents conflicting manual changes when multiple developers touch the database.

---
## 9  Sprint Review Support (3 hrs buffer)
- Produce infra diagram update & demo Render/Vercel dash.  
- Ensure logs accessible for demo.

**Overall Sprint Acceptance (Infrastructure)**
✓ CI green on every PR; coverage uploaded.  
✓ Automatic deploys to staging (Vercel + Render) with health checks.  
✓ Atlas cluster running, backed-up, monitored.

---
### Key Terminology
* **CI/CD** – Continuous Integration / Continuous Deployment: automated tests + auto-deploy.
* **GitHub Actions** – GitHub's platform for running CI workflows.
* **Docker / Docker-compose** – Packages code and its environment into portable containers.
* **Blue-green deploy** – Old version (blue) stays live while new version (green) spins up; traffic switches only if healthy.
* **UptimeRobot** – Free service that pings your site and alerts on downtime.
* **Atlas snapshot** – Automatic backup of MongoDB Atlas cluster.
* **Migration** – Script that evolves database schema in a repeatable way (e.g., adding an index). 