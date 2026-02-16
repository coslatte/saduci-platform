import { useQuery } from '@tanstack/react-query';
import { patientService } from '../services/patient.service';

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getPatients,
  });
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: () => patientService.getPatient(id),
    enabled: !!id,
  });
};

export const usePatientVitals = (id: string) => {
  return useQuery({
    queryKey: ['patient', id, 'vitals'],
    queryFn: () => patientService.getPatientVitals(id),
    enabled: !!id,
    refetchInterval: 30000, // Refresh every 30 seconds
  });
};

export const usePatientTimeline = (id: string) => {
  return useQuery({
    queryKey: ['patient', id, 'timeline'],
    queryFn: () => patientService.getPatientTimeline(id),
    enabled: !!id,
  });
};
