// src/components/_main/home/locationPopup.jsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';

const LocationPopup = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleAllowLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User location:', position.coords);
          setIsVisible(false);
          onClose();
        },
        (error) => {
          console.log('Location permission denied:', error);
          setIsVisible(false);
          onClose();
        }
      );
    }
  };

  useEffect(() => {
    if (!isVisible) onClose();
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '400px',
        p: 3,
        bgcolor: 'white',
        boxShadow: 3,
        borderRadius: 2,
        zIndex: 1000,
        textAlign: 'center'
      }}
    >
      <Typography variant="h6" gutterBottom>
        Allow Location Access
      </Typography>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        We need your location to provide the best shopping experience.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleAllowLocation}>
        Allow Location
      </Button>
      <Button variant="text" color="secondary" onClick={() => setIsVisible(false)}>
        Close
      </Button>
    </Box>
  );
};

export default LocationPopup;
