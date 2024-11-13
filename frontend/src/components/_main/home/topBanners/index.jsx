'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// mui
import { Box, Card, Grid, Stack, Typography, Button, Container } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
// images
import banner1Img from '../../../../../public/images/banner-1.png';
import banner2Img from '../../../../../public/images/banner-2.png';

export default function Index() {
  const theme = useTheme();
  const isDeskTop = useMediaQuery(theme.breakpoints.up('xl'));
  const isDeskTopBtn = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box mb={2} mt={2}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12} sm={6}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '12px',
                height: '100%',
                px: { lg: 3, md: 1 },
                position: 'relative'
              }}
            >
              <Image
                draggable="false"
                src={banner1Img}
                alt="banner-1"
                placeholder="blur"
                layout="fill"
                static
                sizes="100vw"
                objectFit="cover"
              />
              <Stack
                spacing={isDeskTop ? 2 : 1.5}
                sx={{ p: { sm: '24px', xs: '12px', zIndex: 99, position: 'relative' } }}
              >
                <Typography
                  variant={'h4'}
                  lineHeight={1.3}
                  sx={{
                    width: {
                      xl: '320px !important',
                      lg: '300px !important',
                      md: '220px !important',
                      xs: '170px !important'
                    },
                    fontSize: {
                      xl: 38,
                      lg: 38,
                      md: 28,
                      sm: 20,
                      xs: 20
                    }
                  }}
                >
                  Shop the latest from top brands
                </Typography>

                <Typography
                  variant={isDeskTop ? 'body1' : 'body2'}
                  mb={2}
                  display={{ md: 'block', xs: 'none' }}
                  width={{ xl: 270 }}
                >
                  Fully Comforable and Smooth Product
                </Typography>
                <Box>
                  <Button
                    component={Link}
                    href="/products"
                    variant="contained"
                    color={'primary'}
                    size={isDeskTopBtn ? 'large' : 'small'}
                    sx={{
                      borderRadius: 6
                    }}
                  >
                    View Collection
                  </Button>
                </Box>
              </Stack>
            </Card>
          </Grid>
          {/* card 2  */}
          <Grid item lg={6} md={6} xs={12} sm={6}>
            <Card
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: '12px',
                height: '100%',
                py: { xs: 0, md: 3 },
                px: { lg: 3, md: 1, xs: 1 },
                position: 'relative'
              }}
            >
              <Image
                draggable="false"
                src={banner2Img}
                alt="banner-1"
                placeholder="blur"
                layout="fill"
                static
                sizes="100vw"
                objectFit="cover"
              />

              <Stack spacing={isDeskTop ? 1 : 1.5} sx={{ p: { sm: '24px', xs: '12px', zIndex: 99 } }}>
                <Typography
                  variant={'h4'}
                  lineHeight={1.3}
                  sx={{
                    width: {
                      xl: '320px !important',
                      lg: '300px !important',
                      md: '220px !important',
                      xs: '170px !important'
                    },
                    fontSize: {
                      xl: 38,
                      lg: 38,
                      md: 28,
                      sm: 20,
                      xs: 20
                    }
                  }}
                >
                  Shop the latest from top brands
                </Typography>

                <Typography
                  variant={isDeskTop ? 'body1' : 'body2'}
                  mb={2}
                  display={{ md: 'block', xs: 'none' }}
                  width={{ xl: 270 }}
                >
                  Fully Comforable and Smooth Product
                </Typography>
                <Box>
                  <Button
                    component={Link}
                    href="/products"
                    variant="contained"
                    color={'secondary'}
                    size={isDeskTopBtn ? 'large' : 'small'}
                    sx={{
                      borderRadius: 6
                    }}
                  >
                    View Collection
                  </Button>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
