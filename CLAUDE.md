# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on http://localhost:5173 (runs template generation first)
- `pnpm build` - Build for production (runs TypeScript check and template generation first)
- `pnpm lint` - Run Biome linter/formatter checks
- `pnpm format` - Run Biome and auto-fix issues
- `pnpm typecheck` - Run TypeScript type checking without emitting files
- `pnpm test` - Run unit tests with Vitest (targets `./src` directory)
- `pnpm test-e2e` - Run end-to-end tests with Playwright
- `pnpm preview` - Preview production build
- `ANALYZE=true pnpm build` - Build with bundle analyzer

## Architecture Overview

CheckQuest is a Preact-based interview management application with the following key architectural patterns:

### State Management

- Uses **Nanostores** with `@nanostores/persistent` for client-side state
- Preact integration via `@nanostores/preact` for reactive updates
- Three main stores in `src/stores/`:
  - `checklistStore.ts` - CRUD operations for checklist templates, includes export/import functionality (base64 encoding)
  - `interviewsStore.ts` - CRUD operations for interview instances
  - `notificationsStore.ts` - UI notifications
- All data persists to browser localStorage
- Store access pattern: persistent atoms with exported helper functions (e.g., `addChecklist`, `updateChecklist`, `getChecklist`)

### Component Structure

- Follows atomic design principles with 00-Atoms, 01-Molecules, 02-Organisms, 04-Pages
- Components are organized by complexity level rather than feature

### Core Data Flow

1. **Checklists**: Users create reusable interview templates with sections and weighted questions
2. **Interviews**: Users conduct interviews using checklist templates, checking off questions and calculating scores
3. **Scoring**: Automatic score calculation based on checked questions with support for "extra" bonus questions

### Key Data Models

All types defined in `src/types.ts`:

- `Checklist`: Template with sections and questions, each question has a score weight. Has `createdAt`/`updatedAt` timestamps
- `Interview`: Instance of a checklist being used for a candidate evaluation. Contains a copy of sections from the original checklist, plus `summary` and calculated `score`
- `Section`: Groups of related questions within a checklist. Has `id`, `title`, and `questions` array
- `Question`: Individual evaluation criteria with `score` weight, optional `checked` state, and optional `extra` flag (for bonus questions)

### Routing

- Uses **Wouter** for routing
- Route constants and helper functions defined in `src/routes.ts`
- Main sections:
  - Dashboard: `/` (root)
  - Checklists: `/lists`, `/lists/new`, `/lists/:id`, `/lists/:id/edit`
  - Interviews: `/interviews`, `/interviews/new`, `/interviews/:id`
  - Templates: `/templates`, `/templates/:slug` (community checklist templates)

### UI Framework

- **TailwindCSS v4** with `@tailwindcss/vite` plugin
- **DaisyUI** component library
- Theme switching support with `theme-change` library
- Uses **Biome** for linting and formatting (not ESLint/Prettier)

### Testing Setup

- **Vitest** with jsdom environment for unit/component tests
- **Playwright** for end-to-end tests (config in `playwright.config.ts`, tests in `./tests`)
- **@testing-library/preact** for component tests
- Test setup in `src/test/setup.ts`
- Coverage available with `@vitest/coverage-v8`

### Build and Tooling

- **Vite** for building and dev server with `@preact/preset-vite` plugin
- **TypeScript** with strict type checking
- **Preact** replaces React for smaller bundle size and faster performance
- Version injection: `APP_VERSION` in HTML is replaced with package.json version at build time
- Pre-build script: `scripts/generate-templates.js` generates `public/templates/index.json` from template files
- **Lefthook** for git hooks:
  - Pre-commit: Auto-format staged files with Biome
  - Pre-push: Check all files with Biome
  - Commit-msg: Validate commit messages with commitlint (conventional commits)

### Utilities

- `es-toolkit` - Modern utility library (Lodash alternative)
- `nanoid` - ID generation (see `src/utils/id.ts`)
- `keyux` - Keyboard shortcuts handling
- `chart.js` - Radar charts for interview scoring visualization
