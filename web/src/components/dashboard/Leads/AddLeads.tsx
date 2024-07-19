// AddLead.tsx

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid, Autocomplete } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AddLeadProps, Lead, DevOption } from '../../../constants/types';

const devOptions: DevOption[] = [
  { name: 'John Doe', designation: 'SE' },
  { name: 'Jane Smith', designation: 'FE' },
  { name: 'Mike Johnson', designation: 'BE' },
  { name: 'Emily Brown', designation: 'FS' },
  { name: 'Chris Wilson', designation: 'SE' },
  { name: 'Anna Lee', designation: 'FE' },
  { name: 'Tom White', designation: 'BE' },
  { name: 'Sarah Clark', designation: 'FS' },
];

const statusOptions = ['In Progress', 'Completed', 'Rejected'];

const interviewStages = ['HR', 'First Technical', 'Second Technical', 'Hiring Manager', 'Cultural Fit'];

const AddLead: React.FC<AddLeadProps> = ({ onAddLead, onCancel }) => {
  const [formData, setFormData] = useState<Omit<Lead, 'ID'>>({
    Job_Title: '',
    Lead: '',
    BD: '',
    Dev: null,
    Status: '',
    InterviewStage: [],
    description: '',
    resume: null,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Omit<Lead, 'ID'>, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, resume: file.name });
      setErrors({ ...errors, resume: '' });
    } else {
      setErrors({ ...errors, resume: 'Please upload a PDF file' });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Omit<Lead, 'ID'>, string>> = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof Omit<Lead, 'ID'>];
      if (!value || (Array.isArray(value) && value.length === 0)) {
        newErrors[key as keyof Omit<Lead, 'ID'>] = 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onAddLead(formData);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onCancel} variant="contained">
          Back
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, width: '100%', minHeight: 700, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Add New Lead
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="Job_Title"
                label="Job Title"
                value={formData.Job_Title}
                onChange={handleChange}
                error={!!errors.Job_Title}
                helperText={errors.Job_Title}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="Lead"
                label="Lead"
                value={formData.Lead}
                onChange={handleChange}
                error={!!errors.Lead}
                helperText={errors.Lead}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="BD"
                label="BD"
                value={formData.BD}
                onChange={handleChange}
                error={!!errors.BD}
                helperText={errors.BD}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete<DevOption, false, false, false>
                fullWidth
                options={devOptions}
                getOptionLabel={(option) => `${option.name} (${option.designation})`}
                renderInput={(params) => <TextField {...params} label="Dev" />}
                value={formData.Dev ? devOptions.find((dev) => dev.name === formData.Dev) || null : null}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, Dev: newValue ? newValue.name : null });
                  setErrors({ ...errors, Dev: '' });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                fullWidth
                options={statusOptions}
                renderInput={(params) => <TextField {...params} label="Status" />}
                value={formData.Status}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, Status: newValue || '' });
                  setErrors({ ...errors, Status: '' });
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Autocomplete
                fullWidth
                multiple
                options={interviewStages}
                renderInput={(params) => <TextField {...params} label="Interview Stage" />}
                value={formData.InterviewStage}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, InterviewStage: newValue });
                  setErrors({ ...errors, InterviewStage: '' });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="application/pdf"
                style={{ display: 'none' }}
                id="resume-upload"
                type="file"
                onChange={handleResumeUpload}
              />
              <label htmlFor="resume-upload">
                <Button variant="contained" component="span">
                  Upload Profile Resume (PDF)
                </Button>
              </label>
              {formData.resume && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {formData.resume}
                </Typography>
              )}
              {errors.resume && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {errors.resume}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Description
              </Typography>
              <ReactQuill
                theme="snow"
                value={formData.description}
                onChange={(content) => {
                  setFormData({ ...formData, description: content });
                  setErrors({ ...errors, description: '' });
                }}
                style={{ height: '200px', marginBottom: '50px' }}
              />
              {errors.description && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {errors.description}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default AddLead;
