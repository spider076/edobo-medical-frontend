'use client';
import React from 'react';
import NextLink from 'next/link';

// mui
import { Typography, Box, Stack, Button } from '@mui/material';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';
// components
import ProductsCarousel from 'src/components/carousels/gridSlider';
// icons
import { IoIosArrowForward } from 'react-icons/io';

export default function Featured() {
  const { data, isLoading } = useQuery(['get-best-products'], () => api.getBestSellingProducts());

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
      >
        <Box
          sx={{
            width: '100%'
          }}
        >
          <Typography variant="h2" color="text.primary" mt={{ xs: 4, md: 8 }}>
            Best Selling Products
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={{ xs: 3, md: 5 }}>
            Special products in this month
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: 6,
            display: { xs: 'none', md: 'flex' },
            minWidth: 130,
            px: 1
          }}
          endIcon={<IoIosArrowForward />}
          component={NextLink}
          href={`/products?top=1`}
        >
          View More
        </Button>
      </Stack>

      {!isLoading && !Boolean(data?.data.length) ? (
        <Typography variant="h3" color="error.main" textAlign="center">
          Products not found
        </Typography>
      ) : (
        <ProductsCarousel data={data?.data} isLoading={isLoading} />
      )}
      <Button
        variant="text"
        color="primary"
        size="small"
        sx={{
          borderRadius: 6,
          mx: 'auto',
          display: { md: 'none', xs: 'flex' },
          maxWidth: '120px'
        }}
        endIcon={<IoIosArrowForward />}
        component={NextLink}
        href={`/products?top=1`}
      >
        View More
      </Button>
    </Box>
  );
}
