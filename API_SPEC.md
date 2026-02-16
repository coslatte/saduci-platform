# SADECI Platform API Specification

This document defines the REST API contract between the SADECI Platform frontend and backend (sadeci-core).

## Base URL

```
/api
```

## Authentication

All endpoints except `/auth/login` and `/auth/refresh` require Bearer token authentication:

```
Authorization: Bearer <access_token>
```

### Endpoints

#### POST /auth/login

Login with username and password.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "doctor" | "nurse" | "admin"
  },
  "tokens": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

#### POST /auth/refresh

Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

**Response (200 OK):**
```json
{
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "role": "doctor" | "nurse" | "admin"
  },
  "tokens": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

#### POST /auth/logout

Logout and invalidate tokens.

**Response (200 OK):**
```json
{}
```

#### GET /auth/me

Get current authenticated user information.

**Response (200 OK):**
```json
{
  "id": "string",
  "username": "string",
  "email": "string",
  "role": "doctor" | "nurse" | "admin"
}
```

## Patients

### Endpoints

#### GET /patients

Get list of all patients in ICU.

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "firstName": "string",
    "lastName": "string",
    "dateOfBirth": "ISO8601 date string",
    "gender": "male" | "female" | "other",
    "admissionDate": "ISO8601 date string",
    "roomNumber": "string",
    "bedNumber": "string",
    "status": "stable" | "critical" | "recovering" | "deceased",
    "diagnosis": "string"
  }
]
```

#### GET /patients/:id

Get detailed information about a specific patient.

**Path Parameters:**
- `id`: Patient ID

**Response (200 OK):**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "ISO8601 date string",
  "gender": "male" | "female" | "other",
  "admissionDate": "ISO8601 date string",
  "roomNumber": "string",
  "bedNumber": "string",
  "status": "stable" | "critical" | "recovering" | "deceased",
  "diagnosis": "string"
}
```

#### POST /patients

Create a new patient record.

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "ISO8601 date string",
  "gender": "male" | "female" | "other",
  "admissionDate": "ISO8601 date string",
  "roomNumber": "string",
  "bedNumber": "string",
  "status": "stable" | "critical" | "recovering" | "deceased",
  "diagnosis": "string"
}
```

**Response (201 Created):**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "ISO8601 date string",
  "gender": "male" | "female" | "other",
  "admissionDate": "ISO8601 date string",
  "roomNumber": "string",
  "bedNumber": "string",
  "status": "stable" | "critical" | "recovering" | "deceased",
  "diagnosis": "string"
}
```

#### PUT /patients/:id

Update patient information.

**Path Parameters:**
- `id`: Patient ID

**Request Body:** (all fields optional)
```json
{
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "ISO8601 date string",
  "gender": "male" | "female" | "other",
  "admissionDate": "ISO8601 date string",
  "roomNumber": "string",
  "bedNumber": "string",
  "status": "stable" | "critical" | "recovering" | "deceased",
  "diagnosis": "string"
}
```

**Response (200 OK):**
```json
{
  "id": "string",
  "firstName": "string",
  "lastName": "string",
  "dateOfBirth": "ISO8601 date string",
  "gender": "male" | "female" | "other",
  "admissionDate": "ISO8601 date string",
  "roomNumber": "string",
  "bedNumber": "string",
  "status": "stable" | "critical" | "recovering" | "deceased",
  "diagnosis": "string"
}
```

#### DELETE /patients/:id

Delete a patient record.

**Path Parameters:**
- `id`: Patient ID

**Response (204 No Content)**

#### GET /patients/:id/vitals

Get vital signs for a specific patient.

**Path Parameters:**
- `id`: Patient ID

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "patientId": "string",
    "timestamp": "ISO8601 datetime string",
    "heartRate": "number",
    "bloodPressureSystolic": "number",
    "bloodPressureDiastolic": "number",
    "temperature": "number",
    "respiratoryRate": "number",
    "oxygenSaturation": "number"
  }
]
```

#### GET /patients/:id/timeline

Get timeline events for a specific patient.

**Path Parameters:**
- `id`: Patient ID

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "patientId": "string",
    "timestamp": "ISO8601 datetime string",
    "type": "medication" | "procedure" | "assessment" | "alert",
    "title": "string",
    "description": "string",
    "createdBy": "string"
  }
]
```

## Predictions

### Endpoints

#### GET /predictions

Get list of prediction results. Optionally filter by patient.

**Query Parameters:**
- `patientId` (optional): Filter predictions for a specific patient

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "patientId": "string",
    "timestamp": "ISO8601 datetime string",
    "predictionType": "mortality" | "deterioration" | "sepsis" | "ards",
    "probability": "number (0-1)",
    "confidence": "number (0-1)",
    "factors": [
      {
        "name": "string",
        "value": "number",
        "impact": "positive" | "negative" | "neutral",
        "importance": "number (0-1)"
      }
    ],
    "recommendation": "string"
  }
]
```

#### GET /predictions/:id

Get a specific prediction result.

**Path Parameters:**
- `id`: Prediction ID

**Response (200 OK):**
```json
{
  "id": "string",
  "patientId": "string",
  "timestamp": "ISO8601 datetime string",
  "predictionType": "mortality" | "deterioration" | "sepsis" | "ards",
  "probability": "number (0-1)",
  "confidence": "number (0-1)",
  "factors": [
    {
      "name": "string",
      "value": "number",
      "impact": "positive" | "negative" | "neutral",
      "importance": "number (0-1)"
    }
  ],
  "recommendation": "string"
}
```

