# Contributing to SADECI Platform

Thank you for your interest in contributing to the SADECI Platform! This document provides guidelines and instructions for setting up your development environment and contributing to the project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v18.0.0 or higher (v24.13.0 recommended)
- **npm** v9.0.0 or higher (v11.6.2 recommended)
- **Git** for version control

To verify your installations:

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be v9.0.0 or higher
git --version
```

### System Requirements

- **OS**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Disk Space**: 500MB for node_modules and build artifacts

## Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/coslatte/sadeci-platform.git
cd sadeci-platform
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies (~245 packages). The installation typically takes 30-60 seconds depending on your internet connection.

### 3. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit the `.env` file and set your API base URL:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**Note**: The API base URL should point to your running instance of the `sadeci-core` backend.

### 4. Verify Installation

Run the following commands to ensure everything is set up correctly:

```bash
# Check code quality
npm run lint

# Build the project
npm run build

# Start development server
npm run dev
```

If all commands succeed, you're ready to start developing! 🎉

## Development Workflow

### Starting Development Server

```bash
npm run dev
```

This starts the Vite development server at `http://localhost:5173` with:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh for React components
- TypeScript type checking

### Building for Production

```bash
npm run build
```

This command:
1. Runs TypeScript compiler (`tsc -b`)
2. Builds optimized production bundle with Vite
3. Outputs to `dist/` directory

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally at `http://localhost:4173` for testing.

### Running Linter

```bash
npm run lint
```

Runs ESLint to check code quality and style. All code must pass linting before submission.

## Code Standards

### TypeScript

- Use **strict mode** (enabled in `tsconfig.json`)
- Define proper types for all functions and variables
- Avoid using `any` type unless absolutely necessary
- Use interfaces for object shapes

### React

- Use **functional components** with hooks
- Follow React 19 best practices
- Use proper prop types with TypeScript interfaces
- Keep components small and focused (Single Responsibility Principle)

### File Organization

```
src/
├── features/           # Feature-based modules (auth, patients, etc.)
│   └── [feature]/
│       ├── components/ # Feature-specific components
│       ├── hooks/      # Feature-specific hooks
│       ├── types.ts    # Feature-specific types
│       └── index.ts    # Barrel export
├── shared/            # Shared/reusable code
│   ├── components/    # Reusable UI components
│   └── utils/         # Helper functions
├── lib/               # Core libraries (API client, etc.)
├── routes/            # Route definitions
└── types/             # Global TypeScript types
```

### Naming Conventions

- **Components**: PascalCase (e.g., `PatientCard.tsx`)
- **Files**: kebab-case for non-components (e.g., `use-auth.ts`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth`)
- **Types/Interfaces**: PascalCase (e.g., `Patient`, `AuthState`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)

### Import Order

1. React and external libraries
2. Internal features and modules
3. Shared components and utilities
4. Types
5. Styles

```typescript
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { PatientCard } from '@/features/patients';
import { Button } from '@/shared/components';

import type { Patient } from '@/types';

import './styles.css';
```

### Styling

- Use **TailwindCSS** utility classes
- Follow mobile-first responsive design
- Keep styles consistent with existing components
- Use semantic color names from Tailwind config

## Testing

Currently, the project does not have automated tests configured. When contributing:

1. Manually test your changes in the browser
2. Verify functionality across different screen sizes
3. Test error scenarios and edge cases
4. Ensure backward compatibility

**Future**: Unit and integration tests will be added using Vitest and React Testing Library.

## Submitting Changes

### Before Submitting

1. **Run the linter**: `npm run lint`
2. **Build the project**: `npm run build`
3. **Test your changes**: Manually verify in browser
4. **Review your code**: Check for console errors and warnings

### Commit Messages

Use clear, descriptive commit messages:

```
feat: add patient timeline filtering
fix: resolve authentication token refresh issue
docs: update API specification for predictions
style: format patient card component
refactor: extract vitals chart into separate component
```

Prefix types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Pull Request Process

1. Create a new branch for your feature/fix
2. Make your changes with clear commit messages
3. Push to your branch
4. Open a Pull Request with:
   - Clear description of changes
   - Screenshots for UI changes
   - Reference to related issues
5. Address review feedback
6. Ensure CI checks pass (if configured)

## Troubleshooting

### Common Issues

#### Port Already in Use

If port 5173 is already in use:

```bash
# Kill the process using the port (Unix/Linux/macOS)
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 3000
```

#### Module Not Found Errors

Clear node_modules and reinstall:

```bash
rm -rf node_modules package-lock.json
npm install
```

#### TypeScript Errors After Updates

Restart your TypeScript server or IDE:

```bash
# If using VS Code
# Press Cmd+Shift+P (macOS) or Ctrl+Shift+P (Windows/Linux)
# Type "TypeScript: Restart TS Server"
```

#### Build Failures

1. Ensure you have the correct Node.js version
2. Clear build cache: `rm -rf dist`
3. Run `npm run build` again

#### API Connection Issues

1. Verify `.env` file exists and has correct `VITE_API_BASE_URL`
2. Ensure backend server is running
3. Check browser console for CORS errors
4. Verify backend API is accessible

### Getting Help

- **Issues**: Check existing [GitHub Issues](https://github.com/coslatte/sadeci-platform/issues)
- **Questions**: Open a new issue with the "question" label
- **Documentation**: Refer to [README.md](README.md) and [API_SPEC.md](API_SPEC.md)

## Development Tips

### VS Code Extensions (Recommended)

- **ESLint**: For real-time linting
- **Tailwind CSS IntelliSense**: For Tailwind autocomplete
- **TypeScript Vue Plugin (Volar)**: For better TypeScript support
- **Prettier**: For code formatting (optional)

### Hot Reload Not Working

1. Ensure you're not using WSL1 (use WSL2 instead)
2. Check file permissions
3. Try `npm run dev -- --force`

### Performance Optimization

- Use React DevTools to profile components
- Implement lazy loading for routes
- Optimize images and assets
- Use memoization for expensive computations

## Code Review Guidelines

When reviewing code:

1. **Functionality**: Does it work as expected?
2. **Code Quality**: Is it readable and maintainable?
3. **Standards**: Does it follow project conventions?
4. **Performance**: Are there any performance concerns?
5. **Security**: Are there any security vulnerabilities?

## License

By contributing to SADECI Platform, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to SADECI Platform! Your efforts help improve critical care decision support for healthcare professionals. 🏥
