import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';
// components
import CheckoutGuestFormSkeleton from './checkoutForm';
import PaymentInfoSkeleton from './paymentInfo';
import CardItemSekelton from './cartItems';
import PaymentMethodCardSkeleton from './paymentMethod';

export default function CheckoutSkeleton() {
  return (
    <Box py={5}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <CheckoutGuestFormSkeleton />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardItemSekelton />
          <PaymentInfoSkeleton />
          <PaymentMethodCardSkeleton />
          <br />
          <Skeleton variant="rounded" height={48} />
        </Grid>
      </Grid>
    </Box>
  );
}
