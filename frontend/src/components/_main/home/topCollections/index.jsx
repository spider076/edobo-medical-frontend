'use client';
import React from 'react';
import NextLink from 'next/link';
// mui
import { Grid, Button, Typography, Box, Stack } from '@mui/material';
// icons
import { IoIosArrowForward } from 'react-icons/io';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

// components
import ProductCard from 'src/components/cards/product';
import TodayCountDown from '../todayCountDown';

export default function TopCollections() {
  const { data, isLoading } = useQuery(['get-best-products'], () => api.getTopRatedProducts());

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="h2" color="text.primary" mt={{ xs: 5, md: 8 }}>
            Today Deal
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={5}>
            Choose your necessary products from this feature category
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: 6
          }}
          endIcon={<IoIosArrowForward />}
          component={NextLink}
          href={`/products?top=-1`}
        >
          View More
        </Button>
      </Stack>

      <Stack direction="row" spacing={2}>
        <Box>
          <TodayCountDown />
        </Box>
        <Grid container spacing={2}>
          {(isLoading ? Array.from(new Array(8)) : data?.data).map((item) => (
            <>
              <Grid item xs={6} sm={6} md={4} lg={3} key={Math.random()}>
                <ProductCard product={item} loading={isLoading} />
              </Grid>
            </>
          ))}
        </Grid>
      </Stack>

      {/* {Boolean(data?.data?.length > 7) && (
        <Button
          size="large"
          color="primary"
          endIcon={<IoIosArrowForward />}
          component={NextLink}
          href={`/products?top=-1`}
          sx={{
            mt: 3,
            mx: 'auto',
            display: 'flex',
            maxWidth: 180,
            minWidth: 130
          }}
        >
          View All
        </Button>
      )} */}
      {!isLoading && !Boolean(data?.data.length) && (
        <Typography variant="h3" color="error.main" textAlign="center">
          Products not found
        </Typography>
      )}
    </Box>
  );
}
