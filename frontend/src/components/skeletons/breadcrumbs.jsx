import React from 'react';
// mui
import { Card, Skeleton } from '@mui/material';

export default function Breadcrumbs() {
  return (
    <Card
      sx={{
        mt: 5,
        height: 128,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 2,
        paddingX: 2
      }}
    >
      <Skeleton variant="rounded" width={200} height={35} />
      <Skeleton variant="rounded" width={150} height={20} />
    </Card>
  );
}
