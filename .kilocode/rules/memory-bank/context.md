# Active Context: WildWorld Animal Database

## Current State

**App Status**: ✅ WildWorld Animal Database — fully built with community submissions and moderation

The app is a comprehensive animal database with a green theme, featuring 50+ animal species with images, YouTube videos, descriptions, fun facts, and interactive OpenStreetMap habitat maps. Users can submit new animals via "+Add Record", and moderators can approve or reject submissions.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript configuration with strict mode
- [x] Tailwind CSS 4 integration
- [x] ESLint configuration
- [x] Memory bank documentation
- [x] Recipe system for common features
- [x] **WildWorld Animal Database** — full app built with:
  - 12 animal species (mammals, birds, fish, reptiles, amphibians)
  - Green colour theme throughout
  - Hero section with stats
  - Search and category filter
  - Animal cards with images and conservation status badges
  - Individual animal detail pages with image, description, fun facts, YouTube video, and OpenStreetMap habitat map
  - Sticky quick-facts sidebar
  - Related animals section
  - Responsive navbar and footer
- [x] **New categories added**: "Extinct Animal" (brown theme) and "Insects" (blue theme) with 6 new animals
- [x] **UI polish pass**: Removed emojis, Times New Roman scoped to About section, HeroSlideshow
- [x] **Expanded animal database**: 50+ animals across all 7 categories (Mammal, Bird, Fish, Reptile, Amphibian, Extinct Animal, Insect)
- [x] **Community submissions system**:
  - SQLite database via Drizzle ORM (`submitted_animals` table)
  - "+Add Record" button opens a modal form for submitting new animals
  - Submissions go to "pending" status and are hidden from "All" category
  - API routes: `/api/animals/submit`, `/api/animals/pending`, `/api/animals/approved`, `/api/animals/moderate`
- [x] **Moderator role system**:
  - Password-based moderator login (localStorage-based, no auth library)
  - Moderator dashboard at `/moderator` — approve or reject pending submissions
  - "Pending" category tab visible only to moderators
  - Approved community animals shown with "Community" badge
  - Pending animals shown with "Pending" badge (moderator view only)
  - Moderator link in Navbar

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page with hero, categories, animal grid | ✅ Ready |
| `src/app/layout.tsx` | Root layout with Navbar + Footer | ✅ Ready |
| `src/app/globals.css` | Global styles + scrollbar | ✅ Ready |
| `src/app/animals/[id]/page.tsx` | Individual animal detail page | ✅ Ready |
| `src/app/moderator/page.tsx` | Moderator dashboard (password-protected) | ✅ Ready |
| `src/app/api/animals/submit/route.ts` | POST: submit new animal | ✅ Ready |
| `src/app/api/animals/pending/route.ts` | GET: fetch pending animals | ✅ Ready |
| `src/app/api/animals/approved/route.ts` | GET: fetch approved community animals | ✅ Ready |
| `src/app/api/animals/moderate/route.ts` | POST: approve or reject animal | ✅ Ready |
| `src/components/Navbar.tsx` | Green sticky navigation bar | ✅ Ready |
| `src/components/Footer.tsx` | Footer with conservation info | ✅ Ready |
| `src/components/AnimalCard.tsx` | Animal card for grid | ✅ Ready |
| `src/components/AnimalSearch.tsx` | Client-side search + filter + add button | ✅ Ready |
| `src/components/AnimalMap.tsx` | OpenStreetMap habitat map | ✅ Ready |
| `src/components/AddAnimalModal.tsx` | Modal form for submitting new animals | ✅ Ready |
| `src/lib/animals.ts` | Animal data (50+ species) | ✅ Ready |
| `src/lib/moderator.ts` | Moderator role helpers (localStorage) | ✅ Ready |
| `src/db/schema.ts` | Drizzle schema for submitted_animals | ✅ Ready |
| `src/db/index.ts` | Database client | ✅ Ready |
| `src/db/migrate.ts` | Migration runner | ✅ Ready |
| `src/db/migrations/` | SQL migration files | ✅ Ready |
| `drizzle.config.ts` | Drizzle Kit configuration | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## Moderator Password

The moderator password is: `wildworld-mod-2024` (defined in `src/lib/moderator.ts`)

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2024 | WildWorld Animal Database built — 12 species, green theme, search, maps, videos |
| 2024 | New categories: Extinct Animal, Insects; 6 new animals; UI polish; HeroSlideshow |
| 2025-02 | Expanded to 50+ animals; community submissions with moderation system |
