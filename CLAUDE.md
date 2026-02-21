# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + TypeScript web application built with Vite. The project is currently in its initial setup phase with minimal boilerplate code.

## Build Commands

```bash
# Development server with hot module replacement
npm run dev

# Production build (runs TypeScript compiler check first, then builds)
npm run build

# Preview production build locally
npm run preview

# Lint code with ESLint
npm run lint
```

## Tech Stack

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **Vite 7.3** - Build tool and dev server
- **ESLint 9** - Linting with flat config format

## Project Structure

```
src/
├── main.tsx          # Application entry point, renders root component
├── App.tsx           # Main App component
├── App.css           # App component styles
├── index.css         # Global styles
└── assets/           # Static assets
```

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

## Development Notes

- The project uses React 19 with StrictMode enabled
- Vite provides Fast Refresh via `@vitejs/plugin-react` using Babel
- Module resolution is set to "bundler" mode for optimal Vite compatibility
- JSX transformation uses the modern `react-jsx` runtime (no React import needed)
