'use client';
// react
import React from 'react';
import NextLink from 'next/link';
import { useSelector } from 'react-redux';

// mui
import { Typography, Grid, Box, Stack, Paper, Button } from '@mui/material';
// icons
import { IoIosArrowForward } from 'react-icons/io';
// component
import ShopCard from 'src/components/cards/shop';

export default function ShopComponent() {
  const { shops = [], isLoading } = useSelector(({ shops }) => shops);

  return (
    <Paper elevation={0}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        textAlign={{ xs: 'center', md: 'left' }}
        mb={3}
      >
        <Box width="100%">
          <Typography variant="h2" color="text.primary" mt={{ xs: 4, md: 8 }}>
            Best Shops
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={{ xs: 3, md: 5 }}>
            Our Highest Rated Shops Where You Can Find What You Are Looking For
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
          href={`/shops`}
        >
          View More
        </Button>
      </Stack>

      <Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {(isLoading ? Array.from(new Array(6)) : shops)?.map((inner) => (
            <React.Fragment key={Math.random()}>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <ShopCard shop={inner} isLoading={isLoading} />
              </Grid>
            </React.Fragment>
          ))}
          {!isLoading && !Boolean(shops?.length) && (
            <Typography variant="h3" color="error.main" textAlign="center">
              Shop not found
            </Typography>
          )}
        </Grid>
        <Button
          variant="text"
          color="primary"
          size="small"
          sx={{
            borderRadius: 6,
            mx: 'auto',
            mt: 3,
            display: { md: 'none', xs: 'flex' },
            maxWidth: '120px'
          }}
          endIcon={<IoIosArrowForward />}
          component={NextLink}
          href={`/shops`}
        >
          View More
        </Button>
      </Box>
    </Paper>
  );
}
