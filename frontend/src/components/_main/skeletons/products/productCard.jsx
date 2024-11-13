import React from 'react';
// mui
import { Card, Skeleton, Stack, Typography } from '@mui/material';

export default function ProductCard() {
  return (
    <Card>
      <Skeleton variant="rectangular" width="100%" sx={{ height: { md: 277, xs: 165 } }} />
      <Stack sx={{ py: 1.5, px: 1 }}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Skeleton variant="text" width={'100%'} />
          <Skeleton variant="text" width={'100%'} />
        </Stack>
        <Typography variant="subtitle1">
          <Skeleton variant="text" width="100px" />
        </Typography>
        <Typography variant="body1">
          <Skeleton variant="text" width={120} />
        </Typography>
        <Skeleton variant="text" width="100px" sx={{ display: { md: 'block', xs: 'none' } }} />
      </Stack>
    </Card>
  );
}
