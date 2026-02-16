import { useQuery } from '@tanstack/react-query';
import { predictionService } from '../services/prediction.service';

export const usePredictions = (patientId?: string) => {
  return useQuery({
    queryKey: ['predictions', patientId],
    queryFn: () => predictionService.getPredictions(patientId),
  });
};

export const usePrediction = (id: string) => {
  return useQuery({
    queryKey: ['prediction', id],
    queryFn: () => predictionService.getPrediction(id),
    enabled: !!id,
  });
};
