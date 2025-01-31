import { db } from '@/lib/firebase';
import { Patient } from '@/types/patient';
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { AppError, handleError } from '@/utils/errorHandler';

export const patientService = {
  async createPatient(patient: Patient) {
    try {
      const docRef = await addDoc(collection(db, 'patients'), patient);
      return { ...patient, id: docRef.id };
    } catch (error) {
      throw handleError(error);
    }
  },

  async updatePatient(id: string, patient: Partial<Patient>) {
    try {
      const patientRef = doc(db, 'patients', id);
      await updateDoc(patientRef, patient);
      return { ...patient, id };
    } catch (error) {
      throw handleError(error);
    }
  },

  async getPatient(id: string) {
    try {
      const patientRef = doc(db, 'patients', id);
      const patientSnap = await getDoc(patientRef);
      if (patientSnap.exists()) {
        return { id: patientSnap.id, ...patientSnap.data() } as Patient;
      }
      throw new AppError('Patient not found', 'patient.not_found');
    } catch (error) {
      throw handleError(error);
    }
  },

  async getAllPatients() {
    try {
      const querySnapshot = await getDocs(collection(db, 'patients'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Patient[];
    } catch (error) {
      throw handleError(error);
    }
  }
}; 