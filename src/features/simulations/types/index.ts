export interface Simulation {
  id: string;
  patientId: string;
  name: string;
  description: string;
  createdAt: string;
  status: "draft" | "running" | "completed" | "failed";
  parameters: SimulationParameter[];
  results?: SimulationResult[];
}

export interface SimulationParameter {
  name: string;
  value: number;
  unit: string;
  range: [number, number];
}

export interface SimulationResult {
  timestamp: string;
  metric: string;
  value: number;
  status: "normal" | "warning" | "critical";
}
