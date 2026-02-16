import { apiClient } from '../../../lib/api-client';
import type { Simulation } from '../types';

export const simulationService = {
  getSimulations: async (patientId?: string): Promise<Simulation[]> => {
    const query = patientId ? `?patientId=${patientId}` : '';
    return apiClient.get<Simulation[]>(`/simulations${query}`);
  },

  getSimulation: async (id: string): Promise<Simulation> => {
    return apiClient.get<Simulation>(`/simulations/${id}`);
  },

  createSimulation: async (data: Partial<Simulation>): Promise<Simulation> => {
    return apiClient.post<Simulation>('/simulations', data);
  },

  runSimulation: async (id: string): Promise<Simulation> => {
    return apiClient.post<Simulation>(`/simulations/${id}/run`);
  },
};
