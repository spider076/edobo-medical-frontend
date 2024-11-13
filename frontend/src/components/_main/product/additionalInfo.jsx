'use client';
import React from 'react';
// mui
import { Box, alpha, Card, Grid, Typography, useTheme } from '@mui/material';
// icons
import { MdVerified } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import { BsShieldFillCheck } from 'react-icons/bs';

export default function AdditionalInfo() {
  const theme = useTheme();
  return (
    <Grid container spacing={3}>
      {PRODUCT_DESCRIPTION.map((item) => (
        <Grid item xs={12} md={4} key={item.title}>
          <Card
            sx={{
              borderRadius: '8px',
              width: '100%',
              position: 'relative',
              py: 4,
              position: 'relative',
              backgroundColor: theme.palette.primary.main,
              overflow: 'hidden',
              '& .fabBtn': {
                backgroundColor: theme.palette.primary.light
              },
              '&:before': {
                content: "''",
                position: 'absolute',
                top: '40%',
                transform: 'translateY(-50%)',
                left: '-10%',
                backgroundColor: alpha(theme.palette.primary.light, 0.5),
                height: 80,
                width: 80,
                borderRadius: '50px',
                zIndex: 0
              },
              '&:after': {
                content: "''",
                position: 'absolute',
                right: '5%',
                transform: 'translateY(-50%)',
                bottom: '-50%',
                backgroundColor: alpha(theme.palette.primary.light, 0.5),
                height: 80,
                width: 80,
                borderRadius: '50px',
                zIndex: 0
              }
            }}
          >
            <Box
              sx={{
                my: 2,
                mx: 'auto',
                maxWidth: 280,
                textAlign: 'center'
              }}
            >
              <Box
                sx={{
                  margin: 'auto',
                  marginBottom: 1,
                  color: 'common.white',
                  backgroundColor: 'primary.light',
                  height: 48,
                  width: 48,
                  borderRadius: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="subtitle1" color="common.white" gutterBottom>
                {item.title}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    icon: <MdVerified size={30} />
  },
  {
    title: '10 Days Replacement',
    icon: <FiClock size={28} />
  },
  {
    title: '1 year Warranty',
    icon: <BsShieldFillCheck size={28} />
  }
];
