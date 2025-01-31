import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc, 
  query, 
  where,
  getDocs 
} from '@firebase/firestore';
import type { EventInput } from '@fullcalendar/core';
import { AppError, handleError } from '@/utils/errorHandler';

export type EventType = 'visit' | 'consultation' | 'followup' | 'other';
export type EventStatus = 'scheduled' | 'completed' | 'cancelled';

export interface CalendarEvent {
  id?: string;
  title: string;
  start: Date;
  end?: Date;
  allDay?: boolean;
  patientId: string;
  visitId?: string;
  type: EventType;
  status: EventStatus;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const EVENT_COLORS = {
  visit: {
    scheduled: { background: '#4CAF50', border: '#2E7D32' },
    completed: { background: '#81C784', border: '#4CAF50' },
    cancelled: { background: '#E8F5E9', border: '#C8E6C9' },
  },
  consultation: {
    scheduled: { background: '#2196F3', border: '#1976D2' },
    completed: { background: '#64B5F6', border: '#2196F3' },
    cancelled: { background: '#E3F2FD', border: '#BBDEFB' },
  },
  followup: {
    scheduled: { background: '#FF9800', border: '#F57C00' },
    completed: { background: '#FFB74D', border: '#FF9800' },
    cancelled: { background: '#FFF3E0', border: '#FFE0B2' },
  },
  other: {
    scheduled: { background: '#9C27B0', border: '#7B1FA2' },
    completed: { background: '#BA68C8', border: '#9C27B0' },
    cancelled: { background: '#F3E5F5', border: '#E1BEE7' },
  },
} as const;

const convertToDate = (date: Date | { toDate: () => Date } | string | number): Date => {
  if (date instanceof Date) return date;
  if (typeof date === 'object' && 'toDate' in date) return date.toDate();
  return new Date(date);
};

export const calendarService = {
  async createEvent(event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      if (!event.title || !event.start || !event.patientId) {
        throw new Error('Missing required fields');
      }

      const eventData = {
        ...event,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const docRef = await addDoc(collection(db, 'events'), eventData);
      return { ...eventData, id: docRef.id };
    } catch (error) {
      console.error('Error creating event:', error);
      throw handleError(error);
    }
  },

  async updateEvent(id: string, event: Partial<CalendarEvent>) {
    try {
      const eventRef = doc(db, 'events', id);
      const updateData = {
        ...event,
        updatedAt: new Date(),
      };
      await updateDoc(eventRef, updateData);
      return { ...event, id };
    } catch (error) {
      throw handleError(error);
    }
  },

  async deleteEvent(id: string) {
    try {
      const eventRef = doc(db, 'events', id);
      await deleteDoc(eventRef);
    } catch (error) {
      throw handleError(error);
    }
  },

  async getPatientEvents(patientId: string) {
    try {
      const eventsQuery = query(
        collection(db, 'events'),
        where('patientId', '==', patientId)
      );
      const snapshot = await getDocs(eventsQuery);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          start: convertToDate(data.start),
          end: data.end ? convertToDate(data.end) : undefined,
          createdAt: convertToDate(data.createdAt),
          updatedAt: convertToDate(data.updatedAt),
        } as CalendarEvent;
      });
    } catch (error) {
      console.error('Error getting events:', error);
      throw handleError(error);
    }
  },
}; 