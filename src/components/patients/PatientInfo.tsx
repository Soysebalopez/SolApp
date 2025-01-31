import React from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  Button,
  TextField
} from '@mui/material';
import type { Patient } from '@/types/patient';
import { patientService } from '@/services/patientService';

interface PatientInfoProps {
  patient: Patient;
}

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body1">
      {value}
    </Typography>
  </Box>
);

const PatientInfo = ({ patient }: PatientInfoProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: patient.name,
    age: patient.age.toString(),
    phoneNumber: patient.phoneNumber,
    caretaker: patient.caretaker,
    pediatrician: patient.pediatrician,
    consultationReason: patient.consultationReason
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patient.id) return;

    try {
      await patientService.updatePatient(patient.id, {
        ...patient,
        ...formData,
        age: parseInt(formData.age, 10)
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Caretaker"
              name="caretaker"
              value={formData.caretaker}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Pediatrician"
              name="pediatrician"
              value={formData.pediatrician}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Consultation Reason"
              name="consultationReason"
              value={formData.consultationReason}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="outlined"
          onClick={() => setIsEditing(true)}
        >
          Edit Information
        </Button>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <InfoRow label="Name" value={patient.name} />
          <InfoRow label="Age" value={patient.age.toString()} />
          <InfoRow label="Phone Number" value={patient.phoneNumber} />
        </Grid>
        <Grid item xs={12} md={6}>
          <InfoRow label="Caretaker" value={patient.caretaker} />
          <InfoRow label="Pediatrician" value={patient.pediatrician || 'Not assigned'} />
          <InfoRow label="Consultation Reason" value={patient.consultationReason} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientInfo; 