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
  MenuItem
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useTranslations } from '@/hooks/useTranslations';
import { useNotifications } from '@/hooks/useNotifications';
import type { Patient } from '@/types/patient';
import type { TranslationKey } from '@/utils/translations';
import { type CalendarEvent, type EventType, type EventStatus, EVENT_COLORS } from '@/services/calendarService';
import type { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker';

interface AddEventDialogProps {
  open: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  patient: Patient;
  onEventAdded: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

type CalendarTranslation = Extract<TranslationKey, `calendar.${string}`>;

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  open,
  onClose,
  selectedDate,
  patient,
  onEventAdded,
}) => {
  const { t } = useTranslations();
  const { showError, showSuccess } = useNotifications();
  const [title, setTitle] = useState('');
  const [start, setStart] = useState<Date | null>(selectedDate);
  const [type, setType] = useState<EventType>('visit');
  const [status, setStatus] = useState<EventStatus>('scheduled');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!open) {
      setTitle('');
      setStart(selectedDate);
      setType('visit');
      setStatus('scheduled');
      setDescription('');
    }
  }, [open, selectedDate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!start) {
      showError('calendar.eventDateRequired' as CalendarTranslation);
      return;
    }
    if (!title.trim()) {
      showError('calendar.eventTitleRequired' as CalendarTranslation);
      return;
    }

    try {
      const newEvent: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'> = {
        title,
        start,
        allDay: true,
        patientId: patient.id!,
        type,
        status,
        description,
      };

      onEventAdded(newEvent);
      setTitle('');
      setDescription('');
      onClose();
    } catch (error) {
      showError('calendar.addEventError' as CalendarTranslation);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{t('calendar.addEvent' as CalendarTranslation)}</DialogTitle>
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
              onChange={(newValue: Date | null) => newValue && setStart(newValue)}
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
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit" variant="contained">
            {t('common.save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddEventDialog; 