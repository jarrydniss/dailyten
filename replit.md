# Daily Trivia Game - Replit Agent Guide

## Overview

This is a mobile-first daily trivia game inspired by DailyTens.com. Players answer 6 trivia questions per session and receive instant feedback on their performance. The application emphasizes clean, minimalist design with a focus on lightweight performance and mobile optimization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- **React with TypeScript**: Component-based UI using functional components and hooks
- **Vite**: Build tool and development server for fast hot module replacement
- **Wouter**: Lightweight client-side routing (single route application)
- **TanStack Query**: Server state management, data fetching, and caching with disabled automatic refetching (staleTime: Infinity)

**UI Component System**
- **shadcn/ui**: Headless component library built on Radix UI primitives
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Design System**: "new-york" style variant with neutral base color, custom spacing scale (3, 4, 6, 8 units), and mobile-first responsive design
- **Theme Configuration**: Light mode only (no dark mode) for battery efficiency, with custom CSS variables for colors and elevation states

**State Management Strategy**
- Local component state for game flow (current question index, answers, results display)
- React Query for server data (questions fetching, answer submission)
- Form state managed through controlled inputs
- No global state management library needed due to simple application scope

### Backend Architecture

**Server Framework**
- **Express.js**: REST API server with JSON middleware
- **TypeScript with ESM**: Modern module system with type safety
- **Custom Request Logging**: Middleware that logs API requests with duration and response preview (truncated at 80 characters)

**API Design**
- `GET /api/questions`: Fetches the 6 trivia questions for the session
- `POST /api/submit`: Accepts answers object, returns scored results with correct/incorrect feedback
- Validation using Zod schemas for type-safe request/response handling

**Data Storage Pattern**
- **IStorage Interface**: Abstract storage layer allowing multiple implementations
- **MemStorage**: Current in-memory implementation with hardcoded questions
- Questions stored as array of objects with id, question text, and correct answer
- Answer checking performs exact match comparison (case-sensitive)
- Results include per-question feedback with user answer, correct answer, and boolean correctness flag

**Architectural Decisions**
- In-memory storage chosen for simplicity (no database setup required)
- Stateless API design - each submission is independent
- Question IDs used as keys for answer submission (allows partial submissions)
- Storage interface allows future database integration without API changes

### Build & Deployment

**Development Workflow**
- `npm run dev`: Runs Express server in development mode with Vite middleware for HMR
- Custom Vite setup serves React app through Express in development
- TypeScript compilation checking via `npm run check`

**Production Build**
- `npm run build`: Compiles client (Vite) and bundles server (esbuild) separately
- Client output: `dist/public` directory
- Server output: `dist/index.js` (ESM bundle with external packages)
- `npm start`: Runs production server serving pre-built static assets

**Deployment Strategy**
- Server serves static files from `dist/public` in production
- API routes prefixed with `/api` to avoid conflicts with client routing
- Environment-based configuration (NODE_ENV) switches between dev and production modes

### External Dependencies

**Database**
- **Neon Serverless PostgreSQL**: Configured via Drizzle but not currently implemented
- Connection string expected in `DATABASE_URL` environment variable
- Schema defined in `shared/schema.ts` using Zod (not Drizzle ORM schemas yet)
- Migration output directory: `./migrations`
- **Note**: Application currently uses in-memory storage; PostgreSQL integration is prepared but not active

**UI Component Libraries**
- **Radix UI**: Comprehensive set of accessible headless components (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, hover-card, label, menubar, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- **cmdk**: Command menu component for potential keyboard navigation
- **embla-carousel-react**: Carousel/slider functionality
- **vaul**: Drawer component for mobile interactions
- **react-day-picker**: Calendar/date picker component
- **recharts**: Charting library for potential statistics visualization

**Form & Validation**
- **React Hook Form**: Form state management with `@hookform/resolvers`
- **Zod**: Runtime type validation and schema definition
- **drizzle-zod**: Adapter between Drizzle schemas and Zod (prepared for future use)

**Styling Utilities**
- **class-variance-authority**: Type-safe variant styling for components
- **clsx & tailwind-merge**: Conditional className composition
- **date-fns**: Date formatting and manipulation utilities

**Development Tools**
- **Replit Plugins**: Cartographer (code navigation), dev banner, runtime error modal for enhanced DX
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast JavaScript bundler for production server build
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

**Session Management** (Prepared but not active)
- **express-session**: Session middleware configuration present
- **connect-pg-simple**: PostgreSQL session store adapter (awaiting database activation)