#### POST /predictions

Create a new prediction for a patient.

**Request Body:**
```json
{
  "patientId": "string",
  "predictionType": "mortality" | "deterioration" | "sepsis" | "ards"
}
```

**Response (201 Created):**
```json
{
  "id": "string",
  "patientId": "string",
  "timestamp": "ISO8601 datetime string",
  "predictionType": "mortality" | "deterioration" | "sepsis" | "ards",
  "probability": "number (0-1)",
  "confidence": "number (0-1)",
  "factors": [
    {
      "name": "string",
      "value": "number",
      "impact": "positive" | "negative" | "neutral",
      "importance": "number (0-1)"
    }
  ],
  "recommendation": "string"
}
```

#### DELETE /predictions/:id

Delete a prediction result.

**Path Parameters:**
- `id`: Prediction ID

**Response (204 No Content)**

## Simulations

### Endpoints

#### GET /simulations

Get list of simulations. Optionally filter by patient.

**Query Parameters:**
- `patientId` (optional): Filter simulations for a specific patient

**Response (200 OK):**
```json
[
  {
    "id": "string",
    "patientId": "string",
    "name": "string",
    "description": "string",
    "createdAt": "ISO8601 datetime string",
    "status": "draft" | "running" | "completed" | "failed",
    "parameters": [
      {
        "name": "string",
        "value": "number",
        "unit": "string",
        "range": [min, max]
      }
    ],
    "results": [
      {
        "timestamp": "ISO8601 datetime string",
        "metric": "string",
        "value": "number",
        "status": "normal" | "warning" | "critical"
      }
    ]
  }
]
```

#### GET /simulations/:id

Get a specific simulation.

**Path Parameters:**
- `id`: Simulation ID

**Response (200 OK):**
```json
{
  "id": "string",
  "patientId": "string",
  "name": "string",
  "description": "string",
  "createdAt": "ISO8601 datetime string",
  "status": "draft" | "running" | "completed" | "failed",
  "parameters": [
    {
      "name": "string",
      "value": "number",
      "unit": "string",
      "range": [min, max]
    }
  ],
  "results": [
    {
      "timestamp": "ISO8601 datetime string",
      "metric": "string",
      "value": "number",
      "status": "normal" | "warning" | "critical"
    }
  ]
}
```

#### POST /simulations

Create a new simulation.

**Request Body:**
```json
{
  "patientId": "string",
  "name": "string",
  "description": "string",
  "parameters": [
    {
      "name": "string",
      "value": "number",
      "unit": "string",
      "range": [min, max]
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "string",
  "patientId": "string",
  "name": "string",
  "description": "string",
  "createdAt": "ISO8601 datetime string",
  "status": "draft",
  "parameters": [
    {
      "name": "string",
      "value": "number",
      "unit": "string",
      "range": [min, max]
    }
  ]
}
```

#### PUT /simulations/:id

Update a simulation.

**Path Parameters:**
- `id`: Simulation ID

**Request Body:** (all fields optional)
```json
{
  "name": "string",
  "description": "string",
  "parameters": [
    {
      "name": "string",
      "value": "number",
      "unit": "string",
      "range": [min, max]
    }
  ]
}
```

**Response (200 OK):**
```json
{
  "id": "string",
  "patientId": "string",
  "name": "string",
  "description": "string",
  "createdAt": "ISO8601 datetime string",
  "status": "draft" | "running" | "completed" | "failed",
  "parameters": [
    {
      "name": "string",
      "value": "number",
      "unit": "string",
      "range": [min, max]
    }
  ],
  "results": [
    {
      "timestamp": "ISO8601 datetime string",
      "metric": "string",
      "value": "number",
      "status": "normal" | "warning" | "critical"
    }
  ]
}
```

#### DELETE /simulations/:id

Delete a simulation.

**Path Parameters:**
- `id`: Simulation ID

**Response (204 No Content)**

#### POST /simulations/:id/run

Execute a simulation.

**Path Parameters:**
- `id`: Simulation ID

**Response (200 OK):**
```json
{
  "id": "string",
  "patientId": "string",
  "name": "string",
  "description": "string",
  "createdAt": "ISO8601 datetime string",
  "status": "running",
  "parameters": [
    {
      "name": "string",
      "value": "number",
      "unit": "string",
      "range": [min, max]
    }
  ],
  "results": [
    {
      "timestamp": "ISO8601 datetime string",
      "metric": "string",
      "value": "number",
      "status": "normal" | "warning" | "critical"
    }
  ]
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Error description"
}
```

### 401 Unauthorized
```json
{
  "message": "Invalid or expired token"
}
```

### 403 Forbidden
```json
{
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "message": "Internal server error"
}
```

## Notes

1. All timestamps should be in ISO 8601 format (e.g., `2026-02-16T19:35:38.863Z`)
2. All numeric probability/confidence values should be between 0 and 1
3. Patient IDs, prediction IDs, and simulation IDs should be strings
4. The frontend uses JWT tokens stored in localStorage
5. Access tokens should be short-lived (15 minutes recommended)
6. Refresh tokens should be long-lived (7 days recommended)
