<div align="center">

<img src="public/favicon.ico" alt="AUI Blogo Favicon" width="80" />

<h1>
  <br/>
  🚀 AUI | Blogo
  <br/>
</h1>

<h4>A modern, full-stack developer blog platform built with Next.js 14 and Sanity CMS — featuring dark mode, tag-based filtering, a built-in commenting system, auto-generated Table of Contents, SEO metadata, sitemap, and an embedded Sanity Studio.</h4>

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Sanity](https://img.shields.io/badge/Sanity-3-f03e2f?style=for-the-badge&logo=sanity)](https://www.sanity.io/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://aui-blogo.vercel.app/)

<br/>

**[🌐 Live Demo](https://aui-blogo.vercel.app/)** · **[🖊️ Sanity Studio](https://aui-blogo.vercel.app/studio)** · **[🐛 Report a Bug](https://github.com/afaqulislam/aui-blogo/issues)** · **[💡 Request a Feature](https://github.com/afaqulislam/aui-blogo/issues)**

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Data Models (Sanity Schemas)](#-data-models-sanity-schemas)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Sanity Studio](#-sanity-studio)
- [Deployment](#-deployment)
- [Scripts](#-scripts)
- [Contributing](#-contributing)
- [Author](#-author)
- [License](#-license)

---

## 🔭 Overview

**AUI Blogo** is a production-ready, full-stack developer blogging platform. Content is managed headlessly through [Sanity CMS](https://www.sanity.io/), served via [Next.js 14](https://nextjs.org/) App Router with [Incremental Static Regeneration (ISR)](https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration), and styled with [Tailwind CSS](https://tailwindcss.com/).

It provides everything a developer blog needs out of the box: rich-text rendering, tag-based browsing, a reader comment system, dark/light mode theming, automatic Table of Contents per article, per-post dynamic SEO metadata, an XML sitemap, and a `robots.ts` for crawler control — all deployed on Vercel.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📝 **Rich Content** | Full Portable Text rendering (headings, images, lists, code blocks) via `@portabletext/react` |
| 🏷️ **Tag Browsing** | Browse and filter all posts by tag at `/tag/[slug]` |
| 📁 **Categories** | Proper Category content model with listing (`/categories`) and detail (`/category/[slug]`) routes |
| 🔍 **Search** | Real GROQ-powered search at `/search?q=term` with case-insensitive matching on title/excerpt/tags/category |
| 💬 **Comment System** | Readers can leave comments (name, email, text) stored in Sanity. Sortable asc/desc |
| 🌙 **Dark / Light Mode** | 3-state theme switch (light / dark / system) on a single button, powered by `next-themes`; Studio follows the site theme |
| 📚 **Table of Contents** | Auto-generated per post from heading blocks (h2–h6) with anchor links |
| 🔗 **Share / Copy Link** | Share buttons with clipboard copy per article |
| ➡️ **Prev / Next Navigation** | Article-to-article navigation on detail pages |
| 🔀 **Related Articles** | Related posts shown by shared category |
| 🔎 **SEO + JSON-LD** | Dynamic `generateMetadata` per post plus Article structured data (BlogPosting schema) |
| 🗺️ **Sitemap & Robots** | Auto-generated `/sitemap.xml` and `/robots.txt` |
| ⚡ **ISR** | Pages revalidate every 60 seconds for near-real-time content updates without full rebuilds |
| 🖼️ **Optimized Images** | Next.js `<Image>` with Sanity CDN (`cdn.sanity.io`) remote patterns + required alt text |
| 🎨 **Sanity Studio** | Embedded Sanity Studio at `/studio` with Vision (GROQ playground), branded blog logo, custom sidebar structure, and theme that follows the site |
| 📋 **Form Validation** | Comment form uses `react-hook-form` with email pattern and min-length validation |
| ⚠️ **Error / Empty States** | Graceful empty, error, and not-found states across all pages (incl. a dedicated homepage empty state when no posts exist) |

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | `^14.2.24` | App Router, ISR, API Routes, Image Optimization |
| [React](https://react.dev/) | `^19.0.0` | UI rendering |
| [TypeScript](https://www.typescriptlang.org/) | `^5` | Static type safety |
| [Tailwind CSS](https://tailwindcss.com/) | `^3.3.0` | Utility-first styling |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | `^0.5.10` | Prose rich-text styles |
| [next-themes](https://github.com/pacocoursey/next-themes) | `^0.2.1` | Dark / light mode |
| [react-icons](https://react-icons.github.io/react-icons/) | `^5.4.0` | Icon library |

### Content & CMS
| Technology | Version | Purpose |
|---|---|---|
| [Sanity](https://www.sanity.io/) | `^3.75.0` | Headless CMS & content lake |
| [next-sanity](https://github.com/sanity-io/next-sanity) | `^9.8.56` | Sanity ↔ Next.js integration |
| [@portabletext/react](https://github.com/portabletext/react-portabletext) | `^3.0.11` | Portable Text → React renderer |
| [@sanity/image-url](https://github.com/sanity-io/image-url) | `^1.1.0` | Sanity image URL builder |
| [@sanity/vision](https://www.sanity.io/docs/the-vision-plugin) | `^3.75.0` | GROQ query playground in Studio |

### Forms & UI
| Technology | Version | Purpose |
|---|---|---|
| [react-hook-form](https://react-hook-form.com/) | `^7.51.3` | Comment form state & validation |
| [@sanity/ui](https://www.sanity.io/ui) | `^2.13.0` | Sanity Studio UI primitives |
| [styled-components](https://styled-components.com/) | `^6.1.15` | CSS-in-JS (Sanity Studio theming) |

### Typography (Google Fonts)
- **Fira Code** — monospace font for the entire client interface
- **VT323** — retro font used for post publication dates
- **Lilita One** — display font used for the brand/logo and post titles

---

## 📂 Project Structure

```
aui-blogo/
├── app/
│   ├── (admin)/                   # Admin route group
│   │   ├── layout.tsx             # Admin layout: metadata, ThemeProvider, AdminThemeSync
│   │   ├── globals.css            # Admin / Studio base styles
│   │   └── studio/
│   │       └── [[...index]]/      # Embedded Sanity Studio
│   │           ├── page.tsx                   # Studio route entry
│   │           ├── StudioClient.tsx           # Client component mounting Sanity Studio
│   │           ├── StudioErrorBoundary.tsx    # Studio error boundary (auto-reload)
│   │           └── studio-theme.css           # Studio font / color-scheme overrides
│   ├── (client)/                  # Public-facing route group
│   │   ├── layout.tsx             # Root layout: font, metadata, Navbar, Footer, Provider
│   │   ├── page.tsx               # Home: featured + categories + all posts
│   │   ├── globals.css            # Base CSS resets
│   │   ├── posts/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx       # Post detail: rich text, TOC, tags, comments, related
│   │   │   └── not-found.tsx      # Custom 404 for posts
│   │   ├── categories/
│   │   │   └── page.tsx           # All categories with post counts
│   │   ├── category/
│   │   │   └── [slug]/            # Posts filtered by category
│   │   ├── search/
│   │   │   └── page.tsx           # GROQ-powered search (/search?q=)
│   │   └── tag/
│   │       ├── page.tsx           # All tags
│   │       └── [slug]/            # Tag-filtered post listing
│   ├── api/
│   │   └── comment/
│   │       └── route.ts           # POST /api/comment — saves comment to Sanity
│   ├── components/
│   │   ├── AddComment.tsx         # Comment submission form (react-hook-form)
│   │   ├── AllComments.tsx        # Comment listing with sort order
│   │   ├── ArticleGrid.tsx        # Reusable grid of article cards
│   │   ├── CategoryCard.tsx       # Category card with post count
│   │   ├── CmsNavbar.tsx          # Navigation for the admin/CMS area
│   │   ├── EmptyState.tsx         # Reusable empty-state component
│   │   ├── FeaturedPost.tsx       # Featured/latest article hero
│   │   ├── FloatingButtons.tsx    # Scroll-to-top / theme quick actions
│   │   ├── Footer.tsx             # Site footer with links & social icons
│   │   ├── Header.tsx             # Page-level header (title + optional tag list)
│   │   ├── Icons.tsx              # Centralized SVG/react-icons exports
│   │   ├── Navbar.tsx             # Site navigation (logo, links, theme toggle)
│   │   ├── PostComponent.tsx      # Article card (title, date, excerpt, category, tags)
│   │   ├── SearchBar.tsx          # Search input (client component)
│   │   ├── ShareButton.tsx        # Share + copy-link buttons
│   │   ├── ThemeSwitch.tsx        # 3-state light/dark/system toggle button
│   │   └── Toc.tsx                # Auto-generated Table of Contents
│   ├── utils/
│   │   ├── AdminThemeSync.tsx     # Bidirectional Studio ↔ site theme sync
│   │   ├── Provider.tsx           # next-themes ThemeProvider wrapper
│   │   ├── helpers.ts             # Utility: slugify()
│   │   └── interface.tsx          # TypeScript interfaces: Post, Tag, Comment, Category
│   ├── global-error.tsx           # Global error boundary
│   ├── robots.ts                  # Auto-generated robots.txt rules
│   └── sitemap.ts                 # Auto-generated XML sitemap from Sanity
│
├── sanity/
│   ├── env.ts                     # Env var assertions (projectId, dataset, server token)
│   ├── schema.ts                  # Aggregates all schema types (post, tag, comment, category)
│   ├── structure.ts               # Custom Studio structure/sidebar
│   ├── lib/
│   │   ├── client.ts              # Sanity client instance (createClient)
│   │   └── image.ts               # Image URL builder helper
│   ├── schemas/
│   │   ├── post.ts                # Post schema (validated)
│   │   ├── tag.ts                 # Tag schema (name, slug)
│   │   ├── category.ts            # Category schema (name, slug, description)
│   │   └── comment.ts             # Comment schema (name, email, comment, post ref)
│
├── public/                        # Static assets
│   └── favicon.ico
├── screenshots/                   # Week 3 manual evidence pack (PDFs: screenshots, Lighthouse, responsive)
├── .env.example                   # Environment variable template
├── .env.local                     # Local environment variables (git-ignored)
├── next.config.js                 # Next.js config: Sanity CDN image patterns + security headers
├── sanity.config.ts               # Sanity Studio configuration (plugins, schema)
├── sanity.cli.ts                  # Sanity CLI configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── tsconfig.json                  # TypeScript compiler options
└── package.json                   # Project metadata and dependencies
```

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser / Client                      │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTP
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 14 App Router                     │
│                                                              │
│  ┌────────────────────┐   ┌─────────────────────────────┐   │
│  │  (client) Routes   │   │     API Routes              │   │
│  │  /                 │   │  POST /api/comment          │   │
│  │  /posts/[slug]     │   └────────────┬────────────────┘   │
│  │  /tag/[slug]       │                │                     │
│  └────────┬───────────┘                │                     │
│           │  GROQ fetch (ISR 60s)      │ client.create()     │
│           ▼                            ▼                     │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                   Sanity Client                        │  │
│  │     (next-sanity / @sanity/client)                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │         Sanity Content Lake      │
        │  ┌───────┐ ┌─────┐ ┌─────────┐  │
        │  │ Posts │ │ Tags│ │Comments │  │
        │  └───────┘ └─────┘ └─────────┘  │
        └─────────────────────────────────┘
                          │
                          ▼
        ┌─────────────────────────────────┐
        │     Sanity Studio (/studio)      │
        │  Authors manage content here     │
        └─────────────────────────────────┘
```

**Data flow:**
1. **Content creation:** Authors log in to `/studio`, create Posts with Portable Text body, assign Tags, and review Comments.
2. **Data fetching:** Next.js pages use GROQ queries via the Sanity client. Pages are statically rendered with ISR (`revalidate = 60`), meaning they rebuild in the background at most every 60 seconds when requested.
3. **Comment submission:** Readers submit comments via `POST /api/comment` (Next.js Route Handler), which writes directly to Sanity using a write token.

---

## 📊 Data Models (Sanity Schemas)

### `post`
| Field | Type | Description |
|---|---|---|
| `title` | `string` | Post title (10–120 chars, required) |
| `slug` | `slug` | URL-safe identifier (auto-generated, required) |
| `excerpt` | `string` | Short post summary for listings & SEO (max 200, required) |
| `publishedAt` | `datetime` | Publication date (required) |
| `category` | `reference` | Primary Category reference (required) |
| `body` | `array` (Portable Text) | Rich content blocks (text, headings, images with alt) |
| `tags` | `array<reference>` | References to Tag documents |

### `category`
| Field | Type | Description |
|---|---|---|
| `name` | `string` | Display name of the category (required) |
| `slug` | `slug` | URL-safe identifier (required) |
| `description` | `text` | Optional category description (max 300) |

### `tag`
| Field | Type | Description |
|---|---|---|
| `name` | `string` | Display name of the tag |
| `slug` | `slug` | URL-safe identifier |

### `comment`
| Field | Type | Description |
|---|---|---|
| `name` | `string` | Commenter's name |
| `email` | `string` | Commenter's email (not displayed publicly) |
| `comment` | `text` | Comment body |
| `post` | `reference` | Reference to the parent Post document |

---

## 🔌 API Reference

### `POST /api/comment`

Saves a new reader comment to Sanity.

**Request Body (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "comment": "Great article!",
  "postId": "sanity-document-id"
}
```

**Responses:**

| Status | Description |
|---|---|
| `201 Created` | Comment saved successfully |
| `400 Bad Request` | One or more required fields are missing |
| `500 Internal Server Error` | Failed to write to Sanity |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| Node.js | `>= 18.x` | [nodejs.org](https://nodejs.org/) |
| npm | `>= 9.x` (bundled with Node) | — |
| Sanity Account | — | [sanity.io/login](https://www.sanity.io/login) |

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/afaqulislam/aui-blogo.git
cd aui-blogo
```

**2. Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Copy the example environment file and fill in your Sanity credentials:

```bash
cp .env.example .env.local
```

Then open `.env.local` and set the following values:

```env
# ── Sanity Project Configuration ───────────────────────────────────────────────
# Your Sanity Project ID — found at https://sanity.io/manage
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id

# Your Sanity Dataset name (default is "production")
NEXT_PUBLIC_SANITY_DATASET=production

# Sanity API Write Token — create one at https://sanity.io/manage → API → Tokens
# Required for the comment submission API route to write data to Sanity
SANITY_TOKEN=your_api_token

# ── Optional ───────────────────────────────────────────────────────────────────
# Sanity API version (defaults to 2023-12-03 if not set)
# NEXT_PUBLIC_SANITY_API_VERSION=2023-12-03
```

> **⚠️ Important:** The `SANITY_TOKEN` variable is required for the comment submission feature. Without it, readers will not be able to post comments. Create a token with **Editor** permissions in your Sanity dashboard under **Settings → API → Tokens**. Unlike the previous `NEXT_PUBLIC_`-prefixed version, this token is **server-side only** and is never exposed to the browser, keeping your write credentials secure.

### Running Locally

```bash
npm run dev
```

Open the following URLs in your browser:

| URL | Description |
|---|---|
| [http://localhost:3000](http://localhost:3000) | Blog homepage |
| [http://localhost:3000/posts/[slug]](http://localhost:3000) | Individual post page |
| [http://localhost:3000/categories](http://localhost:3000) | All categories |
| [http://localhost:3000/category/[slug]](http://localhost:3000) | Posts filtered by category |
| [http://localhost:3000/search?q=term](http://localhost:3000) | Search results |
| [http://localhost:3000/tag/[slug]](http://localhost:3000) | Posts filtered by tag |
| [http://localhost:3000/studio](http://localhost:3000/studio) | Embedded Sanity Studio |

---

## 🎨 Sanity Studio

The Sanity Studio is embedded directly into the Next.js app at the `/studio` route. It provides:

- **Desk Tool** — Create, edit, and publish Posts, Tags, and Comments
- **Vision Plugin** — Run GROQ queries against your content lake directly in the browser
- **Custom Structure** — Sidebar organized for a blog workflow

To access the Studio in production, navigate to:
```
https://aui-blogo.vercel.app/studio
```

---

## ☁️ Deployment

### Vercel (Recommended)

This project is optimized for deployment on [Vercel](https://vercel.com/), the platform built by the creators of Next.js.

**One-click deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/afaqulislam/aui-blogo)

**Manual deployment steps:**

1. Push your code to a GitHub repository.
2. Import the repository on [vercel.com/new](https://vercel.com/new).
3. Add all three environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_TOKEN`) in the **Environment Variables** section of your Vercel project settings.
4. Click **Deploy**.

### Other Platforms

The app can be deployed on any platform that supports Node.js:

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 📜 Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `npm run dev` | Start the Next.js development server with HMR |
| `build` | `npm run build` | Build the optimized production bundle |
| `start` | `npm run start` | Start the production server (after build) |
| `lint` | `npm run lint` | Run ESLint across all TypeScript/TSX files |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository.
2. Create a **feature branch**: `git checkout -b feature/my-new-feature`
3. **Commit** your changes: `git commit -m 'feat: add some feature'`
4. **Push** to the branch: `git push origin feature/my-new-feature`
5. Open a **Pull Request**.

Please make sure your PR passes `npm run lint` before submitting.

---

## 👤 Author

**Afaq Ul Islam**

[![GitHub](https://img.shields.io/badge/GitHub-afaqulislam-181717?style=flat-square&logo=github)](https://github.com/afaqulislam)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

## 🏆 Changelog

### v0.3.3 — SVG Image Support
- SVG images now upload and render in the blog (featured hero + article body)
- `next.config.js`: `dangerouslyAllowSVG: true` + `contentDispositionType: 'attachment'` (SVG downloads instead of rendering inline) + `contentSecurityPolicy: "script-src 'none'"` (blocks scripts inside SVGs) — XSS-safe SVG support
- New `app/utils/image.ts` helper detects `.svg` URLs so SVGs bypass the Next.js optimizer (`unoptimized`) — SVGs are resolution-independent and must not be resized/converted
- AVIF added to the image optimizer `formats` so raster images are served as AVIF/WebP to supporting browsers
- All raster formats (JPEG/PNG/WebP/GIF) still optimized through next/image unchanged
- **Studio note:** SVG uploads are also gated by a Sanity project-level setting (Management API) — see the Image Formats section

### v0.3.2 — Week 3 Task 2: SEO, Accessibility & Performance Hardening
- Canonical URL (`<link rel="canonical">`) on every route — home, articles, categories, tags, and search
- Full Twitter/X card metadata (`summary_large_image` default + per-article title/description/image)
- Comment form accessibility: real `<label>`→`<input>` associations, inline error text with `aria-invalid`/`aria-describedby`, `noValidate`, `role="status"`/`role="alert"` feedback, decorative emoji hidden from assistive tech
- Keyboard focus improvement: consistent purple `:focus-visible` outline site-wide (public + Studio) — visible keyboard focus without changing mouse behavior
- Image optimization: LCP hero image is now `priority` (auto-preload, fetchpriority high); Portable Text images use intrinsic aspect-ratio containers with `fill` + `sizes` to prevent layout shift
- Small fixes: homepage heading order (h3 section labels → h2) and small purple-500 text bumped to purple-600 in light mode for WCAG AA contrast
- No new dependencies added

### v0.3.1 — Task 1 Submission Polish
- Homepage now shows a friendly empty state when there are zero published posts
- Tag schema validation: `name` (required, 1–40 chars) and `slug` (required) — no more empty Tags in Studio
- Comment form: visible success/error feedback (server messages shown safely with a fallback) and a loading state on the submit button
- Audit fixes only — no features rebuilt, no new dependencies added

### v0.3.0 — Maintenance & Polish
- **Codebase cleanup:** removed the unused `sanity/schemaTypes/` folder, `sanity/lib/live.ts`, the unused `dedupeById` helper, and the unused `@chakra-ui/react` dependency
- **Studio alignment:** wired the custom Sanity Studio sidebar (`sanity/structure.ts`) into `deskTool`, added a branded BlogoStudio logo, and made the Studio follow the site theme (light / dark / system) with full bidirectional sync
- **Theme switch rework:** single-button cycle (light → dark → system) with `enableSystem` in `next-themes`
- **Security hardening:** converted slug-based GROQ queries to parameterized `$slug`/`$tag` params (prevents query injection), whitelisted the `commentsOrder` search param, hardened `POST /api/comment` validation, and added security response headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`)
- **Docs & metadata:** accurate README tree, admin metadata now reads "AUI Blogo Studio", `Toc.tsx` styling typo fixed

### v0.2.0 — Week 3 Task 1: Full-Stack Blog Platform Upgrade
- Added `category` content model with `/categories` and `/category/[slug]` routes
- Added `/search?q=` GROQ-powered search with no-results state
- Strengthened post validation (title min/max, excerpt, body, category, image alt required)
- Added reusable components: ArticleGrid, SearchBar, CategoryCard, FeaturedPost, ShareButton, EmptyState
- Added share/copy-link, prev/next navigation, and related articles on post detail
- Added JSON-LD `BlogPosting` structured data
- Homepage now shows featured/latest + categories + all articles
- Moved Sanity write token to server-side `SANITY_TOKEN` for security
- Added global error boundary and empty/not-found states
- Updated sitemap/robots for new category and search routes

### v0.1.0 — Initial Release
- Next.js 14 App Router setup with TypeScript
- Sanity v3 CMS integration with embedded Studio at `/studio`
- Post listing page with GROQ and ISR (60s revalidation)
- Dynamic post detail pages with Portable Text rendering
- Auto-generated Table of Contents from post headings (h2–h6)
- Tag-based browsing at `/tag/[slug]`
- Reader comment system (submission form + display with sort order)
- `POST /api/comment` Route Handler
- Dark / light mode via `next-themes`
- Dynamic SEO metadata per post with Open Graph support
- Auto-generated `/sitemap.xml` and `/robots.txt`
- Fira Code + VT323 Google Fonts integration
- Deployed on Vercel

</div>

---

<div align="center">

> *"A blog is not just a product — it's a developer's portfolio of thought."*
>
> Built with ❤️ by [Afaq Ul Islam](https://github.com/afaqulislam)

</div>

---

# 📘 Week 3 — Full-Stack Blog Platform

This section documents the Week 3 Task 1 upgrade that evolved the original AUI-Blogo into a production-oriented full-stack blogging platform.

## 🎯 Project Overview

A modern, full-stack developer publication platform for practical articles about software development, AI, web technologies, tools, and engineering. Content is managed headlessly through Sanity CMS, served via Next.js 14 with ISR, and includes categories, search, full admin content management, validation, persistence, and responsive design.

## ✨ Week 3 Features

| Feature | Description |
|---|---|
| 📁 **Categories** | Real `category` content model (name, slug, description) with primary category reference per post |
| 🔍 **Search** | Server-side GROQ search at `/search?q=term` with case-insensitive title/excerpt/tag/category matching |
| 🧭 **Category Routes** | `/categories` listing + `/category/[slug]` detail with post counts |
| 🖥️ **Admin Workflow** | Create, edit, publish, and delete posts/categories/tags via embedded Sanity Studio |
| ✅ **Validation** | Title (10–120 chars), slug (required/unique), excerpt (required, ≤200), body (required), category (required), image alt text (required) |
| 🔗 **Sharing** | Share + copy-link buttons on every article |
| ➡️ **Prev/Next & Related** | Article navigation and related-posts section |
| 📄 **Structured Data** | JSON-LD `BlogPosting` schema for SEO |
| 🛡️ **Security** | Write token moved to server-side `SANITY_TOKEN` (never exposed to browser) |
| 🧰 **Reusable Components** | ArticleGrid, SearchBar, CategoryCard, FeaturedPost, ShareButton, EmptyState |
| 📱 **Responsive** | Fully responsive at 320px → 1440px+ |
| ⚠️ **States** | Graceful empty, error, loading, and 404 states |

## 🗺️ Route Map

| Route | Type | Description |
|---|---|---|
| `/` | Page | Home: featured/latest + category + all articles |
| `/posts/[slug]` | Dynamic | Article detail with TOC, tags, comments, related, share |
| `/categories` | Page | All categories with post counts |
| `/category/[slug]` | Dynamic | Posts filtered by category |
| `/search?q=` | Dynamic | GROQ search results + no-results state |
| `/tag` | Page | All tags |
| `/tag/[slug]` | Dynamic | Posts filtered by tag |
| `/studio` | Page | Embedded Sanity Studio |
| `POST /api/comment` | API | Create a comment |
| `/sitemap.xml` | SEO | Auto-generated sitemap |
| `/robots.txt` | SEO | Crawler rules |

## 🗄️ Data Models

### 🌄 Image Formats

The blog accepts **all common image formats** for featured and article images:

| Format | Upload (Sanity) | Rendered via |
|---|---|---|
| JPEG, PNG, WebP, GIF | ✅ supported | `next/image` optimizer (AVIF/WebP conversion) |
| **SVG** | ✅ supported | `next/image` with `unoptimized` (served as-is, no conversion) |

- Raster images are auto-served in the best format (AVIF → WebP → original) and responsively resized.
- SVGs bypass the optimizer (`unoptimized`) since they are resolution-independent — never resized or scripted (see the XSS-safe config in `next.config.js`).
- **Sanity project setting:** SVG uploads are also gated by Sanity's Management API. If Studio still rejects `.svg` files, enable them at:
  `sanity.io/manage` → project → Settings → Media → enable SVG uploads (or run `npx sanity project enable-svg-uploads`).

### `category` (new)
| Field | Type | Validation |
|---|---|---|
| `name` | `string` | Required, 2–60 chars |
| `slug` | `slug` | Required |
| `description` | `text` | Max 300 chars |

### `post` (updated)
| Field | Type | Validation |
|---|---|---|
| `title` | `string` | Required, 10–120 chars |
| `slug` | `slug` | Required |
| `excerpt` | `text` | Required, max 200 |
| `category` | `reference` | Required |
| `body` | `array` (Portable Text) | Required, images need alt text |
| `tags` | `array<reference>` | Optional |

## 🔒 Admin Workflow

1. Open `/studio` (Sanity Studio).
2. **Create:** Posts → Create new → fill validated fields → Publish.
3. **Edit:** Open any post → modify → Publish updated version.
4. **Delete:** Remove documents directly in Studio.
5. **Verify:** Homepage reflects new/edited content after the 60s ISR window (or live preview).

## 📱 Responsive Design

Tested at 320px, 375px, 425px, 768px, 1024px, 1280px, and 1440px+ — navbar, cards, detail pages, TOC, category pages, search, forms, comments, and footer all render without horizontal overflow.

## 🧪 Testing

Run the following:

```bash
npm run lint      # ESLint — passes with no warnings/errors
npm run build     # Production build — compiles successfully
npx tsc --noEmit  # TypeScript — passes with no errors
```

Manual test checklist covers public pages, admin workflow, persistence, and responsive breakpoints (see `REPORT.md`).

## ☁️ Deployment

Deployed on Vercel. Environment variables (in Vercel project settings):

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_TOKEN        # server-side only
```

## 📸 Screenshots & Evidence

The manual evidence pack lives in `/screenshots/` (Week 3 — captured by the user on the deployed site):

- `screenshots/aui-blogo.pdf` — full-site screenshots (home, article, categories, search, tags)
- `screenshots/aui-blogo-lighthouse.pdf` — Lighthouse audit results (performance / SEO / accessibility)
- `screenshots/aui-blogo-responsive.pdf` — responsive layout check across breakpoints

## 🌐 Live Demo & Repository

- **Live Demo:** https://aui-blogo.vercel.app/
- **Repository:** https://github.com/afaqulislam/AUI-Blogo

---

# 📘 Week 3 — Task 2: SEO, Accessibility & Performance Hardening

This section documents the Week 3 Task 2 pass: 5 targeted improvements (canonical URLs, Twitter/social metadata, comment form accessibility, keyboard focus visibility, and image performance) plus small correctness fixes. No features were rebuilt and no new dependencies were added.

## 🎯 What Changed

| # | Improvement | Details |
|---|---|---|
| 1 | **Canonical URLs** | `<link rel="canonical">` on `/`, `/posts/[slug]`, `/categories`, `/category/[slug]`, `/tag`, `/tag/[slug]`, and `/search` — resolves against `metadataBase` |
| 2 | **Twitter/social metadata** | Default `twitter:card = summary_large_image` site-wide; per-article title/description (and image when the post has one) |
| 3 | **Comment form accessibility** | Labeled inputs, inline errors with `aria-invalid`/`aria-describedby`, `noValidate`, `role="status"`/`role="alert"` feedback, decorative emoji `aria-hidden` |
| 4 | **Keyboard focus visibility** | Global `:focus-visible` purple outline (public + Studio) — keyboard users see focus, mouse users see no change |
| 5 | **Image performance** | Featured (LCP) image `priority`; article body images rendered with intrinsic aspect ratio + `fill` + `sizes` — no layout shift |

## 🧪 Testing

- `npx tsc --noEmit` ✅ passes
- `npm run lint` ✅ passes
- `npm run build` ✅ passes (all 10 routes)
- Rendered-HTML checks on the production server confirmed canonical + `twitter:card` metadata on home and article pages
