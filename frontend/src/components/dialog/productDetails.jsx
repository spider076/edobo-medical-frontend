import * as React from 'react';
import PropTypes from 'prop-types';
// api
import * as api from 'src/services';
import { useQuery } from 'react-query';
// mui
import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
// components
import DetailsSkeleton from 'src/components/skeletons/productDetail';
import ProductDetailsSumaryMobile from '../_main/product/mobileSummary';
import ProductDetailsCarousel from 'src/components/carousels/customPaginationSilder';

ProductDetailsDialog.propTypes = {
  slug: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.required
};

export default function ProductDetailsDialog(props) {
  const { onClose, open, slug } = props;

  const { data, isLoading } = useQuery(['coupon-codes', slug], () => api.getProductBySlug(slug));

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      {isLoading ? (
        <DetailsSkeleton isPopup />
      ) : (
        <Grid container spacing={2} justifyContent="center" sx={{ p: 3 }}>
          <Grid item xs={12} md={6} lg={6}>
            <ProductDetailsCarousel slug={slug} product={data?.data} data={data?.data} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ProductDetailsSumaryMobile
              id={data?.data?._id}
              product={data?.data}
              brand={data?.brand}
              category={data?.category}
              totalRating={data?.totalRating}
              totalReviews={data?.totalReviews}
            />
          </Grid>
        </Grid>
      )}
    </Dialog>
  );
}
