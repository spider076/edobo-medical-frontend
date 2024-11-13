import React from 'react';
// mui
import { Stack, Skeleton, Box } from '@mui/material';

export default function ProductDetailsImageSkeleton() {
  return (
    <Stack spacing={2}>
      <Box
        sx={{
          position: 'relative',
          paddingBottom: '100%',
          zIndex: 11
        }}
      >
        <Skeleton
          variant="rounded"
          width="100%"
          height={'100%'}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0
          }}
        />
      </Box>
      <Stack spacing={1} direction="row" sx={{ justifyContent: 'center' }}>
        <Skeleton variant="rounded" width={60} height={60} />
        <Skeleton variant="rounded" width={60} height={60} />
      </Stack>
    </Stack>
  );
}
