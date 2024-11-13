'use client';
import React from 'react';
// mui
import Sorting from './filters/sorting';
import { Grid } from '@mui/material';
// components
import ProductCard from './productCard';

export default function productList() {
  return (
    <>
      <Sorting />
      <Grid container spacing={3}>
        {Array.from(new Array(6)).map((index) => (
          <Grid item md={4} xs={6} key={index}>
            <ProductCard />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
