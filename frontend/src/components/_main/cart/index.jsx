'use client';
import React from 'react';
import dynamic from 'next/dynamic';
// mui
import { Box, Grid } from '@mui/material';
// api
import * as api from 'src/services';
import { useMutation } from 'react-query';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from 'src/redux/slices/product';
// components
import PaymentSummarySkeleton from 'src/components/skeletons/cart/paymentSummary';
import ShoppingCartSkeleton from 'src/components/skeletons/cart/shoppingcart';
// dynamic
const ShoppingCart = dynamic(() => import('src/components/_main/cart/shoppingCart'), {
  loading: () => <ShoppingCartSkeleton />
});
const PaymentSummary = dynamic(() => import('src/components/_main/cart/paymentSummary'), {
  loading: () => <PaymentSummarySkeleton />
});

export default function CartMain() {
  const dispatch = useDispatch();
  const { checkout } = useSelector(({ product }) => product);
  const { cart } = checkout;
  const [loading, setLoading] = React.useState(true);
  const { mutate } = useMutation(api.getCart, {
    onSuccess: (res) => {
      setLoading(false);
      dispatch(getCart(res.data));
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      setLoading(false);
      toast.error(message ? JSON.parse(message) : 'Something went wrong!');
    }
  });
  React.useEffect(() => {
    setLoading(true);
    mutate(cart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Box py={5}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <ShoppingCart loading={loading} />
          </Grid>
          <Grid item xs={12} md={4}>
            <PaymentSummary loading={loading} cart={cart} />
            {/* <Box mt={2}>
              <LoadingButton
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  borderRadius: '8px'
                }}
                disabled={isEmptyCart}
                loading={loading}
                onClick={() => router.push('/checkout')}
              >
                Checkout
              </LoadingButton>
            </Box> */}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
