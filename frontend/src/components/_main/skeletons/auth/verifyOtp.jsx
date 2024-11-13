import React from 'react';
// mui
import { Card, Container, Skeleton, Stack, Typography } from '@mui/material';

export default function VerifyOtp() {
  return (
    <Container maxWidth="sm">
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
        <Stack mb={2}>
          <Typography textAlign="center" variant="h4" component="h1">
            <Skeleton variant="text" />
          </Typography>
          <Typography textAlign="center" color="text.secondary">
            <Skeleton variant="text" />
          </Typography>
        </Stack>
        <Stack spacing={2}>
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={40} />
          <Skeleton variant="rounded" height={40} />
        </Stack>
      </Card>
    </Container>
  );
}
