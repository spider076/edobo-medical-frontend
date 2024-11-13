import React from 'react';
// mui
import { Card, Container, Skeleton, Stack, Typography } from '@mui/material';
// component
import ResetPassword from './reset-password';

export default function Index() {
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
        <Stack mb={5}>
          <Typography textAlign="center" variant="h4" component="h1">
            <Skeleton variant="text" />
          </Typography>
          <Typography textAlign="center" color="text.secondary">
            <Skeleton variant="text" />
          </Typography>
        </Stack>
        <ResetPassword />
      </Card>
    </Container>
  );
}
