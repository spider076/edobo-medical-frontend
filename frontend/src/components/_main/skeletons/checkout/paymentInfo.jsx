import React from 'react';
// mui
import { Card, CardContent, Typography, Stack, Divider, Skeleton } from '@mui/material';

export default function PaymentInfoSkeleton() {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ py: 2 }}>
        <Typography variant="h4" mb={1}>
          <Skeleton variant="text" width={150} />
        </Typography>

        <Stack spacing={0} mt={1} mb={2} gap={1}>
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
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              <Skeleton variant="text" width={80} />
            </Typography>
            <Typography variant="subtitle2">
              <Skeleton variant="text" width={80} />
            </Typography>
          </Stack>

          <Stack direction={'row'} gap={1}>
            <Skeleton variant="rounded" width={251} height={40} />
            <Skeleton variant="rounded" width={64} height={40} />
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
