# SADECI Platform

Web client for SADECI, clinical decision support in the ICU, Hospital Arnaldo Milián Castro.

## Tech Stack

- **React 19** - Modern React with latest features
- **TypeScript** - Strict type checking
- **Vite** - Fast build tool and dev server
- **TailwindCSS 3** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Tanstack Query** - Data fetching and caching
- **JWT Authentication** - Secure REST API authentication

## Features

- 🔐 **JWT Authentication** - Secure login and token management
- 👥 **Patient Management** - View and manage ICU patients
- 📊 **Vital Signs Monitoring** - Real-time patient vitals with auto-refresh
- ⏱️ **Patient Timeline** - Track events, medications, and procedures
- 🤖 **AI Predictions** - View clinical outcome predictions
- 🧪 **Clinical Simulations** - Run scenario simulations
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, professional interface with sidebar navigation

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

4. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

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
- `GET /api/auth/me` - Get current user

### Patients
- `GET /api/patients` - List all patients
- `GET /api/patients/:id` - Get patient details
- `GET /api/patients/:id/vitals` - Get patient vitals
- `GET /api/patients/:id/timeline` - Get patient timeline

### Predictions
- `GET /api/predictions` - List predictions
- `GET /api/predictions/:id` - Get prediction details

### Simulations
- `GET /api/simulations` - List simulations
- `GET /api/simulations/:id` - Get simulation details
- `POST /api/simulations` - Create simulation
- `POST /api/simulations/:id/run` - Run simulation

## License

MIT

## Hospital

Hospital Arnaldo Milián Castro
