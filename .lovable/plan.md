

# Taley Internal Dashboard — Phase 1 Implementation Plan

This is a large project. Per the PRD, we'll start with **Phase 1: Foundation** — the app shell, design system, navigation, and authentication setup. This gives you a working skeleton to build all modules on top of.

## What we'll build in this first step

1. **Design system setup** — Taley brand colors (#2563EB primary blue), Inter font, rounded corners, dark/light mode support
2. **App layout shell** — Collapsible left sidebar with all navigation items (Home, Profile, Team Folders, Tasks, Kanban, Chat, Forum, Statistics, Documents, Settings) + top bar with search, notifications bell, and user avatar
3. **Placeholder pages** for all key routes (`/`, `/profile`, `/folders`, `/tasks`, `/kanban`, `/chat`, `/forum`, `/dashboard`, `/documents`, `/settings`)
4. **Login page** — Taley-branded, with email/password fields, dark/light mode toggle (no backend auth yet — UI only for now)

## What we will NOT build yet

- Supabase connection and real authentication (Phase 1b — needs you to connect Supabase)
- Any module functionality (tasks, kanban, chat, etc. — those come in later phases)
- Real-time features, file storage, database schema

## Technical approach

- Update CSS variables for Taley brand colors (blue #2563EB as primary)
- Add Inter font via Google Fonts
- Create a `DashboardLayout` component with sidebar + top bar
- Use existing shadcn/ui components (Sheet for mobile sidebar, Button, Avatar, Input, etc.)
- Create stub pages for each route with proper routing in App.tsx
- Build a responsive sidebar that collapses on mobile
- Login page as a standalone route without the dashboard layout

## File changes

- `src/index.css` — Brand colors, Inter font
- `index.html` — Google Fonts link
- `src/components/layout/DashboardLayout.tsx` — Main layout with sidebar + topbar
- `src/components/layout/Sidebar.tsx` — Collapsible navigation sidebar
- `src/components/layout/TopBar.tsx` — Search, notifications, user menu
- `src/pages/Login.tsx` — Branded login page
- `src/pages/Index.tsx` — Dashboard home (overview)
- `src/pages/Profile.tsx`, `TeamFolders.tsx`, `Tasks.tsx`, `Kanban.tsx`, `Chat.tsx`, `Forum.tsx`, `Statistics.tsx`, `Documents.tsx`, `Settings.tsx` — Stub pages
- `src/App.tsx` — All routes

