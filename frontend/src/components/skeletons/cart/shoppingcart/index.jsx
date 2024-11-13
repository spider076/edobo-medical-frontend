'use client';
import React from 'react';
// mui
import { Card, CardHeader, CardContent, Typography, Box, Skeleton, Divider } from '@mui/material';
// components
import CartProductListSkeleton from './cartProductList';
import CartProductMobileSkeleton from './cartProductMobile';
// ----------------------------------------------------------------------

export default function ShoppingCartSkeleton() {
  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h4">
            <Skeleton variant="text" width={150} />
          </Typography>
        }
      />
      <CardContent sx={{ pb: '16px !important' }}>
        <CartProductMobileSkeleton />
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <CartProductListSkeleton />
        </Box>
        <Divider />
        <Box mt={2}>
          <Skeleton variant="rounded" width={160} height={48} />
        </Box>
      </CardContent>
    </Card>
  );
}
