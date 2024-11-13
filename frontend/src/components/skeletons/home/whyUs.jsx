'use client';
import React from 'react';
// mui
import { Box, Grid, Skeleton } from '@mui/material';

export default function WhyUsSkeleton() {
  return (
    <Box
      sx={{
        my: 5,
        display: { xs: 'none', md: 'block' }
      }}
    >
      <Grid container spacing={3} justifyContent="center">
        {Array.from(new Array(6)).map((v) => (
          <Grid item lg={3} md={4} xs={6} key={v}>
            <Skeleton variant="rounded" width="100%" height={310} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
