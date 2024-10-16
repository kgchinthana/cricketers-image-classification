import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper } from '@mui/material';

const Dropzone = () => {
  const onDrop = (acceptedFiles) => {
    // Handle the dropped files (for now, we just log them)
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box sx={{ width: '100%', maxWidth: 400, margin: '20px auto' }}>
      <Paper
        {...getRootProps()}
        elevation={3}
        sx={{
          border: '2px dashed #1976d2',
          borderRadius: 2,
          padding: 2,
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: isDragActive ? '#e3f2fd' : '#fff',
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="h6">
          {isDragActive ? 'Drop the files here...' : 'Drag & drop some files here, or click to select files'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dropzone;
