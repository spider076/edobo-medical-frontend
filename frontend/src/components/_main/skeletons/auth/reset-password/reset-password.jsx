import React from 'react';
// mui
import { Skeleton, Stack } from '@mui/material';

export default function ResetPassword() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
    </Stack>
  );
}
