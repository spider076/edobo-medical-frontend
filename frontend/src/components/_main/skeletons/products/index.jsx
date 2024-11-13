import React from 'react';
// mui
import { Box, Container, Grid } from '@mui/material';
// components
import Breadcrumbs from './breadcrumbs';
import Filter from './filters';
import ProductList from './productList';

export default function index() {
  return (
    <Box>
      <Box sx={{ bgcolor: 'background.default' }}>
        <Container maxWidth="xl">
          <Breadcrumbs />
          <Grid container spacing={3}>
            <Grid
              item
              md={3}
              xs={0}
              sx={{
                display: { xs: 'none', md: 'block' }
              }}
            >
              <Filter />
            </Grid>
            <Grid item md={9} xs={12} mt={2}>
              <ProductList />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
