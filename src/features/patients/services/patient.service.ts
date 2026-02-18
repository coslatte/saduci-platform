import { apiClient } from "../../../lib/api-client";
import type { Patient, VitalSign, TimelineEvent } from "../types";

export const patientService = {
  getPatients: async (): Promise<Patient[]> => {
    return apiClient.get<Patient[]>("/patients");
  },

  getPatient: async (id: string): Promise<Patient> => {
    return apiClient.get<Patient>(`/patients/${id}`);
  },

  createPatient: async (data: Omit<Patient, "id">): Promise<Patient> => {
    return apiClient.post<Patient>("/patients", data);
  },

  updatePatient: async (
    id: string,
    data: Partial<Patient>,
  ): Promise<Patient> => {
    return apiClient.put<Patient>(`/patients/${id}`, data);
  },

  deletePatient: async (id: string): Promise<void> => {
    return apiClient.delete<void>(`/patients/${id}`);
  },

  getPatientVitals: async (id: string): Promise<VitalSign[]> => {
    return apiClient.get<VitalSign[]>(`/patients/${id}/vitals`);
  },

  getPatientTimeline: async (id: string): Promise<TimelineEvent[]> => {
    return apiClient.get<TimelineEvent[]>(`/patients/${id}/timeline`);
  },
};
