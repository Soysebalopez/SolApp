import React from 'react';
import type { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  Button,
  IconButton
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import Card from '@/components/common/Card';
import PatientInfo from '@/components/patients/PatientInfo';
import ClinicalHistory from '@/components/patients/ClinicalHistory';
import Visits from '@/components/patients/Visits';
import AddVisitDialog from '@/components/patients/AddVisitDialog';
import { patientService } from '@/services/patientService';
import type { Patient } from '@/types/patient';
import type { TabPanelProps } from '@/types/components';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const PatientDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [patient, setPatient] = React.useState<Patient | null>(null);
  const [tabValue, setTabValue] = React.useState(0);
  const [isAddVisitOpen, setIsAddVisitOpen] = React.useState(false);

  React.useEffect(() => {
    const loadPatient = async () => {
      if (id) {
        try {
          const data = await patientService.getPatient(id as string);
          setPatient(data);
        } catch (error) {
          console.error('Error loading patient:', error);
        }
      }
    };

    loadPatient();
  }, [id]);

  const handleTabChange = (_: ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleVisitAdded = (updatedPatient: Patient) => {
    setPatient(updatedPatient);
  };

  if (!patient) {
    return null;
  }

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton 
            onClick={() => router.push('/dashboard')}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h1">{patient.name}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
          >
            <Tab label="Patient Info" />
            <Tab label="Clinical History" />
            <Tab label="Visits" />
          </Tabs>
          {tabValue === 2 && (
            <Button 
              variant="contained"
              onClick={() => setIsAddVisitOpen(true)}
            >
              Add Visit
            </Button>
          )}
        </Box>
      </Box>

      <Card title={`${patient.name}'s Information`}>
        <TabPanel value={tabValue} index={0}>
          <PatientInfo patient={patient} />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ClinicalHistory patient={patient} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <Visits patient={patient} />
        </TabPanel>
      </Card>

      <AddVisitDialog
        open={isAddVisitOpen}
        onClose={() => setIsAddVisitOpen(false)}
        patient={patient}
        onVisitAdded={handleVisitAdded}
      />
    </Box>
  );
};

export default PatientDetail; 