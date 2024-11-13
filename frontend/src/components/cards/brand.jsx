'use client';
import React from 'react';
import { uniqueId } from 'lodash';
import { capitalize } from 'lodash';

// next
import Link from 'next/link';
import PropTypes from 'prop-types';
// mui
import { Card, Typography, Skeleton, CardContent, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// components
import BlurImage from 'src/components/blurImage';

export default function UserBrandsCard({ item, isLoading }) {
  const theme = useTheme();
  const baseUrl = '/brands/';
  return (
    <Card key={uniqueId()}>
      <CardContent>
        {isLoading ? (
          <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 1, mx: 'auto' }} />
        ) : (
          <Box
            sx={{
              position: 'relative',
              overflow: 'hidden',
              height: 120,
              width: 120,
              minWidth: 120,
              borderRadius: 50,
              border: `1px solid ${theme.palette.divider}`,
              mx: 'auto',
              mb: 2
            }}
          >
            <BlurImage priority fill alt={item?.name} src={item?.logo?.url} objectFit="cover" />
          </Box>
        )}
        <Typography
          noWrap
          variant="h6"
          textAlign="center"
          color="text.primary"
          {...(!isLoading && {
            component: Link,
            href: baseUrl + item?.slug
          })}
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          {isLoading ? <Skeleton variant="text" /> : capitalize(item?.name)}
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          {isLoading ? <Skeleton variant="text" /> : item?.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
UserBrandsCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    _id: PropTypes.string,
    logo: PropTypes.shape({
      url: PropTypes.string
    }),
    createdAt: PropTypes.string,
    status: PropTypes.string,
    slug: PropTypes.string
  }),
  isLoading: PropTypes.bool,
  handleClickOpen: PropTypes.func
};
