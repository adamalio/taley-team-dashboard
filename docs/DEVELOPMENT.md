# Taley Team Dashboard development

This repository contains a React 18/Vite 7 team workspace with login, profiles, tasks, Kanban, chat, forum, statistics, documents and settings. Its publicly visible source does not make workspace data public. The separate [Taley Dashboard](https://github.com/adamalio/taley-dashboard) has its own internal workspace, API and rollout documentation; changes here do not automatically update that application. This guide describes the checked-in implementation, not which dashboard should be the future product.

## Local setup

Use Node.js 22.12+ (or a supported newer LTS) and npm. The documented install uses `package-lock.json`; existing Bun lockfiles are retained. Avoid switching package managers in an unrelated change.

```sh
git clone https://github.com/adamalio/taley-team-dashboard.git
cd taley-team-dashboard
npm ci
cp .env.example .env.local
npm run dev
```

Open `http://localhost:8080`. Google Drive values are optional for starting the UI. The Supabase URL and publishable key are currently configured in `src/lib/supabase.ts`, not read from `.env.example`. Starting Vite can therefore contact the configured remote Auth project; it is not an isolated offline demo. Use a separate test account/workspace for authenticated checks. Never place a service-role key in browser code.

## Configuration and data

| Setting | Consumer | Scope |
| --- | --- | --- |
| `VITE_DRIVE_FOLDER_ID` | `src/pages/Documents.tsx` | Folder reference used by the browser |
| `VITE_GOOGLE_API_KEY` | `src/pages/Documents.tsx` | Browser API key; restrict to intended APIs/origins |
| `VITE_GOOGLE_CLIENT_ID` | `src/pages/Documents.tsx` | Browser OAuth client ID |

Auth, profile and avatar hooks use Supabase. Inspect each feature's implementation before treating a displayed task, chart or message as persisted team data. There is no database migration directory in this repository. Drive credentials do not configure Supabase, and document access still depends on Google permissions.

## Code map and checks

- `src/App.tsx`: route map, providers and protected routes.
- `src/contexts/AuthContext.tsx`: Supabase session and login lifecycle.
- `src/lib/supabase.ts`: current backend connection.
- `src/hooks/`: profile, avatar and theme behavior.
- `src/pages/`: feature screens; `src/components/`: shared layout and UI.
- `docs/PRD.md`: product requirements, separate from evidence of implemented behavior.

```sh
npm test
npm run lint
npm run build
npm run preview
```

`test` runs Vitest once. `build` writes `dist/`; `preview` serves the build locally. For a manual check, open `/login`, confirm a protected route redirects without a session, use a test account for login/callback/profile, and inspect `/documents` both with and without Drive configuration. Production hosting must serve SPA routes through `index.html`.

## Next bounded improvement

Choose the relationship between the two dashboard implementations explicitly before migrating data. A first implementation change can make backend selection configurable while preserving current behavior, then prove Auth/profile permissions in an isolated Supabase test project. Do not infer successful login from a rendered login screen.
