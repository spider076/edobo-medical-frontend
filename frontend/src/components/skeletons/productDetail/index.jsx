import React from 'react';
import PropTypes from 'prop-types';

// mui
import { Box, Container, Card, Grid } from '@mui/material';
// components
import ProductDetailsImageSkeleton from './productDetailImage';
import BreadcrumbsSkeleton from '../breadcrumbs';
import ProductDetailsSumarySkeleton from './productDetailsSumary';
ProductDetailSkeleton.propTypes = {
  isPopup: PropTypes.bool
};

export default async function ProductDetailSkeleton({ isPopup }) {
  return isPopup ? (
    <Grid container spacing={2} justifyContent="center" sx={{ p: 3 }}>
      <Grid item xs={12} sm={8} md={6} lg={6}>
        <ProductDetailsImageSkeleton />
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <ProductDetailsSumarySkeleton />
      </Grid>
    </Grid>
  ) : (
    <Box>
      <Container maxWidth="xl">
        <BreadcrumbsSkeleton />
        <Card
          sx={{
            p: 2,
            mt: 4,
            borderWidth: 0,
            bgcolor: 'background.paper',
            mb: 3
          }}
        >
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={8} md={6} lg={6}>
              <ProductDetailsImageSkeleton />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <ProductDetailsSumarySkeleton />
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Box>
  );
}
