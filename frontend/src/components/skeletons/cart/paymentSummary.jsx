'use client';
import React from 'react';
// mui
import { Card, CardContent, Typography, Stack, Divider, Skeleton } from '@mui/material';

export default function PaymentSummarySkeleton() {
  return (
    <Card>
      <CardContent sx={{ py: 2 }}>
        <Typography variant="h4" mb={1}>
          <Skeleton variant="text" width={180} />
        </Typography>
        <Stack spacing={0} mt={1} mb={2}>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              <Skeleton variant="text" width={80} />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton variant="text" width={80} />
            </Typography>
          </Stack>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              <Skeleton variant="text" width={80} />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton variant="text" width={80} />
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2} mt={2}>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={80} />
          </Typography>
          <Typography variant="subtitle1">
            <Skeleton variant="text" width={80} />
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
