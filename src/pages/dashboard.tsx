import type { useState } from 'react';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Card from '@/components/common/Card';
import PatientList from '@/components/patients/PatientList';
import AddPatientDialog from '@/components/patients/AddPatientDialog';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h1">Patients</Typography>
        <Button 
          variant="contained" 
          onClick={() => setIsAddDialogOpen(true)}
        >
          Add Patient
        </Button>
      </Box>

      <Card>
        <PatientList />
      </Card>

      <AddPatientDialog 
        open={isAddDialogOpen} 
        onClose={() => setIsAddDialogOpen(false)} 
      />
    </Box>
  );
};

export default Dashboard; 