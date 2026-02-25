# SADECI

Web client for SADECI — clinical decision support in the ICU, Hospital Arnaldo Milián Castro.

## Getting Started

### 1. Configure the backend URL

Copy `.env.example` to `.env.local` and set the URL of the [sadeci-core](https://github.com/coslatte/sadeci-core) backend:

```bash
cp .env.example .env.local
```

```env
# .env.local
API_URL=http://localhost:8000
```

The frontend routes all simulation requests through `/api/simulation` (a Next.js Route Handler), so `API_URL` stays server-side and is never exposed to the browser.

### 2. Run the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> **Note:** sadeci-core must be running (default: `http://localhost:8000`) for the patient simulation to return results.
