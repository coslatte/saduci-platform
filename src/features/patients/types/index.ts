export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  admissionDate: string;
  roomNumber: string;
  status: 'stable' | 'critical' | 'recovering' | 'deceased';
  diagnosis: string;
  bedNumber: string;
}

export interface VitalSign {
  id: string;
  patientId: string;
  timestamp: string;
  heartRate: number;
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  temperature: number;
  respiratoryRate: number;
  oxygenSaturation: number;
}

export interface TimelineEvent {
  id: string;
  patientId: string;
  timestamp: string;
  type: 'medication' | 'procedure' | 'assessment' | 'alert';
  title: string;
  description: string;
  createdBy: string;
}
