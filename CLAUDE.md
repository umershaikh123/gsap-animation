# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start the development server with Turbopack on http://localhost:3000
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run Next.js ESLint checks

### Testing
No testing framework is currently configured. When implementing tests, consider adding Jest or Vitest with React Testing Library.

## Architecture

This is a Next.js 15.4.6 application using the App Router architecture with TypeScript and Tailwind CSS v4.

### Key Technologies
- **Next.js 15.4.6** with App Router (`src/app/` directory)
- **React 19.1.0** with functional components
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling with PostCSS
- **Geist Fonts** (Sans and Mono variants) with Next.js font optimization

### Project Structure
- `src/app/` - App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration and HTML structure
  - `page.tsx` - Page components
  - `globals.css` - Global styles with Tailwind directives and CSS variables
- `public/` - Static assets (SVGs, images)
- TypeScript path alias: `@/*` maps to `./src/*`

### Styling Approach
- Use Tailwind utility classes for styling
- CSS variables defined in `globals.css` for theming (`--background`, `--foreground`)
- Dark mode support via `prefers-color-scheme` media query
- Mobile-first responsive design with Tailwind breakpoint utilities

### Development Patterns
- React functional components with TypeScript
- Use `import type` for type-only imports
- Font optimization through Next.js font loading (see `layout.tsx`)
- No CSS-in-JS libraries - rely on Tailwind utilities

## Important Notes
- This is a fresh Next.js starter template ready for animation feature development
- No animation libraries are currently installed - consider Framer Motion or React Spring when implementing animations
- No testing framework is configured yet
- ESLint uses Next.js default configuration (no custom rules file)