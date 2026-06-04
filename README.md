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
| 💬 **Comment System** | Readers can leave comments (name, email, text) stored in Sanity. Sortable asc/desc |
| 🌙 **Dark / Light Mode** | System-aware theme toggle powered by `next-themes` |
| 📚 **Table of Contents** | Auto-generated per post from heading blocks (h2–h6) with anchor links |
| 🔎 **SEO** | Dynamic `generateMetadata` per post (title, description, Open Graph) |
| 🗺️ **Sitemap & Robots** | Auto-generated `/sitemap.xml` and `/robots.txt` |
| ⚡ **ISR** | Pages revalidate every 60 seconds for near-real-time content updates without full rebuilds |
| 🖼️ **Optimized Images** | Next.js `<Image>` with Sanity CDN (`cdn.sanity.io`) remote patterns |
| 🎨 **Sanity Studio** | Embedded Sanity Studio at `/studio` with Vision (GROQ playground) |
| 📋 **Form Validation** | Comment form uses `react-hook-form` with email pattern and min-length validation |

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
| [@chakra-ui/react](https://chakra-ui.com/) | `^3.8.0` | UI components |
| [@sanity/ui](https://www.sanity.io/ui) | `^2.13.0` | Sanity Studio UI primitives |
| [styled-components](https://styled-components.com/) | `^6.1.15` | CSS-in-JS (Sanity Studio theming) |

### Typography (Google Fonts)
- **Fira Code** — monospace font for the entire client interface
- **VT323** — retro font used for post publication dates

---

## 📂 Project Structure

```
aui-blogo/
├── app/
│   ├── (admin)/                   # Admin route group
│   ├── (client)/                  # Public-facing route group
│   │   ├── layout.tsx             # Root layout: font, metadata, Navbar, Footer, Provider
│   │   ├── page.tsx               # Home: lists all posts via GROQ
│   │   ├── globals.css            # Base CSS resets
│   │   ├── posts/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx       # Individual post: rich text, TOC, tags, comments
│   │   │   └── not-found.tsx      # Custom 404 for posts
│   │   └── tag/
│   │       └── [slug]/            # Tag-filtered post listing
│   ├── api/
│   │   └── comment/
│   │       └── route.ts           # POST /api/comment — saves comment to Sanity
│   ├── components/
│   │   ├── AddComment.tsx         # Comment submission form (react-hook-form)
│   │   ├── AllComments.tsx        # Comment listing with sort order
│   │   ├── CmsNavbar.tsx          # Navigation for the admin/CMS area
│   │   ├── Footer.tsx             # Site footer with links & social icons
│   │   ├── Header.tsx             # Page-level header (title + optional tag list)
│   │   ├── Icons.tsx              # Centralized SVG/react-icons exports
│   │   ├── Navbar.tsx             # Site navigation (logo, links, theme toggle)
│   │   ├── PostComponent.tsx      # Post card (title, date, excerpt, tags)
│   │   ├── ThemeSwitch.tsx        # Dark/light mode toggle button
│   │   └── Toc.tsx                # Auto-generated Table of Contents
│   ├── utils/
│   │   ├── Provider.tsx           # next-themes ThemeProvider wrapper
│   │   ├── helpers.ts             # Utility: slugify()
│   │   └── interface.tsx          # TypeScript interfaces: Post, Tag, Comment
│   ├── robots.ts                  # Auto-generated robots.txt rules
│   └── sitemap.ts                 # Auto-generated XML sitemap from Sanity posts
│
├── sanity/
│   ├── env.ts                     # Env var assertions (projectId, dataset, token)
│   ├── schema.ts                  # Aggregates all schema types
│   ├── structure.ts               # Custom Studio structure/sidebar
│   ├── lib/
│   │   ├── client.ts              # Sanity client instance (createClient)
│   │   ├── image.ts               # Image URL builder helper
│   │   └── live.ts                # Live content utilities
│   ├── schemas/
│   │   ├── post.ts                # Post schema (title, slug, excerpt, body, tags)
│   │   ├── tag.ts                 # Tag schema (name, slug)
│   │   └── comment.ts             # Comment schema (name, email, comment, post ref)
│   └── schemaTypes/               # Additional schema type definitions
│
├── public/                        # Static assets
│   └── favicon.ico
├── .env.example                   # Environment variable template
├── .env.local                     # Local environment variables (git-ignored)
├── next.config.js                 # Next.js config: Sanity CDN image remote patterns
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
| `title` | `string` | Post title |
| `slug` | `slug` | URL-safe identifier (auto-generated) |
| `excerpt` | `string` | Short post summary for listings & SEO |
| `publishedAt` | `datetime` | Publication date |
| `body` | `array` (Portable Text) | Rich content blocks (text, headings, images) |
| `tags` | `array<reference>` | References to Tag documents |

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
NEXT_PUBLIC_SANITY_TOKEN=your_api_token

# ── Optional ───────────────────────────────────────────────────────────────────
# Sanity API version (defaults to 2023-12-03 if not set)
# NEXT_PUBLIC_SANITY_API_VERSION=2023-12-03
```

> **⚠️ Important:** The `NEXT_PUBLIC_SANITY_TOKEN` variable is required for the comment submission feature. Without it, readers will not be able to post comments. Create a token with **Editor** permissions in your Sanity dashboard under **Settings → API → Tokens**.

### Running Locally

```bash
npm run dev
```

Open the following URLs in your browser:

| URL | Description |
|---|---|
| [http://localhost:3000](http://localhost:3000) | Blog homepage (all posts) |
| [http://localhost:3000/posts/[slug]](http://localhost:3000) | Individual post page |
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
3. Add all three environment variables (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SANITY_TOKEN`) in the **Environment Variables** section of your Vercel project settings.
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
