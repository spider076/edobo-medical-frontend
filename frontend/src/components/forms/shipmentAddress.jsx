'use client';
import React from 'react';
import PropTypes from 'prop-types';
// mui
import { Stack, TextField, Card, CardHeader, Typography } from '@mui/material';
// countries
import countries from '../_main/checkout/countries.json';

export default function ShipmentCheckoutForm({ getFieldProps, touched, errors }) {
  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader
        title={<Typography variant="h4">Ship to a different address</Typography>}
        // sx={{ mb: 1 }}
      />
      <Stack spacing={{ xs: 2, sm: 3 }} p={3} mt={1}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="firstName" component={'label'}>
              First Name
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('shippingAddress.firstName')}
              error={Boolean(touched?.shippingAddress?.firstName && errors?.shippingAddress?.firstName)}
              helperText={touched?.shippingAddress?.firstName && errors?.shippingAddress?.firstName}
              type="text"
            />
          </Stack>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="lastName" component={'label'}>
              Last Name
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('shippingAddress.lastName')}
              error={Boolean(touched?.shippingAddress?.lastName && errors?.shippingAddress?.lastName)}
              helperText={touched?.shippingAddress?.lastName && errors?.shippingAddress?.lastName}
              type="text"
            />
          </Stack>
        </Stack>
        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" color="text.primary" htmlFor="address" component={'label'}>
            Address
          </Typography>
          <TextField
            fullWidth
            {...getFieldProps('shippingAddress.address')}
            error={Boolean(touched?.shippingAddress?.address && errors?.shippingAddress?.address)}
            helperText={touched?.shippingAddress?.address && errors?.shippingAddress?.address}
          />
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="city" component={'label'}>
              Town City
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('shippingAddress.city')}
              error={Boolean(touched?.shippingAddress?.city && errors?.shippingAddress?.city)}
              helperText={touched?.shippingAddress?.city && errors?.shippingAddress?.city}
            />
          </Stack>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="state" component={'label'}>
              State
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('shippingAddress.state')}
              error={Boolean(touched?.shippingAddress?.state && errors?.shippingAddress?.state)}
              helperText={touched?.shippingAddress?.state && errors?.shippingAddress?.state}
            />
          </Stack>
          <Stack spacing={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="zip" component={'label'}>
              Zip/Postal Code
            </Typography>
            <TextField
              fullWidth
              {...getFieldProps('shippingAddress.zip')}
              error={Boolean(touched?.shippingAddress?.zip && errors?.shippingAddress?.zip)}
              helperText={touched?.shippingAddress?.zip && errors?.shippingAddress?.zip}
              type="number"
            />
          </Stack>
        </Stack>
        <Stack spacing={0.5} width={1}>
          <Typography variant="overline" color="text.primary" htmlFor="country" component={'label'}>
            Country
          </Typography>
          <TextField
            select
            fullWidth
            placeholder="Country"
            {...getFieldProps('shippingAddress.country')}
            SelectProps={{ native: true }}
            error={Boolean(touched?.shippingAddress?.country && errors?.shippingAddress?.country)}
            helperText={touched?.shippingAddress?.country && errors?.shippingAddress?.country}
          >
            {countries.map((option) => (
              <option key={option.code} value={option.label}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Stack>
      </Stack>
    </Card>
  );
}
ShipmentCheckoutForm.propTypes = {
  getFieldProps: PropTypes.func.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
