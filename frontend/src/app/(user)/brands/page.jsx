'use client';
import React from 'react';

// mui
import { Typography, Grid, Box, Stack, Container } from '@mui/material';

// component
import UserBrandsCard from 'src/components/cards/brand';

// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

export default function BrandPage() {
  const { data, isLoading } = useQuery(['get-brands-user'], () => api.getBrands());
  return (
    <Container maxWidth="xl">
      <Stack
        direction={'column'}
        sx={{
          gap: 3,
          my: 5
        }}
      >
        <Box>
          <Typography variant="h2" color="text.primary" textAlign="center">
            All Brands
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            {(isLoading ? Array.from(new Array(5)) : data?.data).map((inner) => (
              <React.Fragment key={Math.random()}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <UserBrandsCard item={inner} isLoading={isLoading} />
                </Grid>
              </React.Fragment>
            ))}
            {!Boolean(data?.data.length) && (
              <Typography variant="h3" color="error.main" textAlign="center">
                Brands not found
              </Typography>
            )}
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
}
