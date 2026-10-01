# Taley Team Dashboard

React/TypeScript team workspace with Supabase login, profiles, tasks, Kanban, chat, forum, statistics and Google Drive document references.

## Start here

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Use Node.js 22.12+ and npm; the local server is `http://localhost:8080`. Existing Bun lockfiles are preserved, while this guide uses `package-lock.json`.

**Backend note:** Auth currently points to the Supabase project configured in `src/lib/supabase.ts`; `.env.example` configures only Drive. Local development is not an automatic offline demo.

- [Development, configuration and checks](docs/DEVELOPMENT.md)
- [Product requirements](docs/PRD.md)
- [Separate internal Taley Dashboard](https://github.com/adamalio/taley-dashboard): independent codebase and rollout instructions.

Run `npm test`, `npm run lint` and `npm run build` before submitting code changes. The Lovable project ID in the original template below is a placeholder, not a verified deployment link.

## Historical project notes

The original README is preserved below. Use the current setup above and the development guide when commands or implementation claims differ.

# Welcome to your Lovable project

## Product requirements

- [`docs/PRD.md`](docs/PRD.md)

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
