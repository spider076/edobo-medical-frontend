import React from 'react';
import Image from 'next/image';
// mui
import { Box, Typography } from '@mui/material';
// image
import TeamImage from '../../../../public/images/team.png';

export default function Team() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative', width: '100%', height: 308, borderRadius: 2, overflow: 'hidden' }}>
        <Image src={TeamImage} alt="TeamImage" fill placeholder="blur" objectFit="cover" objectPosition="center" />
      </Box>
      <Typography variant="h4" color="text.primary" sx={{ marginTop: 2, mb: 1 }} textAlign="center">
        Benjamin Martin
      </Typography>
      <Typography variant="body1" fontWeight={400} color="text.secondary" sx={{ textAlign: 'center', mx: 'auto' }}>
        Leader
      </Typography>
    </Box>
  );
}
