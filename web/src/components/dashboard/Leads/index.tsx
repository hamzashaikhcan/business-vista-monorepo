'use client';
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import LeadsTableData from './LeadsTable';
import AddLead from './AddLeads';
import { Lead } from '../../../constants/types';

const LeadsIndex: React.FC = () => {
  const [showAddLead, setShowAddLead] = useState<boolean>(false);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
  }, []);

  const handleAddLead = (newLead: Omit<Lead, 'ID'>) => {
    const updatedLeads: Lead[] = [...leads, { ...newLead, ID: leads.length + 1 }];
    setLeads(updatedLeads);
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
    setShowAddLead(false);
  };

  return (
    <Box>
      {!showAddLead ? (
        <>
          <Grid container alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs>
              <Typography variant="h4" sx={{ fontFamily: 'serif', fontWeight: 'bold' }}>
                Job Leads
              </Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => setShowAddLead(true)}>
                Add New Lead
              </Button>
            </Grid>
          </Grid>
          <LeadsTableData rows={leads} />
        </>
      ) : (
        <AddLead onAddLead={handleAddLead} onCancel={() => setShowAddLead(false)} />
      )}
    </Box>
  );
};

export default LeadsIndex;
