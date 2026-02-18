import type {
  Patient,
  VitalSign,
  TimelineEvent,
} from "../features/patients/types";
import type { PredictionResult } from "../features/predictions/types";
import type { Simulation } from "../features/simulations/types";
import type { AuthResponse } from "../features/auth/types";

export const mockAuthResponse: AuthResponse = {
  user: {
    id: "1",
    username: "dr.martinez",
    email: "martinez@hospital.cu",
    role: "doctor",
  },
  tokens: {
    accessToken: "mock-jwt-token",
    refreshToken: "mock-refresh-token",
  },
};

export const mockPatients: Patient[] = [
  {
    id: "1",
    firstName: "Carlos",
    lastName: "Rodriguez",
    dateOfBirth: "1965-03-15",
    gender: "male",
    admissionDate: "2026-02-10",
    roomNumber: "301",
    bedNumber: "A",
    status: "critical",
    diagnosis: "Acute Respiratory Distress Syndrome (ARDS)",
  },
  {
    id: "2",
    firstName: "Maria",
    lastName: "Gonzalez",
    dateOfBirth: "1978-07-22",
    gender: "female",
    admissionDate: "2026-02-12",
    roomNumber: "302",
    bedNumber: "B",
    status: "stable",
    diagnosis: "Post-operative monitoring - cardiac surgery",
  },
  {
    id: "3",
    firstName: "Juan",
    lastName: "Perez",
    dateOfBirth: "1952-11-08",
    gender: "male",
    admissionDate: "2026-02-14",
    roomNumber: "303",
    bedNumber: "A",
    status: "recovering",
    diagnosis: "Septic shock",
  },
];

export const mockVitals: VitalSign[] = [
  {
    id: "1",
    patientId: "1",
    timestamp: new Date().toISOString(),
    heartRate: 98,
    bloodPressureSystolic: 118,
    bloodPressureDiastolic: 75,
    temperature: 37.2,
    respiratoryRate: 18,
    oxygenSaturation: 95,
  },
  {
    id: "2",
    patientId: "1",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    heartRate: 102,
    bloodPressureSystolic: 115,
    bloodPressureDiastolic: 72,
    temperature: 37.4,
    respiratoryRate: 19,
    oxygenSaturation: 94,
  },
];

export const mockTimeline: TimelineEvent[] = [
  {
    id: "1",
    patientId: "1",
    timestamp: new Date().toISOString(),
    type: "assessment",
    title: "Vital Signs Assessment",
    description: "Routine vital signs check completed. Patient stable.",
    createdBy: "Dr. Martinez",
  },
  {
    id: "2",
    patientId: "1",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    type: "medication",
    title: "Administered Antibiotics",
    description: "IV antibiotics administered as scheduled - Ceftriaxone 2g",
    createdBy: "Nurse Lopez",
  },
  {
    id: "3",
    patientId: "1",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    type: "alert",
    title: "Low Oxygen Saturation",
    description: "SpO2 dropped to 88%. Increased oxygen flow to 6L/min.",
    createdBy: "Nurse Garcia",
  },
];

export const mockPredictions: PredictionResult[] = [
  {
    id: "1",
    patientId: "1",
    timestamp: new Date().toISOString(),
    predictionType: "mortality",
    probability: 0.35,
    confidence: 0.82,
    factors: [
      { name: "Age", value: 61, impact: "negative", importance: 0.85 },
      { name: "SOFA Score", value: 8, impact: "negative", importance: 0.92 },
      {
        name: "Lactate Level",
        value: 3.2,
        impact: "negative",
        importance: 0.78,
      },
      {
        name: "Blood Pressure",
        value: 118,
        impact: "positive",
        importance: 0.65,
      },
    ],
    recommendation:
      "Continue close monitoring. Consider early goal-directed therapy.",
  },
  {
    id: "2",
    patientId: "1",
    timestamp: new Date().toISOString(),
    predictionType: "sepsis",
    probability: 0.68,
    confidence: 0.88,
    factors: [
      { name: "WBC Count", value: 18.5, impact: "negative", importance: 0.89 },
      {
        name: "Temperature",
        value: 38.4,
        impact: "negative",
        importance: 0.76,
      },
      { name: "Heart Rate", value: 110, impact: "negative", importance: 0.71 },
    ],
    recommendation:
      "High risk of sepsis. Initiate sepsis protocol immediately.",
  },
];

export const mockSimulations: Simulation[] = [
  {
    id: "1",
    patientId: "1",
    name: "Fluid Resuscitation Scenario",
    description: "Simulation of different fluid resuscitation strategies",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: "completed",
    parameters: [
      { name: "Initial CVP", value: 8, unit: "mmHg", range: [5, 15] },
      { name: "Fluid Volume", value: 1000, unit: "mL", range: [500, 2000] },
      { name: "Infusion Rate", value: 200, unit: "mL/hr", range: [100, 500] },
    ],
    results: [
      {
        timestamp: new Date().toISOString(),
        metric: "Mean Arterial Pressure",
        value: 75,
        status: "normal",
      },
      {
        timestamp: new Date().toISOString(),
        metric: "Cardiac Output",
        value: 5.2,
        status: "normal",
      },
      {
        timestamp: new Date().toISOString(),
        metric: "Urine Output",
        value: 45,
        status: "warning",
      },
    ],
  },
  {
    id: "2",
    patientId: "1",
    name: "Ventilator Settings Optimization",
    description: "Testing different ventilator parameters",
    createdAt: new Date().toISOString(),
    status: "draft",
    parameters: [
      { name: "PEEP", value: 8, unit: "cmH2O", range: [5, 15] },
      { name: "FiO2", value: 60, unit: "%", range: [40, 100] },
      { name: "Tidal Volume", value: 450, unit: "mL", range: [300, 600] },
    ],
  },
];
