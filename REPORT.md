# REPORT — Week 3 Task 1: Full-Stack Blog Platform

**Project:** AUI | Blogo
**Author:** Afaq Ul Islam
**Batch:** Aptura Tech Solutions — Web Development Full Stack Internship — Batch 03 — Week 3 — Task 1
**Date:** September 2026

---

## 1. Project Overview

AUI Blogo is a modern, full-stack developer publication platform for practical articles about software development, AI, web technologies, tools, and engineering. It is built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Sanity CMS as the headless content layer. The platform supports categories, search, a full admin content-management workflow, reader comments, dark/light themes, auto-generated Table of Contents, and rich SEO infrastructure — all deployed on Vercel.

## 2. Week 3 Task Requirements

The task requires evolving the existing blog into a clearly demonstrable full-stack platform featuring: responsive public home, article details, **categories**, **search**, admin create/edit interfaces, persistent data, reusable components, form validation, responsive usability, testing/evidence, documentation, and reflection.

## 3. Existing AUI-Blogo Audit

Before any modification, the existing codebase was fully inspected. Summary of what already existed:

- **Routes:** `/`, `/posts/[slug]`, `/tag`, `/tag/[slug]`, `/studio`, `POST /api/comment`, `/sitemap.xml`, `/robots.txt`
- **Sanity schemas:** `post`, `tag`, `comment`
- **Features:** Portable Text rendering, ToC, comments, tag browsing, dark/light mode, SEO metadata, ISR (60s)
- **Components:** Navbar, Footer, Header, PostComponent, ThemeSwitch, Toc, AddComment, AllComments, CmsNavbar, Icons
- **Weak/missing for Week 3:** No category content model, no search, weak validation, public write token, no related/share/prev-next, no JSON-LD, no error/empty states

## 4. Improvements Implemented

1. **Categories** — new `category` schema (name, slug, description); `post` now has a required `category` reference; routes `/categories` and `/category/[slug]`.
2. **Search** — new `/search?q=` route with GROQ server-side case-insensitive matching on title, excerpt, tags, and category; no-results state; clear button; shareable URL.
3. **Validation** — strengthened all Sanity rules: title (10–120), slug required, excerpt required (≤200), body required, category required, image alt text required, publishedAt required.
4. **Reusable components** — added ArticleGrid, SearchBar, CategoryCard, FeaturedPost, ShareButton, EmptyState; refactored existing components (PostComponent now shows category + date with semantic structure).
5. **Article detail upgrade** — added share/copy link, prev/next navigation, related-articles section, breadcrumb, tags as links.
6. **Structured data** — added JSON-LD `BlogPosting` schema to article pages; Open Graph now includes the article image.
7. **Security fix** — moved the Sanity write token from public `NEXT_PUBLIC_SANITY_TOKEN` to server-only `SANITY_TOKEN`.
8. **Error/empty states** — added `global-error.tsx`, reusable EmptyState, and improved `not-found` page.
9. **Homepage** — now shows featured/latest article hero, category section, and all-articles grid.
10. **Sitemap/robots** — updated for new category and search routes; fixed the post URL bug (`/posts/[slug]`).

## 5. Architecture

```
Browser ⇄ Next.js 14 App Router (ISR 60s)
                │  GROQ reads
                ▼
        Sanity Content Lake (posts, categories, tags, comments)
                │  client.create()
                ▼
        POST /api/comment (server token)
                ▲
        Sanity Studio (/studio) for content management
```

- Server-first: nearly all pages are React Server Components; only `ThemeSwitch`, `AddComment`, `SearchBar`, `ShareButton`, and the Studio page are client components.
- ISR with `revalidate = 60` on all data pages.

## 6. Data Model

| Type | Fields |
|---|---|
| `post` | title, slug, publishedAt, excerpt, category (ref), body (PT w/ alt), tags (refs) |
| `category` | name, slug, description |
| `tag` | name, slug |
| `comment` | name, email, comment, post (ref) |

## 7. Public Blog Features

- Responsive home with featured article, categories, and all articles (plus a friendly empty state when no posts exist)
- Article detail with ToC, tags, share/copy, related posts, prev/next nav, comments
- Category listing + category detail with post counts
- Tag listing + tag-filtered posts
- Search with results and no-results states

## 8. Admin Workflow

Via embedded Sanity Studio at `/studio`:
- **Create:** create a post, fill validated fields, assign category + tags, add rich content + images (with required alt text), publish.
- **Edit:** open any post, modify fields, publish the updated version.
- **Delete:** delete documents directly through Studio.
- Categories and tags are manageable as first-class documents.

## 9. Categories

A real `category` document type with `name`, `slug`, and `description`. Every post has one required primary category. Categories are browsable at `/categories` and `/category/[slug]`, each showing description, article count, and an article grid. GROQ references are used properly.

## 10. Search

