'use client';
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import BusinessDeveloperTable from './BusinessDeveloperTable';
import AddBusinessDeveloper from './AddBusinessDeveloper';
import { BusinessDeveloper } from '../../../constants/types';

const BusinessDevelopers: React.FC = () => {
  const [showAddBusinessDeveloper, setShowAddBusinessDeveloper] = useState(false);
  const [businessDevelopers, setBusinessDevelopers] = useState<BusinessDeveloper[]>([]);

  useEffect(() => {
    const storedBusinessDevelopers = localStorage.getItem('businessDevelopers');
    if (storedBusinessDevelopers) {
      setBusinessDevelopers(JSON.parse(storedBusinessDevelopers));
    }
  }, []);

  const handleAddBusinessDeveloper = (newBusinessDeveloper: BusinessDeveloper) => {
    const updatedBusinessDevelopers = [...businessDevelopers, newBusinessDeveloper];
    setBusinessDevelopers(updatedBusinessDevelopers);
    localStorage.setItem('businessDevelopers', JSON.stringify(updatedBusinessDevelopers));
    setShowAddBusinessDeveloper(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {!showAddBusinessDeveloper ? (
        <>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Grid item>
              <Typography variant="h4">Business Developers</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => setShowAddBusinessDeveloper(true)}>
                Add Business Developer
              </Button>
            </Grid>
          </Grid>
          <BusinessDeveloperTable rows={businessDevelopers} />
        </>
      ) : (
        <AddBusinessDeveloper
          onAddBusinessDeveloper={handleAddBusinessDeveloper}
          onCancel={() => setShowAddBusinessDeveloper(false)}
        />
      )}
    </Box>
  );
};

export default BusinessDevelopers;
