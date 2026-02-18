import { apiClient } from "../../../lib/api-client";
import type { Simulation } from "../types";

export const simulationService = {
  getSimulations: async (patientId?: string): Promise<Simulation[]> => {
    const params = new URLSearchParams();
    if (patientId) {
      params.append("patientId", patientId);
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    return apiClient.get<Simulation[]>(`/simulations${query}`);
  },

  getSimulation: async (id: string): Promise<Simulation> => {
    return apiClient.get<Simulation>(`/simulations/${id}`);
  },

  createSimulation: async (data: Partial<Simulation>): Promise<Simulation> => {
    return apiClient.post<Simulation>("/simulations", data);
  },

  updateSimulation: async (
    id: string,
    data: Partial<Simulation>,
  ): Promise<Simulation> => {
    return apiClient.put<Simulation>(`/simulations/${id}`, data);
  },

  deleteSimulation: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/simulations/${id}`);
  },

  runSimulation: async (id: string): Promise<Simulation> => {
    return apiClient.post<Simulation>(`/simulations/${id}/run`);
  },
};
