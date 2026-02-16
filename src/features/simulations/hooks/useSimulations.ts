import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { simulationService } from '../services/simulation.service';
import type { Simulation } from '../types';

export const useSimulations = (patientId?: string) => {
  return useQuery({
    queryKey: ['simulations', patientId],
    queryFn: () => simulationService.getSimulations(patientId),
  });
};

export const useSimulation = (id: string) => {
  return useQuery({
    queryKey: ['simulation', id],
    queryFn: () => simulationService.getSimulation(id),
    enabled: !!id,
  });
};

export const useCreateSimulation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Partial<Simulation>) => simulationService.createSimulation(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
};

export const useRunSimulation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => simulationService.runSimulation(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['simulation', data.id] });
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
  });
};
