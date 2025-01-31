import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  TextField,
  Grid,
  Box
} from '@mui/material';
import { patientService } from '@/services/patientService';
import { Patient } from '@/types/patient';

interface AddPatientDialogProps {
  open: boolean;
  onClose: () => void;
}

const AddPatientDialog = ({ open, onClose }: AddPatientDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phoneNumber: '',
    caretaker: '',
    pediatrician: '',
    consultationReason: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPatient: Patient = {
        ...formData,
        age: parseInt(formData.age),
        birthDate: new Date(),
        clinicalHistory: {
          pregnancy: '',
          currentIllness: '',
          pathologicalHistory: '',
          socioeconomicAspects: '',
          familyHistory: '',
          patientHabits: ''
        },
        weightHeightProgress: [],
        physicalExam: '',
        anthropometry: {
          weight: 0,
          height: 0,
          bmi: 0,
          headCircumference: 0,
          armCircumference: 0,
          triceps: 0
        },
        nutritionalDiagnosis: '',
        biochemicalEvaluation: '',
        intakeEvaluation: '',
        visits: []
      };

      await patientService.createPatient(newPatient);
      onClose();
    } catch (error) {
      console.error('Error creating patient:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
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
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">Add Patient</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddPatientDialog; 