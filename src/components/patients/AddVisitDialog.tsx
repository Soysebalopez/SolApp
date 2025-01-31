import React from 'react';
import type { ChangeEvent, FormEvent } from 'react';
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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Patient } from '@/types/patient';
import { patientService } from '@/services/patientService';

interface AddVisitDialogProps {
  open: boolean;
  onClose: () => void;
  patient: Patient;
  onVisitAdded: (updatedPatient: Patient) => void;
}

interface FormData {
  date: Date;
  age: string;
  weight: string;
  weightDE: string;
  heightLength: string;
  heightDE: string;
  bmi: string;
  bmiDE: string;
  evolution: string;
}

const AddVisitDialog = ({ open, onClose, patient, onVisitAdded }: AddVisitDialogProps) => {
  const [formData, setFormData] = React.useState<FormData>({
    date: new Date(),
    age: patient.age.toString(),
    weight: '',
    weightDE: '',
    heightLength: '',
    heightDE: '',
    bmi: '',
    bmiDE: '',
    evolution: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData(prev => ({
        ...prev,
        date
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patient.id) return;

    try {
      const newVisit = {
        date: formData.date,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        weightDE: parseFloat(formData.weightDE),
        heightLength: parseFloat(formData.heightLength),
        heightDE: parseFloat(formData.heightDE),
        bmi: parseFloat(formData.bmi),
        bmiDE: parseFloat(formData.bmiDE),
        evolution: formData.evolution
      };

      const updatedPatient = {
        ...patient,
        visits: [...patient.visits, newVisit]
      };

      await patientService.updatePatient(patient.id, updatedPatient);
      onVisitAdded(updatedPatient);
      onClose();
    } catch (error) {
      console.error('Error adding visit:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Visit</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Visit Date"
                  value={formData.date}
                  onChange={handleDateChange}
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
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                  inputProps={{ step: "0.1" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight DE"
                  name="weightDE"
                  type="number"
                  value={formData.weightDE}
                  onChange={handleChange}
                  inputProps={{ step: "0.1" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  name="heightLength"
                  type="number"
                  value={formData.heightLength}
                  onChange={handleChange}
                  required
                  inputProps={{ step: "0.1" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height DE"
                  name="heightDE"
                  type="number"
                  value={formData.heightDE}
                  onChange={handleChange}
                  inputProps={{ step: "0.1" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="BMI"
                  name="bmi"
                  type="number"
                  value={formData.bmi}
                  onChange={handleChange}
                  required
                  inputProps={{ step: "0.1" }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="BMI DE"
                  name="bmiDE"
                  type="number"
                  value={formData.bmiDE}
                  onChange={handleChange}
                  inputProps={{ step: "0.1" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Evolution"
                  name="evolution"
                  value={formData.evolution}
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
          <Button type="submit" variant="contained">Add Visit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddVisitDialog; 