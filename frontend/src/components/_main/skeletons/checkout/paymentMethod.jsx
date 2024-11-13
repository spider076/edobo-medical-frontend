import React from 'react';
// mui
import { Card, CardContent, Typography, Stack, Skeleton } from '@mui/material';

export default function PaymentMethodCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" mb={1}>
          <Skeleton variant="text" />
        </Typography>

        <Stack spacing={1} mt={1}>
          <Stack sx={{ pl: 1 }} spacing={1}>
            <Stack direction="row" gap={1}>
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton variant="text" width={150} />
            </Stack>
            <Stack direction="row" gap={1}>
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton variant="text" width={150} />
            </Stack>
            <Stack direction="row" gap={1}>
              <Skeleton variant="circular" width={36} height={36} />
              <Skeleton variant="text" width={150} />
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
