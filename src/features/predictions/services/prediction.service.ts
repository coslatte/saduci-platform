import { apiClient } from '../../../lib/api-client';
import type { PredictionResult } from '../types';

export const predictionService = {
  getPredictions: async (patientId?: string): Promise<PredictionResult[]> => {
    const query = patientId ? `?patientId=${patientId}` : '';
    return apiClient.get<PredictionResult[]>(`/predictions${query}`);
  },

  getPrediction: async (id: string): Promise<PredictionResult> => {
    return apiClient.get<PredictionResult>(`/predictions/${id}`);
  },
};
