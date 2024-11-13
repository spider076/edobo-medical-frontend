import React from 'react';
// mui
import { Skeleton, Stack, Typography } from '@mui/material';

export default function Sorting() {
  return (
    <Stack
      direction={{ md: 'row', xs: 'column-reverse' }}
      mb={3}
      spacing={{ md: 3, xs: 2 }}
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          mt: { md: 0, xs: 1.5 },
          fontSize: {
            sm: '1rem',
            xs: '12px'
          }
        }}
      >
        <Skeleton variant="text" width={150} />
      </Typography>

      <Stack direction="row" spacing={2}>
        <Skeleton
          variant="rounded"
          width={40}
          height={40}
          sx={{ display: { md: 'none', xs: 'block', marginLeft: 12 + '!important' } }}
        />
        <Stack direction="row" spacing={1}>
          <Skeleton variant="rounded" sx={{ width: { md: 110, xs: 150 } }} height={40} />
          <Skeleton variant="rounded" width={110} height={40} />
        </Stack>
      </Stack>
    </Stack>
  );
}
