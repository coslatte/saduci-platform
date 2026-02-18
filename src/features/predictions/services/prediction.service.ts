import { apiClient } from "../../../lib/api-client";
import type { PredictionResult } from "../types";

export const predictionService = {
  getPredictions: async (patientId?: string): Promise<PredictionResult[]> => {
    const params = new URLSearchParams();
    if (patientId) {
      params.append("patientId", patientId);
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiClient.get<PredictionResult[]>(`/predictions${query}`);
  },

  getPrediction: async (id: string): Promise<PredictionResult> => {
    return apiClient.get<PredictionResult>(`/predictions/${id}`);
  },

  createPrediction: async (
    patientId: string,
    predictionType: string,
  ): Promise<PredictionResult> => {
    return apiClient.post<PredictionResult>("/predictions", {
      patientId,
      predictionType,
    });
  },

  deletePrediction: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/predictions/${id}`);
  },
};
