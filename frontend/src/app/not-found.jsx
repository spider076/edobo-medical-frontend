'use client';
import React from 'react';
import { useRouter } from 'next-nprogress-bar';

// mui
import { Box, Button, Typography } from '@mui/material';

// svg
import { NotFoundIllustration } from 'src/illustrations';

export default function NotFound() {
  const router = useRouter();
  return (
    <Box
      spacing={3}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: 3 }}
    >
      <NotFoundIllustration />
      <Typography variant="h4" color="text.primary">
        404, Page not founds
      </Typography>
      <Typography variant="body1" color="initial">
        Something went wrong. It’s look that your requested could not be found. It’s look like the link is broken or the
        page is removed.
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" color="primary" size="large" onClick={() => router.back()}>
          Go Back
        </Button>
        <Button variant="outlined" color="primary" onClick={() => router.push('/')} size="large">
          Go To Home
        </Button>
      </Box>
    </Box>
  );
}
