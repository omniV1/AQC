# Sprint 1 Functional Slice – Carter Wright

Role Focus: Public marketing site & React foundations – per §"Sprint 1 Developer Focus" (ProjectRequirementsForPdf.md).
Total Capacity: **≈ 63 hrs**

---
## 1  Vite + React TS Boilerplate (6 hrs)
- Scaffold project with `pnpm create vite@latest lunara --template react-ts` under `/Lunara`.  
- Configure path aliases (`@components`, `@pages`, `@styles`).

**DoD**  
`pnpm dev` hot-reloads; ESLint + TypeScript compile clean.

Links: Technology Stack, Deliverable "Basic React application structure with routing".

**Why it matters (plain language)**  
This gets a live React site running in minutes.  Everyone sees something in the browser and can share a link instead of staring at blank folders.

---
## 2  Global Design System & Styling (8 hrs)
- Implement SCSS variable palette (sage, peach, cream) & typography (Inter, Lora).  
- Set up CSS-Modules, autoprefixer, PostCSS.  
- Provide Storybook with `Button`, `Heading`, `Container` tokens.

**DoD**  
Components pass Axe audit; color contrast ≥4.5:1 (WCAG AA).

Links: NFR2 (Mobile Responsiveness), Design Guidelines.

**Why it matters**  
A shared color palette & typography avoid "five shades of green" later.  Storybook is a playground where we preview components before wiring them into pages.

---
## 3  Application Shell & Navigation (10 hrs)
- `Layout` component with `<Header>` (logo, nav links, CTA) & `<Footer>`.  
- Mobile Hamburger using `react-aria` for accessible menu.  
- Skip-to-content link, proper landmark roles.

**DoD**  
Lighthouse Accessibility ≥90; tab order logical; mobile nav toggles at 320 px.

Links: NFR6 (Accessibility), Wireframes section.

**Why it matters**  
The shell (header, footer, nav) appears on every page.  Building it first means later pages only need to fill the middle.

---
## 4  Static Marketing Pages (22 hrs)
Implement content from wireframes:
A) **Home** – hero, service overview, testimonials, CTA. 
B) **About LUNARA** – platform overview.  
C) **About Doula** – doula bios & credentials.  
D) **Provider Services** – services description.  
E) **Contact** – form & office info.

- Use MDX (`vite-plugin-mdx`) for content ease.  
- Responsive grid & 8-px spacing.

**DoD**  
Pixel-perfect to provided mockups across Chrome, Safari, Edge; Largest Contentful Paint <2 s (local).

Links: FR1 acceptance criteria.

**Why it matters**  
These pages satisfy **FR1** completely so stakeholders can start showing the site to test users while we code the app parts.

---
## 5  Routing + SEO Meta (6 hrs)
- React-Router v6 file-based routes.  
- Integrate `react-helmet-async` for meta tags, OpenGraph & Twitter cards.

**DoD**  
Home page Lighthouse SEO ≥90; correct canonical/og tags.

Links: FR1 Marketing requirement.

**Why it matters**  
Correct meta tags make Google show nice previews and keep us from cannibalising our own search ranking.

---
## 6  Contact Form Validation Stub (4 hrs)
- Controlled form with Zod schema; on submit logs JSON (backend endpoint pending Sprint 2).  
- Honeypot field for basic spam defence.

**DoD**  
Required fields inline errors announced via ARIA-live region; form not submittable if invalid.

Links: FR1 alt flow 3a.

**Why it matters**  
Even without backend logic, we can test the UX, catch validation issues, and ensure accessibility.

---
## 7  Cypress Smoke Tests (6 hrs)
- Tests: page nav, mobile menu, contact form validation, each page has `h1`.

**DoD**  
`pnpm cypress run` passes; hooked in CI matrix.

Links: QA Strategy.

**Why it matters**  
End-to-end tests click around the site like a real user; they'll warn us if tomorrow's CSS breaks the menu.

---
## 8  Sprint Review Prep (3 hrs buffer)
- Screenshots for Stakeholder demo.  
- Verify deployed site on Vercel matches DoD.

**Overall Sprint Acceptance (Frontend)**
✓ Public website live over HTTPS (Vercel).  
✓ All static pages responsive & accessible.  
✓ Lighthouse Performance, Accessibility, SEO ≥90.  
✓ Cypress suite green in CI.

---
### Key Terminology
* **Vite** – A fast dev server & build tool for modern web apps. Starts in ~1 second.
* **pnpm** – Package manager that saves disk space by hard-linking dependencies.
* **SCSS** – A superset of CSS that supports variables & nesting.
* **Storybook** – A sandbox UI where we render and test individual components.
* **React Router** – Library that decides which React page to show when the URL changes.
* **MDX** – Markdown + JSX. Lets us write page content in Markdown but embed React components.
* **Lighthouse** – Google's automated site audit tool for performance & accessibility.
* **Cypress** – Testing tool that opens a browser, clicks buttons, and ensures the app behaves. 