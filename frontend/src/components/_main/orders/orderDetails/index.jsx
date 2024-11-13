'use client';
import React from 'react';
// mui
import { Typography, Card, CardContent, Stack, Fab, Grid, Skeleton } from '@mui/material';
import { IoPersonSharp } from 'react-icons/io5';
import { HiCurrencyDollar } from 'react-icons/hi2';
// hooks

import { useCurrencyFormatter } from 'src/hooks/formatCurrency';
import RootStyled from './styled';

import PropTypes from 'prop-types';

Details.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default function Details({ ...props }) {
  const { data, isLoading } = props;
  const user = data?.user;
  const fCurrency = useCurrencyFormatter(data?.currency);
  return (
    <RootStyled>
      <Grid spacing={2} container>
        <Grid item xs={12} md={12}>
          <Card className="detail-card">
            <CardContent className="detail-card-content">
              <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                {isLoading ? (
                  <>
                    <Skeleton variant="rectangular" width={50} height={50} />
                    <Skeleton variant="text" width={150} />
                  </>
                ) : (
                  <>
                    <Fab className="detail-card-btn" variant="contained" color="primary">
                      <IoPersonSharp size={25} />
                    </Fab>
                    <Typography variant="h6">Customor Details</Typography>
                  </>
                )}
              </Stack>
              <Stack spacing={isLoading ? 0 : 1} mt={3}>
                {isLoading ? (
                  <>
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      <strong>Name</strong>: {user?.firstName + ' ' + user?.lastName}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Phone</strong>: {user?.phone}
                    </Typography>
                    <Typography className="email-haeding" variant="body2">
                      <strong>Email</strong>: {user?.email}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Address</strong>: {user?.address} {user?.zip}, {user?.city} {user?.state}, {user?.country}
                    </Typography>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={12}>
          <Card className="detail-card">
            <CardContent className="detail-card-content">
              <Stack spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                {isLoading ? (
                  <>
                    <Skeleton variant="rectangular" width={50} height={50} />
                    <Skeleton variant="text" width={150} />
                  </>
                ) : (
                  <>
                    <Fab className="detail-card-btn" variant="contained" color="primary">
                      <HiCurrencyDollar size={40} />
                    </Fab>
                    <Typography variant="h6">Payment Method</Typography>
                  </>
                )}
              </Stack>
              <Stack spacing={isLoading ? 0 : 1} mt={3}>
                {isLoading ? (
                  <>
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                    <Skeleton variant="text" width={200} />
                  </>
                ) : (
                  <>
                    <Typography variant="body2">
                      <strong>Method</strong>:{' '}
                      {data?.paymentMethod === 'COD'
                        ? 'Cash On Delivery'
                        : data?.paymentMethod === 'PayPal'
                          ? 'Paypal'
                          : 'Credit Card'}
                    </Typography>
                    {data?.paymentId && (
                      <Typography variant="body2">
                        <strong>Payment ID</strong>: {data?.paymentId}
                      </Typography>
                    )}

                    <Typography variant="body2" textTransform="capitalize">
                      <strong>Status</strong>: {data?.status}
                    </Typography>
                    <Typography variant="body2" textTransform="capitalize">
                      <strong>Shipping Fee</strong>: {fCurrency(data?.shipping * data?.conversionRate)}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Order Date</strong>:{' '}
                      {data?.createdAt &&
                        new Date(data?.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          minute: 'numeric',
                          hour: 'numeric'
                        })}
                    </Typography>
                  </>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </RootStyled>
  );
}
