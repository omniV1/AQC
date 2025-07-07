# LUNARA – Backend Developer Guide (Sprint 1)

**Audience:**
- **Andrew** – DevOps Lead
- **Owen** – Backend Lead

> This file is auto-generated scaffolding.  Replace the _TODO_ blocks with real documentation and checklists as work progresses.

---

## 📦 Project Structure Quick-Ref

```
backend/
  ├─ src/                # All TypeScript source code
  ├─ tests/              # Jest tests
  ├─ Dockerfile          # Production image (to-be-created)
  └─ ...
```

---

## 🛠️  Tasks for **Andrew** (DevOps)

| Task | File / Path | Status |
|------|-------------|--------|
| CI pipeline | `.github/workflows/backend-ci.yml` | **TODO** – created, needs real steps |
| Dockerfile (production) | `backend/Dockerfile` | **TODO** – copy from `Dockerfile.example`, tweak for Node runtime |
| Environment variables | `env.example` / `.env` | **REVIEW** – ensure required keys for JWT, DB, SMTP |
| Code Quality | ESLint/Prettier config | **VERIFIED** – may need stricter rules |

> **NEXT STEP:** Flesh out CI workflow following the inline comments inside the YAML file.

---

## 🧑‍💻  Tasks for **Owen** (Backend)

| Epic | File / Path | Definition of Done |
|------|-------------|--------------------|
| CRUD – Appointments | `src/routes/appointments.ts` | Replace 501 response with full controller + validation, unit tests, Swagger docs |
| CRUD – Messages | `src/routes/messages.ts` | Same as above |
| CRUD – Resources | `src/routes/resources.ts` | Provide at least 3 static JSON resources for FE |
| Swagger Docs | `npm run swagger-gen` pipeline | All new endpoints documented |
| Integration Tests | `tests/integration/*.test.ts` | Happy-path tests for auth & appointments |

### Suggested Implementation Flow (Owen)
1. Design Mongoose schemas if needed (e.g., `Appointment`, `Message`).  Create in `src/models/`.
2. Build route controllers using `asyncHandler` utility for clean error handling.
3. Add validation via `express-validator`.
4. Update Swagger JSDoc comments above each endpoint.
5. Write Supertest integration tests.
6. Commit & push – CI should pass.

---

## 📑 Checklists

### CI Pipeline Smoke Test
- [ ] Node matrix installs & caches dependencies
- [ ] Tests pass on PR
- [ ] ESLint runs & reports

### Endpoint Readiness
- [ ] `GET /api/appointments` returns array
- [ ] `POST /api/appointments` creates document

> Mark each checkbox in PR descriptions as you complete them. 