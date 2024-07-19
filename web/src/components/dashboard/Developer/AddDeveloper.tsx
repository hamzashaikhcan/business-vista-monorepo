'use client';
import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Grid } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Developer, AddDeveloperProps } from '../../../constants/types';

const AddDeveloper: React.FC<AddDeveloperProps> = ({ onAddDeveloper, onCancel }) => {
  const [formData, setFormData] = useState<Developer>({
    Name: '',
    Phone: '',
    Email: '',
    Designation: '',
    TechnicalSkills: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Developer, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof Developer, string>> = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof Developer]) {
        newErrors[key as keyof Developer] = 'This field is required';
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onAddDeveloper(formData);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onCancel} variant="contained">
          Back
        </Button>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, width: '100%', minHeight: 600, mt: 2 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Add New Developer
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="Name"
                label="Name"
                value={formData.Name}
                onChange={handleChange}
                error={!!errors.Name}
                helperText={errors.Name}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="Phone"
                label="Phone"
                value={formData.Phone}
                onChange={handleChange}
                error={!!errors.Phone}
                helperText={errors.Phone}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="Email"
                label="Email"
                value={formData.Email}
                onChange={handleChange}
                error={!!errors.Email}
                helperText={errors.Email}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="Designation"
                label="Designation"
                value={formData.Designation}
                onChange={handleChange}
                error={!!errors.Designation}
                helperText={errors.Designation}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Technical Skills
              </Typography>
              <ReactQuill
                theme="snow"
                value={formData.TechnicalSkills}
                onChange={(content) => {
                  setFormData({ ...formData, TechnicalSkills: content });
                  setErrors({ ...errors, TechnicalSkills: '' });
                }}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['link'],
                    ['clean'],
                  ],
                }}
                formats={[
                  'header',
                  'bold',
                  'italic',
                  'underline',
                  'strike',
                  'blockquote',
                  'list',
                  'bullet',
                  'indent',
                  'link',
                ]}
                style={{ height: '200px', marginBottom: '20px' }}
              />
              {errors.TechnicalSkills && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {errors.TechnicalSkills}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Box sx={{ mt: 10, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" color="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" size="medium" type="submit">
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default AddDeveloper;
