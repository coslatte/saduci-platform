import { apiClient } from '../../../lib/api-client';
import type { Patient, VitalSign, TimelineEvent } from '../types';

export const patientService = {
  getPatients: async (): Promise<Patient[]> => {
    return apiClient.get<Patient[]>('/patients');
  },

  getPatient: async (id: string): Promise<Patient> => {
    return apiClient.get<Patient>(`/patients/${id}`);
  },

  getPatientVitals: async (id: string): Promise<VitalSign[]> => {
    return apiClient.get<VitalSign[]>(`/patients/${id}/vitals`);
  },

  getPatientTimeline: async (id: string): Promise<TimelineEvent[]> => {
    return apiClient.get<TimelineEvent[]>(`/patients/${id}/timeline`);
  },
};
