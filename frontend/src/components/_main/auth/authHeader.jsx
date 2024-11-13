import React from 'react';
// mui
import { Box, Typography } from '@mui/material';
// styled
import RootStyles from './styled';

export default function AuthHeader() {
  return (
    <RootStyles>
      <Box className="gradient">
        <Typography textAlign="center" variant="h3" fontWeight={300} lineHeight={0.7} color="primary.contrastText">
          Welcome
        </Typography>
        <Typography textAlign="center" variant="h2" color="primary.contrastText" className="company-name">
          NextAll
        </Typography>
        <Typography
          textAlign="center"
          variant="body2"
          lineHeight={0.9}
          fontSize={18}
          fontWeight={400}
          color="primary.contrastText"
        >
          React Ecommerce script
        </Typography>
      </Box>
    </RootStyles>
  );
}
