import React from 'react';
// mui
import { Box, Stack, Typography, Skeleton } from '@mui/material';

export default function Sizes() {
  return (
    <Box p={2}>
      <Stack>
        <Typography variant="body1" sx={{ width: 130 }}>
          <Skeleton variant="text" />
        </Typography>

        <Stack direction="row" gap={1} sx={{ mt: 3 }}>
          <Stack direction="row" gap={1} alignItems="center" width="100%">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton height={12} width={'50%'} />
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" width="100%">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton height={12} width={'50%'} />
          </Stack>
        </Stack>
        <Stack direction="row" gap={1} mt={1}>
          <Stack direction="row" gap={1} alignItems="center" width="100%">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton height={12} width={'50%'} />
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" width="100%">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton height={12} width={'50%'} />
          </Stack>
        </Stack>
        <Stack direction="row" gap={1} mt={1}>
          <Stack direction="row" gap={1} alignItems="center" width="100%">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton height={12} width={'50%'} />
          </Stack>
          <Stack direction="row" gap={1} alignItems="center" width="100%">
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton height={12} width={'50%'} />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
