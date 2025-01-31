import { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useTranslations } from '@/hooks/useTranslations';
import { useNotifications } from '@/hooks/useNotifications';
import type { Patient } from '@/types/patient';
import type { TranslationKey } from '@/utils/translations';
import { type CalendarEvent, type EventType, type EventStatus } from '@/services/calendarService';

interface EditEventDialogProps {
  open: boolean;
  onClose: () => void;
  event: CalendarEvent;
  patient: Patient;
  onEventUpdated: (event: CalendarEvent) => void;
  onEventDeleted: (eventId: string) => void;
}

type CalendarTranslation = Extract<TranslationKey, `calendar.${string}`>;

const EditEventDialog: React.FC<EditEventDialogProps> = ({
  open,
  onClose,
  event,
  patient,
  onEventUpdated,
  onEventDeleted,
}) => {
  const { t } = useTranslations();
  const { showError } = useNotifications();
  const [title, setTitle] = useState(event.title);
  const [start, setStart] = useState<Date>(event.start);
  const [type, setType] = useState<EventType>(event.type);
  const [status, setStatus] = useState<EventStatus>(event.status);
  const [description, setDescription] = useState(event.description || '');

  useEffect(() => {
    setTitle(event.title);
    setStart(event.start);
    setType(event.type);
    setStatus(event.status);
    setDescription(event.description || '');
  }, [event]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) {
      showError('calendar.eventTitleRequired' as CalendarTranslation);
      return;
    }

    try {
      const updatedEvent: CalendarEvent = {
        ...event,
        title,
        start,
        type,
        status,
        description,
        updatedAt: new Date(),
      };

      onEventUpdated(updatedEvent);
      onClose();
    } catch (error) {
      console.error('Error updating event:', error);
      showError('calendar.updateEventError' as CalendarTranslation);
    }
  };

  const handleDelete = () => {
    if (window.confirm(t('calendar.deleteConfirmation' as CalendarTranslation))) {
      try {
        onEventDeleted(event.id!);
        onClose();
      } catch (error) {
        console.error('Error deleting event:', error);
        showError('calendar.deleteEventError' as CalendarTranslation);
      }
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
              onChange={(newValue) => newValue && setStart(newValue)}
            />
            <FormControl fullWidth>
              <InputLabel>{t('calendar.eventType' as CalendarTranslation)}</InputLabel>
              <Select
                value={type}
                label={t('calendar.eventType' as CalendarTranslation)}
                onChange={(event: SelectChangeEvent<string>) => {
                  setType(event.target.value as EventType);
                }}
              >
                <MenuItem value="visit">{t('calendar.eventTypes.visit' as CalendarTranslation)}</MenuItem>
                <MenuItem value="consultation">{t('calendar.eventTypes.consultation' as CalendarTranslation)}</MenuItem>
                <MenuItem value="followup">{t('calendar.eventTypes.followup' as CalendarTranslation)}</MenuItem>
                <MenuItem value="other">{t('calendar.eventTypes.other' as CalendarTranslation)}</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>{t('calendar.eventStatus' as CalendarTranslation)}</InputLabel>
              <Select
                value={status}
                label={t('calendar.eventStatus' as CalendarTranslation)}
                onChange={(event: SelectChangeEvent<string>) => {
                  setStatus(event.target.value as EventStatus);
                }}
              >
                <MenuItem value="scheduled">{t('calendar.eventStatuses.scheduled' as CalendarTranslation)}</MenuItem>
                <MenuItem value="completed">{t('calendar.eventStatuses.completed' as CalendarTranslation)}</MenuItem>
                <MenuItem value="cancelled">{t('calendar.eventStatuses.cancelled' as CalendarTranslation)}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label={t('calendar.eventDescription' as CalendarTranslation)}
              value={description}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelete} color="error">
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