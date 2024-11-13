'use client';
import React from 'react';
import PropTypes from 'prop-types';

// mui
import { Card, Box, Typography, IconButton, Divider } from '@mui/material';
// icons
import { MdClear } from 'react-icons/md';

// components
import BrandsFilter from './brands';
import GenderFilter from './gender';
import ColorsFilter from './colors';
import SizesFilter from './sizes';
import PriceRange from './price';
import Brands from 'src/components/_main/skeletons/products/filters/brands';
import Gender from 'src/components/_main/skeletons/products/filters/gander';
import Color from 'src/components/_main/skeletons/products/filters/colors';
import Sizes from 'src/components/_main/skeletons/products/filters/sizes';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';

Filter.propTypes = {
  onClose: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  shop: PropTypes.object,
  category: PropTypes.object,
  subCategory: PropTypes.object
};

export default function Filter({ ...props }) {
  const { onClose, pathname, category, shop, subCategory } = props;
  const { data, isLoading } = useQuery(['get-filters' + shop || '' + category || '' + 'subCategory'], () =>
    api.getAllFilters(shop?.slug || '', category?.slug || '', subCategory?.slug || '')
  );
  const filters = data?.data;
  return (
    <Card
      sx={{
        width: '300px',
        border: 'none !important',
        borderRadius: '0px !important'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography variant="h5" color="text.primary">
          Filter
        </Typography>

        <IconButton onClick={() => onClose()}>
          <MdClear />
        </IconButton>
      </Box>
      <Box
        sx={{
          height: 'calc(100vh - 56px)',
          overflowY: 'auto'
        }}
      >
        {isLoading ? (
          <Brands />
        ) : (
          Boolean(filters?.brands?.length) && (
            <Box p={2}>
              <BrandsFilter brands={filters?.brands} path={pathname} />
            </Box>
          )
        )}
        {isLoading ? (
          <Gender />
        ) : (
          Boolean(filters?.genders?.length) && (
            <>
              <Divider />
              <Box p={2}>
                <GenderFilter genders={filters?.genders} path={pathname} />
              </Box>
            </>
          )
        )}
        {isLoading ? (
          <Color />
        ) : (
          Boolean(filters?.colors?.length) && (
            <>
              <Divider />
              <Box p={2}>
                <ColorsFilter colors={filters?.colors} path={pathname} />
              </Box>
            </>
          )
        )}
        {isLoading ? (
          <Sizes />
        ) : (
          Boolean(filters?.sizes?.length) && (
            <>
              <Divider />
              <Box p={2}>
                <SizesFilter sizes={filters?.sizes} path={pathname} />
              </Box>
            </>
          )
        )}
        <Divider />
        {Boolean(filters?.prices?.length) && (
          <Box p={2}>
            <PriceRange prices={filters?.prices} path={pathname} />
          </Box>
        )}
      </Box>
    </Card>
  );
}
