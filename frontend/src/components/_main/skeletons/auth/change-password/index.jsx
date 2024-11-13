import { Card, Skeleton, Stack, Typography } from '@mui/material';
import React from 'react';
import ChangePassword from './change-password';

export default function index() {
  return (
    <Card
      sx={{
        maxWidth: 560,
        m: 'auto',
        my: '80px',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 3
      }}
    >
      <Stack mb={5}>
        <Typography textAlign="center" variant="h4" component="h1">
          <Skeleton variant="text" />
        </Typography>
        <Typography textAlign="center" color="text.secondary">
          <Skeleton variant="text" />
        </Typography>
      </Stack>
      <ChangePassword />
    </Card>
  );
}
