import type { ReactNode, ChangeEvent, FormEvent } from 'react';
import type { Patient } from './patient';

export interface PatientInfoProps {
  patient: Patient;
}

export interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

export interface AddVisitDialogProps {
  open: boolean;
  onClose: () => void;
  patient: Patient;
  onVisitAdded: (patient: Patient) => void;
}

export interface CardProps {
  title?: string;
  children: ReactNode;
  action?: ReactNode;
}

export type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export type FormSubmitEvent = FormEvent<HTMLFormElement>; 