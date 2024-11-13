import React from 'react';

// mui
import { Stack, Card, CardHeader, Typography, Skeleton } from '@mui/material';

export default function CheckoutGuestFormSkeleton() {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h4">
            <Skeleton variant="text" width={200} />
          </Typography>
        }
        // sx={{ mb: 1 }}
      />
      <Stack spacing={{ xs: 2, sm: 3 }} p={3} mt={1}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
              <Skeleton variant="text" width={100} />
            </Typography>
            <Skeleton variant="rounded" width={'100%'} height={56} />
          </Stack>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
              <Skeleton variant="text" width={100} />
            </Typography>
            <Skeleton variant="rounded" width={'100%'} height={56} />
          </Stack>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
              <Skeleton variant="text" width={100} />
            </Typography>
            <Skeleton variant="rounded" width={'100%'} height={56} />
          </Stack>

          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
              <Skeleton variant="text" width={100} />
            </Typography>
            <Skeleton variant="rounded" width={'100%'} height={56} />
          </Stack>
        </Stack>
        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
            <Skeleton variant="text" width={100} />
          </Typography>
          <Skeleton variant="rounded" width={'100%'} height={56} />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
              <Skeleton variant="text" width={100} />
            </Typography>
            <Skeleton variant="rounded" width={'100%'} height={56} />
          </Stack>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
              <Skeleton variant="text" width={100} />
            </Typography>
            <Skeleton variant="rounded" width={'100%'} height={56} />
          </Stack>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
              <Skeleton variant="text" width={100} />
            </Typography>
            <Skeleton variant="rounded" width={'100%'} height={56} />
          </Stack>
        </Stack>
        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" color="text.primary" for="firstName" component={'label'}>
            <Skeleton variant="text" width={100} />
          </Typography>
          <Skeleton variant="rounded" width={'100%'} height={56} />
        </Stack>
      </Stack>
    </Card>
  );
}
