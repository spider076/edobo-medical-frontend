import React from 'react';
// mui
import { Box, Stack, Typography, Skeleton } from '@mui/material';
export default function Colors() {
  return (
    <Box p={2}>
      <Stack>
        <Typography variant="body1" sx={{ mb: 1.2, width: 100 }}>
          <Skeleton variant="text" />
        </Typography>

        <Stack direction="row" gap={1} sx={{ mt: '18.1px' }}>
          <Stack direction="row" gap={1} alignItems="center" width="100%">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
              <Skeleton
                key={Math.random()}
                variant="rectangular"
                sx={{ borderRadius: '4px', minWidth: 24 }}
                width={24}
                height={24}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
