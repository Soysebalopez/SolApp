import { useState, useCallback, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, useTheme } from '@mui/material';
import type { EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import { useTranslations } from '@/hooks/useTranslations';
import { useNotifications } from '@/hooks/useNotifications';
import AddEventDialog from './AddEventDialog';
import type { Patient } from '@/types/patient';
import type { TranslationKey } from '@/utils/translations';
import { calendarService, type CalendarEvent, EVENT_COLORS } from '@/services/calendarService';
import EditEventDialog from './EditEventDialog';

interface CalendarProps {
  patient: Patient;
  onEventAdded: (event: EventInput) => void;
}

type CalendarTranslation = Extract<TranslationKey, `calendar.${string}`>;

export const Calendar = ({ patient, onEventAdded }: CalendarProps) => {
  const theme = useTheme();
  const { t } = useTranslations();
  const { showError, showSuccess } = useNotifications();
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);

  const loadEvents = useCallback(async () => {
    try {
      const patientEvents = await calendarService.getPatientEvents(patient.id!);
      setEvents(patientEvents);
    } catch (error) {
      showError('calendar.loadEventsError' as CalendarTranslation);
    }
  }, [patient.id, showError]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const handleEventAdded = async (event: EventInput) => {
    try {
      const newEvent = await calendarService.createEvent({
        ...event,
        patientId: patient.id!,
      });
      setEvents(prev => [...prev, newEvent]);
      onEventAdded(newEvent);
      showSuccess('calendar.eventAdded' as CalendarTranslation);
    } catch (error) {
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
      showError('calendar.updateEventError' as CalendarTranslation);
    }
  };

  const handleEventDeleted = async (eventId: string) => {
    try {
      await calendarService.deleteEvent(eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
      showSuccess('calendar.eventDeleted' as CalendarTranslation);
    } catch (error) {
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
    <Box sx={{ height: 600, mt: 2 }}>
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