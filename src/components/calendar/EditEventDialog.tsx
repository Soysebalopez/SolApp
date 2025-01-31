import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  TextField,
  Box
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import type { EventInput } from '@fullcalendar/core';
import { useTranslations } from '@/hooks/useTranslations';
import { useNotifications } from '@/hooks/useNotifications';
import type { Patient } from '@/types/patient';
import type { TranslationKey } from '@/utils/translations';
import { type CalendarEvent } from '@/services/calendarService';

interface EditEventDialogProps {
  open: boolean;
  onClose: () => void;
  event: CalendarEvent;
  patient: Patient;
  onEventUpdated: (event: CalendarEvent) => void;
  onEventDeleted: (eventId: string) => void;
}

type CalendarTranslation = Extract<TranslationKey, `calendar.${string}`>;

const EditEventDialog = ({
  open,
  onClose,
  event,
  patient,
  onEventUpdated,
  onEventDeleted,
}: EditEventDialogProps) => {
  const { t } = useTranslations();
  const { showError, showSuccess } = useNotifications();
  const [title, setTitle] = useState(event.title);
  const [start, setStart] = useState<Date | null>(event.start);

  useEffect(() => {
    setTitle(event.title);
    setStart(event.start);
  }, [event]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!start) return;

    try {
      const updatedEvent: CalendarEvent = {
        ...event,
        title,
        start,
        allDay: true,
        patientId: patient.id!,
      };

      onEventUpdated(updatedEvent);
      onClose();
    } catch (error) {
      showError('calendar.updateEventError' as CalendarTranslation);
    }
  };

  const handleDelete = async () => {
    try {
      onEventDeleted(event.id!);
      onClose();
    } catch (error) {
      showError('calendar.deleteEventError' as CalendarTranslation);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t('calendar.editEvent' as CalendarTranslation)}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label={t('calendar.eventTitle' as CalendarTranslation)}
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <DateTimePicker
              label={t('calendar.eventDate' as CalendarTranslation)}
              value={start}
              onChange={setStart}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleDelete} 
            color="error"
          >
            {t('common.delete')}
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit" variant="contained">
            {t('common.save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditEventDialog; 