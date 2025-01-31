import { useState, useCallback, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, useTheme, CircularProgress } from '@mui/material';
import type { DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { useTranslations } from '@/hooks/useTranslations';
import { useNotifications } from '@/hooks/useNotifications';
import AddEventDialog from './AddEventDialog';
import EditEventDialog from './EditEventDialog';
import type { Patient } from '@/types/patient';
import type { TranslationKey } from '@/utils/translations';
import { calendarService, type CalendarEvent, EVENT_COLORS } from '@/services/calendarService';

interface CalendarProps {
  patient: Patient;
  onEventAdded: (event: CalendarEvent) => void;
}

type CalendarTranslation = Extract<TranslationKey, `calendar.${string}`>;

export const Calendar: React.FC<CalendarProps> = ({ patient, onEventAdded }) => {
  const theme = useTheme();
  const { t } = useTranslations();
  const { showError, showSuccess } = useNotifications();
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const patientEvents = await calendarService.getPatientEvents(patient.id!);
      setEvents(patientEvents);
    } catch (error) {
      console.error('Error loading events:', error);
      showError('calendar.loadEventsError' as CalendarTranslation);
    } finally {
      setIsLoading(false);
    }
  }, [patient.id, showError]);

  useEffect(() => {
    let mounted = true;
    
    const fetchEvents = async () => {
      try {
        const patientEvents = await calendarService.getPatientEvents(patient.id!);
        if (mounted) {
          setEvents(patientEvents);
        }
      } catch (error) {
        if (mounted) {
          console.error('Error loading events:', error);
          showError('calendar.loadEventsError' as CalendarTranslation);
        }
      }
    };

    fetchEvents();
    
    return () => {
      mounted = false;
    };
  }, [patient.id, showError]);

  const handleEventAdded = async (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newEvent = await calendarService.createEvent(event);
      setEvents(prev => [...prev, newEvent]);
      onEventAdded(newEvent);
      showSuccess('calendar.eventAdded' as CalendarTranslation);
    } catch (error) {
      console.error('Error adding event:', error);
      showError('calendar.addEventError' as CalendarTranslation);
    }
  };

  const handleDateSelect = useCallback((selectInfo: DateSelectArg) => {
    setSelectedDate(selectInfo.start);
    setIsAddEventOpen(true);
  }, []);

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    const event = events.find(e => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setIsEditEventOpen(true);
    }
  }, [events]);

  const handleEventUpdated = async (updatedEvent: CalendarEvent) => {
    try {
      await calendarService.updateEvent(updatedEvent.id!, updatedEvent);
      setEvents(prev => prev.map(event => 
        event.id === updatedEvent.id ? updatedEvent : event
      ));
      showSuccess('calendar.eventUpdated' as CalendarTranslation);
    } catch (error) {
      console.error('Error updating event:', error);
      showError('calendar.updateEventError' as CalendarTranslation);
    }
  };

  const handleEventDeleted = async (eventId: string) => {
    try {
      await calendarService.deleteEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
      showSuccess('calendar.eventDeleted' as CalendarTranslation);
    } catch (error) {
      console.error('Error deleting event:', error);
      showError('calendar.deleteEventError' as CalendarTranslation);
    }
  };

  const getEventProps = useCallback((event: CalendarEvent) => {
    const colors = EVENT_COLORS[event.type][event.status];
    return {
      backgroundColor: colors.background,
      borderColor: colors.border,
    };
  }, []);

  return (
    <Box sx={{ height: 600, mt: 2, position: 'relative' }}>
      {isLoading && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: 1,
        }}>
          <CircularProgress />
        </Box>
      )}
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events.map(event => ({
          ...event,
          ...getEventProps(event),
        }))}
        select={handleDateSelect}
        locale="es"
        buttonText={{
          today: t('calendar.today' as CalendarTranslation),
          month: t('calendar.month' as CalendarTranslation),
          week: t('calendar.week' as CalendarTranslation),
          day: t('calendar.day' as CalendarTranslation),
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }}
        eventClick={handleEventClick}
      />

      <AddEventDialog
        open={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        selectedDate={selectedDate}
        patient={patient}
        onEventAdded={handleEventAdded}
      />

      {selectedEvent && (
        <EditEventDialog
          open={isEditEventOpen}
          onClose={() => {
            setIsEditEventOpen(false);
            setSelectedEvent(null);
          }}
          event={selectedEvent}
          patient={patient}
          onEventUpdated={handleEventUpdated}
          onEventDeleted={handleEventDeleted}
        />
      )}
    </Box>
  );
}; 