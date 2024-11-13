import React from 'react';
// mui
import { Skeleton, Stack, Typography } from '@mui/material';

export default function Login() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2">
          <Skeleton variant="text" width={118} />
        </Typography>
        <Typography variant="subtitle2">
          <Skeleton variant="text" width={108} />
        </Typography>
      </Stack>
      <Skeleton variant="rounded" height={56} />
      <Typography variant="subtitle2">
        <Skeleton variant="text" width={300} sx={{ margin: 'auto' }} />
      </Typography>
    </Stack>
  );
}
