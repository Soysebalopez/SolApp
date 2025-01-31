export interface Patient {
  id?: string;
  name: string;
  caretaker: string;
  pediatrician: string;
  phoneNumber: string;
  age: number;
  birthDate: Date;
  consultationReason: string;
  clinicalHistory: {
    pregnancy: string;
    currentIllness: string;
    pathologicalHistory: string;
    socioeconomicAspects: string;
    familyHistory: string;
    patientHabits: string;
  };
  weightHeightProgress: Array<{
    date: Date;
    age: number;
    weight: number;
    weightDE: number;
    heightLength: number;
    heightDE: number;
    bmi: number;
    bmiDE: number;
  }>;
  physicalExam: string;
  anthropometry: {
    weight: number;
    height: number;
    bmi: number;
    headCircumference: number;
    armCircumference: number;
    triceps: number;
  };
  nutritionalDiagnosis: string;
  biochemicalEvaluation: string;
  intakeEvaluation: string;
  visits: Array<{
    date: Date;
    age: number;
    weight: number;
    weightDE: number;
    heightLength: number;
    heightDE: number;
    bmi: number;
    bmiDE: number;
    evolution: string;
  }>;
}

export type PatientFormData = Omit<Patient, 'id' | 'weightHeightProgress' | 'visits'>; 