import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

// mui
import { IconButton, alpha, Stack, Typography } from '@mui/material';

// icons
import { GoGitCompare } from 'react-icons/go';

export default function WishlistWidget() {
  const { products: compareProducts } = useSelector(({ compare }) => compare);
  return (
    <Link href="/compare">
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        width="auto"
        sx={{
          cursor: 'pointer'
        }}
      >
        <IconButton
          aria-label="compare"
          color="primary"
          disableRipple
          sx={{
            borderColor: 'primary',
            borderWidth: 1,
            borderStyle: 'solid',
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1)
          }}
        >
          <GoGitCompare />
        </IconButton>
        <Stack>
          <Typography variant="subtitle2" color="text.primary" mb={-0.6}>
            Compare
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {compareProducts?.length || 0} {compareProducts?.length > 1 ? 'Items' : 'Item'}
          </Typography>
        </Stack>
      </Stack>
    </Link>
  );
}
