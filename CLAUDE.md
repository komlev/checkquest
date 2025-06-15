# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on http://localhost:5173
- `pnpm build` - Build for production (runs TypeScript check first)
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests with Vitest
- `pnpm preview` - Preview production build

## Architecture Overview

CheckQuest is a React-based interview management application with the following key architectural patterns:

### State Management
- Uses **Nanostores** with persistent atoms for client-side state
- Two main stores: `checklistStore.ts` and `interviewsStore.ts`
- All data is stored locally in browser storage

### Component Structure
- Follows atomic design principles with 00-Atoms, 01-Molecules, 02-Organisms, 04-Pages
- Components are organized by complexity level rather than feature

### Core Data Flow
1. **Checklists**: Users create reusable interview templates with sections and weighted questions
2. **Interviews**: Users conduct interviews using checklist templates, checking off questions and calculating scores
3. **Scoring**: Automatic score calculation based on checked questions with support for "extra" bonus questions

### Key Data Models
- `Checklist`: Template with sections and questions, each question has a score weight
- `Interview`: Instance of a checklist being used for a candidate evaluation
- `Section`: Groups of related questions within a checklist
- `Question`: Individual evaluation criteria with score and optional "extra" flag

### Routing
- Uses **Wouter** for routing
- Route constants defined in `routes.ts`
- Main sections: checklists (`/lists/*`) and interviews (`/interviews/*`)

### UI Framework
- **TailwindCSS** with **DaisyUI** components
- Theme switching support with `theme-change`
- Responsive design patterns

### Testing Setup
- **Vitest** with jsdom environment
- React Testing Library for component tests
- Test setup in `src/test/setup.ts`