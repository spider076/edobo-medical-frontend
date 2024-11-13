import React from 'react';
import PropTypes from 'prop-types';
// components
import AdminBestSelling from 'src/components/cards/adminBestSelling';
export default function BestSelling({ ...props }) {
  const { data, loading, isVendor } = props;
  return <AdminBestSelling data={data} loading={loading} isVendor={isVendor} />;
}

BestSelling.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  isVendor: PropTypes.bool
};