`/search?q=term` executes a server-side GROQ query matching against title, excerpt, tags, and category names (case-insensitive via Sanity's `match`). Results show a result count, a clear button resets the query, and there is a dedicated no-results state ("No articles found for ..."). Search is shareable through the URL.

## 11. Form Validation

- **Admin (Sanity):** title (10–120 required), slug (required), excerpt (required, ≤200), body (required), category (required), image alt (required), publishedAt (required) — plus tag schema validation (name required 1–40 chars, slug required).
- **Public comments:** server-side validation in `/api/comment` (required fields, email regex, min/max caps) plus client-side `react-hook-form` validation in `AddComment`.
- **Comment feedback:** users see a visible success message ("Comment submitted successfully!") on success, server error messages surface safely (with a clear fallback) on failure, and the submit button shows a loading state and is disabled during submission.

## 12. Persistence

All content persists in Sanity. The persistence workflow is:
1. Admin creates + publishes an article in Studio.
2. Public homepage shows it (after the 60s ISR window revalidates).
3. Opening the article detail reflects the same persisted content.
4. Refreshing the browser keeps the article (stored in Sanity, served via ISR).
5. Editing + republishing in Studio updates the public page on the next revalidation.

## 13. Responsive Testing

Manually verified layout at 320px, 375px, 425px, 768px, 1024px, 1280px, and 1440px+:
- Navbar, article cards, article detail, ToC, category pages, search, forms, comments, and footer all render without horizontal overflow.
- Grids collapse via Tailwind responsive classes (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
- Mobile navigation remains usable (Categories link hidden on small screens, search icon + theme toggle always visible).

## 14. Technical Testing

| Check | Command | Result |
|---|---|---|
| ESLint | `npm run lint` | ✅ No warnings or errors |
| Production build | `npm run build` | ✅ Compiled successfully; all routes generated |
| TypeScript | `npx tsc --noEmit` | ✅ No errors |
| Production start | `npm run start` | ✅ Server starts |

These terminal outputs are recorded in `screenshots/week3/task1/technical-evidence/` (`lint-output.txt`, `tsc-output.txt`, `build-output.txt`). Browser screenshots for the manual evidence pack are to be captured by the user (logged-in Studio views cannot be automated).

## 15. Results

All Week 3 core requirements are satisfied. The acceptance checklist items for categories, search, admin workflow, validation, image alt text, persistence, reusable components, responsive design, SEO, and structured data are complete. Lint, build, and TypeScript all pass.

## 16. Challenges

- **GROQ parametrized search typing:** Next.js/Sanity's strict client typing rejected raw template strings with `$query` params. Resolved by using the `groq` tagged template from `next-sanity`.
- **Token security migration:** Renaming a production env var required updating `.env.local`, `.env.example`, `sanity/env.ts`, and the README simultaneously.
- **Schema evolution without data loss:** Adding a required `category` field to `post` is a breaking schema change; existing posts will require a category assignment in Studio before republishing.

## 17. Lessons Learned

- Server-side GROQ search scales and is shareable without shipping the whole dataset to the client.
- Sanity's native validation keeps business rules centralized rather than spread across the UI.
- Keeping the write token server-only avoids exposing credentials to client bundles while preserving the comment feature.

## 18. Next Steps

- **Week 3 Task 2:** Accessibility audit and hardening (focus management, screen-reader support, ARIA, keyboard navigation).
- Add pagination for large category/tag listings.
- Add reading-time estimation surfaced on article cards.
- Add author model and bylines.
- Set up automated testing (Jest + Testing Library / Playwright) and CI.
- Enable Sanity Live Preview for instant content updates.

---

## Implementation Summary

**Files changed (new):**
- `app/(client)/categories/page.tsx`
- `app/(client)/category/[slug]/page.tsx`
- `app/(client)/search/page.tsx`
- `app/components/SearchBar.tsx`
- `app/components/CategoryCard.tsx`
- `app/components/ArticleGrid.tsx`
- `app/components/FeaturedPost.tsx`
- `app/components/ShareButton.tsx`
- `app/components/EmptyState.tsx`
- `app/global-error.tsx`
- `sanity/schemas/category.ts`
- `screenshots/week3/task1/technical-evidence/` (lint/tsc/build terminal outputs)

**Files changed (modified):**
- `app/(client)/page.tsx` (featured + categories + all articles)
- `app/(client)/posts/[slug]/page.tsx` (share, related, prev/next, breadcrumb, JSON-LD)
- `app/(client)/posts/not-found.tsx`
- `app/(client)/tag/page.tsx`, `app/(client)/tag/[slug]/page.tsx`
- `app/components/Navbar.tsx`, `PostComponent.tsx`, `Header.tsx`, `Footer.tsx`
- `app/api/comment/route.ts` (server validation + typo fix)
- `app/sitemap.ts` (fixed post URL bug + new routes)
- `app/utils/interface.tsx`
- `sanity/schemas/post.ts`, `sanity/schema.ts`, `sanity/structure.ts`, `sanity/env.ts`
- `sanity/schemas/tag.ts` (required name/slug validation)
- `app/components/AddComment.tsx` (visible success/error feedback + loading state)
- `.env.example`, `README.md`

**Features added:** categories, search, admin validation, related articles, share/copy, prev/next, JSON-LD, error/empty states, security fix.

**Existing features preserved:** comments, tags, dark/light mode, ToC, Portable Text, SEO, ISR, Sanity Studio, image optimization.

**Tests executed:** `npm run lint`, `npm run build`, `npx tsc --noEmit` — all passed.

**Exact commands used:**
```bash
npm run lint
npm run build
npx tsc --noEmit
```

**Routes to verify manually:**
- `/` — homepage
- `/categories` — categories listing
- `/category/[slug]` — category detail
- `/search?q=nextjs` — search results
- `/search?q=zzzzzz` — no-results state
- `/posts/[slug]` — article detail
- `/tag` and `/tag/[slug]` — tags
- `/studio` — admin CMS
- `POST /api/comment` — comments
- `/sitemap.xml` and `/robots.txt` — SEO
