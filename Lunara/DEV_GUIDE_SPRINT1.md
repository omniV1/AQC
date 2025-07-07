# LUNARA – Frontend Developer Guide (Sprint 1)

**Audience:** **Carter** – Frontend Lead

> This guide was auto-generated to help you prioritise Sprint-1 deliverables.  Feel free to edit liberally.

---

## 🌐 Pages

| Route | File | Status | TODO |
|-------|------|--------|------|
| `/about` | `src/pages/AboutPage.tsx` | PARTIAL | Fill in copy, images, SEO meta |
| `/services` | `src/pages/ServicesPage.tsx` | **NEW** | List core offerings, link to scheduling CTA |
| `/contact` | `src/pages/ContactPage.tsx` | PARTIAL | Add form validation with **react-hook-form + zod**, POST to `/public/contact` |
| `/faq` | `src/pages/FAQPage.tsx` | **NEW** | Accordion component, top 10 questions |

---

## 🔐 Authentication

- Implement AuthService (`src/services/authService.ts`) – see placeholder file.
- Wire `AuthContext` to call backend endpoints.
- Persist JWT in localStorage; refresh automatically.

---

## 💅 UI / Design System

- Use Tailwind & custom classes under `src/styles/`.
- Follow 8-px grid & colour palette (#8FBC8F sage, #2F4F4F charcoal etc.).
- Provide responsive breakpoints: `sm / md / lg / xl`.

---

## 📝 Checklists

### Auth Flow
- [ ] Register (client / provider)
- [ ] Login & protected routes
- [ ] Logout clears token

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