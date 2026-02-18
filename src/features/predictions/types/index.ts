export interface PredictionResult {
  id: string;
  patientId: string;
  timestamp: string;
  predictionType: "mortality" | "deterioration" | "sepsis" | "ards";
  probability: number;
  confidence: number;
  factors: PredictionFactor[];
  recommendation: string;
}

export interface PredictionFactor {
  name: string;
  value: number;
  impact: "positive" | "negative" | "neutral";
  importance: number;
}
