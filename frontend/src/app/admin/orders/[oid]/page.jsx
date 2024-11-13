'use client';
import React from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

// mui
import { Container, Grid, Box, Alert, Skeleton } from '@mui/material';

// components
import OrderDetails from 'src/components/_main/orders/orderDetails';
import TableCard from 'src/components/table/order';
import HeaderBreadcrumbs from 'src/components/headerBreadcrumbs';
import OrderToolbarActions from 'src/components/_admin/orders/orderToolbarActions';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

OrderDetail.propTypes = {
  params: PropTypes.shape({
    oid: PropTypes.string.isRequired
  }).isRequired
};
export default function OrderDetail({ params }) {
  const { data, isLoading } = useQuery(['order-by-admin'], () => api.getOrderByAdmin(params.oid), {
    onError: (err) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  });
  return (
    <Box>
      <HeaderBreadcrumbs
        admin
        heading="Order details"
        links={[
          {
            name: 'Dashboard',
            href: '/admin'
          },
          {
            name: 'Orders',
            href: '/admin/orders'
          },
          {
            name: 'Order details',
            href: ''
          }
        ]}
        action={
          <>
            <OrderToolbarActions data={data?.data} />
          </>
        }
      />
      <Container maxWidth="xl">
        <Grid container direction={{ xs: 'row', md: 'row-reverse' }} spacing={2}>
          <Grid item xs={12} md={4}>
            {isLoading ? (
              <Skeleton variant="rounded" height={48} width="100%" />
            ) : data?.data?.description ? (
              <Alert severity="success" color="warning">
                {data?.data?.description}
              </Alert>
            ) : null}
            {isLoading || data?.data?.description ? <br /> : null}
            <OrderDetails data={data?.data} isLoading={isLoading} currency={'$'} />
          </Grid>
          <Grid item xs={12} md={8}>
            <TableCard data={data?.data} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
