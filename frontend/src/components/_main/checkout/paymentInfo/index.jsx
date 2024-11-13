'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

// mui
import { Card, CardContent, Typography, Stack, Divider, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hook
import { useCurrencyConvert } from 'src/hooks/convertCurrency';
import { useCurrencyFormatter } from 'src/hooks/formatCurrency';

// api
import * as api from 'src/services';
import { useMutation } from 'react-query';
PaymentInfo.propTypes = {
  setCouponCode: PropTypes.func.isRequired,
  setTotal: PropTypes.func.isRequired
};

function isExpired(expirationDate) {
  const currentDateTime = new Date();
  return currentDateTime >= new Date(expirationDate);
}

export default function PaymentInfo({ setCouponCode, setTotal }) {
  const { product } = useSelector((state) => state);
  const { total, shipping, subtotal } = product.checkout;
  const [code, setCode] = useState('');
  const cCurrency = useCurrencyConvert();
  const fCurrency = useCurrencyFormatter();

  const [discountPrice, setDiscountPrice] = useState(null);
  const [appliedDiscount, setDiscount] = useState(null);

  const { mutate, isLoading } = useMutation(api.applyCouponCode, {
    onSuccess: ({ data }) => {
      const expired = isExpired(data.expire);
      if (expired) {
        toast.error('Coupon code is expired!');
        return;
      }

      if (data.type === 'percent') {
        const percentLess = data.discount;
        setCouponCode(code);
        // Calculate the discount amount
        const discount = (percentLess / 100) * subtotal;

        // Calculate the discounted total
        const discountedTotal = subtotal - discount;
        setDiscount(discount);

        setDiscountPrice(discountedTotal + shipping);
        setTotal(discountedTotal + shipping);
        toast.success('Coupon code applied. You have saved ' + fCurrency(cCurrency(discount)));
      } else {
        const discountedTotal = subtotal - data.discount;
        setDiscount(data.discount);
        setTotal(discountedTotal);
        setCouponCode(code);
        toast.success('Coupon code applied. You have saved ' + fCurrency(cCurrency(data.discount)));
        setDiscountPrice(discountedTotal + +shipping);
      }
    },
    onError: () => {
      toast.error('Coupon code is not valid');
    }
  });

  const onApplyCoupon = () => {
    if (code.length > 3) {
      mutate(code);
    } else {
      toast.error('Enter valid coupon code.');
    }
  };
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent sx={{ py: 2 }}>
        <Typography variant="h4" mb={1}>
          Payment Summary
        </Typography>

        <Stack spacing={0} mt={1} mb={2} gap={1}>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Subtotal:
            </Typography>
            <Typography variant="subtitle2">{fCurrency(cCurrency(subtotal))}</Typography>
          </Stack>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Discount:
            </Typography>
            <Typography variant="subtitle2">-{fCurrency(cCurrency(appliedDiscount || 0))}</Typography>
          </Stack>
          <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2}>
            <Typography variant="subtitle2" color="text.secondary">
              Shipping:
            </Typography>
            <Typography variant="subtitle2">{!shipping ? 'Free' : fCurrency(cCurrency(shipping))}</Typography>
          </Stack>

          <Stack direction={'row'} gap={1}>
            <TextField
              id="coupon-field"
              fullWidth
              placeholder="Enter coupon code"
              size="small"
              value={code}
              disabled={Boolean(discountPrice)}
              onChange={(e) => setCode(e.target.value)}
            />
            <LoadingButton
              loading={isLoading}
              onClick={onApplyCoupon}
              variant="contained"
              color="primary"
              disabled={Boolean(discountPrice) || code.length < 4}
            >
              {discountPrice ? 'Applied' : 'Apply'}
            </LoadingButton>
          </Stack>
        </Stack>
        <Divider />
        <Stack direction="row" alignItem="center" justifyContent="space-between" spacing={2} mt={2}>
          <Typography variant="subtitle1">Total:</Typography>
          <Typography variant="subtitle1">{fCurrency(cCurrency(discountPrice || total))}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
