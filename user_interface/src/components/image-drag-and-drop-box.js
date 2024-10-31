import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

// Import player images
import kumar_sangakkara from '../assets/images/kumar_sangakkara.png';
import mahela_jayawardhana from '../assets/images/mahela_jayawardhana.png';
import lasith_malinga from '../assets/images/lasith_malinga.png';
import pathum_nissanka from '../assets/images/pathum_nissanka.png';
import kamindu_mendis from '../assets/images/kamindu_mendis.png';
import wanindu_hasranga from '../assets/images/wanindu_hasaranga.png';
import kusal_janith_perera from '../assets/images/kusal_janith_perera.png';
import layout from '../assets/images/layout.png';

// Map player names to images
const playerImages = {
  'kamindu mendis': kamindu_mendis,
  'lasith malinga': lasith_malinga,
  'kumar sangakkara': kumar_sangakkara,
  'mahela jayawardhana': mahela_jayawardhana,
  'pathum nissanka': pathum_nissanka,
  'wanindu hasaranga': wanindu_hasranga,
  'kusal janith perera': kusal_janith_perera,
};

const Dropzone = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!imagePreview) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image_data', imagePreview);

      const response = await axios.post(
        'http://localhost:5000/classify_image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setResult(response.data[0]); // Access the first object in the response
    } catch (error) {
      console.error('Error uploading image:', error);
    }

    setLoading(false);
    setImagePreview(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  // Extract the predicted player name
  const predictedPlayer =
    result && result.class ? result.class.toLowerCase() : null;


  // Utility function to format player names
  const formatPlayerName = (name) => {
    return name
      .replace(/_/g, ' ') // Replace underscores with spaces
      .toLowerCase() // Convert to lowercase for uniformity
      .split(' ') // Split the name into parts
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
      .join(' '); // Join the parts back into a single string
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: '20px auto',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Paper
        {...getRootProps()}
        elevation={3}
        sx={{
          border: '2px dashed #545454',
          borderRadius: '12px',
          padding: isSmallScreen ? '30px 10px' : '50px 20px',
          backgroundColor: isDragActive ? '#d4d4d4' : '#f0f0f0',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <input {...getInputProps()} aria-label='File upload' />
        {imagePreview ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component='img'
              src={imagePreview}
              alt='Preview'
              sx={{
                width: '100%',
                maxWidth: 300,
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
                marginBottom: 2,
              }}
            />
          </Box>
        ) : (
          <Box>
            <Box
              component='img'
              src={layout}
              alt='Upload Icon'
              sx={{
                width: isSmallScreen ? 40 : 60,
                marginBottom: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            />
            <Typography
              variant='h6'
              fontWeight='bold'
              sx={{
                color: '#333',
                fontSize: isSmallScreen ? '1rem' : '1.25rem',
              }}
            >
              Drag & drop a file here, or select from your device
            </Typography>
            <Typography
              variant='body2'
              sx={{
                color: '#666',
                fontSize: isSmallScreen ? '0.85rem' : '1rem',
                marginBottom: 3,
              }}
            >
              Quickly add documents by dragging them here or choosing them from
              your device.
            </Typography>
            <Button
              variant='contained'
              endIcon={<ArrowDropDownIcon />}
              sx={{
                backgroundColor: '#545454',
                textTransform: 'none',
                fontSize: isSmallScreen ? '0.875rem' : '1rem',
                padding: isSmallScreen ? '6px 16px' : '8px 24px',
                borderRadius: '20px',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#383838',
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 8px rgba(54, 54, 54, 0.3)',
                },
              }}
            >
              Select File
            </Button>
          </Box>
        )}
      </Paper>

      <Button
        onClick={handleSubmit}
        variant='contained'
        color='secondary'
        disabled={!imagePreview || loading}
        sx={{
          marginTop: 3,
          padding: isSmallScreen ? '10px 20px' : '12px 28px',
          background: loading
            ? 'linear-gradient(45deg, #d0d0d0, #b0b0b0)' // Lighter gray gradient when loading
            : 'linear-gradient(45deg, #a0a0a0, #c0c0c0)', // Default gray gradient
          textTransform: 'none',
          fontSize: isSmallScreen ? '0.875rem' : '1rem',
          borderRadius: '25px', // More rounded corners
          position: 'relative',
          overflow: 'hidden',
          transition:
            'background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: loading
            ? '0 4px 10px rgba(0, 0, 0, 0.2)' // Shadow when loading
            : '0 8px 20px rgba(0, 0, 0, 0.3)', // Stronger shadow when not loading
          '&:hover': {
            background: loading
              ? 'linear-gradient(45deg, #c0c0c0, #a0a0a0)'
              : 'linear-gradient(45deg, #909090, #b0b0b0)', // Darker gray on hover
            transform: 'scale(1.05)',
            boxShadow: '0 12px 25px rgba(0, 0, 0, 0.4)', // Deeper shadow on hover
          },
        }}
      >
        {!loading && 'Submit'} {/* Show label when not loading */}
        {loading && (
          <CircularProgress
            size={24} // Size of the circular progress
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)', // Centering the circular progress
              color: 'white', // Circular progress color
            }}
          />
        )}
      </Button>

      {result && predictedPlayer && (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant='h6' sx={{ mb: 2 }}>
            Predicted as: {formatPlayerName(predictedPlayer)}
          </Typography>
          {playerImages[predictedPlayer] && (
            <Box
              component='img'
              src={playerImages[predictedPlayer]}
              alt={predictedPlayer}
              sx={{
                width: '100%',
                maxWidth: 200,
                borderRadius: '8px',
                marginBottom: 2,
              }}
            />
          )}

          <TableContainer
            component={Paper}
            sx={{ marginTop: 2, borderRadius: '12px', overflow: 'hidden' }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                  >
                    Player
                  </TableCell>
                  <TableCell
                    align='right'
                    sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}
                  >
                    Probability (%)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(result.class_dictionary).map(
                  ([player, index]) => (
                    <TableRow
                      key={player}
                      sx={{
                        backgroundColor:
                          player.toLowerCase() === predictedPlayer
                            ? '#E8E8E8' // Light gray color for the selected player row
                            : 'transparent',
                        '&:hover': {
                          backgroundColor: '#f5f5f5', // Light gray background on hover
                        },
                        transition: 'background-color 0.3s ease', // Smooth transition
                      }}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        sx={{ padding: '12px 16px', fontWeight: '500' }}
                      >
                        {formatPlayerName(player)}
                      </TableCell>
                      <TableCell align='right' sx={{ padding: '12px 16px' }}>
                        {(result.class_probability[index] || 0).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Dropzone;
