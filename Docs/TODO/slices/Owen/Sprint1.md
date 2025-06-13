# Sprint 1 Functional Slice – Owen Lindsey

Role Focus: Backend foundation – project scaffolding, architecture decisions, core Express API, initial Mongo integration, and basic auth scaffold (per §"Sprint 1 Developer Focus" in ProjectRequirementsForPdf.md).
Total Capacity: **≈ 63 hrs** (3 wks × 21 hrs)

---
## 1  Monorepo & Dev Environment Setup (8 hrs)
**Goal** Establish repository structure & tooling so all devs can clone, install, and run with one command.

**Why it matters (plain language)**  
A clean starting point prevents "it works on my machine" problems.  Anyone on the team (or your instructor) can grab the code, install once, and run the project without mystery steps.

**Steps**
1. Make top-level folders that match our architecture diagram.  
2. Add the package-manager (**pnpm**) workspace file so frontend & backend share dependencies efficiently.  
3. Auto-format & lint on every commit so code stays consistent.  
4. Provide editor defaults (`.editorconfig`) so VS Code and WebStorm show the same tab size, line endings, etc.

**Definition of Done (DoD)**
1. `pnpm install && pnpm -r lint` runs clean on fresh clone.  
2. Initial CI passes (lint + type-check).  
3. Directory layout matches §"Technology Stack → Component Details".

Links: FR1-FR3 enabling; NFR3 (System Reliability).

---
## 2  Config & Secrets Service (6 hrs)
Centralise runtime configuration to satisfy security & scalability notes.
- `.env.example` with placeholders: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CORS_ORIGINS`.  
- Type-safe loader (`zod`) exporting strongly typed `Config` object.

**Why it matters**  
All sensitive info (database passwords, secret keys) must be outside the code.  This task builds a single, safe place to read those values so we never hard-code secrets.

**DoD**  
`npm run validate-env` exits 0 when env valid, non-0 otherwise; consumed by Express entry point.

Links: NFR1 (Security), DevOps section.

---
## 3  Express.js Skeleton & Health Probe (10 hrs)
Provide the "walking skeleton" required under Sprint 1 Deliverables.
- Spin up **Express 4** app with middlewares: `helmet`, `compression`, `cors`, `morgan`, `express-async-errors`.  
- Route `GET /api/health` → `{ status:'ok', uptime }`.  
- Log format aligned with Monitoring §.

**Why it matters**  
This is the smallest slice of a working API.  With it, we can deploy something that says "I'm alive" and hook it into monitoring and CI.  Everything else will be layered on top.

**DoD**  
Local benchmark ≥100 req/s (`autocannon`), unit tests at 100 % for route.

Links: Deliverable "Express.js server with MongoDB connection".

---
## 4  MongoDB Atlas Connection & Base Models (8 hrs)
- Create free-tier cluster (coord. w/ Andrew for credentials).  
- Connection pool via `mongoose.connect`.  
- Base plugin adds `createdAt/updatedAt` timestamps.  
- Empty `User` schema: `{ email, password, role }` with unique email index.

**Why it matters**  
Connecting early uncovers network/firewall issues before we have complex features.  A tiny `User` model lets Carter start wiring signup screens next sprint.

**DoD**  
`npm test` spins up in-memory mongo & passes; Atlas cluster shows 1 connection min.

Links: Database Schema Design (§"Users Collection").

---
## 5  Authentication Scaffold (Routes + JWT util) (10 hrs)
Matches Deliverable "Basic authentication scaffolding".
- Validators (Zod) for register/login payloads.  
- `POST /api/auth/register` & `/login` return 501 placeholder but validate input & sign dummy JWT.

**Why it matters**  
Even a placeholder endpoint gives the frontend a stable contract to integrate against and lets us set up validation, error handling, and testing patterns now.

**DoD**  
• 422 on invalid input; 200 on happy path with `{token}`.  
• Carter can hit endpoint from web forms in Sprint 2.

Links: FR2 (Secure User Authentication).

---
## 6  Test Harness & Coverage Gate (6 hrs)
- Jest + Supertest; ts-jest.  
- Global setup/teardown start/stop in-memory mongo.  
- `npm run coverage` threshold 80 % lines.

**Why it matters**  
Automated tests protect us from breaking the server when we add features.  The coverage gate forces us to write enough tests before merging.

**DoD**  
Coverage gate blocks PR merge; sample tests for health & auth endpoints pass.

Links: QA Strategy §.

---
## 7  OpenAPI / Swagger Seed (4 hrs)
- Generate swagger spec via `express-openapi-validator`.  
- Serve at `/api/docs` (basic-auth protected).

**Why it matters**  
Interactive docs mean future team-mates (or integrators) can try endpoints in the browser without reading code.

**DoD**  
Swagger UI reachable on Render staging; lists health & auth schemas.

Links: Integration Capability (NFR8).

---
## 8  Sprint Demo & Knowledge Transfer (3 hrs buffer)
- Prepare Postman collection & README snippets.  
- Walk-through with Carter & Andrew.

**Overall Sprint Acceptance (Back-End)**
✓ Express server deployed on Render, reachable over HTTPS.  
✓ Connected to Atlas; health endpoint 200.  
✓ Lint, tests, coverage, and swagger all green in CI.

---
### Key Terminology (quick glossary)
* **pnpm** – A faster, disk-efficient alternative to npm/yarn.
* **Monorepo / workspace** – One repository that holds multiple projects (backend + frontend) but shares dependencies.
* **ESLint / Prettier** – Tools that automatically find style or syntax errors and format code.
* **CI (Continuous Integration)** – A robot on GitHub that runs tests & linters every time we push code.
* **Express.js** – A lightweight Node.js framework for building APIs.
* **Middleware** – Plug-ins that run on every request (security headers, logging, etc.).
* **Health probe** – A simple URL that returns OK so monitoring tools know the server is up.
* **MongoDB Atlas** – Cloud-hosted MongoDB database service.
* **Mongoose** – Library that maps JavaScript objects to MongoDB documents.
* **JWT** – A digitally signed token proving who the user is.
* **Coverage** – % of code lines executed by tests.  Higher coverage = fewer untested bugs.
* **Swagger / OpenAPI** – A standard way to describe REST APIs and auto-generate docs. 