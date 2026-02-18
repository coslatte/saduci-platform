# API Specification

Base URL: `/api`  
Auth: `Authorization: Bearer <access_token>` (all routes except `/auth/login` and `/auth/refresh`)

---

## Auth

### POST /auth/login
```json
// Request
{ "username": "string", "password": "string" }

// Response 200
{ "user": { "id": "string", "username": "string", "email": "string", "role": "doctor|nurse|admin" }, "tokens": { "accessToken": "string", "refreshToken": "string" } }
```

### POST /auth/refresh
```json
// Request
{ "refreshToken": "string" }
// Response 200 — same shape as login
```

### POST /auth/logout
Response 200 `{}`

### GET /auth/me
```json
// Response 200
{ "id": "string", "username": "string", "email": "string", "role": "doctor|nurse|admin" }
```

---

## Patients

Patient object:
```json
{ "id": "string", "firstName": "string", "lastName": "string", "dateOfBirth": "ISO8601", "gender": "male|female|other", "admissionDate": "ISO8601", "roomNumber": "string", "bedNumber": "string", "status": "stable|critical|recovering|deceased", "diagnosis": "string" }
```

| Method | Path | Body | Response |
|--------|------|------|----------|
| GET | `/patients` | — | `Patient[]` 200 |
| GET | `/patients/:id` | — | `Patient` 200 |
| POST | `/patients` | Patient (no id) | `Patient` 201 |
| PUT | `/patients/:id` | Partial Patient | `Patient` 200 |
| DELETE | `/patients/:id` | — | 204 |
| GET | `/patients/:id/vitals` | — | `VitalSigns[]` 200 |
| GET | `/patients/:id/timeline` | — | `TimelineEvent[]` 200 |

VitalSigns: `{ id, patientId, timestamp, heartRate, bloodPressureSystolic, bloodPressureDiastolic, temperature, respiratoryRate, oxygenSaturation }`

TimelineEvent: `{ id, patientId, timestamp, type: "medication|procedure|assessment|alert", title, description, createdBy }`

---

## Predictions

Prediction object:
```json
{ "id": "string", "patientId": "string", "timestamp": "ISO8601", "predictionType": "mortality|deterioration|sepsis|ards", "probability": 0-1, "confidence": 0-1, "factors": [{ "name", "value", "impact": "positive|negative|neutral", "importance": 0-1 }], "recommendation": "string" }
```

| Method | Path | Body | Response |
|--------|------|------|----------|
| GET | `/predictions` | `?patientId=` | `Prediction[]` 200 |
| GET | `/predictions/:id` | — | `Prediction` 200 |
| POST | `/predictions` | `{ patientId, predictionType }` | `Prediction` 201 |
| DELETE | `/predictions/:id` | — | 204 |

---

## Simulations

Simulation object:
```json
{ "id": "string", "patientId": "string", "name": "string", "description": "string", "createdAt": "ISO8601", "status": "draft|running|completed|failed", "parameters": [{ "name", "value", "unit", "range": [min, max] }], "results": [{ "timestamp", "metric", "value", "status": "normal|warning|critical" }] }
```

| Method | Path | Body | Response |
|--------|------|------|----------|
| GET | `/simulations` | `?patientId=` | `Simulation[]` 200 |
| GET | `/simulations/:id` | — | `Simulation` 200 |
| POST | `/simulations` | Simulation (no id/results) | `Simulation` 201 |
| PUT | `/simulations/:id` | Partial Simulation | `Simulation` 200 |
| DELETE | `/simulations/:id` | — | 204 |
| POST | `/simulations/:id/run` | — | `Simulation` (status: running) 200 |

---

## Errors

| Status | Body |
|--------|------|
| 400 | `{ "message": "description" }` |
| 401 | `{ "message": "Invalid or expired token" }` |
| 403 | `{ "message": "Insufficient permissions" }` |
| 404 | `{ "message": "Resource not found" }` |
| 500 | `{ "message": "Internal server error" }` |

---

## Notes

- Timestamps: ISO 8601 (e.g. `2026-02-16T19:35:38.863Z`)
- Probability/confidence: `0–1`
- Access tokens: short-lived (15 min); refresh tokens: long-lived (7 days)


