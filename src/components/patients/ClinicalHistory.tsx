import React from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { 
  Grid, 
  Typography, 
  Box,
  Button,
  TextField,
  Divider
} from '@mui/material';
import type { Patient } from '@/types/patient';
import { patientService } from '@/services/patientService';

interface ClinicalHistoryProps {
  patient: Patient;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

type FormDataType = {
  pregnancy: string;
  currentIllness: string;
  pathologicalHistory: string;
  socioeconomicAspects: string;
  familyHistory: string;
  patientHabits: string;
  physicalExam: string;
  nutritionalDiagnosis: string;
  biochemicalEvaluation: string;
  intakeEvaluation: string;
  anthropometry: {
    weight: string;
    height: string;
    bmi: string;
    headCircumference: string;
    armCircumference: string;
    triceps: string;
  };
}

const Section = ({ title, children }: SectionProps) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

const ClinicalHistory = ({ patient }: ClinicalHistoryProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState<FormDataType>({
    pregnancy: patient.clinicalHistory.pregnancy,
    currentIllness: patient.clinicalHistory.currentIllness,
    pathologicalHistory: patient.clinicalHistory.pathologicalHistory,
    socioeconomicAspects: patient.clinicalHistory.socioeconomicAspects,
    familyHistory: patient.clinicalHistory.familyHistory,
    patientHabits: patient.clinicalHistory.patientHabits,
    physicalExam: patient.physicalExam,
    nutritionalDiagnosis: patient.nutritionalDiagnosis,
    biochemicalEvaluation: patient.biochemicalEvaluation,
    intakeEvaluation: patient.intakeEvaluation,
    anthropometry: {
      weight: patient.anthropometry.weight.toString(),
      height: patient.anthropometry.height.toString(),
      bmi: patient.anthropometry.bmi.toString(),
      headCircumference: patient.anthropometry.headCircumference.toString(),
      armCircumference: patient.anthropometry.armCircumference.toString(),
      triceps: patient.anthropometry.triceps.toString(),
    }
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patient.id) return;

    try {
      const updatedPatient = {
        ...patient,
        clinicalHistory: {
          pregnancy: formData.pregnancy,
          currentIllness: formData.currentIllness,
          pathologicalHistory: formData.pathologicalHistory,
          socioeconomicAspects: formData.socioeconomicAspects,
          familyHistory: formData.familyHistory,
          patientHabits: formData.patientHabits,
        },
        physicalExam: formData.physicalExam,
        nutritionalDiagnosis: formData.nutritionalDiagnosis,
        biochemicalEvaluation: formData.biochemicalEvaluation,
        intakeEvaluation: formData.intakeEvaluation,
        anthropometry: {
          weight: parseFloat(formData.anthropometry.weight),
          height: parseFloat(formData.anthropometry.height),
          bmi: parseFloat(formData.anthropometry.bmi),
          headCircumference: parseFloat(formData.anthropometry.headCircumference),
          armCircumference: parseFloat(formData.anthropometry.armCircumference),
          triceps: parseFloat(formData.anthropometry.triceps),
        }
      };

      await patientService.updatePatient(patient.id, updatedPatient);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating clinical history:', error);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Section title="Clinical History">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Pregnancy History"
                    name="pregnancy"
                    value={formData.pregnancy}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Current Illness"
                    name="currentIllness"
                    value={formData.currentIllness}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Pathological History"
                    name="pathologicalHistory"
                    value={formData.pathologicalHistory}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Socioeconomic Aspects"
                    name="socioeconomicAspects"
                    value={formData.socioeconomicAspects}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Family History"
                    name="familyHistory"
                    value={formData.familyHistory}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Patient Habits"
                    name="patientHabits"
                    value={formData.patientHabits}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Section>

            <Divider sx={{ my: 3 }} />

            <Section title="Anthropometry">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Weight (kg)"
                    name="anthropometry.weight"
                    value={formData.anthropometry.weight}
                    onChange={handleChange}
                    inputProps={{ step: "0.1" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Height (cm)"
                    name="anthropometry.height"
                    value={formData.anthropometry.height}
                    onChange={handleChange}
                    inputProps={{ step: "0.1" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="BMI"
                    name="anthropometry.bmi"
                    value={formData.anthropometry.bmi}
                    onChange={handleChange}
                    inputProps={{ step: "0.1" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Head Circumference (cm)"
                    name="anthropometry.headCircumference"
                    value={formData.anthropometry.headCircumference}
                    onChange={handleChange}
                    inputProps={{ step: "0.1" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Arm Circumference (cm)"
                    name="anthropometry.armCircumference"
                    value={formData.anthropometry.armCircumference}
                    onChange={handleChange}
                    inputProps={{ step: "0.1" }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Triceps (mm)"
                    name="anthropometry.triceps"
                    value={formData.anthropometry.triceps}
                    onChange={handleChange}
                    inputProps={{ step: "0.1" }}
                  />
                </Grid>
              </Grid>
            </Section>

            <Divider sx={{ my: 3 }} />

            <Section title="Evaluations">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Physical Examination"
                    name="physicalExam"
                    value={formData.physicalExam}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Nutritional Diagnosis"
                    name="nutritionalDiagnosis"
                    value={formData.nutritionalDiagnosis}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Biochemical Evaluation"
                    name="biochemicalEvaluation"
                    value={formData.biochemicalEvaluation}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Intake Evaluation"
                    name="intakeEvaluation"
                    value={formData.intakeEvaluation}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Section>
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
          Edit Clinical History
        </Button>
      </Box>

      <Section title="Clinical History">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Pregnancy History</Typography>
            <Typography paragraph>{patient.clinicalHistory.pregnancy || 'No information'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Current Illness</Typography>
            <Typography paragraph>{patient.clinicalHistory.currentIllness || 'No information'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Pathological History</Typography>
            <Typography paragraph>{patient.clinicalHistory.pathologicalHistory || 'No information'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Socioeconomic Aspects</Typography>
            <Typography paragraph>{patient.clinicalHistory.socioeconomicAspects || 'No information'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Family History</Typography>
            <Typography paragraph>{patient.clinicalHistory.familyHistory || 'No information'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Patient Habits</Typography>
            <Typography paragraph>{patient.clinicalHistory.patientHabits || 'No information'}</Typography>
          </Grid>
        </Grid>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="Anthropometry">
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle2" color="text.secondary">Weight</Typography>
            <Typography>{patient.anthropometry.weight} kg</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle2" color="text.secondary">Height</Typography>
            <Typography>{patient.anthropometry.height} cm</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle2" color="text.secondary">BMI</Typography>
            <Typography>{patient.anthropometry.bmi}</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle2" color="text.secondary">Head Circumference</Typography>
            <Typography>{patient.anthropometry.headCircumference} cm</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle2" color="text.secondary">Arm Circumference</Typography>
            <Typography>{patient.anthropometry.armCircumference} cm</Typography>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="subtitle2" color="text.secondary">Triceps</Typography>
            <Typography>{patient.anthropometry.triceps} mm</Typography>
          </Grid>
        </Grid>
      </Section>

      <Divider sx={{ my: 3 }} />

      <Section title="Evaluations">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Physical Examination</Typography>
            <Typography paragraph>{patient.physicalExam || 'No information'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Nutritional Diagnosis</Typography>
            <Typography paragraph>{patient.nutritionalDiagnosis || 'No information'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Biochemical Evaluation</Typography>
            <Typography paragraph>{patient.biochemicalEvaluation || 'No information'}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">Intake Evaluation</Typography>
            <Typography paragraph>{patient.intakeEvaluation || 'No information'}</Typography>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
};

export default ClinicalHistory; 