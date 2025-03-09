# Repository Guidelines

## Project Structure & Module Organization

- `src/` — React + TypeScript source (components, views, hooks, stores). Tests are colocated near code as `*.test.ts`/`*.test.tsx`.
- `public/` — static assets and `index.html` (served by Vite).
- `dist/` — production build output (do not edit).
- Root config: `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `.editorconfig`, `.prettierrc.json`.

## Build, Test, and Development Commands

- `pnpm dev` — start Vite dev server at `http://localhost:5173`.
- `pnpm build` — type‑check and create production build (`dist/`).
- `pnpm preview` — serve the built app locally for smoke testing.
- `pnpm lint` — run ESLint on the project.
- `pnpm prettier` — check/format with Prettier (Tailwind plugin enabled).
- `pnpm test` — run unit tests with Vitest (jsdom). Add `--coverage` for V8 coverage, `--ui` for the test UI.

## Coding Style & Naming Conventions

- Indentation: 2 spaces; LF line endings; max line length 80 (`.editorconfig`).
- TypeScript strict mode is enabled; fix type warnings rather than suppressing.
- Components: PascalCase file and export names (e.g., `UserCard.tsx`).
- Functions/variables: camelCase; constants UPPER_SNAKE_CASE when appropriate.
- CSS classes: Tailwind + DaisyUI; prefer `clsx(...)` for conditional classes.
- Run `pnpm prettier` and `pnpm lint` before pushing.

## Testing Guidelines

- Frameworks: Vitest + React Testing Library + jest-dom.
- Location: colocate tests with source (`ComponentName.test.tsx`).
- Coverage: use `pnpm test -- --coverage`; aim for meaningful coverage on core logic and stores.
- Prefer testing user-visible behavior over implementation details.

## Commit & Pull Request Guidelines

- Commits: short, imperative, and scoped (e.g., "fix build", "feat: drag-and-drop reorder"). Group related changes.
- PRs: include clear description, linked issues, and screenshots/GIFs for UI changes. Note any migrations or breaking changes.
- Checklist before opening PR: `pnpm lint`, `pnpm test`, `pnpm build`, and manual check in `pnpm preview`.

## Security & Configuration Tips

- No secrets or backend: all data persists locally (browser storage). Do not commit credentials or private data.
- Avoid adding large binary assets to the repo; place static assets in `public/` when needed.

## Agent-Specific Instructions

- Keep changes minimal and targeted; follow the style and directory layout above.
- Do not edit `dist/`. Update docs when changing scripts or behavior.
- Prefer colocated tests for new code; avoid introducing new tooling without discussion.
