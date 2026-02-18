# Quickstart

```bash
git clone https://github.com/coslatte/sadeci-platform.git
cd sadeci-platform
npm install
cp .env.example .env        # set VITE_API_BASE_URL
npm run dev                  # http://localhost:5173
```

## Commands

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start dev server         |
| `npm run build`   | Production build         |
| `npm run lint`    | Lint code                |
| `npm run verify`  | Verify setup             |

## Workflow

```bash
git checkout -b feature/my-feature
# make changes
npm run lint && npm run build
git commit -m "feat: description"
git push origin feature/my-feature
```

## API Endpoints

All prefixed with `/api`. See [API_SPEC.md](API_SPEC.md) for details.

- **Auth**: `/auth/login`, `/auth/logout`, `/auth/refresh`, `/auth/me`
- **Patients**: `/patients`, `/patients/:id`, `/patients/:id/vitals`, `/patients/:id/timeline`
- **Predictions**: `/predictions`, `/predictions/:id`
- **Simulations**: `/simulations`, `/simulations/:id`, `/simulations/:id/run`

## Common Fixes

```bash
# Port in use
npm run dev -- --port 3001

# Stale modules
rm -rf node_modules && npm install

# Clean build
rm -rf dist && npm run build
```
