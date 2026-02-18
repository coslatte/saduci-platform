# SADECI Platform

Web client for SADECI, clinical decision support in the ICU, Hospital Arnaldo Milián Castro.

> 📖 [Versión en español](LÉAME.md)

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Strict type checking
- **Vite** - Fast build tool and dev server
- **TailwindCSS 3** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Tanstack Query** - Data fetching and caching
- **JWT Authentication** - Secure REST API authentication

## Features

- **JWT Authentication** - Secure login and token management
- **Patient Management** - View and manage ICU patients
- **Vital Signs Monitoring** - Real-time patient vitals with auto-refresh
- **Patient Timeline** - Track events, medications, and procedures
- **AI Predictions** - View clinical outcome predictions
- **Clinical Simulations** - Run scenario simulations
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Modern UI** - Clean, professional interface with sidebar navigation

## Project Structure

```
src/
├── features/           # Feature-based modules
│   ├── auth/          # Authentication
│   ├── patients/      # Patient management
│   ├── predictions/   # Prediction results
│   ├── simulations/   # Clinical simulations
│   └── layout/        # Layout components
├── shared/            # Shared components and utilities
│   ├── components/    # Reusable UI components
│   └── utils/         # Helper functions
├── lib/               # Core libraries
├── routes/            # Route configuration
└── types/             # Global TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/coslatte/sadeci-platform.git
cd sadeci-platform
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` and set your API base URL.

4. Verify setup (optional but recommended):

```bash
npm run verify
# or
./verify-setup.sh
```

This script checks Node.js version, dependencies, linting, and build process.

5. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server (http://localhost:5173)
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build (http://localhost:4173)
- `npm run lint` - Run ESLint for code quality checks
- `npm run verify` - Verify development environment setup

### Verification Checklist

After cloning and setting up the repository, verify everything is working:

```bash
# 1. Install dependencies
npm install

# 2. Run linter (should pass with no errors)
npm run lint

# 3. Build the project (should complete successfully)
npm run build

# 4. Start development server
npm run dev
```

✅ All commands should complete successfully with no errors.

### Code Standards

- Strict TypeScript mode enabled
- Feature-based folder structure
- Barrel exports (`index.ts`) for clean imports
- Consistent naming conventions
- Responsive design with mobile-first approach

## API Integration

The application expects a REST API with the following endpoints:

### Authentication

- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

### Patients

- `GET /api/patients` - List all patients
- `GET /api/patients/:id` - Get patient details
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient
- `GET /api/patients/:id/vitals` - Get patient vitals
- `GET /api/patients/:id/timeline` - Get patient timeline

### Predictions

- `GET /api/predictions` - List predictions (optional query: `?patientId=:id`)
- `GET /api/predictions/:id` - Get prediction details
- `POST /api/predictions` - Create new prediction
- `DELETE /api/predictions/:id` - Delete prediction

### Simulations

- `GET /api/simulations` - List simulations (optional query: `?patientId=:id`)
- `GET /api/simulations/:id` - Get simulation details
- `POST /api/simulations` - Create simulation
- `PUT /api/simulations/:id` - Update simulation
- `DELETE /api/simulations/:id` - Delete simulation
- `POST /api/simulations/:id/run` - Run simulation

See [API_SPEC.md](docs/API_SPEC.md) for complete API documentation with request/response schemas.

## Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 5173 (Unix/Linux/macOS)
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

**Module not found errors:**

```bash
# Clear and reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Build failures:**

- Verify Node.js version: `node --version` (requires v18.0.0+)
- Clear build cache: `rm -rf dist`
- Rebuild: `npm run build`

**API connection issues:**

- Check `.env` file has correct `VITE_API_BASE_URL`
- Verify backend server is running
- Check browser console for CORS errors

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) for:

- Development setup guide
- Code standards and conventions
- Commit message guidelines
- Pull request process

## License

MIT

## Hospital

Hospital Arnaldo Milián Castro
