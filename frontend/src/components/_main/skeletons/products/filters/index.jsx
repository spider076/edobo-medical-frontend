import React from 'react';
// mui
import { Card, Typography, Skeleton, Divider, Box } from '@mui/material';
// components
import Brands from './brands';
import Gander from './gander';
import Colors from './colors';
import Sizes from './sizes';

export default function index() {
  return (
    <Card
      sx={{
        my: 2,
        border: 'none !important',
        borderRadius: '0px !important',
        border: '1px solid #eee',
        borderRadius: 1
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2
        }}
      >
        <Typography variant="h5" color="text.primary">
          <Skeleton variant="text" width={100} />
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Brands />
        <Divider />
        <Gander />
        <Divider />
        <Colors />
        <Divider />
        <Sizes />
      </Box>
    </Card>
  );
}
