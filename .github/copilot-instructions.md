# Copilot Development Instructions for SADECI Platform

## Project Overview

SADECI Platform is a React/TypeScript web application for clinical decision support in ICU settings at Hospital Arnaldo Milián Castro. It provides patient management, vital signs monitoring, AI predictions, and clinical simulations.

## Tech Stack

- **React 19** with TypeScript (strict mode enabled)
- **Vite** for build tooling
- **TailwindCSS 3** for styling
- **React Router 7** for routing
- **TanStack Query** for data fetching
- **JWT** for authentication

## Coding Standards

### TypeScript

- Use strict TypeScript mode
- Define interfaces/types for all data structures
- Avoid `any` type - use proper typing
- Use union types for enums and constants

### React

- Use functional components with hooks
- Prefer custom hooks for reusable logic
- Use React 19 features when appropriate
- Implement proper error boundaries

### File Structure

Follow feature-based architecture:

```
src/features/[feature]/
├── components/     # UI components
├── hooks/         # Custom hooks
├── services/      # API calls
├── types/         # TypeScript types
└── index.ts       # Barrel exports
```

### Naming Conventions

- Components: PascalCase (e.g., `PatientCard`)
- Files: PascalCase for components, camelCase for utilities
- Hooks: camelCase with `use` prefix (e.g., `usePatients`)
- Services: camelCase (e.g., `patientService`)
- Types: PascalCase with descriptive names

### Imports

- Use barrel exports (`index.ts`) for clean imports
- Group imports: React, third-party, local
- Prefer absolute imports over relative

### Styling

- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors
- Use CSS custom properties for theme variables

## API Integration

### Base URL

All API calls use `/api` prefix with JWT Bearer authentication.

### Error Handling

- Use TanStack Query for data fetching with proper error states
- Implement loading states for all async operations
- Show user-friendly error messages
- Handle network errors gracefully

### Authentication

- Store tokens securely (localStorage with httpOnly cookies preferred for production)
- Implement token refresh logic
- Protect routes with authentication checks
- Handle token expiration

## Development Workflow

### Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run lint` - Code quality checks
- `npm run verify` - Full environment verification

### Git Workflow

- Use feature branches
- Write descriptive commit messages
- Follow conventional commits format
- Create pull requests for all changes

### Testing

- Write unit tests for utilities and hooks
- Test components with React Testing Library
- Mock API calls in tests
- Ensure accessibility compliance

## Security Considerations

- Validate all user inputs
- Sanitize data before rendering
- Implement proper CORS configuration
- Use HTTPS in production
- Handle sensitive patient data appropriately

## Performance

- Optimize bundle size
- Implement code splitting
- Use lazy loading for routes
- Cache API responses appropriately
- Monitor Core Web Vitals

## Accessibility

- Use semantic HTML
- Implement ARIA labels where needed
- Ensure keyboard navigation
- Maintain proper color contrast
- Test with screen readers

## Documentation

- Keep README.md updated
- Document API endpoints in API_SPEC.md
- Write JSDoc comments for complex functions
- Update CHANGELOG.md for releases

## Code Quality

- Run linter before commits
- Fix all ESLint warnings/errors
- Use Prettier for consistent formatting
- Review code for security vulnerabilities
- Maintain high test coverage
