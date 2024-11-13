'use client';
import { useState } from 'react';
import PropTypes from 'prop-types';

// mui
import { styled } from '@mui/material/styles';
import { Box, Tab, Card, Divider, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// components
import ProductDetailsReview from '../reviews';
const RootStyles = styled('div')(() => ({
  overflow: 'hidden',
  position: 'relative',
  padding: '40px 0'
}));

ProductDetailsTabs.propTypes = {
  product: PropTypes.object.isRequired,
  reviews: PropTypes.array.isRequired,
  totalRating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired,
  reviewsSummery: PropTypes.object.isRequired
};

export default function ProductDetailsTabs({ ...props }) {
  const { product, reviews, totalRating, totalReviews, reviewsSummery } = props;
  const [value, setValue] = useState('1');
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <RootStyles>
      <Card sx={{ mb: 3 }}>
        <TabContext value={value}>
          <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
            <TabList onChange={handleChangeTab}>
              <Tab disableRipple value="1" label={'Product Description'} />
              <Tab disableRipple value="2" label={'Reviews'} sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }} />
            </TabList>
          </Box>
          <Divider />
          <TabPanel value="1" sx={{ p: 3 }}>
            <Typography variant="body1" color="text.secondary">
              {product?.description}
            </Typography>
          </TabPanel>
          <TabPanel value="2">
            <ProductDetailsReview
              reviewsSummery={reviewsSummery}
              totalRating={totalRating}
              totalReviews={totalReviews}
              reviews={reviews}
              pid={product?._id}
            />
          </TabPanel>
        </TabContext>
      </Card>
    </RootStyles>
  );
}
