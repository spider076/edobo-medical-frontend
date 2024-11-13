'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// mui
import { Box, Button, Card, Stack, Typography, useTheme } from '@mui/material';
// import { IoIosArrowForward } from 'react-icons/io';
import NextLink from 'next/link';
// images
import bgImage from '../../../../../public/images/top-banners/countdown.png';
export default function Index() {
  const theme = useTheme();
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const countdownDate = new Date('2024-12-31T23:59:59').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({ hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTime({ hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card
      sx={{
        width: 336,
        position: 'relative',
        // backgroundImage: 'url(../../../../../public/images/top-banners/countdown.png)',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        minHeight: 680,
        height: '100%',
        borderRadius: 6,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        px: 2
      }}
    >
      <Image fill objectFit="cover" draggable="false" src={bgImage} alt="bg-image" />
      <Stack spacing={2} position="relative">
        <Typography variant="body1" color="common.white" fontWeight={700} textAlign="center">
          Upto
        </Typography>
        <Typography
          color="common.white"
          fontWeight={700}
          fontSize={{ xl: 32, lg: 24, md: 18 }}
          sx={{
            bgcolor: 'primary.main',
            px: 2,
            py: 0.5,
            borderRadius: 1
          }}
        >
          30% Off
        </Typography>
      </Stack>
      <Typography variant="body1" color="common.white" textAlign="center" position="relative">
        Visit our showroom today for exclusive offers on premium products. Discover unbeatable deals and elevate your
        lifestyle with our curated selection. Limited time, extraordinary savings await you
      </Typography>
      <Stack direction="row" spacing={2} position="relative">
        <Box
          sx={{
            px: 3,
            py: 1.5,
            bgcolor: theme.palette.background.paper,
            textAlign: 'center',
            borderRadius: 1
          }}
        >
          <Typography variant="body1" color="text.primary" fontWeight={700} fontSize={24}>
            {time.hours.toString().padStart(2, '0')}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Hours
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2.5,
            py: 1.5,
            bgcolor: theme.palette.background.paper,
            textAlign: 'center',
            borderRadius: 1
          }}
        >
          <Typography variant="body1" color="text.primary" fontWeight={700} fontSize={24}>
            {time.minutes.toString().padStart(2, '0')}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Minutes
          </Typography>
        </Box>
        <Box
          sx={{
            px: 2.4,
            py: 1.5,
            bgcolor: theme.palette.background.paper,
            textAlign: 'center',
            borderRadius: 1
          }}
        >
          <Typography variant="body1" color="text.primary" fontWeight={700} fontSize={24}>
            {time.seconds.toString().padStart(2, '0')}
          </Typography>
          <Typography variant="body2" color="text.primary">
            Seconds
          </Typography>
        </Box>
      </Stack>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          borderRadius: 6
        }}
        component={NextLink}
        href={``}
      >
        View Product
      </Button>
    </Card>
  );
}
