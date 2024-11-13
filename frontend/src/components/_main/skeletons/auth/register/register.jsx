import React from 'react';
// mui
import { Skeleton, Stack, Typography } from '@mui/material';

export default function Register() {
  return (
    <Stack spacing={3}>
      <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between" spacing={2}>
        <Skeleton variant="rounded" height={56} width="100%" />
        <Skeleton variant="rounded" height={56} width="100%" />
      </Stack>
      <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between" spacing={2}>
        <Skeleton variant="rounded" height={56} width="100%" />
        <Skeleton variant="rounded" height={56} width="100%" />
      </Stack>
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
      <Typography variant="subtitle2">
        <Skeleton variant="text" sx={{ margin: 'auto' }} />
      </Typography>
      <Typography textAlign="center">
        <Skeleton variant="text" />
      </Typography>
    </Stack>
  );
}
