# Branch Information

## Source Code Only Branch

This repository contains a special branch with only the fundamental source code of the SADECI Platform application.

### Branch Names

- **Intended name**: `fix/dependecies-aid`
- **Current working branch**: `copilot/fixdependecies-aid`

Both branches contain identical content - only the source code without configuration or development files.

### Branch Content

**Included:**
- `src/` - Complete application source code (76 files, ~540KB)
  - React components
  - TypeScript types
  - Feature modules (auth, patients, predictions, simulations, layout)
  - Shared utilities and components
  - API client and mock data
- `README.md` - Project documentation
- `.gitignore` - Git configuration

**Excluded:**
- Configuration files (Next.js, TypeScript, ESLint, PostCSS, Tailwind)
- Package management (package.json, bun.lock, node_modules)
- Build artifacts (tsconfig.tsbuildinfo, next-env.d.ts, .next/)
- Development tools (verify-setup.sh)
- Extended documentation (docs/ directory)
- GitHub workflows (.github/)
- Environment templates (.env.example)
- Type definitions (global.d.ts)

### Purpose

This branch isolates the fundamental application code from the development infrastructure, making it easier to:
- Review core application logic
- Share source code without build configuration
- Understand the application structure
- Separate concerns between code and tooling

### Using This Branch

To work with the complete application (including build tools and configuration), use the main branch or other development branches.

This branch is intended for:
- Code review of core application logic
- Studying the application architecture
- Sharing source code samples
- Educational purposes
