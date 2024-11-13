import React from 'react';
// mui
import { Box, Card, Grid, Skeleton, Stack, Typography } from '@mui/material';

export default function index() {
  return (
    <Box
      sx={{
        mt: 3
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              py: 11.8,
              px: 3,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Skeleton variant="circular" height={144} width={144} />
            <Typography
              variant="caption"
              sx={{
                mt: 2,
                mx: 'auto',
                display: 'block',
                textAlign: 'center',
                mb: 1
              }}
            >
              <Skeleton variant="text" width={200} />
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between" spacing={2}>
                <Skeleton variant="rounded" height={56} width="100%" />
                <Skeleton variant="rounded" height={56} width="100%" />
              </Stack>
              <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between" spacing={2}>
                <Skeleton variant="rounded" height={56} width="100%" />
                <Skeleton variant="rounded" height={56} width="100%" />
              </Stack>
              <Skeleton variant="rounded" height={56} />
              <Skeleton variant="rounded" height={56} />
              <Stack direction={{ md: 'row', xs: 'column' }} justifyContent="space-between" spacing={2}>
                <Skeleton variant="rounded" height={56} width="100%" />
                <Skeleton variant="rounded" height={56} width="100%" />
                <Skeleton variant="rounded" height={56} width="100%" />
              </Stack>
              <Skeleton variant="rounded" height={125} />
              <Skeleton variant="rounded" height={40} />
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
