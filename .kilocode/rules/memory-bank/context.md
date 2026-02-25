# Active Context: WildWorld Animal Database

## Current State

**App Status**: ✅ WildWorld Animal Database — fully built with user authentication and admin moderator management

The app is a comprehensive animal database with a green theme, featuring 50+ animal species with images, YouTube videos, descriptions, fun facts, and interactive OpenStreetMap habitat maps. Users can submit new animals via "+Add Record", and moderators can approve or reject submissions. Now includes full user authentication system.

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
- [x] **Moderator role system** (old):
  - Password-based moderator login (localStorage-based, no auth library)
  - Moderator dashboard at `/moderator` — approve or reject pending submissions
  - "Pending" category tab visible only to moderators
  - Approved community animals shown with "Community" badge
  - Pending animals shown with "Pending" badge (moderator view only)
  - Moderator link in Navbar
- [x] **User Authentication System** (new):
  - NextAuth.js integration with Credentials provider
  - User registration and login pages (`/auth/signup`, `/auth/signin`)
  - Users table in database with role, earnings fields
  - First registered user becomes admin automatically
  - Admin panel at `/admin` to manage users and assign moderator roles
  - Moderator dashboard updated to use real authentication
  - **Earnings system**: Moderators earn $2 per approved submission
  - Session management with role-based access control
  - Updated Navbar with sign-in/sign-out functionality

## Current Structure

| File/Directory | Purpose | Status |
|----------------|---------|--------|
| `src/app/page.tsx` | Home page with hero, categories, animal grid | ✅ Ready |
| `src/app/layout.tsx` | Root layout with Navbar + Footer + SessionProvider | ✅ Ready |
| `src/app/globals.css` | Global styles + scrollbar | ✅ Ready |
| `src/app/animals/[id]/page.tsx` | Individual animal detail page | ✅ Ready |
| `src/app/moderator/page.tsx` | Moderator dashboard (NextAuth-protected) | ✅ Ready |
| `src/app/admin/page.tsx` | Admin panel for user/moderator management | ✅ Ready |
| `src/app/auth/signup/page.tsx` | User registration page | ✅ Ready |
| `src/app/auth/signin/page.tsx` | User login page | ✅ Ready |
| `src/app/api/auth/[...nextauth]/route.ts` | NextAuth API route | ✅ Ready |
| `src/app/api/auth/register/route.ts` | User registration API | ✅ Ready |
| `src/app/api/admin/update-role/[userId]/route.ts` | Admin role management API | ✅ Ready |
| `src/app/api/animals/submit/route.ts` | POST: submit new animal | ✅ Ready |
| `src/app/api/animals/pending/route.ts` | GET: fetch pending animals | ✅ Ready |
| `src/app/api/animals/approved/route.ts` | GET: fetch approved community animals | ✅ Ready |
| `src/app/api/animals/moderate/route.ts` | POST: approve/reject + earnings tracking | ✅ Ready |
| `src/components/Navbar.tsx` | Green sticky navigation bar with auth | ✅ Ready |
| `src/components/Footer.tsx` | Footer with conservation info | ✅ Ready |
| `src/components/AnimalCard.tsx` | Animal card for grid | ✅ Ready |
| `src/components/AnimalSearch.tsx` | Client-side search + filter + add button | ✅ Ready |
| `src/components/AnimalMap.tsx` | OpenStreetMap habitat map | ✅ Ready |
| `src/components/AddAnimalModal.tsx` | Modal form for submitting new animals | ✅ Ready |
| `src/components/SessionProvider.tsx` | NextAuth session provider | ✅ Ready |
| `src/lib/animals.ts` | Animal data (50+ species) | ✅ Ready |
| `src/lib/moderator.ts` | Legacy moderator helpers (deprecated) | ✅ Ready |
| `src/lib/auth.ts` | NextAuth configuration | ✅ Ready |
| `src/db/schema.ts` | Drizzle schema for users + submitted_animals | ✅ Ready |
| `src/db/index.ts` | Database client | ✅ Ready |
| `src/db/migrate.ts` | Migration runner | ✅ Ready |
| `src/db/migrations/` | SQL migration files | ✅ Ready |
| `drizzle.config.ts` | Drizzle Kit configuration | ✅ Ready |
| `.kilocode/` | AI context & recipes | ✅ Ready |

## User Roles

- **Admin**: Can access admin panel, manage users, assign moderator roles
- **Moderator**: Can access moderator dashboard, approve/reject submissions, earn $2 per approval
- **User**: Can sign up, sign in, submit animal entries

## Session History

| Date | Changes |
|------|---------|
| Initial | Template created with base setup |
| 2024 | WildWorld Animal Database built — 12 species, green theme, search, maps, videos |
| 2024 | New categories: Extinct Animal, Insects; 6 new animals; UI polish; HeroSlideshow |
| 2025-02 | Expanded to 50+ animals; community submissions with moderation system |
| 2025-02 | Added user authentication with NextAuth.js, admin panel, moderator earnings system |
