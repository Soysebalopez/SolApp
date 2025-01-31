import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow,
  Typography,
  Box,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Patient } from '@/types/patient';
import { patientService } from '@/services/patientService';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useTranslations } from '@/hooks/useTranslations';
import { useNotifications } from '@/hooks/useNotifications';

interface VisitsProps {
  patient: Patient;
}

const Visits = ({ patient }: VisitsProps) => {
  const { t } = useTranslations();
  const { showError, showSuccess } = useNotifications();

  const handleDeleteVisit = async (visitDate: Date) => {
    if (!patient.id) return;
    
    try {
      const updatedVisits = patient.visits.filter(
        visit => visit.date.toString() !== visitDate.toString()
      );
      
      await patientService.updatePatient(patient.id, {
        ...patient,
        visits: updatedVisits
      });
      showSuccess('deleteVisit');
    } catch (error) {
      showError('deleteVisit');
    }
  };

  const formatDate = (date: Date) => {
    return format(new Date(date), 'PPP', { locale: es });
  };

  if (!patient.visits || patient.visits.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">
          {t('visits.noVisits')}
        </Typography>
      </Box>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>{t('visits.fields.date')}</TableCell>
          <TableCell>{t('visits.fields.age')}</TableCell>
          <TableCell>{t('visits.fields.weight')}</TableCell>
          <TableCell>{t('visits.fields.height')}</TableCell>
          <TableCell>{t('visits.fields.bmi')}</TableCell>
          <TableCell>{t('visits.fields.evolution')}</TableCell>
          <TableCell align="right">{t('common.actions')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {patient.visits.map((visit, index) => (
          <TableRow key={visit.date.toString()}>
            <TableCell>{formatDate(visit.date)}</TableCell>
            <TableCell>{visit.age}</TableCell>
            <TableCell>
              {visit.weight} 
              {visit.weightDE && (
                <Typography 
                  component="span" 
                  color={visit.weightDE > 0 ? "success.main" : "error.main"}
                  sx={{ ml: 1 }}
                >
                  ({visit.weightDE > 0 ? '+' : ''}{visit.weightDE})
                </Typography>
              )}
            </TableCell>
            <TableCell>
              {visit.heightLength}
              {visit.heightDE && (
                <Typography 
                  component="span" 
                  color={visit.heightDE > 0 ? "success.main" : "error.main"}
                  sx={{ ml: 1 }}
                >
                  ({visit.heightDE > 0 ? '+' : ''}{visit.heightDE})
                </Typography>
              )}
            </TableCell>
            <TableCell>
              {visit.bmi}
              {visit.bmiDE && (
                <Typography 
                  component="span" 
                  color={visit.bmiDE > 0 ? "success.main" : "error.main"}
                  sx={{ ml: 1 }}
                >
                  ({visit.bmiDE > 0 ? '+' : ''}{visit.bmiDE})
                </Typography>
              )}
            </TableCell>
            <TableCell>
              <Typography 
                sx={{ 
                  maxWidth: 200,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {visit.evolution}
              </Typography>
            </TableCell>
            <TableCell align="right">
              <Tooltip title={t('visits.tooltips.editVisit')}>
                <IconButton 
                  size="small"
                  onClick={() => {/* TODO: Implement edit visit */}}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('visits.tooltips.deleteVisit')}>
                <IconButton 
                  size="small"
                  onClick={() => handleDeleteVisit(visit.date)}
                  color="error"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Visits; 