# Quick Reference Guide

Quick reference for common development tasks in the SADECI Platform.

## Quick Start

```bash
# Clone and setup
git clone https://github.com/coslatte/sadeci-platform.git
cd sadeci-platform
npm install
cp .env.example .env
npm run verify

# Start developing
npm run dev
```

## Common Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server (http://localhost:5173) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run verify` | Verify development setup |

## File Locations

| File/Folder | Purpose |
|-------------|---------|
| `src/` | Source code |
| `src/features/` | Feature modules (auth, patients, etc.) |
| `src/shared/` | Shared components and utilities |
| `src/lib/` | Core libraries (API client) |
| `dist/` | Production build output |
| `.env` | Environment configuration |
| `README.md` | Project overview |
| `CONTRIBUTING.md` | Development guide |
| `API_SPEC.md` | API documentation |

## Environment Variables

Edit `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Change the URL to point to your backend API server.

## Development Workflow

1. **Create a new branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes**
   - Edit files in `src/`
   - Dev server auto-reloads

3. **Test changes**
   ```bash
   npm run lint    # Check code quality
   npm run build   # Verify build works
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/my-feature
   ```

## Project Structure

```
sadeci-platform/
├── src/
│   ├── features/          # Feature modules
│   │   ├── auth/         # Authentication
│   │   ├── patients/     # Patient management
│   │   ├── predictions/  # AI predictions
│   │   └── simulations/  # Clinical simulations
│   ├── shared/           # Shared code
│   │   ├── components/   # Reusable UI components
│   │   └── utils/        # Helper functions
│   ├── lib/              # Core libraries
│   ├── routes/           # Route configuration
│   └── types/            # TypeScript types
├── public/               # Static assets
├── dist/                 # Build output
└── node_modules/         # Dependencies
```

## Tech Stack Quick Links

- **React 19**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Vite**: https://vitejs.dev/
- **TailwindCSS**: https://tailwindcss.com/
- **React Router**: https://reactrouter.com/
- **Tanstack Query**: https://tanstack.com/query/

## Common Issues

### Port 5173 already in use

```bash
# Kill the process
lsof -ti:5173 | xargs kill -9

# Or use different port
npm run dev -- --port 3000
```

### Module errors after git pull

```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

- Restart your editor/IDE
- Run `npm run build` to see actual errors

### Build fails

```bash
rm -rf dist
npm run build
```

## API Endpoints Quick Reference

All endpoints prefixed with `/api`:

**Auth**: `/auth/login`, `/auth/logout`, `/auth/refresh`, `/auth/me`

**Patients**: `/patients`, `/patients/:id`, `/patients/:id/vitals`, `/patients/:id/timeline`

**Predictions**: `/predictions`, `/predictions/:id`

**Simulations**: `/simulations`, `/simulations/:id`, `/simulations/:id/run`

See [API_SPEC.md](API_SPEC.md) for full documentation.

## Getting Help

- Read [README.md](README.md) for project overview
- Read [CONTRIBUTING.md](CONTRIBUTING.md) for development guide
- Check [API_SPEC.md](API_SPEC.md) for API details
- Open an issue on GitHub for bugs or questions

## Useful VS Code Extensions

- ESLint
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)
- Prettier (optional)

Install them for better development experience!
