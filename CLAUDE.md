# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Daily Log** is an AI-powered journaling service that helps users create emotional and literary diary entries through conversational interaction.

### Service Concept

- **AI Conversation-Based Journaling**: Users chat with an AI assistant that helps them reflect on their day
- **Automatic Diary Generation**: After the conversation, AI automatically writes a beautifully crafted diary entry
- **AI-Generated Thumbnails**: Optionally generates thematic images that match the diary's mood and content
- **Literary & Emotional Writing**: AI acts as a skilled literary writer, creating emotionally rich and poetic entries
- **Warm & Comforting Design**: The entire service should feel warm, comforting, and emotionally supportive

### Technical Stack

This is a React + TypeScript web application built with Vite. The backend is already implemented separately.

## Build Commands

### NPM Scripts
```bash
# Development server with hot module replacement (Port 5173)
npm run dev

# Production build (runs TypeScript compiler check first, then builds)
npm run build

# Preview production build locally
npm run preview

# Lint code with ESLint
npm run lint
```

### Makefile Commands (Recommended)
```bash
# Development
make dev            # Start development server
make build          # Build for production
make lint           # Run linter

# Docker (Production - Port 8080)
make docker-build   # Build Docker image
make docker-up      # Start container in background
make docker-down    # Stop container
make docker-logs    # View container logs
make docker-clean   # Remove all Docker artifacts
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:8000  # Backend API URL
```

## Tech Stack

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.3** - Build tool and dev server
- **ESLint 9** - Linting with flat config format

## Project Structure

```
src/
├── components/       # Reusable components
│   └── ProtectedRoute.tsx    # Route guard for authenticated pages
├── contexts/         # React Context providers
│   └── AuthContext.tsx       # Authentication state management
├── pages/            # Page components
│   ├── LoginPage.tsx         # Login page
│   ├── SignupPage.tsx        # Signup page
│   ├── HomePage.tsx          # Main dashboard (authenticated)
│   ├── AuthPages.css         # Login/Signup styles
│   └── HomePage.css          # Home page styles
├── utils/            # Utility functions
│   └── api.ts               # API communication layer
├── main.tsx          # Application entry point with AuthProvider
├── App.tsx           # Router configuration
├── index.css         # Global styles
└── assets/           # Static assets
```

## Authentication

- **Cookie-based authentication**: Uses `js-cookie` to manage `accessToken` in cookies
- **Protected routes**: Unauthenticated users are automatically redirected to `/login`
- **AuthContext**: Global authentication state accessible via `useAuth()` hook
- **API integration**: All API calls automatically include authentication headers

## TypeScript Configuration

The project uses TypeScript's project references feature with two separate configs:

- `tsconfig.json` - Root config that references both app and node configs
- `tsconfig.app.json` - Application code config (src/)
- `tsconfig.node.json` - Vite config file compilation

Strict mode is enabled with additional linting rules (`noUnusedLocals`, `noUnusedParameters`, etc.).

## ESLint Configuration

Uses ESLint flat config format (`eslint.config.js`) with:
- TypeScript ESLint recommended rules
- React Hooks recommended rules
- React Refresh plugin for Vite

The `dist` directory is globally ignored.

## Design Philosophy

When implementing UI/UX features, keep these principles in mind:

- **Warm & Comforting**: Use soft colors, gentle gradients, and rounded corners
- **Emotionally Supportive**: The interface should feel like a caring companion, not a cold tool
- **Literary & Poetic**: Typography and language should feel refined and artistic
- **Calming Experience**: Avoid harsh contrasts, use smooth transitions and subtle animations
- **Personal & Intimate**: Design should encourage personal reflection and emotional expression

### Current Color Palette (Warm & Cozy Theme)

Primary colors:
- **Main gradient**: `#FFE5D9` → `#FEC89A` (warm cream to peachy orange)
- **Accent color**: `#E07856` (warm terracotta)
- **Button gradient**: `#E07856` → `#D85F44` (warm orange-coral)
- **Background**: `#FFF5F0` → `#FFE5D9` (soft cream gradient)

Design characteristics:
- Peachy, warm tones that evoke comfort and emotional warmth
- Soft cream and terracotta colors for a cozy, journal-like feel
- Gentle shadows instead of hard borders
- Rounded corners throughout

### Language

- **Primary language**: Korean (한국어)
- All UI text, error messages, and user-facing content should be in Korean
- Keep the service name "Daily Log" in English as the brand name

## Development Notes

- The project uses React 19 with StrictMode enabled
- Vite provides Fast Refresh via `@vitejs/plugin-react` using Babel
- Module resolution is set to "bundler" mode for optimal Vite compatibility
- JSX transformation uses the modern `react-jsx` runtime (no React import needed)
- Backend API is implemented separately and should be running for full functionality
