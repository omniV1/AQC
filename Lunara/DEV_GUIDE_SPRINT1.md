# LUNARA – Frontend Developer Guide (Sprint 1)

**Audience:** **Carter** – Frontend Lead

> This guide was auto-generated to help you prioritise Sprint-1 deliverables.  Feel free to edit liberally.

---

## 🌐 Pages

| Route | File | Status | TODO |
|-------|------|--------|------|
| `/about` | `src/pages/AboutPage.tsx` | WIP | Finalise copy & imagery, add SEO meta tags, responsive layout |
| `/services` | `src/pages/ServicesPage.tsx` | WIP | Implement service cards & descriptions, CTA to scheduling, add illustrations |
| `/contact` | `src/pages/ContactPage.tsx` | WIP | Build form (react-hook-form + zod), POST to `/public/contact`, success toast |
| `/faq` | `src/pages/FAQPage.tsx` | WIP | Accordion with top 10 Q&A (`<details>` fallback) |

---

## ✅ Authentication

- ✅ AuthService implemented (`src/services/authService.ts`)
- ✅ `AuthContext` connected to backend endpoints
- ✅ JWT persisted in localStorage with automatic refresh flow

---

## 💅 UI / Design System

- Use Tailwind & custom classes under `src/styles/`.
- Follow 8-px grid & colour palette (#8FBC8F sage, #2F4F4F charcoal etc.).
- Provide responsive breakpoints: `sm / md / lg / xl`.
- Align UI with Figma MCP mock-ups (spacing, colours, typography) – [Figma: Lunara Designs](https://www.figma.com/design/cdtATWBpZPGhK4Zz7jL0PS/Lunara?node-id=0-1&p=f&t=4Sbp1vyAcOPuGefN-0)
- Use the **Figma MCP (Master Component Pages)** as the canonical reference for page section hierarchy & layout; replicate its structure when building React components (see link above)

---

## 📝 Checklists

### Auth Flow
- [x] Register (client / provider)
- [x] Login & protected routes
- [x] Logout clears token

### Pages
- [ ] Basic SEO meta using `react-helmet` or Vite plugin
- [ ] Lighthouse score > 85 mobile

Add more items as you discover them!

## 📖 API Documentation (Swagger UI)

To explore backend endpoints locally:

1. In a separate terminal window start the backend in development mode:

   ```bash
   cd backend
   npm run dev
   ```

2. Open your browser at:

   ```
   http://localhost:5000/api-docs/#/
   ```

   This brings up the interactive Swagger UI containing **all backend ("Spring AI") endpoints**. Click **Try it out** to execute requests and inspect live responses.

> Note: If you customise the backend `PORT` or `API_URL` in your `.env`, update the URL above accordingly.

## 🚧 Remaining Sprint-1 Goals (from Sprint1_TODO_Breakdown.md)

- [ ] **Finish About page** 
- [ ] **Finish Services page** 
- [ ] **Finish Contact page** – add RHF + zod validation, POST to `/public/contact`, success toast.
- [ ] **Build FAQ page** – accordion component with top 10 questions, semantic markup (`<details>` fallback).
- [ ] **Align UI with Figma mock-ups** – spacing (8 px grid), colour variables, typography scale.

These items are the only Sprint-1 tasks still unchecked for the Frontend column. Once all are ticked we can mark **Frontend Development 100 %** in `Sprint1_TODO_Breakdown.md`. 