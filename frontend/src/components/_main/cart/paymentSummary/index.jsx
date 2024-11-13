'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next-nprogress-bar';
import Image from 'next/image';
import { useSelector } from 'react-redux';
// mui
import { CardContent, Typography, Stack, Divider, Skeleton, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks components
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
import RootStyled from './styled';
// images
import paymentImg from '../../../../../public/images/payment-method.png';

PaymentSummary.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default function PaymentSummary({ loading, cart }) {
  const { product } = useSelector((state) => state);
  const { total, shipping, subtotal } = product.checkout;

  const router = useRouter();

  const isEmptyCart = cart.length === 0;

  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();

  return (
    <RootStyled>
      <CardContent sx={{ py: 2 }}>
        <Typography variant="h4" mb={1}>
          Payment Summary
        </Typography>
        <Stack spacing={0} mt={1} mb={2}>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Subtotal:
            </Typography>
            <Typography variant="subtitle2">
              {loading ? <Skeleton variant="text" width={80} /> : fCurrency(cCurrency(subtotal))}
            </Typography>
          </Stack>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Shipping:
            </Typography>
            <Typography variant="subtitle2">
              {loading ? (
                <Skeleton variant="text" width={80} />
              ) : !shipping ? (
                'Free'
              ) : (
                fCurrency(cCurrency(parseInt(shipping)))
              )}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2} mt={2}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="subtitle1">
            {loading ? <Skeleton variant="text" width={80} /> : fCurrency(cCurrency(total))}
          </Typography>
        </Stack>
        <Box sx={{ position: 'relative', width: '100%', height: 26, mt: 2 }}>
          <Image src={paymentImg} alt="payment" fill objectFit="contain" />
        </Box>
        <Box mt={2}>
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
        </Box>
      </CardContent>
    </RootStyled>
  );
}
