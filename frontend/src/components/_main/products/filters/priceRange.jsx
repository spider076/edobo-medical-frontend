import React from 'react';
import dynamic from 'next/dynamic';

import PropTypes from 'prop-types';
// mui
import { Typography, Stack, Skeleton } from '@mui/material';

PriceRange.propTypes = {
  prices: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired
};
// dynamic
const Slider = dynamic(() => import('src/components/slider'), {
  loading: () => (
    <Stack>
      <Typography variant="body1" sx={{ mb: 1.2, width: 124 }}>
        <Skeleton variant="text" />
      </Typography>

      <Stack direction="row" gap={1} sx={{ my: '18.1px' }}>
        <Skeleton variant="rectangular" sx={{ borderRadius: '4px', minWidth: 24 }} width={294} height={27} />
      </Stack>
    </Stack>
  )
});
export default function PriceRange({ prices, path }) {
  return <Slider prices={prices} path={path} />;
}
