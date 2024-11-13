import React from 'react';
// mui
import { Typography, Card, Stack, Box, Skeleton } from '@mui/material';

export default function CartProductMobileSkeleton() {
  return (
    <Box
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .card-main': {
          p: 2,
          borderWidth: '1px 0 0 0',
          mb: 2
        }
      }}
    >
      {Array.from(new Array(3)).map((index) => {
        return (
          <Card className="card-main" key={index}>
            <Stack direction="row" alignItems="center">
              <Skeleton variant="rounded" width={40} height={40} sx={{ mr: 2 }} />
              <Box sx={{ display: 'contents' }}>
                <Typography variant="h5">
                  <Skeleton variant="text" width={150} />
                </Typography>
              </Box>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Box mt={1}>
                <Typography variant="body2" color="text.primary" mb={0.5}>
                  <Skeleton variant="text" width={80} />
                </Typography>
                <Typography variant="body2" color="text.primary" mb={0.5}>
                  <Skeleton variant="text" width={80} />
                </Typography>
                <Typography variant="body2" color="text.primary" mb={0.5}>
                  <Skeleton variant="text" width={80} />
                </Typography>
              </Box>
              <Box textAlign="right">
                <Skeleton variant="rounded" width={96} height={36} />
                <Skeleton variant="text" width={50} sx={{ ml: 'auto' }} />
                <Skeleton variant="circular" width={36} height={36} sx={{ mt: 1, ml: 'auto' }} />
              </Box>
            </Stack>
          </Card>
        );
      })}
    </Box>
  );
}
