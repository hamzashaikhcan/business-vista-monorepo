'use client';
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import DeveloperTable from './DeveloperTable';
import AddDeveloper from './AddDeveloper';
import { Developer } from '../../../constants/types';

const DevelopersIndex: React.FC = () => {
  const [showAddDeveloper, setShowAddDeveloper] = useState<boolean>(false);
  const [developers, setDevelopers] = useState<Developer[]>([]);

  useEffect(() => {
    const storedDevelopers = localStorage.getItem('developers');
    if (storedDevelopers) {
      setDevelopers(JSON.parse(storedDevelopers));
    }
  }, []);

  const handleAddDeveloper = (newDeveloper: Developer) => {
    const updatedDevelopers = [...developers, newDeveloper];
    setDevelopers(updatedDevelopers);
    localStorage.setItem('developers', JSON.stringify(updatedDevelopers));
    setShowAddDeveloper(false);
  };

  return (
    <Box>
      {!showAddDeveloper ? (
        <>
          <Grid container alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs>
              <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 'bold' }}>
                Developers
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => setShowAddDeveloper(true)}>
                Add New Developer
              </Button>
            </Grid>
          </Grid>
          <DeveloperTable rows={developers} />
        </>
      ) : (
        <AddDeveloper onAddDeveloper={handleAddDeveloper} onCancel={() => setShowAddDeveloper(false)} />
      )}
    </Box>
  );
};

export default DevelopersIndex;
