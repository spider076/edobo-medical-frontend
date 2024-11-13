// react
'use client';
import React from 'react';
// mui
import { Typography, Grid, Box, Stack, Paper, Skeleton } from '@mui/material';

export default function CategoriesSkeleton() {
  return (
    <Paper elevation={0}>
      <Stack
        direction={'column'}
        textAlign="center"
        sx={{
          gap: 3,
          mt: 5
        }}
      >
        <Box>
          <Typography variant="h2" color="text.primary" textAlign="center">
            <Skeleton variant="text" width={242} sx={{ mx: 'auto' }} />
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            <Skeleton variant="text" width={'100%'} sx={{ mx: 'auto', maxWidth: 555 }} />
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {Array.from(new Array(6)).map((index) => (
              <Grid item lg={2} md={3} sm={4} xs={4} key={index}>
                <Stack spacing={1} alignItems="center">
                  <Skeleton
                    variant="circular"
                    sx={{
                      width: { xs: 115, md: 150 },
                      height: { xs: 115, md: 150 }
                    }}
                  />
                  <Skeleton variant="text" width={'100%'} />
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Paper>
  );
}
