'use client';
import React from 'react';
import NextLink from 'next/link';
// mui
import { Typography, Grid, Box, Stack, Paper, Button } from '@mui/material';
// icons
import { IoIosArrowForward } from 'react-icons/io';
// component
import CompaginCard from 'src/components/cards/compagin';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

export default function CompaignsComponent({}) {
  const { data, isLoading } = useQuery(['get-home-compaign-all'], () => api.getHomeCompaigns('?limit=4'));

  return !isLoading && !Boolean(data?.data.length) ? null : (
    <Paper elevation={0}>
      <Stack
        direction="row"
        justifyContent="space-between"
        textAlign={{ xs: 'center', md: 'left' }}
        alignItems="center"
      >
        <Box width="100%">
          <Typography variant="h2" color="text.primary" mt={{ xs: 4, md: 8 }}>
            All Compaigns
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={{ xs: 3, md: 5 }}>
            All of Ours Compaigns{' '}
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
          href={`/compaigns`}
        >
          View More
        </Button>
      </Stack>
      <Box>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {(isLoading ? Array.from(new Array(6)) : data?.data).map((inner) => (
            <React.Fragment key={Math.random()}>
              <Grid item lg={3} md={4} sm={6} xs={12}>
                <CompaginCard compaign={inner} isLoading={isLoading} />
              </Grid>
            </React.Fragment>
          ))}
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
          href={`/compaigns`}
        >
          View More
        </Button>
      </Box>
    </Paper>
  );
}
